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
const client = new Discord.Client();
client.commands = new Discord.Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return; 
        const command = client.commands.get(commandName);
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

/* Verification */
console.log('Commands client logging in...');
client.login(token);
console.log('Commands client logged in.');

client.once('ready', () => {
	console.log('Commands client successfully launched.');
});

console.log('Commands client successfully launched.');