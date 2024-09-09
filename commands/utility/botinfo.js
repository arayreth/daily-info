const { SlashCommandBuilder, InteractionResponse, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder} = require('discord.js');
const con = require('../../database.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('botinfo')
        .setNameLocalizations({
            fr : "botinfo",
        })
		.setDescription('Get the bot information.')
        .setDescriptionLocalizations({
            fr : "Obtenez les informations du bot."
        }),
	async execute(interaction) {
        await interaction.deferReply();
        con.query(`SELECT * FROM server WHERE server_id = ${interaction.guild.id}`, (err, rows) => {
            if (err) throw err;
            const languages = rows[0].languages;
            if(languages === "en") {
                const en_em_bot_info = new EmbedBuilder()
                .setTitle('__Bot Information__')
                .setDescription('Here are the information of the bot !')
                .addFields(
                    { name: 'Bot Name', value: `${interaction.client.user.username}`},
                    { name: 'Bot ID', value: `${interaction.client.user.id}`},
                    { name: 'Bot Owner', value: `<@477869784932024321>`},
                    { name: 'Bot Library', value: 'Discord.js'},
                    { name: 'Bot Language', value: '🇬🇧 🇫🇷'}
                )
                .setColor(0x0099FF)
                .setTimestamp()
                .setFooter({ text: 'Made by Rayreth with 💖', iconURL: 'https://cdn.discordapp.com/icons/1040645618311385158/577f596043d0ea6a4cc91859cebfcf11.webp?size=160' })
                interaction.editReply({embeds: [en_em_bot_info]});
            }
            else if(languages === "fr") {
               const fr_em_bot_info = new EmbedBuilder()
               .setTitle('__Informations du Bot__')
               .setDescription('Voici les informations du bot !')
                .addFields(
                     { name: 'Nom du Bot', value: `${interaction.client.user.username}`},
                     { name: 'ID du Bot', value: `${interaction.client.user.id}`},
                     { name: 'Propriétaire du Bot', value: `<@477869784932024321>`},
                     { name: 'Librairie du Bot', value: 'Discord.js'},
                     { name: 'Langue du Bot', value: '🇬🇧 🇫🇷'}
                )
                .setColor(0x0099FF)
                .setTimestamp()
                .setFooter({ text: 'Made by Rayreth with 💖', iconURL: 'https://cdn.discordapp.com/icons/1040645618311385158/577f596043d0ea6a4cc91859cebfcf11.webp?size=160' })
                interaction.editReply({embeds: [fr_em_bot_info]});
            }
        })
    }
}