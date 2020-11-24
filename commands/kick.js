module.exports = {
    name: 'kick',
    description: 'Kicks a user from the server',
    guildOnly: true,
    args: true,
    usage: '<user>',
    execute(message, args) {
        if (!message.mentions.users.size) {

            return message.reply('You need to tag a user in order to kick them!');
        }

        const taggedUser = message.mentions.users.first();
        message.channel.send(`You wanted to kick: ${taggedUser.username}??`);
    },
};
