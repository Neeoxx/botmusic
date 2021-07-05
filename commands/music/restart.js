const { Command, CommandoMessage } = require('discord.js-commando');
const {StreamDispatcher} = require('discord.js');

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'restart',
            group: 'music',
            memberName: 'restart',
            description: 'remet ta musique au début',
        });
    }
    /**
     * 
     * @param {CommandoMessage} message 
     * @param {string} param1 
     */
    async run(message) {
        /**
         * @type StreamDispatcher
         */
         const dispatcher = message.client.server.dispatcher;
        if(!message.member.voice.channel) {
        return message.say(':x: tu dois être dans un salon vocal pour use cette commande. ');
        }

        if(!message.client.voice.connections.first()) {
            return message.say(" :x: Je ne suis pas connécté à un salon vocal. Tape `b/join` pour m'ajouter. ");
        }


        if(dispatcher) {
        dispatcher.restart();
        }

        return message.say(" Ta musique se relance :notes: ");
    }
}