require('dotenv').config();

const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '-';

client.once('ready', () => {
    console.log(`${client.user.username} has logged in.`);
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot)
        return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command == 'bilardo') {
        // message.channel.send('pong!');

        const channel = message.member.voice.channel;

        if (!channel) return console.error("The channel does not exist!");

        channel.join().then(connection => {
            console.log("Successfully connected.");
            
            const dispatcher = connection.play('./sounds/bilardo.mp3');
            dispatcher.on("finish", finish => {
                connection.disconnect();
               });
        }).catch(e => {
            console.error(e);
        });
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);