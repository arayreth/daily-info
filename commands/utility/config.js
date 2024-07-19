const { SlashCommandBuilder, InteractionResponse, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('config')
        .setNameLocalizations({
            fr : "configurer",
        })
		.setDescription('Configure the bot for your server.')
        .setDescriptionLocalizations({
            fr : "Configure le bot pour votre serveur."
        }),
	async execute(interaction) {
        // if this commands is on mp reply "you need to be on a server to use this command"
        if(!interaction.guild){
            interaction.reply({ content: "❌ You need to be on a server to use this command !", ephemeral: true })
        } else {
            interaction.reply({ content: "This command is still in development", ephemeral: true })
        }
    }
};