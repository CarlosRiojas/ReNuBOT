const {SlashCommandBuilder} = require('@discordjs/builders')
const {API_KEY} = require('../config.json');


module.exports={
        data: new SlashCommandBuilder()
        .setName('news')
        .setDescription('Relevant Nus'),

        async execute(interaction){
            if (!API_KEY || API_KEY === "") {
                await interaction.reply({ content: "Sorry, the news service is currently unavailable due to a configuration issue. Please try again later.", ephemeral: true });
                return;
            }
            await interaction.reply(
                `https://newsapi.org/v2/top-headlines/sources?apiKey=${API_KEY}`);
        },
        
}