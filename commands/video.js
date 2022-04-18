module.exports = {
    name: 'video',
    description: "this provides link to video!",
    execute(message, args) {
        message.channel.send('Bidoof National Anthem: ' + 'https://www.youtube.com/watch?v=GMctVT-z0xY');
    }
}