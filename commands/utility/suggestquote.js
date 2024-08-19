const { SlashCommandBuilder, InteractionResponse, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');
const con = require('../../database.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggestquote')
        .setNameLocalizations({
            fr : "suggérercitation",
        })
		.setDescription('Suggest a quote to add to the bot.')
        .setDescriptionLocalizations({
            fr : "Suggérer une citation à ajouter au bot."
        }),
	async execute(interaction) {
        con.query(`SELECT * FROM server WHERE server_id = ${interaction.guild.id}`, (err, rows) => {
            if (err) throw err;
            const languages = rows[0].languages;
            if(languages === "en") {
                const m_en_suggest = new ModalBuilder()
                .setCustomId('en_suggestquote')
                .setTitle('Suggest a quote')

                const m_en_quote = new TextInputBuilder()
                .setLabel('Quote to suggest')
                .setCustomId('en_quote')
                .setPlaceholder('Enter the quote here.')
                .setRequired(true)
                .setStyle(TextInputStyle.Short)

                const m_en_author = new TextInputBuilder()
                .setLabel('Author of the quote')
                .setCustomId('en_author')
                .setPlaceholder('Enter the author here.')
                .setRequired(true)
                .setStyle(TextInputStyle.Short)

                const firstActionRow = new ActionRowBuilder().addComponents(m_en_quote);
                const secondActionRow = new ActionRowBuilder().addComponents(m_en_author);

                m_en_suggest.addComponents(firstActionRow, secondActionRow);

                interaction.showModal(m_en_suggest);
            }
            else if(languages === "fr") {
                const m_fr_suggest = new ModalBuilder()
                .setCustomId('fr_suggestquote')
                .setTitle('Suggérer une citation')

                const m_fr_quote = new TextInputBuilder()
                .setLabel('Citation à suggérer')
                .setCustomId('fr_quote')
                .setPlaceholder('Entrez la citation ici.')
                .setRequired(true)
                .setStyle(TextInputStyle.Short)

                const m_fr_author = new TextInputBuilder()
                .setLabel('Auteur de la citation')
                .setCustomId('fr_author')
                .setPlaceholder('Entrez l\'auteur ici.')
                .setRequired(true)
                .setStyle(TextInputStyle.Short)

                const firstActionRow = new ActionRowBuilder().addComponents(m_fr_quote);
                const secondActionRow = new ActionRowBuilder().addComponents(m_fr_author);

                m_fr_suggest.addComponents(firstActionRow, secondActionRow);

                interaction.showModal(m_fr_suggest);
            }
        });
    }
};    