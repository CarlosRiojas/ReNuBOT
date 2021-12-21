const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports={
        data: new SlashCommandBuilder()
        .setName('peng')
        .setDescription('Replies with Pengng'),
        async execute(interaction){
            await interaction.reply('peng!MAN!');
        },
        
}