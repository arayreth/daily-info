const { SlashCommandBuilder, InteractionResponse, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder} = require('discord.js');
const con = require('../../database.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('topauthor')
        .setNameLocalizations({
            fr : "topauteur",
        })
		.setDescription('Get the ranking of authors with the most citations.')
        .setDescriptionLocalizations({
            fr : "Obtenez le classement des auteurs ayant le plus de citations."
        }),
	async execute(interaction) {
        con.query(`SELECT * FROM server WHERE server_id = ${interaction.guild.id}`, (err, rows) => {
            if (err) throw err;
            const languages = rows[0].languages;
            if(languages === "en") {
               // const r = con.query(`SELECT author, COUNT(*) AS quote_count FROM quotes GROUP BY author ORDER BY quote_count DESC LIMIT 5;`)
                //query to get the top authors
                // the table is quote, and it has a colum quotes and a column author
                // console.log(r)
                //const em_author_rank = new EmbedBuilder()
                //.setTitle("Top Authors")
                //.setDescription("Here is the ranking of authors with the most citations.")
                //.addFields(
                //
                //)
                //.setColor("#FFD700")
                //.setTimestamp()
                //.setFooter({ text: 'Fait par Rayreth avec 💖', iconURL: 'https://cdn.discordapp.com/icons/1040645618311385158/577f596043d0ea6a4cc91859cebfcf11.webp?size=160' })
                interaction.reply({content: "🛠️ This command is still in development !", ephemeral: true});
            }
            else if(languages === "fr") {
                interaction.reply({content: "🛠️ Cette commande est encore en développement !", ephemeral: true});
            }
        });
    }
};    