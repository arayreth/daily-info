const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits,InteractionResponse, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { token, apiKey } = require('./config.json');
const { createConnection } = require('mysql');
const config = require('./config.json');
const axios = require('axios');
const con = require('./database.js');
const { default: DiscordAnalytics } = require("discord-analytics/discordjs")

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()){
	if(!interaction.guild){ interaction.reply({ content: "❌ You need to be on a server to use this command !", ephemeral: true }); return; }	

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
	}
	else if (interaction.isButton()) {
		if(interaction.customId === "reload"){
			const reload = new ButtonBuilder()
			.setCustomId('reload')
			.setEmoji("🔀")
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder()
			.addComponents(reload);	
			
			con.query(`SELECT * FROM server WHERE server_id = ${interaction.guild.id}`, (err, rows) => {
				if (err) throw err;
				const reload = new ButtonBuilder()
				.setCustomId('reload')
				.setEmoji("🔀")
				.setStyle(ButtonStyle.Secondary);
	
				const row = new ActionRowBuilder()
				.addComponents(reload);	
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
						interaction.reply("__Quote of the day__");
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
						interaction.reply("__Quote of the day__");
						interaction.channel.send("‎ \n");
						interaction.channel.send({content: `>  ${selectedquotes} \n ${author}`, components: [row]});
					}
				);
			  }
			}
		)
	}
		else if(interaction.customId === "reload1"){
			const reload1 = new ButtonBuilder()
			.setCustomId("reload1")
			.setEmoji("🔀")
			.setStyle(ButtonStyle.Secondary);

			const row1 = new ActionRowBuilder()
			.addComponents(reload1);	
			const lyrics = [
				"J'rap tellement bien qu'on dit que j'rap mal\n- Kery james",
				"I only see my goals, I don't believe in failure, cause I know the smallest voices, they can make it major\n- Lukas Graham",
				"Échouer, ou réussir, mais au moins tenter sa chance. Moi je dis que plus le combat est grand, plus la victoire est immense\n- Kery james",
				"Oh if there's one thing to be taught, it's dreams are made to be caught\n- Gavin DeGraw",
				"When I get older I will be stronger, they'll call me freedom just like a wavin' flag\n- K'Naan",
				"Standing in the hall of fame ,and the world's gonna know your nam\n- The script",
				"Maman m'a dit la vie n'est pas facile, mais plus facile avec un grand sourire\n- Soprano",
				"J'ai fait mon choix et je t'emmerde, désormais qui m'aime me suive.Désormais qui m'aime me traîne, beaucoup plus haut que je ne vise\n- Diams",
				"J'ai rien d'exceptionnel, j'ai des tas de potes à l'habitude.Mais mon meilleur ami s'appelle solitude\n- Sniper",
				"Bienvenue dans ma chambre j'y glande, voyage sur commande.Je fais le tour du globe à l'aide de ma télécommande\n- Sniper"
			];
			const Response1 = Math.floor(Math.random() * lyrics.length);
			await interaction.reply({content: `> 🎶 ${lyrics[Response1]}`, components: [row1]})
		}
		else if(interaction.customId === "next"){
			const m_city = new ModalBuilder()
			.setCustomId('m_city')
			.setTitle('City selection');

			const city = new TextInputBuilder()
			.setCustomId('city')
			.setLabel("For which city do you want the weather ?")
			.setStyle(TextInputStyle.Short);

			const row = new ActionRowBuilder().addComponents(city)
			m_city.addComponents(row)
			await interaction.showModal(m_city)
	}
	else if(interaction.customId === "suivant"){
		const m_ville = new ModalBuilder()
		.setCustomId('m_ville')
		.setTitle('Sélection de la ville');

		const ville = new TextInputBuilder()
		.setCustomId('ville')
		.setLabel("Pour quelle ville voulez-vous la météo ?")
		.setStyle(TextInputStyle.Short);

		const row = new ActionRowBuilder().addComponents(ville)
		m_ville.addComponents(row)
		await interaction.showModal(m_ville)
	}
}
	else if (interaction.isStringSelectMenu()){
		if(interaction.customId === "languages"){
		if(interaction.values == "en"){
			con.query(`UPDATE server SET languages = 'en' WHERE server_id = '${interaction.guild.id}'`, (err, rows) => {
				if (err) return console.log(err);
				const b_next = new ButtonBuilder()
				.setCustomId("next")
				.setEmoji("🌦️")
				.setLabel("Select the city for the weather")
				.setStyle(ButtonStyle.Secondary);
				const row = new ActionRowBuilder()
				.addComponents(b_next);

				interaction.reply({ content: "Language set to English !",components: [row], ephemeral: true });
			});
		}
		else if(interaction.values == "fr"){
			const b_suivant = new ButtonBuilder()
			.setCustomId("suivant")
			.setEmoji("🌦️")
			.setLabel("Sélectionnez la ville pour la météo")
			.setStyle(ButtonStyle.Secondary);
			const row = new ActionRowBuilder()
			.addComponents(b_suivant);
			con.query(`UPDATE server SET languages = 'fr' WHERE server_id = '${interaction.guild.id}'`, (err, rows) => {
				if (err) return console.log(err);
				interaction.reply({ content: "La langue a été définie en Français !",components: [row], ephemeral: true });
			});
		}
}
}
   else if(interaction.isModalSubmit()){
	if(interaction.customId === "m_city"){
		const city = interaction.fields.getTextInputValue('city');
		await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
		.then(response => {
			let apiData = response;
			let city = apiData.data.name;
			interaction.reply({ content: `✅ The weather has been found for the city : ${city} !`, ephemeral: true})
		}).catch(error => {
		interaction.reply({ content: "❌ Please indicate a valid city !", ephemeral: true });
		})
		con.query(`UPDATE server SET city = '${city}' WHERE server_id = '${interaction.guild.id}'`, (err, rows) => {
			if (err) return console.log(err);
		});
   }
   else if(interaction.customId === "m_ville"){
	const ville = interaction.fields.getTextInputValue('ville');
	await axios.get(
		`https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&appid=${apiKey}`)
	.then(response => {
		let apiData = response;
		let ville = apiData.data.name;
		interaction.reply({ content: `✅ La météo a été trouvée pour la ville : ${ville} !`, ephemeral: true})
	}
).catch(error => {
	interaction.reply({ content: "❌ Merci d'indiquer une ville valide !", ephemeral: true });
})
    con.query(`UPDATE server SET city = '${ville}' WHERE server_id = '${interaction.guild.id}'`, (err, rows) => {
	if (err) return console.log(err);
    });
}
	if(interaction.customId === "en_suggestquote"){
		const quote = interaction.fields.getTextInputValue('en_quote');
		const author = interaction.fields.getTextInputValue('en_author');
		con.query(`INSERT INTO t_quotes (quotes, author, languages) VALUES ('${quote}', '- ${author}', 'en')`, (err, rows) => {
			if (err) return console.log(err);
		});
		interaction.reply({ content: "✅ Quote successfully proposed !", ephemeral: true });
	}
	else if(interaction.customId === "fr_suggestquote"){
		const quote = interaction.fields.getTextInputValue('fr_quote');
		const author = interaction.fields.getTextInputValue('fr_author');
		con.query(`INSERT INTO t_quotes (quotes, author, languages) VALUES ('${quote}', '- ${author}', 'fr')`, (err, rows) => {
			if (err) return console.log(err);
		});
		interaction.reply({ content: "✅ Citation proposée avec succès !", ephemeral: true });
	}
}
});

const analytics = new DiscordAnalytics({
	client: client,
	apiToken: config.api_token,
	sharded: false
  });
  
analytics.trackEvents();

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
	readyClient.user.setActivity("at making your day better !")
});

client.once(Events.GuildCreate, guild => {
	con.query(`INSERT INTO server (server_id, owner_id, languages) VALUES ('${guild.id}', '${guild.ownerId}', 'en')`, (err, rows) => {
		if (err) return console.log(err);
	});
	const em_log_add = new EmbedBuilder()
	.setTitle("__Nouveau serveur__")
	.addFields(
		{ name: 'Nom du serveur', value: guild.name, inline: true },
		{ name: 'Id du serveur', value: guild.id, inline: true },
		{ name: 'Id du propriétaire', value: guild.ownerId, inline: true },
	)
	.setColor("#00FF00")
	.setTimestamp()
	.setFooter({ text: 'Made by Rayreth with 💖', iconURL: 'https://cdn.discordapp.com/icons/1040645618311385158/577f596043d0ea6a4cc91859cebfcf11.webp?size=160' });
	client.channels.cache.get("1263885177797480500").send({ embeds: [em_log_add] }).catch((error) => {console.log("Erreur lors de l'envoie du logs pour l'ajout du bot sur un serveur : " + error)});
	guild.members.fetch(guild.ownerId).then((user) => {
		user.send("<:sip_coca:1263880579028357142> Hey, thanks for adding me to your server !\n🛠️ You can configure me with </config:1263875298995470366>.\n<:chapo:1263872856442540057> Have a great day !")
		.catch((error) => {console.log("Could not send a private message to the user.")})
	});
});

client.once(Events.GuildDelete, guild => {
	con.query(`DELETE FROM server WHERE server_id = '${guild.id}'`, (err, rows) => {
		if (err) return console.log(err);
	});
	const em_log_remove = new EmbedBuilder()
	.setTitle("__Serveur retiré__")
	.addFields(
		{ name: 'Nom du serveur', value: guild.name, inline: true },
		{ name: 'Id du serveur', value: guild.id, inline: true },
		{ name: 'Id du propriétaire', value: guild.ownerId, inline: true },
	)
	.setColor("#FF0000")
	.setTimestamp()
	.setFooter({ text: 'Made by Rayreth with 💖', iconURL: 'https://cdn.discordapp.com/icons/1040645618311385158/577f596043d0ea6a4cc91859cebfcf11.webp?size=160' })
	client.channels.cache.get("1263885177797480500").send({ embeds: [em_log_remove] }).catch((error) => {console.log("Erreur lors de l'envoie du logs pour la suppression du bot sur un serveur : " + error)});
});

client.login(token);