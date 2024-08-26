const { SlashCommandBuilder, InteractionResponse, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, Component} = require('discord.js');
const con = require('../../database.js');
const words = require("../../word.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('word')
        .setNameLocalizations({
            fr : "word",
        })
		.setDescription('Get a random word with a definition.')
        .setDescriptionLocalizations({
            fr : "Obtenez la latence du bot."
        }),
	async execute(interaction) {
        con.query(`SELECT * FROM server WHERE server_id = ${interaction.guild.id}`, (err, rows) => {
            if (err) throw err;
            const languages = rows[0].languages;
            if(languages === "en") {
                const englishWords = words.filter(wordObj => wordObj.language === "en");
                const randomWord = englishWords[Math.floor(Math.random() * englishWords.length)];
                const en_em_randomWord = new EmbedBuilder()
                .setTitle('🎲 Random Word')
                .addFields({
                    name: `${randomWord.word}`,
                    value: `${randomWord.description}`
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
                interaction.reply({embeds: [en_em_randomWord], components: [en_ar_refresh]});
            }
            else if(languages === "fr") {
                const frenchWords = words.filter(wordObj => wordObj.language === "fr");
                const randomWord = frenchWords[Math.floor(Math.random() * frenchWords.length)];
                const fr_em_randomWord = new EmbedBuilder()
                .setTitle('🎲 Mot Aléatoire')
                .addFields({
                    name: `${randomWord.word}`,
                    value: `${randomWord.description}`
                })
                .setColor("#00ff00")
                .setTimestamp()
                .setFooter({ text: 'Made by Rayreth avec 💖', iconURL: 'https://cdn.discordapp.com/icons/1040645618311385158/577f596043d0ea6a4cc91859cebfcf11.webp?size=160' })
                const fr_b_refresh = new ButtonBuilder()
                .setCustomId('fr-refresh')
                .setEmoji('🔄')
                .setStyle(ButtonStyle.Secondary);
                const fr_ar_refresh = new ActionRowBuilder()
                .addComponents(fr_b_refresh);
                interaction.reply({embeds: [fr_em_randomWord], components: [fr_ar_refresh]});
            }
        });
    }
};    