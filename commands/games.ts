import { data, update } from '../config';

const {SlashCommandBuilder} = require('@discordjs/builders');

export const command = {
    data: new SlashCommandBuilder()
        .setName('games')
        .setDescription('Game commands')
        .addSubcommand((subcommand: any) =>
            subcommand
                .setName('pick')
                .setDescription('Selects a game to play from the list'))
        .addSubcommand((subcommand: any) =>
            subcommand
                .setName('add')
                .setDescription('Add a new game to the games list')
                .addStringOption((opt: any) => opt.setName('target').setDescription('Game to add')))
        .addSubcommand((subcommand: any) =>
            subcommand
                .setName('remove')
                .setDescription('Remove game from games list')
                .addStringOption((opt: any) => opt.setName('target').setDescription('Number of game to remove')))
        .addSubcommand((subcommand: any) =>
            subcommand
                .setName('list')
                .setDescription('List available games')),
    async execute(interaction: any) {
        if (interaction.options.getSubcommand() === 'pick')
            await interaction.reply(data.games[Math.floor(Math.random() * data.games.length)]);
        else if (interaction.options.getSubcommand() === 'add') {
            const game = interaction.options.getString('target');
            data.games.push(game);
            update(data);
            interaction.reply(`Added ${game} to games list.`);
        } else if (interaction.options.getSubcommand() === 'remove') {
            const gameId = interaction.options.getString('target');
            const removed = removeGame(gameId);
            if (removed) {
                update(data);
                interaction.reply(`Removed ${removed} from games list.`);
            } else {
                interaction.reply(`Could not find game to remove.`);
            }
        } else if (interaction.options.getSubcommand() === 'list') {
            const result = data.games.map((game: string, i: number) => `${i + 1}. ${game}\n`).join(" ");
            interaction.reply(result);
        }
    }
}

function removeGame(value: string | number): string {
    for (let i = 0; i < data.games.length; i++) {
        if (String(value).toUpperCase() == data.games[i].toUpperCase()) {
            return data.games.splice(i, 1);
        }
    }

    const num = Number(value);
    if (!isNaN(num) && num > 0 && num <= data.games.length) {
        return data.games.splice(num - 1, 1);
    }
    return '';
}
