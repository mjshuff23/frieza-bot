module.exports = {
    name: 'user-info',
    description: 'Returns relevant user information',
    execute(message, args) {
        message.channel.send(`**Your Username:** ${message.author.username}\n**Your ID:** ${message.author.id}`);
    },
};
