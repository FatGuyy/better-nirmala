import { REST, Routes } from 'discord.js';
import 'dotenv/config';

const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong',
    },
    {
        name: 'work',
        description: 'Gives 100$',
    },
    {
        name: 'send',
        description: 'Sends Money to someone',
        options: [
            {
                name: 'amount',
                type: 4, // Integer type
                description: 'The amount to send',
                required: true,
            },
            {
                name: 'user',
                type: 6, // User type
                description: 'The recipient',
                required: true,
            }
        ],
    },
];
  
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}