const { CommandoClient } = require('discord.js-commando');
const path = require("path");
require('dotenv').config();

const client = new CommandoClient({
    commandPrefix: 'b!',
    owner: '340145684453785602',
    invite:'https://discord.gg/R3dGtc6sDw',

});

client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerGroup('music' , 'Music')
    .registerCommandsIn(path.join(__dirname, "commands"));

client.server = {
    queue: [],
    currentVideo: {title:"Rien pour le moment.", url:"" },
    dispatcher: null,
    connection: null
    
};

client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag} - (${client.user.id})`);
});

client.on('error', (error) => console.error(error));

client.login(process.env.BOTTOKEN);