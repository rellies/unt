const Discord = require('discord.js');
const { token, reactionEmoji } = require('./config.json');

const client = new Discord.Client();

client.on('ready', () => {
    client.guilds.get('guild_id').channels.get('channel_id').fetchMessage('message_id');
});

client.on('messageReactionAdd', (reaction, user) => {
    let message = reaction.message, emoji = reaction.emoji;

    if (emoji.name == reactionEmoji) {
           //todo add
    }

});

console.log('Reactions client logging in...');
client.login(token);
console.log('Reactions client logged in.');

client.once('ready', () => {
	console.log('Reactions client successfully launched.');
});