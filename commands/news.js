const {SlashCommandBuilder} = require('@discordjs/builders')
const {API_KEY} = require('../config.json');


module.exports={
        data: new SlashCommandBuilder()
        .setName('news')
        .setDescription('Relevant Nus'),

        async execute(interaction){
            await interaction.reply(
                `https://newsapi.org/v2/top-headlines/sources?apiKey=${API_KEY}`);
        },
        
}