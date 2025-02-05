import { REST, Routes } from 'discord.js';
import 'dotenv/config';

const commands = [
    {
        name: 'work',
        description: 'Gives 100$',
    },
    {
        name: 'balance',
        description: 'Check your balance',
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

// Ensure you're using async IIFE (Immediately Invoked Function Expression)
(async () => {
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
})();
