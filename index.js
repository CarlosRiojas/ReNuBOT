// index.js

const fs = require('fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');

const { fetchRelevantArticles } = require('./rssFetcher');
const { getAllUsers, getNextTopic } = require('./userTopics');
const { token, newsChannelId } = require('./config.json');


// ---- Discord client ----
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// ---- Load slash commands ----
client.commands = new Collection();

const commandFiles = fs
  .readdirSync('./commands')
  .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  if (!command.data || !command.data.name) {
    console.error(`❌ Invalid command file: ${file}`);
    continue;
  }

  client.commands.set(command.data.name, command);
}

// ---- Interaction handler ----
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: '❌ There was an error executing this command.',
        ephemeral: true
      });
    } else {
      await interaction.reply({
        content: '❌ There was an error executing this command.',
        ephemeral: true
      });
    }
  }
});

// ---- RSS deduplication state (per topic) ----
const postedByTopic = {};

// ---- Ready + scheduler ----
client.once('ready', () => {
  console.log('Ready!');

  setInterval(async () => {
    console.log('⏱ Scheduler tick');

    try {
      const channel = await client.channels.fetch(newsChannelId);
      if (!channel) return;

      const users = getAllUsers();
      console.log('👥 Users:', users);

      for (const userId of Object.keys(users)) {
        const topic = getNextTopic(userId);
        if (!topic) continue;

        console.log('📌 Selected topic:', topic);

        const articles = await fetchRelevantArticles(topic);
        if (!articles.length) continue;

        if (!postedByTopic[topic]) {
          postedByTopic[topic] = new Set();
        }

       const article = articles.find(
 				a => a.link && !postedByTopic[topic].has(a.link)
			);

		if (!article) continue;

		postedByTopic[topic].add(article.link);

		const source =
  			article.creator ||
  			article.author ||
  			article.source ||
  				'News';
// send the block of message to chat feed & scheduler
			await channel.send(
			`🗞 **${topic}**\n` +
			`_${source}_\n` +
			`${article.title}\n` +
			`${article.link}` +
      `🗞 for **${userId}**\n` 
		);
      }
    } catch (err) {
      console.error('❌ Scheduler failed:', err);
    }
  }, 60 * 60 * 1000); // three posts per user every hour
});

// ---- Login ----
client.login(token);
