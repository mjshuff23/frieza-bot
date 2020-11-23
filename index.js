const Discord = require('discord.js');
const chalk = require('chalk');
const { token } = require('./config');

const client = new Discord.Client();
const greenBright = chalk.greenBright;
const redBright = chalk.redBright;


client.once('ready', () => {
    console.log(`${redBright('Lord Frieza')} ${greenBright('walks into the room...')}`);
});

client.login(token);
