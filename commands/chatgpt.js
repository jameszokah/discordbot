

import { SlashCommandBuilder } from 'discord.js';
import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export default {
	data: new SlashCommandBuilder()
		.setName('chatme')
		.setDescription('Chat AI for legdev Server, it gives accurate response to anything you ask it!.'),
	async execute(interaction) {
/*const response = await openai.createCompletion({	        model: "text-davinci-003",			        prompt: "Say this is a test",                          temperature: 0,                                        max_tokens: 7,                                         });

*/
console.log(interaction)

		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};


