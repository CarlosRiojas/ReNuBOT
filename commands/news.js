const { SlashCommandBuilder } = require('discord.js');
const { fetchRelevantArticle } = require('../rssFetcher');
const { getNextTopic } = require('../userTopics');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('news')
    .setDescription('Get one relevant news article for your topics'),

  async execute(interaction) {
    const userId = interaction.user.id;

    const topic = getNextTopic(userId);

    if (!topic) {
      return interaction.reply({
        content: '❌ You have no active topics. Use `/settopics` and `/start` first.',
        ephemeral: true
      });
    }

    await interaction.deferReply({ ephemeral: true });

    const article = await fetchRelevantArticle(topic);

    if (!article || !article.link) {
      return interaction.editReply({
        content: `⚠️ No news found right now for **${topic}**.`
      });
    }

    await interaction.editReply({
      content: `📰 **${topic}**\n${article.title}\n${article.link}`
    });
  }
};

