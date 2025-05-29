// Require the necessary discord.js classes
const fs = require('fs')
const { Client, Intents, Collection } = require('discord.js');

let token;
try {
  token = require('./config.json').token;
} catch (error) {
  console.error("Error: Could not load config.json. Please ensure the file exists and is correctly formatted.");
  process.exit(1);
}

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))


for(const file of commandFiles){
	const command = require(`./commands/${file}`)
	client.commands.set(command.data.name, command);
}


// When the client is ready, run this code (only once)

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});
// Login to Discord with your client's token
client.login(token);