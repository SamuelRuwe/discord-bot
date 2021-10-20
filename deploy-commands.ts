import { BOT_TOKEN, CLIENT_ID, GUILD_ID } from './env';
import * as fs from 'fs';
import { Collection } from 'discord.js';

const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');

const commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'));
const rest = new REST({version: '9'}).setToken(BOT_TOKEN);

export function setCommands() {
    for (const file of commandFiles) {
        const fileData = require(`./commands/${file}`);
        commands.set(fileData.command.data.name, fileData.command);
    }
    return commands;
}

export function deployCommands() {
    const commandsToDeploy = [];
    for (const file of commandFiles) {
        const fileData = require(`./commands/${file}`);
        commandsToDeploy.push(fileData.command.data.toJSON());
    }

    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commandsToDeploy})
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
}
