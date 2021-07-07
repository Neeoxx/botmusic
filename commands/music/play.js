const { VoiceConnection } = require('discord.js');
const { Command, CommandoMessage } = require('discord.js-commando');
const ytdl = require('ytdl-core');
const { UserNotInVoiceChannel } = require('../../strings.json');
const ytsr = require('youtube-search');
const ytpl = require("ytpl");

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'joue de la musique depuis YT',
            args: [
                {
                    key: 'term',
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
    async run(message, { term }) {
        
        const server = message.client.server;

        if(!message.member.voice.channel) {
            return message.say(UserNotInVoiceChannel);
            }

        await message.member.voice.channel.join().then((connection) => {

            
            if(ytpl.validateID(term)){
                // playlist.
                ytpl(term).then((results) => {
                    results.items.forEach((video) => {
                        server.queue.push({title: video.title, url: video.shortUrl});
                    });

                    server.currentVideo = server.queue[0];
                    this.runVideo(message, connection).then(() => {
                        message.say(":white_check_mark: `"+ results.items.length + "` musique dans la file d'attente");
                    });
                })
            }   else {

                    //video.
                    ytsr(term, {key: process.env.KEY, maxResults: 1, type: 'video'}).then((results) => {

                    if(results.results[0]) {
                        const foundVideo = {url:results.results[0].link, title: results.results[0].title };
                    
    
                    if(server.currentVideo.url !="") {
                        server.queue.push(foundVideo);
                        return message.say("`" + foundVideo.title + "`" + " - Ajouté à la file d'attente ! ");
                    }
    
                    server.currentVideo = foundVideo;
                    this.runVideo(message, connection);
                    }
                });
            }
        });

    }
        /**
         * 
         * @param {CommandoMessage} message 
         * @param {VoiceConnection} connection 
         * @param {*} video 
         */
        async runVideo(message, connection) {
            const server = message.client.server;
            
            const dispatcher = connection.play(ytdl(server.currentVideo.url, { filter:'audioonly' }) );

            server.queue.shift();
            server.dispatcher = dispatcher;
            server.connection = connection;

            dispatcher.on('finish', () => {
                if (server.queue[0]) {
                    server.currentVideo = server.queue[0];
                    return this.runVideo(message, connection, server.currentVideo.url);
                }
            });

            return message.say(" Entrain de jouer" + "`" + server.currentVideo.title + "`" + ":notes:");
        }
        
}