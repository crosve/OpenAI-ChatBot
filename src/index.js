const {Client, IntentsBitField} = require('discord.js'); 
const { OpenAI } = require('openai');

require('dotenv').config();


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent, 
    ]});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

client.on('ready', (c) => {

    console.log(`Logged in as ${c.user.username}!`);
});

client.on('messageCreate', async (message) => {
    if(message.author.bot) return;
    // if(!message.mentions.users.has(client.user.id)) return; 
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', 
        messages: [
            {
                role: 'system', 
                content: 'You are a helpful assistant.'

            },
            {
                role: 'user', 
                content: message.content
            }

        ]
    }).catch(console.error);

    message.reply(response.choices[0].message.content); 
   

})

client.login(process.env.TOKEN);