const {SlashCommandBuilder} = require('@discordjs/builders');

export const command = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    }
}
