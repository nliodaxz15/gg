const { REST, Routes } = require('@discordjs/rest');
require('dotenv').config();

const clientId = process.env.CLIENT_ID; // Ваш ID бота
const guildId = process.env.GUILD_ID; // ID вашего сервера

const commands = [
    {
        name: 'ban',
        description: 'Ban a user from the server',
        options: [
            {
                type: 6, // USER type
                name: 'user',
                description: 'User to ban',
                required: true,
            },
            {
                type: 3, // STRING type
                name: 'reason',
                description: 'Reason for banning the user',
                required: false,
            },
        ],
    },
    {
        name: 'unban',
        description: 'Unban a user from the server',
        options: [
            {
                type: 3, // STRING type
                name: 'user_id',
                description: 'ID of the user to unban',
                required: true,
            },
        ],
    },
    {
        name: 'kick',
        description: 'Kick a user from the server',
        options: [
            {
                type: 6, // USER type
                name: 'user',
                description: 'User to kick',
                required: true,
            },
            {
                type: 3, // STRING type
                name: 'reason',
                description: 'Reason for kicking the user',
                required: false,
            },
        ],
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
        });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();