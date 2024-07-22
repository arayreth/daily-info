const { SlashCommandBuilder, InteractionResponse, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder} = require('discord.js');
const { createConnection } = require('mysql');
const config = require('../../config.json');

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
        //temporary solution to get the language of the server from the database
        //but if it work, it work
        let con = createConnection(config.mysql);

        con.connect(err => {
        if (err) return console.log(err);
        });
        con.query(`SELECT * FROM server WHERE server_id = ${interaction.guild.id}`, (err, rows) => {
            if (err) throw err;
            const languages = rows[0].languages;
            if(languages === "en") {
                interaction.reply({content: `🏓 Pong ${interaction.client.ws.ping} ms !`});
            }
            else if(languages === "fr") {
                interaction.reply({content: `🏓 Pong ${interaction.client.ws.ping} ms !`});
            }
        });
    }
};    