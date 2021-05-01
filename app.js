//reqs
const fs = require('fs');
const conf = require('./config.json');
const Discord = require('discord.js');

//init
const client = new Discord.Client();
client.commands = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === `!ping`) {
        message.channel.send('Pong!');
    } else if (message.content === `!ainfo`) {
        message.channel.send(`Server name:  ${message.guild.name}`);
    }
});

client.login(conf.token);