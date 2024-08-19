const { SlashCommandBuilder, InteractionResponse, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder} = require('discord.js');
const config = require('../../config.json');
const con = require('../../database.js');

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
        con.query(`SELECT * FROM server where server_id = ${interaction.guild.id}`, (err, rows) => {
        if(err) throw err;
        if(rows[0].languages === "en"){
           const em_en_help = new EmbedBuilder()
           .setTitle("Help")
           .setDescription("Here is a list of all the commands available !")
           .addFields(
            { name: "</config:1263875298995470366>", value: "Configure the bot for your server." },
            { name: "</start:1263837821190537247>", value: "The best way to start the day !"},
            { name: "</ping:1264658111919034399>", value: "Get the bot latency." },
            { name: "</quote:1263837821190537246>", value: "Get a random quote." },
            { name: "</support:1274406267112259618>", value: "Get the bot support discord server." },
            { name: "</weather:1267781177511641139>", value: "Suggest a quote to add to the bot." },
            { name: "</suggestquote:1275120940157501576>", value: "Suggest a quote to add to the bot." },
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
            { name: "</ping:1264658111919034399>", value: "Obtenez la latence du bot." },
            { name: "</quote:1263837821190537246>", value: "Obtenez une citation aléatoire." },
            { name: "</support:1274406267112259618>", value: "Obtenez le serveur de support du bot." },
            { name: "</weather:1267781177511641139>", value: "Obtenez la météo d'une ville." },
            { name: "</suggestquote:1275120940157501576>", value: "Suggérer une citation à ajouter au bot." },
            )
            .setTimestamp()
            .setFooter({ text: 'Fait par Rayreth avec 💖', iconURL: 'https://cdn.discordapp.com/icons/1040645618311385158/577f596043d0ea6a4cc91859cebfcf11.webp?size=160' })
            interaction.reply({ embeds: [em_fr_help] });
        }
        }
        );
    }
};