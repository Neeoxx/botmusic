const { Command, CommandoMessage } = require('discord.js-commando');
const {StreamDispatcher} = require('discord.js');

module.exports = class ResumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'resume',
            group: 'music',
            memberName: 'resume',
            description: 'remet en lecture ta musique',
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
            return message.say(" :x: Je ne suis pas connécté à un salon vocal. Tape `b!join` pour m'ajouter. ");
        }


        if(dispatcher) {
            dispatcher.resume();
        }

        return message.say(" :arrow_forward: ta musique est repris ! ");
    }
   
}