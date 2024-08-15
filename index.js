const { Client, GatewayIntentBits, Events } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'ban') {
        if (!interaction.memberPermissions.has('BAN_MEMBERS')) {
            return interaction.reply({ content: 'You do not have permission to ban members.', ephemeral: true });
        }

        const user = options.getUser('user');
        const reason = options.getString('reason') || 'No reason provided';

        try {
            await interaction.guild.members.ban(user.id, { reason });
            interaction.reply(`${user.tag} has been banned. Reason: ${reason}`);
        } catch (error) {
            console.error('Error banning user:', error);
            interaction.reply({ content: 'There was an error trying to ban the user.', ephemeral: true });
        }
    } else if (commandName === 'unban') {
        if (!interaction.memberPermissions.has('BAN_MEMBERS')) {
            return interaction.reply({ content: 'You do not have permission to unban members.', ephemeral: true });
        }

        const userId = options.getString('user_id');

        try {
            await interaction.guild.bans.remove(userId);
            interaction.reply('User has been unbanned.');
        } catch (error) {
            console.error('Error unbanning user:', error);
            interaction.reply({ content: 'There was an error trying to unban the user.', ephemeral: true });
        }
    } else if (commandName === 'kick') {
        if (!interaction.memberPermissions.has('KICK_MEMBERS')) {
            return interaction.reply({ content: 'You do not have permission to kick members.', ephemeral: true });
        }

        const user = options.getUser('user');
        const reason = options.getString('reason') || 'No reason provided';

        try {
            await interaction.guild.members.kick(user.id, { reason });
            interaction.reply(`${user.tag} has been kicked. Reason: ${reason}`);
        } catch (error) {
            console.error('Error kicking user:', error);
            interaction.reply({ content: 'There was an error trying to kick the user.', ephemeral: true });
        }
    }
});

client.once('ready', () => {
    console.log('Ready!');
});

client.login("MTI3MzM1MjE1NTYxNjY0NTE0Mg.GB-5Tk.oPM6aVbdHyzhgPcNbSkrJUmqqRgTg-n1Wxx18g");