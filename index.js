const { CommandoClient } = require('discord.js-commando');
const path = require("path");

const client = new CommandoClient({
    commandPrefix: 'b/',
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
    currentVideo: {title:"", url:"" },
    dispatcher: null
    
};

client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag} - (${client.user.id})`);
    client.user.setStatus("online");
    client.user.setActivity("votre conversation", { type: "LISTENING" });
});

client.on('error', (error) => console.error(error));

client.login(process.env.TOKEN);