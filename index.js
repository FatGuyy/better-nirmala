import { Client, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import { createCon, endCon, runQuery } from './database.js';

var con = createCon;

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
    // message.reply({
    //     content:"GST bharla ka?"
    // });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    
    else if (interaction.commandName === 'work') {
        // work command logic
        const username = interaction.user.username
        const result = await runQuery(con, `SELECT 1 FROM balance WHERE username = "${username}" LIMIT 1;`, "") 
        
        // check if user is already in the db, if not create a new record for him
        if (result.length == 0) {
            await runQuery(con, `INSERT IGNORE INTO balance (username, balance) VALUES ("${username}", 100);`, `created new user row for ${username}`)
        } else{
            // logic to check if the user has worked in the last hour, if not, add 100 to balance
            let worked = await runQuery(con, `SELECT last_worked FROM balance WHERE username = "${username}";`, 'checking last_worked of user');
            
            const currentTimestamp = new Date();
            const storedTimestamp = new Date(worked[0].last_worked);
            const differenceMs = currentTimestamp - storedTimestamp;
            const differenceHours = Math.floor(differenceMs / (1000 * 60 * 60)); // Convert to hours
            
            console.log(differenceHours);
            if (differenceHours >= 1) {
                await runQuery(con, `UPDATE balance SET balance = balance + 100, last_worked = CURRENT_TIMESTAMP  WHERE username = "${username}"`, `added 100$ for ${username}`);
            } else{
                await interaction.reply(`wait for an hour before you work again!`);
            }
        }

        if(!interaction.replied){
            await interaction.reply(`${username} Worked hard and has earned 100$`);
        }
    }
    
    else if (interaction.commandName === 'send'){
        // sending command logic
        const amount = interaction.options.getInteger('amount'); // Get the amount
        const user = interaction.options.getUser('user'); // Get the user

        if (!user) return interaction.reply('User not found!');
        await interaction.reply(`${interaction.user.username} sent ${amount} Dollars to ${user.username}.`);
    } 
    
    else if(interaction.commandName === 'balance') {
        const bal = await runQuery(con, `SELECT balance FROM balance WHERE username ="${interaction.user.username}";`, 'Balance queried!');
        console.log(bal[0].balance);
        await interaction.reply(`${bal[0].balance}\$`);
    }
});

client.login(process.env.TOKEN)

endCon(con);