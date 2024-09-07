const { SlashCommandBuilder, InteractionResponse, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder} = require('discord.js');
const axios = require('axios')
const con = require('../../database.js');
const config = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setNameLocalizations({
			fr : "citation",
		})
		.setDescription('Get the quote of the day !')
		.setDescriptionLocalizations({
			fr : "Obtenez la citation du jour !"
		}),
	async execute(interaction) {
		const reload = new ButtonBuilder()
					.setCustomId('reload')
					.setEmoji("🔄")
					.setStyle(ButtonStyle.Secondary);
		
					const row = new ActionRowBuilder()
					.addComponents(reload);	
		await interaction.deferReply();		
		con.query(`SELECT * FROM server WHERE server_id = ${interaction.guild.id}`, (err, rows) => {
			if (err) throw err;
			//get the language of the server
			const languages = rows[0].languages;
			if(languages === "en") {
				con.query(`SELECT * FROM quotes WHERE languages = "en"`, (err, rows) => {
					if (err) throw err;
					//get the quotes from the database and send a random one
					const quotes = [];
					for (let i = 0; i < rows.length; i++) {
						quotes.push(rows[i].quotes);
					}
					const Response = Math.floor(Math.random() * quotes.length);
					const selectedquotes = quotes[Response];
					const author = rows[Response].author;
					interaction.editReply("__Quote of the day__");
					interaction.channel.send("‎ \n");
					interaction.channel.send({content: `>  ${selectedquotes} \n ${author}`, components: [row]});
				});
			}
			else if(languages === "fr") {
				con.query(`SELECT * FROM quotes WHERE languages = "fr"`, (err, rows) => {
					if (err) throw err;
					const quotes = [];
					for (let i = 0; i < rows.length; i++) {
						quotes.push(rows[i].quotes);
					}
					const Response = Math.floor(Math.random() * quotes.length);
					const selectedquotes = quotes[Response];
					const author = rows[Response].author;
					interaction.editReply("__La citation du jour__");
					interaction.channel.send("‎ \n");
					interaction.channel.send({content: `>  ${selectedquotes} \n ${author}`, components: [row]});
				}
			);
      	}
		}
)
}
};