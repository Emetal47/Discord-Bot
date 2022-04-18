const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: 'play',
    description: 'Joins and plays a video from youtube',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You do not have the correct permissions');
        if (!permissions.has('SPEAK')) return message.channel.send('You do not have the correct permissions');
        if (!args.length) return message.channel.send('You need to send the second argument!');

       /* const connection = await voiceChannel.join();

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(' '));

        if (video) {
            const stream = ytdl(video.url, { filter: 'audioonly' });
            connection.play(stream, { seek: 0, volume: 1 })
                .on('finish', () => {
                    voiceChannel.leave();
                });

            await message.reply(`Now Playing ***${video.title}***`)
        } else {
            message.channel.send('No video results found');
        }
        */
        const {
            joinVoiceChannel,
            createAudioPlayer,
            createAudioResource
        } = require('@discordjs/voice');

        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });
        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
            const video = await videoFinder(args.join(''));
            const stream = ytdl(video.url, {
                filter: "audioonly"
            });

            const player = createAudioPlayer();
            const resource = createAudioResource(stream);

            async function play() {
                await player.play(resource);
                connection.subscribe(player);
            }

        }
        //const stream = ytdl(video.url, { filter: 'audioonly' });
        

    }
}