const { Command, CommandoMessage } = require('discord.js-commando');
const ytdl = require('ytdl-core');

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
     * @param {string} param1 
     */
    async run(message) {
        const voiceChannel = message.member.voice.channel;
        const server = message.client.server;

        if(!voiceChannel) {
            return message.say(':x: tu dois être dans un salon vocal pour use cette commande. ');
        }

        if(!message.client.voice.connections.first()){
            return message.say("le bot doit être connécté pour use cette commande.")
        }


        if(!server.queue[0]) {
            server.currentVideo = {url: "", title: "Rien pour le moment."};
            return message.say(" il n'y a rien sur la file d'attente")
        }

        server.currentVideo = server.queue[0];
        server.connection.play( await ytdl(server.currentVideo.url, { filter:'audioonly' }), {type: 'opus' } );
        server.queue.shift();

        return message.say(" :fast_forward: musique ignoré ! :thumbsup: " );

    }
   
}