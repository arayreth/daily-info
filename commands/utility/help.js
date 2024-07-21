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
        if(rows[0].languages === "en"){
           const em_en_help = new EmbedBuilder()
           .setTitle("Help")
           .setDescription("Here is a list of all the commands available !")
           .addFields(
            { name: "</config:1263875298995470366>", value: "Configure the bot for your server." },
            { name: "</start:1263837821190537247>", value: "The best way to start the day !"},
            { name: "</quote:1263837821190537246>", value: "Get a random quote." },
           ) 
           .setTimestamp()
           .setFooter({ text: 'Made by Rayreth with 💖', iconURL: 'https://cdn.discordapp.com/icons/1040645618311385158/577f596043d0ea6a4cc91859cebfcf11.webp?size=160' });
           interaction.reply({ embeds: [em_en_help] });
        } else if(rows[0].languages === "fr"){
           const em_fr_help = new EmbedBuilder()
            .setTitle("Aide")
            .setDescription("Voici une liste de toutes les commandes disponibles !")
            .addFields(
              { name: "</config:1263875298995470366>", value: "Configurez le bot pour votre serveur." },
              { name: "</start:1263837821190537247>", value: "La meilleure façon de commencer la journée !"},
              { name: "</quote:1263837821190537246>", value: "Obtenez une citation aléatoire." },
            )
            .setTimestamp()
            .setFooter({ text: 'Fait par Rayreth avec 💖', iconURL: 'https://cdn.discordapp.com/icons/1040645618311385158/577f596043d0ea6a4cc91859cebfcf11.webp?size=160' })
            interaction.reply({ embeds: [em_fr_help] });
        }
        }
        );
    }
};