import { SlashCommandBuilder } from '@discordjs/builders';

export const command = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with server information!'),
    async execute(interaction: any) {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    }
}
