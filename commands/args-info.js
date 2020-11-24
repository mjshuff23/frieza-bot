module.exports = {
    name: 'args-info',
    description: 'Returns arguments passed back to user',
    execute(message, args, command) {
        if (!args.length) {
            return message.channel.send(`Idiot... You need to pass me arguments, ${message.author.username} `);
        }

        if (args[0].toLowerCase() === 'goku') {
            return message.channel.send(`Your first argument is...*reads Goku*... Oh, piss off!`);
        }

        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    },
};
