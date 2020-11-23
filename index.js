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

    // Check if message content is EXACTLY !ping.
    // ${prefix} - String interpolation - Insert a variable/expression into a string
    if (message.content === `${prefix}ping`) {

        // Send message to channel message was received on
        message.channel.send('Pong');

        // If we want to make the command more flexibile, we can check if the message startsWith the command, so you can add arguments or words after
    } else if (message.content.startsWith(`${prefix}beep`)) {
        message.channel.send('*Scoffs* Eat worms, infidel...');

        // Servers are referred to as "guilds" in the Discord API and discord.js library. Whenever you see someone say "guild", they mean server. \n = newline
    } else if (message.content === `${prefix}server`) {
        message.channel.send(`**Server ID**: ${message.guild.id}\n**Server Name:** ${message.guild.name}\n**Server Members:** ${message.guild.memberCount}\n**Created:** ${message.guild.createdAt}\n**Region:** ${message.guild.region}`);
    } else if (message.content === `${prefix}user-info`) {
        message.channel.send(`**Your Username:** ${message.author.username}\n**Your ID:** ${message.author.id}`);
    }
});
/* ********* END OF MESSAGE LISTENERS AND ACTIONS ******************* */

// login to Discord with your app's token
client.login(token);
