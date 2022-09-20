process.env['NTBA_FIX_319'] = 1;
process.env['NTBA_FIX_350'] = 1;
const dotenv = require('dotenv');
dotenv.config();
const TOKEN = process.env.TOKEN;
const telegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const bot = new telegramBot(TOKEN, { polling: true });
const fs = require('fs');

bot.onText(/(.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    bot.sendMessage(chatId, resp);
    console.log(`${match}`);
});

bot.onText(/photo/, (msg, match) => {
    const chatId = msg.chat.id;
    axios({
        method: 'get',
        url: 'https://picsum.photos/200/300',
        responseType: 'stream',
    }).then(function (response) {
        response.data.pipe(fs.createWriteStream('pic.jpg'));
    });
    bot.sendPhoto(chatId, 'pic.jpg');
});
