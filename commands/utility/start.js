const { SlashCommandBuilder, InteractionResponse, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder} = require('discord.js');
const axios = require('axios')
const { apiKey } = require('../../config.json')
const config = require('../../config.json');
const con = require('../../database.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setNameLocalizations({
			fr : "démarrer",
		})
		.setDescription('The best way to start the day !')
		.setDescriptionLocalizations({
			fr : "La meilleure façon de commencer la journée !"
		}),
	async execute(interaction) {
		function toTimestamp(strDate){
			var datum = Date.parse(strDate);
			return datum/1000;
		 }

		const reload = new ButtonBuilder()
			.setCustomId('reload')
			.setEmoji("🔄")
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder()
			.addComponents(reload);	

		const reload1 = new ButtonBuilder()
			.setCustomId("reload1")
			.setEmoji("🔄")
			.setStyle(ButtonStyle.Secondary);

		const row1 = new ActionRowBuilder()
			.addComponents(reload1);			
		con.query(`SELECT * FROM server WHERE server_id = '${interaction.guild.id}'`, async (err, rows) => {
			await interaction.deferReply();
			const languages = rows[0].languages;
			if(languages === "en") {
				//get a quotes from the database and send a random one
				con.query(`SELECT * FROM quotes WHERE languages = "en"`, async (err, rows) => {
					const quotes = [];
					for (let i = 0; i < rows.length; i++) {
						quotes.push(rows[i].quotes);
					}
					const Response = Math.floor(Math.random() * quotes.length);
					const selectedquotes = quotes[Response];
					const author = rows[Response].author;
					await interaction.editReply(`<:chapo:1263872856442540057> Welcome **${interaction.user.username}** !`);
					await interaction.channel.send("‎ \n");
					await interaction.channel.send("⌚ We are the <t:" + toTimestamp(new Date()) + ":D>, it's <t:" + toTimestamp(new Date()) + ":t> ! ");
					await interaction.channel.send("‎ \n");
					await interaction.channel.send("__Quote of the day__");
					await interaction.channel.send("‎ \n");
					await interaction.channel.send({content: `>  ${selectedquotes} \n ${author}`, components: [row]});
					await interaction.channel.send("‎ \n");
					con.query(`SELECT * FROM lyrics WHERE languages = "en"`, (err, rows) => {
						const englishLyrics = rows;
						const randomLyrics = englishLyrics[Math.floor(Math.random() * englishLyrics.length)];
						interaction.channel.send("__Lyrics of the day__");
					    interaction.channel.send("‎ \n");
					    interaction.channel.send({content: `> ${randomLyrics.lyrics} \n ${randomLyrics.author}`, components: [row1]});
					    interaction.channel.send("‎ \n");
						});
					con.query(`SELECT * FROM word WHERE languages = "en"`, async (err, rows) => {
					const englishWords = rows;
					const randomWord = englishWords[Math.floor(Math.random() * englishWords.length)];
					const en_em_randomWord = new EmbedBuilder()
					.setTitle('🎲 Random Word')
					.addFields({
						name: `${randomWord.word}`,
						value: `${randomWord.definitions}`
					})
					.setColor("#00ff00")
					.setTimestamp()
					.setFooter({ text: 'Made by Rayreth avec 💖', iconURL: 'https://cdn.discordapp.com/icons/1040645618311385158/577f596043d0ea6a4cc91859cebfcf11.webp?size=160' });
					const en_b_refresh = new ButtonBuilder()
					.setCustomId('en-refresh')
					.setEmoji('🔄')
					.setStyle(ButtonStyle.Secondary);
					const en_ar_refresh = new ActionRowBuilder()
					.addComponents(en_b_refresh);
					await interaction.channel.send({embeds: [en_em_randomWord], components: [en_ar_refresh]});
					await interaction.channel.send("‎ \n");
				})
					con.query(`SELECT * FROM server WHERE server_id = '${interaction.guild.id}'`, async (err, rows) => {
						const city = rows[0].city;
						await axios.get(
							`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
						.then(async response => {
							let apiData = response;
							let currentTemp = Math.ceil(apiData.data.main.temp)
							let maxTemp = apiData.data.main.temp_max;
							let minTemp = apiData.data.main.temp_min;
							let humidity = apiData.data.main.humidity;
							let wind = apiData.data.wind.speed;
							let icon = apiData.data.weather[0].icon
							let country = apiData.data.sys.country
							let pressure = apiData.data.main.pressure;
							let cloudness = apiData.data.weather[0].description;
							const weather_embed = new EmbedBuilder()
							.setColor(0x0099FF)
							.setTitle('__Weather of the day__')
							.setDescription(`The weather at ${city} is ${cloudness} !`)
							.addFields(
								{ name: 'Current temperature', value: `${Math.round(currentTemp)} °C`, inline: true },
								{ name: 'Maximum temperature', value: `${Math.round(maxTemp)} °C`, inline: true },
								{ name: 'Minimum temperature', value: `${Math.round(minTemp)} °C`, inline: true },
								{ name: `Humidity level`, value: `${humidity} %`, inline: true },
								{ name: `Wind speed`, value: `${Math.round(wind)} m/s`, inline: true },
								{ name: `Atmospheric pressure`, value: `${Math.round(pressure)} hPa`, inline: true },
							)
							.setTimestamp()
							.setFooter({ text: 'Made by Rayreth with 💖', iconURL: 'https://cdn.discordapp.com/icons/1040645618311385158/577f596043d0ea6a4cc91859cebfcf11.webp?size=160' });
							await interaction.channel.send({ embeds: [weather_embed] })
							await interaction.channel.send("‎ \n");
							await interaction.channel.send("Have a nice day :saluting_face: !")
						})
					})	

				});
			}
			else if(languages === "fr") {
				con.query(`SELECT * FROM quotes WHERE languages = "fr"`, async (err, rows) => {
					const quotes = [];
					for (let i = 0; i < rows.length; i++) {
						quotes.push(rows[i].quotes);
					}
					const Response = Math.floor(Math.random() * quotes.length);
					const selectedquotes = quotes[Response];
					const author = rows[Response].author;
					await interaction.editReply(`<:chapo:1263872856442540057> Bienvenue **${interaction.user.username}** !`);
					await interaction.channel.send("‎ \n");
					await interaction.channel.send("⌚ Nous sommes le <t:" + toTimestamp(new Date()) + ":D>, il est <t:" + toTimestamp(new Date()) + ":t> ! ");
					await interaction.channel.send("‎ \n");
					await interaction.channel.send("__La citation du jour__");
					await interaction.channel.send("‎ \n");
					await interaction.channel.send({content: `>  ${selectedquotes} \n ${author}`, components: [row]});
					await interaction.channel.send("‎ \n");
					con.query(`SELECT * FROM lyrics WHERE languages = "fr"`, (err, rows) => {
						const frenchLyrics = rows;
						const randomLyrics = frenchLyrics[Math.floor(Math.random() * frenchLyrics.length)];
						interaction.channel.send("__Les paroles du jour__");
					    interaction.channel.send("‎ \n");
					    interaction.channel.send({content: `> ${randomLyrics.lyrics} \n ${randomLyrics.author}`, components: [row1]});
					})
					await interaction.channel.send("‎ \n");
					con.query(`SELECT * FROM word WHERE languages = "fr"`, async (err, rows) => {
					const frenchWords = rows;
					const randomWord = frenchWords[Math.floor(Math.random() * frenchWords.length)];
					const fr_em_randomWord = new EmbedBuilder()
					.setTitle('🎲 Mot Aléatoire')
					.addFields({
						name: `${randomWord.word}`,
						value: `${randomWord.definitions}`
					})
					.setColor("#00ff00")
					.setTimestamp()
					.setFooter({ text: 'Fait par Rayreth avec 💖', iconURL: 'https://cdn.discordapp.com/icons/1040645618311385158/577f596043d0ea6a4cc91859cebfcf11.webp?size=160' })
					const fr_b_refresh = new ButtonBuilder()
                	.setCustomId('fr-refresh')
                	.setEmoji('🔄')
                	.setStyle(ButtonStyle.Secondary);
                	const fr_ar_refresh = new ActionRowBuilder()
                	.addComponents(fr_b_refresh);
					await interaction.channel.send({embeds: [fr_em_randomWord], components: [fr_ar_refresh]});
					})
					con.query(`SELECT * FROM server WHERE server_id = '${interaction.guild.id}'`, async (err, rows) => {
						const city = rows[0].city;
						await axios.get(
							`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
						.then(async response => {
							let apiData = response;
							let currentTemp = Math.ceil(apiData.data.main.temp)
							let maxTemp = apiData.data.main.temp_max;
							let minTemp = apiData.data.main.temp_min;
							let humidity = apiData.data.main.humidity;
							let wind = apiData.data.wind.speed;
							let icon = apiData.data.weather[0].icon
							let country = apiData.data.sys.country
							let pressure = apiData.data.main.pressure;
							let cloudness = apiData.data.weather[0].description;
							const weather_embed = new EmbedBuilder()
							.setColor(0x0099FF)
							.setTitle('__La météo du jour__')
							.setDescription(`Il fait ${cloudness} à ${city} !`)
							.addFields(
								{ name: 'Température actuelle', value: `${Math.round(currentTemp)} °C`, inline: true },
								{ name: 'Température maximale', value: `${Math.round(maxTemp)} °C`, inline: true },
								{ name: 'Température minimale', value: `${Math.round(minTemp)} °C`, inline: true },
								{ name: `Niveau d'humidité`, value: `${humidity} %`, inline: true },
								{ name: `Vitesse du vent`, value: `${Math.round(wind)} m/s`, inline: true },
								{ name: `Pression atmosphérique`, value: `${Math.round(pressure)} hPa`, inline: true },
							)
							.setTimestamp()
							.setFooter({ text: 'Fait par Rayreth avec 💖', iconURL: 'https://cdn.discordapp.com/icons/1040645618311385158/577f596043d0ea6a4cc91859cebfcf11.webp?size=160' });
							await interaction.channel.send({ embeds: [weather_embed] })
							await interaction.channel.send("‎ \n");
							await interaction.channel.send("Passez une bonne journée :saluting_face: !")
						})
		}
	)})
	}
})
}};