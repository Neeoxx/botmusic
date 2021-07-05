const { Command, CommandoMessage } = require("discord.js-commando");
const { StreamDispatcher } = require('discord.js');

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            group: 'music',
            memberName:'pause',
            description: 'Met en pause la musique courante.',
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

            if(!message.client.voice.connections.first() ){
                return message.say(":x: Je ne suis pas connecté à un salon vocal. tape `b/join` pour m'ajouter ")
            }

            if(dispatcher) {
                dispatcher.pause();
            }

            return message.say(" :pause_button: Pause :thumbup: ")
    }
        
}
