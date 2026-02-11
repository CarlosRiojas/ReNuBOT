const { SlashCommandBuilder } = require('discord.js');
const { setTopics } = require('../userTopics');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('settopics')
    .setDescription('Set up to 3 topics you want news about')
    .addStringOption(option =>
      option
        .setName('topic1')
        .setDescription('First topic')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('topic2')
        .setDescription('Second topic')
        .setRequired(false)
    )
    .addStringOption(option =>
      option
        .setName('topic3')
        .setDescription('Third topic')
        .setRequired(false)
    ),

  async execute(interaction) {
    const topics = [
      interaction.options.getString('topic1'),
      interaction.options.getString('topic2'),
      interaction.options.getString('topic3')
    ].filter(Boolean);

    setTopics(interaction.user.id, topics);

    console.log('✅ settopics called for user:', interaction.user.id);
    console.log('📦 Topics saved:', topics);

    await interaction.reply({
      content: `✅ Topics saved: **${topics.join(', ')}**\nNow run \`/start\` to begin RSS posting.`,
      ephemeral: true
    });
  }
};

