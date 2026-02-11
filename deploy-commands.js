const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token} = require('./config.json');

console.log('clientId:', clientId);
console.log('guildId:', guildId);
console.log('token exists:', Boolean(token));


const fs = require('fs')

const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  if (!command.data) {
    console.error(`❌ Command ${file} is missing "data" export`);
    continue;
  }

  commands.push(command.data.toJSON());
}


const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);