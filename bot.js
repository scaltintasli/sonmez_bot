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
    const channel = message.member.voice.channel;

    playSonmez(command,channel);
    // switch (command) {
    //     case 'bilardo':
    //         playSonmez(command, channel);
    //         break;
    //     default:
    //         break;
    // }
});

function playSonmez(replik, channel) {
    if (!channel) return console.error("Boyle bir ses kanali yok.");

    channel.join().then(connection => {
        console.log("Successfully connected.");
        
        const dispatcher = connection.play('./sounds/' + replik + '.mp3');
        dispatcher.on("finish", finish => {
            connection.disconnect();
           });
    }).catch(e => {
        console.error(e);
    });
};


// client.login(process.env.DISCORDJS_BOT_TOKEN);
client.login('Nzc1MjI0NTk1ODEyNzEyNDg5.X6jOKg.FZuQfom0yXdrqJ6Zt24VdZforWg');