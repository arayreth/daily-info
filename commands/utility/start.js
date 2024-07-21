const { SlashCommandBuilder, InteractionResponse, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder} = require('discord.js');
const axios = require('axios')
const { apiKey } = require('../../config.json')
const { createConnection } = require('mysql');
const config = require('../../config.json');

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
		 //temporary solution to get the language of the server from the database
        //but if it work, it work
        let con = createConnection(config.mysql);

        con.connect(err => {
        if (err) return console.log(err);
        });
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
		const Response = Math.floor(Math.random() * quotes.length);
		const Response1 = Math.floor(Math.random() * lyrics.length);
		
		await interaction.reply(`<:chapo:1263872856442540057> Bienvenue **${interaction.user.username}** !`);
		await interaction.channel.send("‎ \n");
		await interaction.channel.send("⌚ Nous somme le <t:" + toTimestamp(new Date()) + ":D>, il est <t:" + toTimestamp(new Date()) + ":t> ! ");
		await interaction.channel.send("‎ \n");
		await interaction.channel.send("__La citation du jour__");
		await interaction.channel.send("‎ \n");
		await interaction.channel.send({content: `>  ${quotes[Response]}`, components: [row]})
		await interaction.channel.send("‎ \n");
		await interaction.channel.send("__Les paroles du jour__");
		await interaction.channel.send("‎ \n");
		await interaction.channel.send({content: `> 🎶 ${lyrics[Response1]}`, components: [row1]})
		await interaction.channel.send("‎ \n");

		con.query(`SELECT * FROM server WHERE server_id = '${interaction.guild.id}'`, async (err, rows) => {
			const city = rows[0].city;
			await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
			.then(response => {
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
				.setTitle('__Météo du jour__')
				.setDescription(`The weather at ${city} is ${cloudness} !`)
				.addFields(
					{ name: 'Température actuelle', value: `${Math.round(currentTemp)} °C`, inline: true },
					{ name: 'Température maximale', value: `${Math.round(maxTemp)} °C`, inline: true },
					{ name: 'Température minimale', value: `${Math.round(minTemp)} °C`, inline: true },
					{ name: `Taux d'humidité`, value: `${humidity} %`, inline: true },
					{ name: `Vitesse du vent`, value: `${Math.round(wind)} m/s`, inline: true },
					{ name: `Pression atmosphérique`, value: `${Math.round(pressure)} hPa`, inline: true },
				)
				.setTimestamp()
				.setFooter({ text: 'Made by Rayreth with 💖', iconURL: 'https://cdn.discordapp.com/icons/1040645618311385158/577f596043d0ea6a4cc91859cebfcf11.webp?size=160' });
				interaction.channel.send({ embeds: [weather_embed] })
				interaction.channel.send("‎ \n");
			    interaction.channel.send("Bonne journée :saluting_face: !")
			})
		})	
	},
};