// import { BOT_TOKEN } from './env';
import { Client, Collection, Intents } from 'discord.js';
import { deployCommands, setCommands } from './deploy-commands';
require('dotenv').config();

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

deployCommands();
const commands: Collection<unknown, any> = setCommands();

client.login(process.env.BOT_TOKEN);

client.on("ready", () => console.log(`Logged in as ${client.user.tag}!`));

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
});
