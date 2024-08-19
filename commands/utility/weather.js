const { SlashCommandBuilder, InteractionResponse, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder} = require('discord.js');
const con = require('../../database.js');
const { apiKey } = require('../../config.json');
const { default: axios } = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weather')
        .setNameLocalizations({
            fr : "météo",
        })
		.setDescription('Get the weather of a city.')
        .setDescriptionLocalizations({
            fr : "Obtenez la latence du bot."
        }),
	async execute(interaction) {
        con.query(`SELECT * FROM server WHERE server_id = ${interaction.guild.id}`, (err, rows) => {
            if (err) throw err;
            const languages = rows[0].languages;
            if(languages === "en") {
                con.query(`SELECT * FROM server WHERE server_id = ${interaction.guild.id}`, (err, rows) => {
                    if (err) throw err;
                    const city = rows[0].city;
                    axios.get(
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
                        await interaction.reply({ embeds: [weather_embed] })
                    }
                    )
                })
            }
            else if(languages === "fr") {
                const city = rows[0].city;
                axios.get(
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
                .setTitle('__Météo du jour__')
                .setDescription(`La météo à ${city} est ${cloudness} !`)
                .addFields(
                    { name: 'Température actuelle', value: `${Math.round(currentTemp)} °C`, inline: true },
                    { name: 'Température maximale', value: `${Math.round(maxTemp)} °C`, inline: true },
                    { name: 'Température minimale', value: `${Math.round(minTemp)} °C`, inline: true },
                    { name: `Niveau d'humidité`, value: `${humidity} %`, inline: true },
                    { name: `Vitesse du vent`, value: `${Math.round(wind)} m/s`, inline: true },
                    { name: `Pression atmosphérique`, value: `${Math.round(pressure)} hPa`, inline: true },
                )
                .setTimestamp()
                .setFooter({ text: 'Fait par Rayreth avec 💖', iconURL: 'https://cdn.discordapp.com/icons/1040645618311385158/577f596043d0ea6a4cc91859cebfcf11.webp?size=160' })
                await interaction.reply({ embeds: [weather_embed] });
            }    
        )}        
        });
    }
};    