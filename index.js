/* File Imports - Importing the code libraries we need for development
*    - Discord.js - Required to create any kind of Discord Bot
*    - Chalk - Node package for colored logging in terminals
*    - ./config (token) - This is our bot's token
*/
const Discord = require('discord.js');
const chalk = require('chalk');
const { token } = require('./config');

// Initialize Discord Client (Our bot)
const client = new Discord.Client();
// Just setting some easier aliases for our terminal logging colors
const greenBright = chalk.greenBright;
const redBright = chalk.redBright;

// When the client is ready, run this code
// This event will only trigger one time after logging in
client.once('ready', () => {
    // A console log prints something into the terminal
    console.log(`${redBright('Lord Frieza')} ${greenBright('walks into the room...')}`);
});


// Creates a 'listener' for the client too respond to incoming messages
// This will happen every time a message comes in. (Hence the client.on)
client.on('message', message => {
    console.log(message.content);
});


// login to Discord with your app's token
client.login(token);
