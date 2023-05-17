import { SlashCommandBuilder, } from '@discordjs/builders';

export const slash = new SlashCommandBuilder()
	.setName('httpcat')
	.setDescription('get a http status as a cat')
	.addIntegerOption((option) => option
		.setName('status')
		.setDescription('http status')
		.setRequired(true));

export async function execute(interaction) {
	let status = interaction.options.getInteger('status', true);

	interaction.reply(`https://http.cat/${status}`);
}