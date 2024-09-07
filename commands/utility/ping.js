const { SlashCommandBuilder, InteractionResponse, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder} = require('discord.js');
const con = require('../../database.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
        .setNameLocalizations({
            fr : "ping",
        })
		.setDescription('Get the bot latency.')
        .setDescriptionLocalizations({
            fr : "Obtenez la latence du bot."
        }),
	async execute(interaction) {
        await interaction.deferReply();
        con.query(`SELECT * FROM server WHERE server_id = ${interaction.guild.id}`, (err, rows) => {
            if (err) throw err;
            const languages = rows[0].languages;
            if(languages === "en") {
                interaction.editReply({content: `🏓 Pong ${interaction.client.ws.ping} ms !`});
            }
            else if(languages === "fr") {
                interaction.editReply({content: `🏓 Pong ${interaction.client.ws.ping} ms !`});
            }
        })
    }
}