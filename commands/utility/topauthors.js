const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const con = require('../../database.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('topauthors')
        .setNameLocalizations({
            fr: "topauteurs",
        })
		.setDescription('Get the ranking of authors with the most citations.')
        .setDescriptionLocalizations({
            fr: "Obtenez le classement des auteurs ayant le plus de citations."
        }),
	async execute(interaction) {
        await interaction.deferReply();
        con.query(`SELECT * FROM server WHERE server_id = ${interaction.guild.id}`, (err, rows) => {
            if (err) throw err;
            const languages = rows[0].languages;

            if (languages === "en") {
                const query = `
                SELECT author, COUNT(*) as quote_count
                FROM quotes
                WHERE author IS NOT NULL AND author != '' AND author != '- Unknow' AND languages = 'en'
                GROUP BY author
                ORDER BY quote_count DESC
                LIMIT 3;
                `;
                
                con.query(query, (err, results) => {
                    if (err) {
                        interaction.reply({ content: '❌ Something went wrong :\nError retrieving data from the database.', ephemeral: true });
                        console.error('Error executing query:', err.stack);
                        return;
                    }

                    const en_top_author_embed = new EmbedBuilder()
                        .setTitle('Top Authors')
                        .setDescription('Here is the ranking of authors with the most citations.')
                        .setColor('#FFD700')
                        .setTimestamp()
                        .setFooter({ text: 'Made by Rayreth avec 💖', iconURL: 'https://cdn.discordapp.com/icons/1040645618311385158/577f596043d0ea6a4cc91859cebfcf11.webp?size=160' });
  
                        results.forEach((row, index) => {
                            let medal = '';
                            switch (index) {
                                case 0:
                                    medal = '🥇';
                                    break;
                                case 1:
                                    medal = '🥈';
                                    break;
                                case 2:
                                    medal = '🥉';
                                    break;
                            }
                            const trimmedAuthor = row.author.substring(2);
                            en_top_author_embed.addFields({
                                name: `${medal} ${trimmedAuthor}`,
                                value: `${row.quote_count} quotes`
                            });
                        });

                    interaction.editReply({ embeds: [en_top_author_embed] });
                });
            } else if (languages === "fr") {
                const query = `
                SELECT author, COUNT(*) as quote_count
                FROM quotes
                WHERE author IS NOT NULL AND author != '' AND author != '- Inconnu' AND languages = 'fr'
                GROUP BY author
                ORDER BY quote_count DESC
                LIMIT 3;
                `;
                
                con.query(query, (err, results) => {
                    if (err) {
                        interaction.reply({ content: '❌ Quelque chose s\'est mal passé :\nErreur lors de la récupération des données depuis la base de données.', ephemeral: true });
                        console.error('Erreur lors de l\'exécution de la requête :', err.stack);
                        return;
                    }

                    const fr_top_author_embed = new EmbedBuilder()
                        .setTitle('Top Auteurs')
                        .setDescription('Voici le classement des auteurs ayant le plus de citations.')
                        .setColor('#FFD700')
                        .setTimestamp()
                        .setFooter({ text: 'Fait par Rayreth avec 💖', iconURL: 'https://cdn.discordapp.com/icons/1040645618311385158/577f596043d0ea6a4cc91859cebfcf11.webp?size=160' });

                        results.forEach((row, index) => {
                            let medal = '';
                            switch (index) {
                                case 0:
                                    medal = '🥇';
                                    break;
                                case 1:
                                    medal = '🥈';
                                    break;
                                case 2:
                                    medal = '🥉';
                                    break;
                            }
                            const trimmedAuthor = row.author.substring(2);
                            fr_top_author_embed.addFields({
                                name: `${medal} ${trimmedAuthor}`,
                                value: `${row.quote_count} citations`
                            });
                        });

                    interaction.editReply({ embeds: [fr_top_author_embed] });
                })
            }
        });
    }
};