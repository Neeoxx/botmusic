const { VoiceConnection } = require('discord.js');
const { Command, CommandoMessage } = require('discord.js-commando');
const ytdl = require('ytdl-core-discord');

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            aliases: ['b!'],
            group: 'music',
            memberName: 'play',
            description: 'joue de la musique depuis YT',
            args: [
                {
                    key: 'query',
                    prompt:'quel musique veux-tu lire ?',
                    type:'string'
                }

            ]
        });
    }
    /**
     * 
     * @param {CommandoMessage} message 
     * @param {string} param1 
     */
    async run(message, { query }) {
        const server = message.client.server;

        await message.member.voice.channel.join().then((connection) => {
            if(server.currentVideo.url !=""){
                server.queue.push({title:"", url: query });
                return message.say(" Ajoutter à la liste d'attente ! ");
            }
            server.currentVideo = {title:"", url: query }
            this.runVideo(message, connection, query);
        });

    }
        /**
         * 
         * @param {CommandoMessage} message 
         * @param {VoiceConnection} connection 
         * @param {*} video 
         */
        async runVideo(message, connection, videoUrl) {
            const server = message.client.server;
            const dispatcher = connection.play( await ytdl(videoUrl, { filter:'audioonly' }), {type: 'opus' } );

            server.queue.shift();
            server.dispatcher = dispatcher;
            server.connection = connection;

            dispatcher.on('finish', () => {
                if(server.queue[0]) {
                    server.currentVideo = server.queue[0];
                    return this.runVideo(message, connection, server.currentVideo.url);
                }
            });

            return message.say(" Entrain de jouer :notes:");
        }
        
}