const { SlashCommandBuilder } = require('discord.js');
const { start } = require('../userTopics');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Start receiving RSS news updates'),

  async execute(interaction) {
    start(interaction.user.id);

    await interaction.reply({
      content: '🟢 RSS news posting started.',
      ephemeral: true
    });
  }
};


