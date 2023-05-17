import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import { REST } from 'discord.js';
import { readdirSync } from 'fs';
import { keepAlive } from './keepAlive.js'

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.MessageContent
	],
	partials: [
		Partials.Message,
		Partials.GuildMember,
		Partials.User,
		Partials.Channel
	]
});

client.owners = (process.env.OWNER_IDS || '').split(',');

client.commands = new Collection();
const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = await import(new URL('commands/' + file, import.meta.url));
	client.commands.set(command.slash.name, command);
}

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (e) {
		console.error(e);
		await interaction.reply({
			content: 'There was an error while executing this command.',
			ephemeral: true
		});
	}
});

client.once('ready', async () => {
	console.log(`Ready! Logged in as ${client.user.tag}`);

	const rest = new REST({ version: '9' }).setToken(client.token);
	try {
		await rest.put(`/applications/${client.application.id}/guilds/${process.env.SERVER_ID}/commands`, {
			body: client.commands.map(c => c.slash.toJSON())
		});
	} catch (e) {
		console.error('failed registering slash commands', e);
	}
});

client.login(process.env.TOKEN);

keepAlive();