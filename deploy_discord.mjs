
import { REST, Routes } from 'discord.js';

import * as dotenv from 'dotenv';
import * as fs from 'node:fs';



dotenv.config();

const clientId = process.env.clientId;
const guildId = process.env.guildId;
const token = process.env.token;

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = await import(`./commands/${file}`);
	console.log('command :', command.default.data.toJSON());
	console.log('commands  :_ ', commands);
	commands.push(command.default?.data?.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
				);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});
