/* *********************** FILE IMPORTS *************************** */
/* File Imports - Importing the code libraries we need for development
*    - Discord.js - Required to create any kind of Discord Bot
*    - Chalk - Node package for colored logging in terminals
*  NOTE - Comments are referring to the code BELOW them always.     */
const Discord = require('discord.js');
const chalk = require('chalk');
// The curly braces below are destructuring, basically saying go find these variables in the file listed (prefix, token).  You can see them in your config.json file for reference
const { prefix, token } = require('./config.json');
/* ******************** END OF FILE IMPORTS ************************ */


/* **************** INITIALIZATION AND VARIABLES ******************* */
// Initialize Discord Client (Our bot)
const client = new Discord.Client();
// Just setting some easier aliases for our terminal logging colors
const greenBright = chalk.greenBright;
const redBright = chalk.redBright;
const whiteBright = chalk.whiteBright;
/* **************** END OF INITIALIZATION AND VARIABLES ************ */


/* *************** MESSAGE LISTENERS AND ACTIONS ******************* */
// When the client is ready, run this code
// This event will only trigger one time after logging in
client.once('ready', () => {
    // A console log prints something into the terminal
    console.log(`${redBright('Lord Frieza')} ${greenBright('walks into the room...')}`);
});


// Creates a 'listener' for the client too respond to incoming messages
// This will happen every time a message comes in. (Hence the client.on)
client.on('message', message => {

    // Check if message has a command prefix or not..
    // ! means NOT (i.e. !true = false, !false = true)
    if (!message.content.startsWith(prefix)) {
        // Check if the author of the message is a bot...
        if (message.author.bot) return;
        // If not a bot, log the chat to the terminal...
        console.log(`${redBright(message.author.username)}: ${whiteBright(message.content)}`);
    }

    // .slice returns a certain slice of a string.  By doing prefix.length, we are cutting out the prefix from the message.  .trim is trimming the extra whitespace, and .split(/ +/) is splitting the words into a list by spaces
    // NOTE: The / +/ is considered regular expression(REGEX) testing.  This looks for one OR MORE spaces (Note the +). the forward slashes are the start/end of the test
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    // .shift takes the first item out of the list (command following prefix), toLowerCase makes the command lowercase, and store in variable 'command'
    const command = args.shift().toLowerCase();

    // Check if message content is EXACTLY !ping.
    // ${prefix} - String interpolation - Insert a variable/expression into a string
    if (command === `ping`) {

        // Send message to channel message was received on
        message.channel.send('Pong');

        // If we want to make the command more flexibile, we can check if the message startsWith the command, so you can add arguments or words after
    } else if (command === `beep`) {
        message.channel.send('*Scoffs* Eat worms, infidel...');

        // Servers are referred to as "guilds" in the Discord API and discord.js library. Whenever you see someone say "guild", they mean server. \n = newline
    } else if (command === `server`) {
        message.channel.send(`**Server ID**: ${message.guild.id}\n**Server Name:** ${message.guild.name}\n**Server Members:** ${message.guild.memberCount}\n**Created:** ${message.guild.createdAt}\n**Region:** ${message.guild.region}`);

        // Return User information to user
    } else if (command === `user-info`) {
        message.channel.send(`**Your Username:** ${message.author.username}\n**Your ID:** ${message.author.id}`);

        // Testing our argument passing ability
    } else if (command === `args-info`) {
        // 0 = false.  So if there are no arguments, this will be 0, which becomes false, which the ! flips to true.  Reads like: If not args.length (if not false)
        if (!args.length) {
            return message.channel.send(`Idiot... You need to pass me arguments, ${message.author.username} `);
        }
        // Now that we have a list, we can interact with each argument starting at the first, which in an array list, is index 0: args[0]
        if (args[0].toLowerCase() === 'goku') {
            return message.channel.send(`Your first argument is...*reads Goku*... Oh, piss off!`);
        }
        // Send arguments and command back to user...
        message.channel.send(`Command name: ${command}\nArguments: ${args}`);

        // The kick command below is not implemented, just testing mentions
    } else if (command === 'kick') {
        // Make sure there is at least one User mentioned. Follows same rules at .length
        if (!message.mentions.users.size) {
            // You'll notice message.reply tags the user who sent the command before the message you send back...
            return message.reply('You need to tag a user in order to kick them!');
        }

        // Grab the 'first' mentioned user from the message
        // This will return a `User` object, just like message.author
        const taggedUser = message.mentions.users.first();
        message.channel.send(`You wanted to kick: ${taggedUser.username}??`);

    } else if (command === 'avatar') {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL({ format: "png", dynamic: true })}`);
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: ${user.displayAvatarURL({ format: "png", dynamic: true })}`;
        });

        // send the entire array of strings as a message
        // by default, discord.js will `.join()` the array with `\n`
        message.channel.send(avatarList);

        // Prune - Delete # messages
    } else if (command === 'prune') {
        // parseInt will turn a string number into an actual usable integer from first arg
        const amount = parseInt(args[0]) + 1;
        // isNaN - is Not a Number - returns true if the expression is not a number
        if (isNaN(amount)) {
            return message.reply(`idiot... You need to actually give me a number of messages to prune!`);

            // Must delete between 2 - 100 messages at a time
        } else if (amount <= 1 || amount > 100) {
            return message.reply(`idiot... I can't delete that amount of messages in one action! I can do between 1 and 99 messages`);
        }
        // Delete the messages - the 2nd argument, true, allows you to avoid an error when trying delete messages over two weeks of age.  However, if all the messages are over two weeks old, you'll get an error.  We can 'catch' and log the error to avoid it crashing the Bot.
        message.channel.bulkDelete(amount, true).catch(error => {
            console.error(error);
            message.channel.send('There was an error trying to prune messages in this channel!');
        });
    }
});
/* ********* END OF MESSAGE LISTENERS AND ACTIONS ******************* */

// login to Discord with your app's token
client.login(token);
