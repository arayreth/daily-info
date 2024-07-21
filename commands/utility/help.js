const { SlashCommandBuilder, InteractionResponse, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder} = require('discord.js');
const { createConnection } = require('mysql');
const config = require('../../config.json');

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
        //temporary solution to get the language of the server from the database
        //but if it work, it work
        let con = createConnection(config.mysql);

        con.connect(err => {
        if (err) return console.log(err);
        });
        con.query(`SELECT * FROM server where server_id = ${interaction.guild.id}`, (err, rows) => {
        if(err) throw err;
        //if languages is "en" then send the english version of the help command
        //if languages is "fr" then send the french version of the help command
        if(rows[0].languages === "en"){
           interaction.reply({ content: "This command is still in development", ephemeral: true });
        } else if(rows[0].languages === "fr"){
           interaction.reply({ content: "Cette commande est encore en développement", ephemeral: true });
        }
        }
        );
    }
};