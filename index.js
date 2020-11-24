/* *********************** FILE IMPORTS *************************** */
/* File Imports - Importing the code libraries we need for development
*    - Discord.js - Required to create any kind of Discord Bot
*    - Chalk - Node package for colored logging in terminals
*  NOTE - Comments are referring to the code BELOW them always.     */
const fs = require('fs');
const Discord = require('discord.js');
const chalk = require('chalk');
// The curly braces below are destructuring, basically saying go find these variables in the file listed (prefix, token).  You can see them in your config.json file for reference
const { prefix, token } = require('./config.json');
/* ******************** END OF FILE IMPORTS ************************ */


/* **************** INITIALIZATION AND VARIABLES ******************* */
// Just setting some easier aliases for our terminal logging colors
const greenBright = chalk.greenBright;
const redBright = chalk.redBright;
const whiteBright = chalk.whiteBright;
const inverse = chalk.inverse;
// Initialize Discord Client (Our bot)
const client = new Discord.Client();
// Collections are lists or JavaScript Map's with extended functionality
// You will have to research Maps, then Collections to get solid understanding.
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    console.log(inverse(`Loading ${file}...`));
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}
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

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command === 'beep') {
        client.commands.get('beep').execute(message, args);
    } else if (command === 'args-info') {
        client.commands.get('args-info').execute(message, args, command);
    } else if (command === 'avatar') {
        client.commands.get('avatar').execute(message, args);
    } else if (command === 'kick') {
        client.commands.get('kick').execute(message, args);
    } else if (command === 'prune') {
        client.commands.get('prune').execute(message, args);
    } else if (command === 'server') {
        client.commands.get('server').execute(message, args);
    } else if (command === 'user-info') {
        client.commands.get('user-info').execute(message, args);
    }

});
/* ********* END OF MESSAGE LISTENERS AND ACTIONS ******************* */

// login to Discord with your app's token
client.login(token);
