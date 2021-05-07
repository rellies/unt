/* Prerequisites **
** Imports, variables, declarations */
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

//organize commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

/* Message client block **
** Handles commands, etc */   
//init discord
const messageClient = new Discord.Client();
const reactionClient = new Discord.Client();
messageClient.commands = new Discord.Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	messageClient.commands.set(command.name, command);
}

messageClient.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!messageClient.commands.has(commandName)) return; 
        const command = messageClient.commands.get(commandName);
        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;
            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }
            
            return message.channel.send(reply)
        }
        try {
	        command.execute(message, args);
        } catch (error) {
	        console.error(error);
	        message.reply('Command could not be executed!');
}
});

/* Reaction block **
** Handles reactions */
const { emoji } = require('./config.json');

const filter = (reaction, user) => {
	return reaction.emoji.name === emoji && user.id === message.author.id;
};

//todo test this
reactionClient.on('message', async (message) => {
    message.awaitReactions(filter, { max: 4, time: 60000, errors: ['time'] })
	.then(collected => console.log(collected.size))
	.catch(collected => {
		console.log(console.error);
	});

});

/* Verification */
console.log('Logging in...');
messageClient.login(token);
console.log('Successfully logged in.');

messageClient.once('ready', () => {
	console.log('Messages client successfully launched.');
});

/* this is probably fucking useless
reactionClient.once('ready', () => {
	console.log('Reactions client successfully launched.');
}); */

// Verify Reactions

console.log('Successfully launched.');