const { SlashCommandBuilder, InteractionResponse, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder} = require('discord.js');
const axios = require('axios')
const { apiKey } = require('../../config.json')
const config = require('../../config.json');
const con = require('../../database.js');
const words = require("../../word.json");

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
			.setEmoji("🔀")
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder()
			.addComponents(reload);	

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
			"Standing in the hall of fame ,and the world's gonna know your name\n- The script",
			"Maman m'a dit la vie n'est pas facile, mais plus facile avec un grand sourire\n- Soprano",
			"J'ai fait mon choix et je t'emmerde, désormais qui m'aime me suive.Désormais qui m'aime me traîne, beaucoup plus haut que je ne vise\n- Diams",
			"J'ai rien d'exceptionnel, j'ai des tas de potes à l'habitude.Mais mon meilleur ami s'appelle solitude\n- Sniper",
			"Bienvenue dans ma chambre j'y glande, voyage sur commande.Je fais le tour du globe à l'aide de ma télécommande\n- Sniper",
			"How can we not talk about family when family's all that we got ?\n -Wiz khalifa",
			"It's been a long day without you, my friend And I'll tell you all about it when I see you again.\n - Wiz Khalifa",
			"It's a new soundtrack, I could dance to this beat the lights are so bright, but they never blind me.\n - Taylor Swift",
			"And you're singing the songs thinking this is the life.\n - Amy Macdonald",
			"Now my life is sweet like cinnamon like a fucking dream I'm living in.\n - Lana Del Rey",
			"Kiss me hard before you go summertime sadness i just wanted you to know that baby, you the best.\n - Lana Del Rey",
			"And we gonna let it burn, burn, burn, burn.\n - Ellie Goulding",
			"Don't make me sad, don't make me cry, sometimes love is not enough.\n - Lana Del Rey",
			"So love me like you do, la,la,love me like you do.\n - Ellie Goulding",
			"Not enven they can stop me now.\n - Lana Del Rey",
			"Now my life is sweet like cinnamon, like a fuking dream i'm living in.\n - Lana Del Rey",
			"No one even knows what life was like, now i'm in LA and it's paradise.\n - Lana Del Rey",
			"Want you to make me feel like i'm the only girl in the world.\n - Rihanna",
			"J'ai voulu dormir et j'ai fermé les yeux sans même voir que le ciel était bleu.\n - Tal",
			"J'ai trouvé le sens de la raison qui m'entraine, à chaque pas sur le devant de la scène.\n - Tal",
			"Savoir à quoi ressemble la Louisiane et traveser l'amérique en décapotable.\n - Tal",
			"Mais toi tu m'emmènes je ne sais où, tu me dis je t'aime un peu partout, tu sais faire voyager mon coeur à l'international.\n - Tal",
			"Quand tu chantes, j'oublie, j'ai le plus le moindre souci - K'maro",
			"Everytime we touch, I get this feeling, and everytime we kiss, I swear I could fly.\n - Cascada",
			"Everybody here was someone else before, and you can want who you want.\n - Taylor Swift",
			"Lui seul peut décider, qu'on se parle d'amour ou d'amitié.\n - Céline Dion",
			"J'fais un voeu, le voeu d'un duel au soleil.\n - Etienne Daho",
			"I'm coming home, tell the world i'm coming home.\n - Skylar Grey",
			"Ask for money and get avice, ask for advice, get money twice.\n - Pitbull",
			"One day you'll leave this world behind, so live a life you will remember.\n - Avicii",
			"We are the champions, my friends.\n - Queen",
			"One day when my light is glowing, I'll be in my castle golden.\n - Christina Aguilera",
			"If this night is not forever, at least we are together.\n - Alan Walker",
			"I'm at a payphone trying to call home, all of my change I spent on you.\n - Maroon 5",
			"Baby, you light up my world like nobody else.\n - One Direction",
			"Vamos a la playa, a mi me gusta bailar, el ritmo de la noche, sounds of fiesta.\n - Loona",
			"And you`re singing the songs thinking this is the life.\n - Amy Macdonald",
			"I miss you a little all the time, i say that i hate you but you're still on my mind.\ - Bryce Vine",
			"Shine bright like a diamond.\n - Rihanna",
			"Find light in the beautiful sea, I choose to be happy.\n - Rihanna",
			"Et c'est partie pour le show, et c'est partie le stade est chaud.\n - Nâdiya",
			"Juste une mise au point sur les plus belles images de ma vie.\n - Jackie Quartz",
			"Subeme la radio que esta es mi canción.\n - Enrique Iglesias",
			"Une ballade à deux, rien que toi et moi tu sais ?\n - Tunisiano",
			"This is the part of me that you're never gonna ever take away from me.\n - Katy Perry",
			"Little do you know, how I'm breaking while you fall asleep.\n - Alex & Sierra",
			"In new york, concrete jungle where dreams are made of.\n - Alicia Keys",
			"She used to meet me on the east side, in the city where the sun don't set.\n - Benny Blanco",
			"Seventeen and we got a dream to have a family, a house and everything in betwen.And then suddendly we turn twenty three and now we got pressure for taking our life more seriously.\n - Benny Blanco",
			"We can do anything if we put our minds to it, take your whole life then you put a line through it.\n - Benny Blanco",
			"My life be like ooh ahh.\n - Grits",
			"Raise a cup for all my day ones, two middle fingers for the haters.\n - Khelani",
			"Yeah and it's a feeling that I can't explain, how you make it and your team still say the same.\n - Khelani",
			"Shauwty's like a melody in my head that I can't keep out, got me singing like na na na na everyday.\n - Iyaz",
			"Shrunk all my clothes in the washing machine, running on two or three hours of sleep.\n - Jenna Raine",
			"Hey, lemons make lemonde, flowers bloom in the rain.\n - Jenna Raine",
			"Well, you only need the light when it's burning low, only miss the sun when it starts to snow.\n - Passenger",
			"Only know you love her when you let her go.\n - Passenger",
			"Only know you've been high when you're feeling low.\n - Passenger",
			"Only hate the road when you're missing home.\n - Passenger",
			"Staring at the bottom of your glass, hoping one day you'll make a dream last.\n - Passenger",
			"Staring at the ceiling in the dark, same old empty feeling in your heart.\n - Passenger",
			"J`me réveille allongé sur le sol, évidemment hier j'ai raté ma vie.\n - RORI",
			"J`réfléchis trop mais j`passe pas à l'action, au lieu de m`occuper de moi je repense à tous ces cons.\n - RORI",
			"She just wants to be beautiful, she goes unnoticed, she knows no limits, she craves attention, she praises an image, she prays to be sculpted by the sculptor.\n - Allessia Cara",
			"But there's a hope that's waiting for you in the dark, you should know you're beautiful just the way you are.\n - Allessia Cara",
			"Sound like everybody's got a price, I wonder how they sleep at night.\n - Jessie J",
			"It's not about the money, money, money, we don't need your money, money, money.\n - Jessie J",
			"We need to take it back in time, when music made us all unite.\n - Jessie J",
			"Why is everybody so upset ? Money can't buy us happiness.\n - Jessie J",
			"Can you feel that game ? Were paying with love tonight.\n - Jessie J",
			"I feel you so close to me, i hope you still think of me event i know you found another love.\n - Leslie Parrish",
			"Remember me, remember everything we used to be.\n - Leslie Parrish",
			"Je veux être riche de ton sourire, de ta volonté à reconstruire.\n - Soprano",
			"Je veux être riche de ton rire, de ton envie de tout découvrir.\n - Soprano",
			"But if you close your eyes, does it almost feel like nothing changed at all ?\n - Bastille",
			"I heard he live down a river somewhere, with six cars and a grizzly bear.\n - Declan McKenna",
			"Life is a highway, I wanna ride it all night long.\n - Rascal Flatts",
			"You have my heart, and we'll never be worlds apart.\n - Rhianna",
			"When the sun shines, we'll shine together.\n - Rhianna",
			"We gonna ri-ri-ri-ri-rise `til we fall.\n - Jonas Blue",
			"Fire and ice, this love is like fire and ice.\n - Ellie Goulding",
			"Still falling for you, beautiful mind, your heart got a story with mine.\n - Ellie Goulding",
			"Staring at the blank page before you, open up the dirty window.\n - Natasha Bedingfield",
			"Feel the rain on your skin, no one else can feel it for you.\n - Natasha Bedingfield",
			"I've been reading books of old, the legens and the myths.Achilles and his gold, Hercules and his gifts.\n - The Chainsmokers",
			"I'm free to be the greatest, I'm alive.\n - Sia",
			"Don't give up, I won't give up.\n - sia",
			"C'est un endroit qui resemble à la Louisiane, à l'Italie. Il y'as du ling étendu sur la terrasse et c'est joli.\n - Nino Ferrer",
			"Had to have high, high hopes for a living, shooting for the stars when I couldn't make a killing.\n - Panic ! At the disco",
			"Didn't know how but I always had a feeling, I was gonna be that one in a million.\n - Panic ! At the disco",
			"Mama said, fulfill the prophecy, be something greater, go make a legacy.\n - Panic ! At the disco",
			"Mama said 'Don't give up, it's a little complicated, all tied up, no more love and I'd hate to see you waiting'.\n - Panic ! At the disco",
			"You take my self, you take my self control.\n - Laura Branigan",
			"Cause i'm on top of the world, hey, i'm on top of the world.\n - Imagine Dragons",
			"You don't wanna dance with me, but babe that's what i need.\n - Sia",
			"I'm gonna swing from the chandelier, from the chandelier, i'm gonna live like tomorrow doesn't exist.\n - Sia",
			"Faut une défaite pour savourer la victoire.\n - Team BS",
			"C'est ma direction, j'ai pété les plombs sans abandonner ni même baisser les bras.\n - Sexion d'assaut",
			"Quand les promesses et les sourires sonnent faux, je n'oublie pas d'où je viens.\n - Team BS",
			"Che confusione, sarà perché ti amo.\n - Ricchi e Poveri",
			"How do you do ? You like me and i like you.\n -Boom",
			"Feet don't fail me now, take me to the finish line.\n - Lana Del Rey",
			"Je suis sortie de ma bulle, j'ai pris le temps de regarder le monde et d'observer la lune.\n - Diams",
			"La vie n'est qu'une course et moi j'étais première dans les starters.\n - Diams",
			"Bah ouais mec, faut être honnête, mes troubles m'ont rendue poète, au point qu'on mette à ma dispo de quoi me doucher au moët.\n - Diams",
			"Désormais qui m'aime me traîne beaucoup plus haut que je ne vise.\n - Diams",
			"J'ai fait mon choix et je t'emmerde, désormais qui m'aime me suive.\n - Diams",
			"Moi j'ai pas le culture d'AKH, ni la plume de oxmo, ni la culture du double H.\n - Soprano",
			"Et puisque rien ne nous attends à part le cimetière, j'écris chacune des mes rimes comme la dernière.\n - Kery James",
			"Qu'il se rassurent, je n'ai pas fini de me battre, je n'étais pas de rappeur mais un révolté qui fait du rap.\n - Kery James",
			"Le faible à cette facilité à critiquer ce que le fort fait.\n - Kery James",
			"Echouer ou réussir, mais au moins tenter sa chance. Moi je dis que plus le combat est grand, plus la victoire est immense.\n - Kery James",
			"Je suis pas mieux qu'un autre, j'ai pas marché sur la lune.\n - Sniper",
			"Un jour notre blaze s'ra gravé dans le roche. On lâche pas on s'accroche, du but on s'rapproche.\n - Sniper",
		];
		const Response1 = Math.floor(Math.random() * lyrics.length);
		
		con.query(`SELECT * FROM server WHERE server_id = '${interaction.guild.id}'`, async (err, rows) => {
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
					await interaction.reply(`<:chapo:1263872856442540057> Welcome **${interaction.user.username}** !`);
					await interaction.channel.send("‎ \n");
					await interaction.channel.send("⌚ We are the <t:" + toTimestamp(new Date()) + ":D>, it's <t:" + toTimestamp(new Date()) + ":t> ! ");
					await interaction.channel.send("‎ \n");
					await interaction.channel.send("__Quote of the day__");
					await interaction.channel.send("‎ \n");
					await interaction.channel.send({content: `>  ${selectedquotes} \n ${author}`, components: [row]});
					await interaction.channel.send("‎ \n");
					await interaction.channel.send("__Lyrics of the day__");
					await interaction.channel.send("‎ \n");
					await interaction.channel.send({content: `> 🎶 ${lyrics[Response1]}`, components: [row1]})
					await interaction.channel.send("‎ \n");
					await interaction.channel.send("__Word of the day__");
					await interaction.channel.send("‎ \n");
					const englishWords = words.filter(wordObj => wordObj.language === "en");
					const randomWord = englishWords[Math.floor(Math.random() * englishWords.length)];
					await interaction.channel.send({content: `> **${randomWord.word}** :\n> ${randomWord.description}`})
					await interaction.channel.send("‎ \n");
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
					await interaction.reply(`<:chapo:1263872856442540057> Bienvenue **${interaction.user.username}** !`);
					await interaction.channel.send("‎ \n");
					await interaction.channel.send("⌚ Nous sommes le <t:" + toTimestamp(new Date()) + ":D>, il est <t:" + toTimestamp(new Date()) + ":t> ! ");
					await interaction.channel.send("‎ \n");
					await interaction.channel.send("__La citation du jour__");
					await interaction.channel.send("‎ \n");
					await interaction.channel.send({content: `>  ${selectedquotes} \n ${author}`, components: [row]});
					await interaction.channel.send("‎ \n");
					await interaction.channel.send("__Les paroles du jour__");
					await interaction.channel.send("‎ \n");
					await interaction.channel.send({content: `> 🎶 ${lyrics[Response1]}`, components: [row1]})
					await interaction.channel.send("‎ \n");
					await interaction.channel.send("__Le mot du jour__");
					await interaction.channel.send("‎ \n");
					const frenchWords = words.filter(wordObj => wordObj.language === "fr");
					const randomWord = frenchWords[Math.floor(Math.random() * frenchWords.length)];
					await interaction.channel.send({content: `> **${randomWord.word}** :\n> ${randomWord.description}`})
					await interaction.channel.send("‎ \n");
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