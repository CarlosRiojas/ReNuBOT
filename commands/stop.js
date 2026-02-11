const { SlashCommandBuilder } = require('discord.js');
const { stop } = require('../userTopics');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop receiving RSS news updates'),

  async execute(interaction) {
    stop(interaction.user.id);

    await interaction.reply({
      content: '🔴 RSS news posting stopped.',
      ephemeral: true
    });
  }
};
