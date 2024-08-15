const { Client, Intents, MessageEmbed } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_BANS] });
const prefix = '/'; // Updated to use slash commands

const punchingGifs = [
    "https://c.tenor.com/b9aXVS6p7ucAAAAC/edens-zero-shiki-granbell.gif",
    "https://i.imgur.com/g91XPGA.gif",
    "https://i.imgur.com/7jErgl1.gif",
    "https://i.imgur.com/hlqNBXp.gif",
    "https://i.imgur.com/jznCcr2.gif",
    "https://i.imgur.com/f2kkp3L.gif",
    "https://i.imgur.com/cgMbUYX.gif",
    "https://i.imgur.com/pX1E9uU.gif",
    "https://i.imgur.com/hODM1tI.gif",
    "https://i.imgur.com/e4bi40y.gif"
];
const punchingNames = ['Knocks You Out!', 'Punches You!', 'Destroys Your Skull!'];

const kickGifs = [
    'https://c.tenor.com/LEgnGzli8VMAAAAC/anime-fight.gif',
    'https://c.tenor.com/7te6q4wtcYoAAAAC/mad-angry.gif',
    'https://c.tenor.com/2l13s2uQ6GkAAAAM/kick.gif',
    'https://c.tenor.com/QxoBMmf2bRwAAAAC/jormungand-anime.gif',
    'https://c.tenor.com/f1mFGp6vujkAAAAd/charlotte-window-kick-anime-kick.gif',
    'https://c.tenor.com/kvxt9X-gXqQAAAAC/anime-clannad.gif',
    'https://c.tenor.com/D67kRWw_cEEAAAAC/voz-dap-chym-dap-chym.gif',
    'https://c.tenor.com/EcdG5oq7MHYAAAAM/shut-up-hit.gif',
    'https://c.tenor.com/Lyqfq7_vJnsAAAAC/kick-funny.gif',
    'https://c.tenor.com/4zwRLrLMGm8AAAAM/chifuyu-chifuyu-kick.gif'
];
const kickNames = ['Boots You!', 'Kicks You!'];

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Handle punch command
    if (command === 'punch') {
        const randomGif = punchingGifs[Math.floor(Math.random() * punchingGifs.length)];
        const randomName = punchingNames[Math.floor(Math.random() * punchingNames.length)];

        const embed = new MessageEmbed()
            .setColor('#CE3011')
            .setDescription(`${message.author} ${randomName}`)
            .setImage(randomGif);

        message.channel.send({ embeds: [embed] });
    }

    // Handle kick command
    else if (command === 'kick') {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            return message.reply('You do not have permission to kick members.');
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Please mention a user to kick.');
        }

        const member = message.guild.members.cache.get(user.id);
        if (!member) {
            return message.reply('The user is not a member of this server.');
        }

        try {
            await member.kick();
            message.reply(`${user.tag} has been kicked.`);
        } catch (error) {
            console.error('Error kicking user:', error);
            message.reply('There was an error trying to kick the user.');
        }
    }

    // Handle ban command
    else if (command === 'ban') {
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply('You do not have permission to ban members.');
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Please mention a user to ban.');
        }

        const member = message.guild.members.cache.get(user.id);
        if (!member) {
            return message.reply('The user is not a member of this server.');
        }

        try {
            await member.ban({ reason: args.slice(1).join(' ') || 'No reason provided' });
            message.reply(`${user.tag} has been banned.`);
        } catch (error) {
            console.error('Error banning user:', error);
            message.reply('There was an error trying to ban the user.');
        }
    }

    // Handle unban command
    else if (command === 'unban') {
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply('You do not have permission to unban members.');
        }

        if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
            return message.reply('I do not have permission to unban members.');
        }

        const userId = args[0];
        if (!userId) {
            return message.reply('Please provide the ID of the user to unban.');
        }

        try {
            await message.guild.bans.remove(userId);
            message.reply('User has been unbanned.');
        } catch (error) {
            console.error('Error unbanning user:', error);
            message.reply(`There was an error trying to unban the user. Error details: ${error.message}`);
        }
    }
});

client.login("MTI3MzM1MjE1NTYxNjY0NTE0Mg.GB-5Tk.oPM6aVbdHyzhgPcNbSkrJUmqqRgTg-n1Wxx18g");