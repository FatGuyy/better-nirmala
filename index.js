import { Client, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
]});

client.on(Events.ClientReady, readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on('messageCreate', message => {
    if(message.author.bot) return;
    if (message.content.startsWith('paisa')){
        const x = message.content.split('paisa')[1];
        return message.reply({
            content:'mazha kade pn!! 👀',
        });
    }
    message.reply({
        content:"GST bharla ka?"
    });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('pong');
    } else if (interaction.commandName === 'work') {
        // space to write earning code
        await interaction.reply(`${interaction.user.username} Worked hard and has earned 100$`);
    } else if (interaction.commandName === 'send'){
        const amount = interaction.options.getInteger('amount'); // Get the amount
        const user = interaction.options.getUser('user'); // Get the user

        if (!user) return interaction.reply('User not found!');
        await interaction.reply(`${interaction.user.username} sent ${amount} coins to ${user.username}.`);
    }
})

client.login(process.env.TOKEN)