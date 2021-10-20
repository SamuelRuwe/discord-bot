const {SlashCommandBuilder} = require('@discordjs/builders');

const {MessageAttachment, MessageEmbed} = require('discord.js');
const file = new MessageAttachment('images/ness.png');
const exampleEmbed = new MessageEmbed()
    .setTitle('Some Title Boi')
    .setImage('attachment://ness.png');

export const command = {
    data: new SlashCommandBuilder()
        .setName('images')
        .setDescription('Uploads an image'),
    async execute(interaction) {
        await interaction.reply({embeds: [exampleEmbed], files: [file]});
    }
}
