process.env['NTBA_FIX_319'] = 1;
process.env['NTBA_FIX_350'] = 1;
const dotenv = require('dotenv');
dotenv.config();
const TOKEN = process.env.TOKEN;
const chatId = process.env.CHAT_ID;
const telegramBot = require('node-telegram-bot-api');
const bot = new telegramBot(TOKEN, { polling: true });
const { program } = require('commander');

program
    .command('message')
    .alias('m')
    .description('Write here message to Telegram Bot')
    .argument('string', 'message to send')
    .action(async (message) => {
        await bot.sendMessage(chatId, message);
        console.log('Message was successfully sent!');
        process.exit(0);
    });

program
    .command('photo')
    .alias('p')
    .description('Write correct path to photo or just drag and drop photo to console to send it to Telegram Bot')
    .argument('path', 'photo to send')
    .action(async (photo) => {
        await bot.sendPhoto(chatId, photo);
        console.log('Photo was successfully sent!');
        process.exit(0);
    });

program.parse(process.argv);
