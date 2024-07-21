const { SlashCommandBuilder, InteractionResponse, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder} = require('discord.js');

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
         const s_languages = new StringSelectMenuBuilder()
        .setCustomId("languages")
        .setPlaceholder("Select a language")
        .addOptions([
            {
                label: "English",
                value: "en",
                emoji: "🇬🇧"
            },
            {
                label: "French",
                value: "fr",
                emoji: "🇫🇷"
            }
        ]);

        const row = new ActionRowBuilder()
        .addComponents(s_languages);
        // if this commands is on mp reply "you need to be on a server to use this command"
        if(!interaction.guild){
            interaction.reply({ content: "❌ You need to be on a server to use this command !", ephemeral: true })
        } else {
            interaction.reply({ content: "Choose your language :", components: [row] });
        }
    }
};