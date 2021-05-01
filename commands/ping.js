module.exports = {
	name: 'ping',
	description: 'Checks... ping.',
	execute(message, args) {
		message.channel.send('Pong!');
	},
};