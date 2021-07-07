const { Command, CommandoMessage } = require('discord.js-commando');
const { UserNotInVoiceChannel } = require('../../strings.json');

module.exports = class QuitCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'quit',
            group: 'music',
            memberName: 'quit',
            description: 'fait quitter le bot de votre salon ',
        });
    }
    /**
     * 
     * @param {CommandoMessage} message 
     * @param {string} query
     */
    async run(message) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
        return message.say(UserNotInVoiceChannel);
        }

        await voiceChannel.leave();

        return message.say(" :thumbsup: j'ai quitté " + "`" + voiceChannel.name  + "`" )

    }
   
}