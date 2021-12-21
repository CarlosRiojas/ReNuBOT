// Require the necessary discord.js classes
const fs = require('fs')
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');

//const commands = require('./commands/${file}')

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

	/*
	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	}	else if (commandName === 'peng') {
			await interaction.reply('peeng!');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
*/
	
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