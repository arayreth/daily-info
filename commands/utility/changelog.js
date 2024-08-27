const { SlashCommandBuilder, InteractionResponse, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder} = require('discord.js');
const con = require('../../database.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('changelog')
        .setNameLocalizations({
            fr : "modifications",
        })
		.setDescription('Get the bot changelog.')
        .setDescriptionLocalizations({
            fr : "Obtenez la liste des modifications du bot."
        }),
	async execute(interaction) {
        con.query(`SELECT * FROM server WHERE server_id = ${interaction.guild.id}`, (err, rows) => {
            if (err) throw err;
            const languages = rows[0].languages;
            if(languages === "en") {
                const en_b_change = new ButtonBuilder()
                .setLabel("Changelog")
                .setURL("https://daily-info.github.io/changelog")
                .setEmoji("🛠️")
                .setStyle(ButtonStyle.Link)
                const en_row = new ActionRowBuilder().addComponents(en_b_change);
                interaction.reply({content: "🔗 Here is the changelog of the bot.", components: [en_row]});
            }
            else if(languages === "fr") {
                const fr_b_change = new ButtonBuilder()
                .setLabel("Modifications")
                .setURL("https://daily-info.github.io/changelog")
                .setEmoji("🛠️")
                .setStyle(ButtonStyle.Link)
                const fr_row = new ActionRowBuilder().addComponents(fr_b_change);
                interaction.reply({content: "🔗 Voici la liste des modifications du bot.", components: [fr_row]});
            }
        })
    }
}