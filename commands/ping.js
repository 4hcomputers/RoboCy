import { SlashCommandBuilder } from '@discordjs/builders';

export const slash = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('latency');

export async function execute(interaction) {
	let text = `API latency: ${Math.round(interaction.client.ws.ping)}ms`;

	let ping = await interaction.reply(text, { fetchReply: true });

	ping.edit(`${text}\nBot response latency: ${getSnowflake(ping.id) - getSnowflake(interaction.id)}ms`);
}

const getSnowflake = (snowflake) => new Date(Number((BigInt(snowflake) >> 22n) + 1420070400000n)).getTime();