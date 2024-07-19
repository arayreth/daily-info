const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits,InteractionResponse, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');

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
			const quotes = [
			"Sarge, with all due respect, I am gonna completely ignore everything you just said.\n - Brooklyn 99, Jake Peralta",
			"You should make me your campaign manager. I was born for politics. I have great hair and I love lying.\n - Brooklyn 99, Gina Linetti",
			"I’m a detective. I will detect.\n - Brooklyn 99, Terry Jeffords",
			"I’m not totally useless. I can be used as a bad example.\n - Brooklyn 99, Jake Peralta",
			"Every time someone steps up and says who they really are, the world becomes a better, more interesting place.\n - Brooklyn 99, Captain Holt",
			"Aujourd’hui est le premier jour du reste de ta vie.\n - Mentalist, Patrick Jane",
			"Le cœur a ses raisons que la raison ignore. On ne peut pas l’ignorer, il nous fait faire des bêtises.\n - Mentalist, Patrick Jane",
			"C’est soit un menteur professionnel qui dit la vérité ou un homme honnête qui ment.\n - Mentalist, Patrick Jane",
			"Vous croyez que Superman filerait une amende à Batman ?\n - Mentalist, Patrick Jane",
			"N’oubliez pas qu’une horloge cassée donne l’heure exacte deux fois par jour.\n - Mentalist, Patrick Jane",
			"Bend the line, don’t break it.\n - Gibbs",
			"You have bad news and think a riot shield will save you?\n - The Rookie, Angela Lopez",
			"Amy, i told you water is your enemy !\n - Brookyln 99, Jake Peralta",
			"If you get dispatched to a loud party, make sure they know you're not the stripper.\n - The Rookie, Tim Bradford",
			"It wasn't your Day of Death, Officer Chen, it was the first day of the rest of you life.\n - The Rookie, Tim Bradford",
			"You don’t let anyone ever tell you, you can’t do something, not even me.\n - The Rookie, Tim Bradford",
			"When people are having their worst day, I want to be there to make it better.\n - The Rookie, John Nolan",
			"It would be nice to be applauded for something other than almost dying.\n - The Rookie, John Nolan",
			"I briefly succumbed to gravity.\n - The Rookie, Wade Grey",
			"Every day we start fresh because we can’t affect the past. But we damn sure can make a difference today.\n - The Rookie, Wade Grey",
			"Cupcake ate my taser.\n - The Rookie, Lucy Chen",
			"I wonder if copier can copy my thoughts ?\n - The Rookie, Jackson West",
			"Life's a party and I'm the pinata.\n - Brooklyn 99, Boyle Charles",
			"I have decided to stop fighting it and lean in to the fact that I’m an idiot.\n - Brooklyn 99, Jake Peralta",
			"Why is nobody having fun, i specially requested it.\n - Brooklyn 99, Captain Holt",
			"I see you have a knife, but what you need is an umbrella, because there is a f***king storm going to rain down on you, Punk !\n - Brooklyn 99, Captain Holt",
			"You’re not cheddar! You’re just some common bitch.\n - Brooklyn 99, Captain Holt",
			`"Be myself." what kind of garbage advice is that ?\n - Brooklyn 99, Jake Peralta`,
			"The doctor said all my bleeding was internal.That's where the blood's supposed to be.\n - Brooklyn 99, Jake Peralta",
			"The people I work with all think my name is Rosa Diaz.\n - Brooklyn 99, Rosa Diaz",
			"The only thing I’m not good at is modesty, and that’s because I’m great at it !\n - Brooklyn 99, Gina Linetti",
			"I'm gonna make it real simple so that these dum dums can understand. Man did crime.\n - Brooklyn 99, Rosa Diaz",
			"I've just discovered a new drug too, it's called your relationship and I'm high on it.\n - Brooklyn 99, Charles Boyle",
			"Terry's gonna die saving the president or Terry's never gonna die !\n - Brooklyn 99, Terry Jeffords",
			"This was a very confusing interaction !\n - Brooklyn 99, Terry Jeffords",
			"What’s the first thing you notice about a man when he approaches you ? The AUDACITY\n - Brooklyn 99, Gina Linetti",
			"How am I supposed to know there’d be consequences for my actions ?\n - Brooklyn 99, Gina Linetti",
			"I worked at a sunglass kiosk at the mall for four years, so not only have I been through hell, I was assistant manager there.\n - Brooklyn 99, Gina Linetti",
			"Hi Gina Linetti, the human form of the 100 emoji.\n - Brooklyn 99, Gina Linetti",
			"I feel like I'm the Paris of people.\n - Brooklyn 99, Gina Linetti",
			"Psychologists are just people who weren't smart enought to be psychics.\n - Brooklyn 99, Gina Linetti",
			"Not tonight, tonight we drink alone.\n - NCIS LA, Henrietta Lange",
			"I don't need any damn tea !\n - NCIS LA, Henrietta Lange",
			"You know what they say. It's not the size of the gun. It's how you use it.\n - NCIS LA, Sam Hanna", 
			`Kids, your grandma always used to say to me, "Nothing good happens after 2:00 a.m.," and she was right. When 2:00 a.m. rolls around, just go home and go to sleep."\n - HIMYM, Ted Mosby`,
			"And most importantly, whatever you do in this life... it's not legendary unless your friends are there to see it.\n - HIMYM, Barney Stinson",
			"You will be shocked kids, when you discover how easy it is in life to part ways with people forever. That's why, when you find someone you want to keep around, you do something about it.\n - HIMYM, Ted Mosby",
			"Here's the thing about mistakes. Sometimes, even when you know something's a mistake, you gotta make it anyway.\n - HIMYM, Ted Mosby",
			"When I'm sick, I stop being sick and be awesome instead.\n - HIMYM, Barney Stinson",
			"First of all, my parents live in Ohio, I live in the moment.\n - HIMYM, Ted Mosby",
			"We struggle so hard to hold on to these things that we know are gonna disappear eventually. And that’s really noble.\n - HIMYM, Lily Aldrin",
			"That’s life, you know, we never end up where you thought you wanted to be.\n - HIMYM, Marshall Eriksen",
			"We’re going to get older whether we like it or not, so the only question is whether we get on with our lives, or desperately cling to the past.\n - HIMYM, Ted Mosby",
			"There are a lot of little reasons why the big things in our lives happen.\n - HIMYM, Ted Mosby",
			"Look, you can’t design your life like a building. It doesn’t work that way. You just have to live it… and it’ll design itself.\n - HIMYM, Lily Aldrin",
			"I realized that I’m searching, searching for what I really want in life. And you know what? I have absolutely no idea what that is.\n - HIMYM, Barney Stinson",
			"If you’re not scared, you’re not taking a chance. And if you’re not taking a chance, then what the hell are you doing ?\n - HIMYM, Ted Mosby",
			"You can’t cling to the past, because no matter how tightly you hold on, it’s already gone.\n - HIMYM, Ted Mosby",
			"How easy do you think it'd be to sneak into the zoo ? I need to see some penguins, like, right now !\n - HIMYM, Ted Mosby",
			"We should totally buy a bar.\n - HIMYM, Ted Mosby",
			"I don’t know where I’m gonna be in five years. I don’t wanna know. I want my life to be an adventure.\n - HIMYM, Robin Scherbatsky",
			"Why am I constantly looking for reasons not to be happy ?\n - HIMYM, Robin Scherbatsky",
			"In marriage, being right is less important than being supportive. Remember: Happy wife equals happy life.\n - HIMYM, Lily Aldrin",
			"A word of advice: Play along. The more you fight it, the worse it's gonna get. It's like when your car slides on ice. You steer into the skid.\n - HIMYM, Ted Mosby",
			"I really don't like feelings.\n - HIMYM, Robin Scherbatsky",
			"There are two big days in any love story: the day you meet the girl of your dreams and the day you marry her.\n - HIMYM, Ted Mosby",
			"Sometimes things have to fall apart to make way for better things.\n - HIMYM, Ted Mosby",
			"You can ask the universe for signs all you want but ultimately, we'll only see what we want to see…when we're ready to see it.\n - HIMYM, Ted Mosby",
			"Destined ? Aren't you tired of waiting for destiny, Ted ? Isn't it time to make your own destiny ?\n - HIMYM, Robin Scherbatsky",
			"It's one thing to not want something. It's another to be told you can't have it.\n - HIMYM, Robin Scherbatsky",
			"Some couples always support each other, and some couples always challenge each other. But is one really better than the other? Yes. Support is better. Way better.\n - HIMYM, Ted Mosby",
			"You keep giving up on people, you're going to miss out on something great.\n - HIMYM, Robin Scherbatsky",
			"Here's the secret, kids. None of us can vow to be perfect. In the end, all we can do is promise to love each other with everything we've got because love's the best thing we do.\n - HIMYM, Ted Mosby",
			"It's only once you've stopped that you realize how hard it is to start again.\n - HIMYM, Ted Mosby",
			"Love doesn't make sense. I mean, you can't logic your way into or out of it.\n - HIMYM, Ted Mosby",
			"The great moments of your life won't necessarily be the things you do. They'll also be the things that happen to you.\n - HIMYM, Ted Mosby",
			"If you're looking for a word that means caring about someone beyond all rationality and wanting them to have everything they want, no matter how much it destroys you, it's 'love.\n - HIMYM, Ted Mosby",
			"The future is scary, but you can't just run back to the past because it's familiar. Yes it's tempting, but it's a mistake.\n - HIMYM, Robin Scherbatsky",
			"You see, the universe has a plan kids, and that plan is always in motion.\n - HIMYM, Ted Mosby",
			"Never underestimate the power of destiny. Because when you least expect it, the littlest thing can cause a ripple effect that changes your life.\n - HIMYM, Ted Mosby",
			"Because sometimes even if you know how something's gonna end, that doesn't mean you can't enjoy the ride.\n - HIMYM, Ted Mosby",
			"Sometimes our best decisions are the ones that don't make sense at all.\n - HIMYM, Ted Mosby",
			"When you believe in people, they always come through !\n - HIMYM, Ted Mosby",
			"FamiIy's more than just DNA.It's about people who care and take care of each other.\n - NCIS, Gibbs",
			"She does the detecting and i do the insulting.\n - Mentalist, Patrick Jane",
			"f you’re always telling yourself how lucky you are, it’s probably because you’re afraid to ask yourself how happy you are.\n - Modern Family, Dylan",
			"Life is full of change. Some big, some small. I learned a long time ago, you can fight it, or you can try to make the best of it. And that’s all a lot easier if you’ve got people who love you helping you face whatever life throws at you. At least, that’s what helps me sleep at night.\n - Modern Family",
			"Every once in a while don’t be afraid to break the rules. You never know what might happen.\n - Modern Familly, Phi's mom",
			"I don't drive, i'm a New Yorker.\n - Unknow",
			"Tout le monde veut que sa vie change mais personne ne veut changer sa vie.\n - Unknow",
			"Sometmes in life you juste have to go out and buy a pineapple.\n - Franny",
			"Life is a journey, not a destination.\n - Ralph Waldo Emerson",
			"better to try and fail,than to never have tried at all.\n - Unknow",
			"If you don't like where you are, move. You are not a tree.\n - Unknow",
			"Life is like a camera. Focus on what's important, capture the good times, develop from the negatives, and if things don't work out, take another shot.\n - Unknow",
			"Life is like a box of chocolates. You never know what you're gonna get.\n - Forrest Gump",
			"If you do not like what the anwser is going to be, don't ask the question.\n - Unknow",
			"The problem with common sense is that it's not very common.\n - bezerthgeezer",
			"Life is like a bicycle. To keep your balance, you must keep moving.\n - Albert Einstein",
			"You follow me on insta, i follow you IRL.We are not same bro.\n - Duolingo india",
			"Well sandwich does solve all the problems.\n - Anjalilf",
			"Life is not a problem to be solved, but a reality to be experienced.\n - Soren Kierkegaard",
			"Life is a game, play it.\n - Mother Teresa",
			"Cameraman never dies.\n - Unknow",
			"You can't control where you start in the world, but you can change where you end.\n - Unknow",
			"When you hit bedrock, the only way to go is up.\n - Unknow",
			"It doesn't matter how many times you fall, what matters is how many times you get back up.\n - Unknow",
			"It doesn't matter if you have a diamond mansion or a dirt hut, once you place the furnace next to the crafting table, it's your home.\n - Unknow",
			"Pourquoi la guitare est dans l'évier ?\n - Duolingo",
			"Rayreth de ouf.\n - Camille_",
			"Don't le the car behind you drive your car.\n - Unknow",
			"Jl'e connais ce bipbip, il coûte cher.\n - Nicolux",
			"Il faut être mac tyson pour la demmarer cette tondeuse.\n - Nicolux",
			"Ca c'est joué a un cheveux de chauves?\n - Inconnu",
			"J'ai pas envie de me perdre sur une ligne droite.\n - Thomas",
			"Take your responsabilites seriously, but not yourself.\n - Unknow",
			"How you spend your days is how you spend your life.\n - Unknow",
			"A few seconds of akward will save you a lifetime of regret.\n - Unknow",
			"If you're trying to be normal, you will never know how amazing you can be.\n - Maya Angelou",
			"If you're trying to love yourself, you already do.Where do you think trying comes from ?\n - Unknow",
			"Your future self is watching you right now trough the memories your making right now.\n - Unknow",
			"Life is short, smile while you still have teeth.\n - Unknow",
			"One day or day one.\n - Unknow",
			"Build a life you don't need a vacation from.\n - Unknow",
			"You've survived too many storms to be bothered by raindrops.\n - Unknow",
			"Some people arent meant for your whole book they are only a chapter.\n - Unknow",
			"Be the person you needed when you were younger.\n - Unknow",
			"If you are going through hell, keep going.\n - Winston Churchill",
			"Sometimes you win, sometimes you learn.\n - Unknow",
			"Asking for help isn't giving up,it's refusing to give up.\n - Unknow",
			"Never forget what you are. The rest of the world will not. Wear it like armor, and it can never be used to hurt you.\n - Tyrion Lannister",
			"Life is not about waiting for the storm to pass, it's about learning to dance in the rain.\n - Vivian Greene",
			"It's better to be dumb in a room full of smart people than to be smart in a room full of dumb people.\n - Unknow",
			"Your life is a movie and your are the director.\n - Unknow",
			"Just live in today, don't worry about tomorrow.\n - Unknow",
			"Today is a gift, that's why it's called the present.\n - Unknow",
			"Il faut toujours viser la lune, car même en cas d'échec, on atterit dans les étoiles.\n - Matin Luther King",
			"Nous souffrons plus dans notre imagination que dans la réalité.\n - Sénèque",
			"La chute n'est pas un échec. L'échec est de rester là où on est.\n - Socrate",
			"T'as toujours raison. T'est pire que mon ex !\n - MR. Iglesias, Gabriel Iglesias",
			"Word hard and be nice.\n - MR. Iglesias, Gabriel Iglesias",
			"Mon sandwich, mes choix.\n - MR. Iglesias, Tony Ochoa",
			"Life is simple, you makes choices and you don't look back.\n F&F Tokyo Drift, Han lue",
			"Cars can't fly Dom, cars can't fly.\n - F&F7, Biran O'Conner",
			"You a millionaire and you still asking for money ?\n That's how you stay a millionaire.\n - F&F6, Tej & Roman",
			"You better hide your big ass forehead.\n - F&F6, Hobbs",
			"That's pretty dangerous, building a road in the midlle of the street.\n - Kermit, The muppet movie",
			"Yesterday is gone, tomorrow has no yet come, we only have today.\n - Sensei Wu, Lego Ninjago",
			"It's nice to be important, but it's important to be nice.\n - Kermit",
			"be thankful for the bad things in life, they opened your eyes to the good things you weren't paying attention to before. - Kermit",
			"Turn left at the fork in the road !\n - Kermit, The muppet movie",
			"You know it's amazing, you are 100% wrong. I mean nothing you've said has been right.\n - Kermit, The muppet movie",
			"Peoples ares peoples.\n - Kermit, The muppet movie",
			"Even in the darkness, we have a choice to reflect the light.\n - Zane, Lego Ninjago",
			"The best way to defeat an enemy is to make them your friend.\n - Sensei Wu, Lego Ninjago",
			"I was built to protect those who can not protect themselves.\n - Zane, Lego Ninjago",
			"You can't save those who don't want to be saved.\n - Morro, Lego Ninjago",
			"You shouldn't swear, it's a sign of weak verbal skills.\n - Jay, Lego Ninjago",
			"Fear ? fear isn’t a word where I come from.\n - Lil Lloyd, Lego Ninjago",
			"Even lessons learned the hard way are lessons learned.\n - Sensei Wu, Lego Ninjago",
			"Sensei once told me it's not the size of a Ninja in a fight, but the size of the fight in the Ninja.\n - Kai, Lego Ninjago",
			"Don't put onto tomorrow what can be done today.\n - Sensei Wu, Lego Ninjago",
			"Sometimes the only way to move forward is to revisit the things in your past that were holding you back.\n - Sensei Wu, Lego Ninjago",
			"Who you choose to be around you, let's you know who you are.\n - Hans lue, F&F Tokyo Drift",
			"No matter how strong the pain is, it's our duty to move forward. You're wrong for running away from reality.\n - Ryosuke, initial D",
			"I'm going to try hard to be the person you showed me I can be, and I'm never going to give up.\n - Natsuki, initial D",
			"IF you can dream it, you can do it.\n - Enzo Ferrari",
			"Go full geek. Who gives a fuck.\n - Shuichi Shigeno, Initial D",
			"L'argent ne fais pas le bonheur mais pleurer dans une ferrari est plus confortable que sur un vélo.\n - Inconnu",
			"Il est con comme une valise sans poignées.\n - Inconnu"
			];
			const Response = Math.floor(Math.random() * quotes.length);
			await interaction.reply({content: `>  ${quotes[Response]}`, components: [row]})
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
	}		
});

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
	readyClient.user.setActivity("at making your day better !")
});

client.once(Events.GuildCreate, guild => {
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