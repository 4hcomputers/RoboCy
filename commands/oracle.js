import { SlashCommandBuilder } from '@discordjs/builders';

export const slash = new SlashCommandBuilder()
	.setName('oracle')
	.setDescription('ask the oracle api');

export async function execute(interaction) {
	await interaction.deferReply();

	let res = await fetch('https://oracle.cy2.me/api');

	if (res.ok)
		interaction.editReply(await res.text());
	else
		interaction.editReply('cy would say his api is broken');
}