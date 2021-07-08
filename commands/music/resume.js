const { Command, CommandoMessage } = require('discord.js-commando');
const { StreamDispatcher } = require('discord.js');
const { UserNotInVoiceChannel, BotNotInVoiceChannel } = require('../../strings.json');


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
     * @param {string} query
     */
    async run(message) {
        /**
         * @type StreamDispatcher
         */
        if(!message.member.voice.channel) {
        return message.say(UserNotInVoiceChannel);
        }

        if(!message.client.voice.connections.first()) {
            return message.say(BotNotInVoiceChannel);
        }


        if(message.client.server.dispatcher) {
            message.client.server.dispatcher.resume();
        }

        return message.say("En train de jouer :notes: ");
    }
   
}