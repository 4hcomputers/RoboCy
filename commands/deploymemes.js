import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord.js';

export const slash = new SlashCommandBuilder()
	.setName('deploymemes')
	.setDescription('redeploy vercel site')
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
	if (!interaction.client.owners.includes(interaction.member.id))
		return interaction.reply('💀❌ you\'re not allowed');

	await interaction.deferReply();
	
	let res = await fetch(process.env.VERCEL_MEMES_DEOPLY_HOOK);

	interaction.editReply('```json\n' + await res.text() + '\n```');
}