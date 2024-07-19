const { SlashCommandBuilder, InteractionResponse, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
        .setNameLocalizations({
            fr : "help",
        })
		.setDescription('Get help with the bot.')
        .setDescriptionLocalizations({
            fr : "Obtenez de l'aide pour le bot."
        }),
	async execute(interaction) {
        interaction.reply({ content: "This command is still in development", ephemeral: true })
    }
};