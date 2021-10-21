import { Client, Collection, Intents, MessageAttachment, MessageEmbed } from 'discord.js';
import { deployCommands, setCommands } from './deploy-commands';
import { OPGGScreenshot } from './puppeteer/op-gg-image';

require('dotenv').config();

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

deployCommands();
const commands: Collection<unknown, any> = setCommands();

client.login(process.env.BOT_TOKEN);

client.on("ready", () => console.log(`Logged in as ${client?.user?.tag}!`));

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

client.on('message', async message => {
    if (message.content === '!StupidMaddie') {
        await OPGGScreenshot('ilianora');
        const file = new MessageAttachment('images/game.png');
        const embed = new MessageEmbed()
            .setTitle('Maddie ints my game')
            .setImage('attachment://game.png');
        message.reply({embeds: [embed], files: [file]});
    }
});

client.on('message', async message => {
    if (message.content === '!StupidBrandon') {
        await OPGGScreenshot('my+raspberry+pi');
        const file = new MessageAttachment('images/game.png');
        const embed = new MessageEmbed()
            .setTitle('Brandon runs it')
            .setImage('attachment://game.png');
        message.reply({embeds: [embed], files: [file]});
    }
});
