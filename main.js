//const Discord = require('discord.js');

//const client = new Discord.Client();
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = '-';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('TrueGod is Online!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command == 'video') {
        client.commands.get('video').execute(message, args);
    } else if (command == 'sussy') {
        client.commands.get('sussy').execute(message, args);
    } else if (command == 'clear') {
        client.commands.get('clear').execute(message, args);
    } else if (command == 'play') {
        client.commands.get('play').execute(message, args);
    } else if (command == 'leave') {
        client.commands.get('leave').execute(message, args);
    }
});

client.login('ODg3NTMxNDAwMTE3NDg1NTk4.YUFgBw.5yqydDEbckTire8wTx9V-BW4V7M');