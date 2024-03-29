const { Command, CommandoMessage } = require('discord.js-commando');
const ytdl = require('ytdl-core');
const { UserNotInVoiceChannel, BotNotInVoiceChannel } = require("../../strings.json");

module.exports = class SkipCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            group: 'music',
            memberName: 'skip',
            description: 'Asaute le titre en cours de lecture.',
        });
    }
    /**
     * 
     * @param {CommandoMessage} message 
     * @param {string} query
     */
    async run(message) {
        const voiceChannel = message.member.voice.channel;
        const server = message.client.server;

        if(!voiceChannel) {
            return message.say(UserNotInVoiceChannel);
        }

        if(!message.client.voice.connections.first()){
            return message.say(BotNotInVoiceChannel)
        }


        if(!server.queue[0]) {
            server.currentVideo = {url:"", title: "Rien pour le moment."}
            return message.say("Il n'y a rien dans la file d'attente");
        }

        server.currentVideo = server.queue[0];
        server.dispatcher = server.connection.play(ytdl(server.currentVideo.url, { filter:'audioonly' }) );
        server.queue.shift();

        return message.say(" :fast_forward: musique ignoré ! :thumbsup: " );

    }
   
}