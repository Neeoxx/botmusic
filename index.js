const { CommandoClient } = require('discord.js-commando');
const path = require("path");

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

client.on("ready", () => {
    client.user.setStatus("online");
    client.user.setActivity("Les amoureux", { type: "LISTENING" });
  });

  client.on("message", message => {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;
})

client.login(process.env.TOKEN);