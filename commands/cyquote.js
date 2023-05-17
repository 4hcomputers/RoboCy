import { SlashCommandBuilder, } from '@discordjs/builders';

export const slash = new SlashCommandBuilder()
	.setName('cyquote')
	.setDescription('ask the cyquotes api')
	.addIntegerOption((option) => option
		.setName('id')
		.setDescription('quote id')
		.setRequired(false));

export async function execute(interaction) {
	let id = interaction.options.getInteger('id');

	await interaction.deferReply();

	let res = await (await fetch('https://cyquotes.ccreativecnd.repl.co/api' + (id ? `?id=${id}` : ''))).json();

	if (res.quote)
		interaction.editReply(res.quote);
}