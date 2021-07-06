const { Command, CommandoMessage } = require('discord.js-commando');

module.exports = class JoinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'music',
            memberName: 'join',
            description: 'Ajoute le bot sur votre canal vocal',
        });
    }
    /**
     * 
     * @param {CommandoMessage} message 
     * @param {string} param1 
     */
    async run(message) {
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) {
        return message.say(':x: tu dois être dans un salon vocal pour use cette commande. ');
        }

        await voiceChannel.join();

        return message.say(" :thumbsup: j'ai rejoins" + "`" + voiceChannel.name  + "`" )

    }
   
}