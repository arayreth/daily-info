const { SlashCommandBuilder, InteractionResponse, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder} = require('discord.js');
const con = require('../../database.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('support')
        .setNameLocalizations({
            fr : "support",
        })
		.setDescription('Get the bot support discord server.')
        .setDescriptionLocalizations({
            fr : "Obtenez le serveur de support du bot."
        }),
	async execute(interaction) {
        con.query(`SELECT * FROM server WHERE server_id = ${interaction.guild.id}`, (err, rows) => {
            if (err) throw err;
            const languages = rows[0].languages;
            if(languages === "en") {
                const en_b_l_support = new ButtonBuilder()
                .setLabel("Support server")
                .setEmoji("🛠️")
                .setURL("https://discord.com/invite/tNNppxGnj2")
                .setStyle(ButtonStyle.Link)

                const en_b_l = new ActionRowBuilder().addComponents(en_b_l_support)

                interaction.reply({content: "🔗 Here is the link to the support server:", components: [en_b_l]});
            }
            else if(languages === "fr") {
                const fr_b_l_support = new ButtonBuilder()
                .setLabel("Serveur de support")
                .setEmoji("🛠️")
                .setURL("https://discord.com/invite/tNNppxGnj2")
                .setStyle(ButtonStyle.Link)

                const fr_b_l = new ActionRowBuilder().addComponents(fr_b_l_support)

                interaction.reply({content: "🔗 Voici le lien du serveur de support:", components: [fr_b_l]});
            }
        });
    }
};    