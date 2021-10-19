import { BOT_TOKEN } from './config';
import { Client, Intents } from 'discord.js';
import { GAMES } from './games';

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.login(BOT_TOKEN);

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

client.on("message", msg => {
    if (msg.content === "ping") {
        msg.reply("pong");
    }
});

client.on("message", msg => {
    if (msg.content === "!PickGame") {
        msg.reply(GAMES[Math.floor(Math.random() * GAMES.length)]);
    }
});

client.on("message", msg => {
    if (msg.content === "!GameList") {
        const result = GAMES.map((game, i) => `${i + 1}. ${game}\n`).join(" ");
        msg.reply(result);
    }
});

client.on("message", msg => {
    let input = msg.content.split(" ");
    const command = input.shift();
    const game = input.join(" ");
    if (command === "!AddGame") {
        GAMES.push(game);
        msg.reply(`Added ${game} to games list.`);
    }
});

client.on("message", msg => {
    let input = msg.content.split(" ");
    const command = input.shift();
    const index = Number(input);
    if (command === "!RemoveGame") {
        if (index > 0 && index <= GAMES.length) {
            const removed = GAMES.splice(index - 1, 1);
            msg.reply(`Removed ${removed} from games list.`);
        } else {
            msg.reply(`Array out of bounds exception! Sam's bot now crashing...`);
        }
    }
});
