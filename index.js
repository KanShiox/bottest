const Discord = require("discord.js");
const Client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");



Client.on("ready", () => {
	console.log("--------------------------------------");
	console.log('[!]Connexion en cours... \n[!]Veuillez Patienté! \n[!]Les évenement sont après ! :  \n[!]Les préfix actuelle:  ' + config.prefix);
});


Client.on('message', (message) => {

		const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();

		if(message.author.bot) return;

		else if (!message.content.startsWith(config.prefix)) return;

	  else if(command === "bonjour"){
				message.channel.send("Bonjour" + message.author.toString() + "!");
 		}

		else if(command === "prefix") {
				if(message.author.id !== config.ownerID) return;

				let newPrefix = args[0];
  			config.prefix = newPrefix;
  			fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
		}

		else if(command === "kick"){
				if(message.author.id !== config.ownerID) return;

				let member = message.mentions.members.first();
				member.kick();
		}

		else if(command === "say"){
			if(message.author.id !== config.ownerID) return;

			let text = args.join(" ");
			message.delete();
			message.channel.send({embed: {color: 3447003,description: text}});
		}

		else if(command === "ban"){
			if(message.author.id !== config.ownerID) return;

			let member = message.mentions.members.first();
    	if(!member)
      		return message.reply("Veuillez mentionner un joueur valide.");
    	if(!member.bannable)
      		return message.reply("Je ne peux pas le bannir ! Il doit avoir un rôle plus élevé que le mien !");
			member.ban()
			message.reply(`${member.user.tag} a été banni par ${message.author.tag} ! Il fallait écouter le Tyran !`);
		}

		else if(command === "purge"){
			async function purge() {
					message.delete();
					if (isNaN(args[0])) {
							message.channel.send("Merci d'utiliser un nombre en argument. \nUsage: " + config.prefix + 'purge <nombre>');
							return;
					}
					const fetched = await message.channel.fetchMessages({limit: args[0]});
					console.log(fetched.size + ' messages found, deleting...');
					message.channel.bulkDelete(fetched)
							.catch(error => message.channel.send(`Error: ${error}`));

			}
			purge();
		}

		else if(command === "fortnite"){
			let role = message.guild.roles.find("name", "Fortnite");
			if(!message.member.roles.has(role.id)){
				message.member.addRole(role);
			}else{
				message.channel.send('Tu as déjà le rôle Fortnite !');
			}
		}

		else if(command === "fortniteremove"){
			let role = message.guild.roles.find("name", "Fortnite");
			if(message.member.roles.has(role.id)){
				message.member.removeRole(role);
			}else{
				message.channel.send("Tu n'as pas le rôle Fortnite !");
			}
		}

});

Client.on("guildMemberAdd", (member) => {
  	member.message.channel.send('Bienvenue sur le Refuge' + member.id + '!');
});

Client.login(config.token)
