const { SlashCommandBuilder, InteractionResponse, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputStyle, TextInputBuilder} = require('discord.js');
const con = require('../../database.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reviews')
        .setNameLocalizations({
            fr : "avis",
        })
		.setDescription('Leave a review for the bot.')
        .setDescriptionLocalizations({
            fr : "Laissez un avis pour le bot."
        }),
	async execute(interaction) {
        con.query(`SELECT * FROM server WHERE server_id = ${interaction.guild.id}`, (err, rows) => {
            if (err) throw err;
            const languages = rows[0].languages;
            if(languages === "en") {
                const m_en_review = new ModalBuilder()
                .setCustomId("en_reviews")
                .setTitle("Leave a review")

                const i_en_unsername = new TextInputBuilder()
                .setCustomId("en_username")
                .setLabel("What is your username ?")
                .setStyle(TextInputStyle.Short)
                .setRequired(true)

                const i_en_review = new TextInputBuilder()
                .setCustomId("en_review")
                .setLabel("Leave a review")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)

                const username_row = new ActionRowBuilder().addComponents(i_en_unsername);
                const review_row = new ActionRowBuilder().addComponents(i_en_review);

                m_en_review.addComponents(username_row, review_row);

                interaction.showModal(m_en_review);
            }
            else if(languages === "fr") {
                // French version
                const m_fr_review = new ModalBuilder()
                .setCustomId("fr_reviews")
                .setTitle("Laissez un avis")

                const i_fr_unsername = new TextInputBuilder()
                .setCustomId("fr_username")
                .setLabel("Quel est votre nom d'utilisateur ?")
                .setStyle(TextInputStyle.Short)
                .setRequired(true)

                const i_fr_review = new TextInputBuilder()
                .setCustomId("fr_review")
                .setLabel("Laissez un avis")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)

                const username_row = new ActionRowBuilder().addComponents(i_fr_unsername);
                const review_row = new ActionRowBuilder().addComponents(i_fr_review);

                m_fr_review.addComponents(username_row, review_row);

                interaction.showModal(m_fr_review);
            }
        });
    }
};    