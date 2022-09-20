require('dotenv').config();
process.env['NTBA_FIX_319'] = 1;
process.env['NTBA_FIX_350'] = 1;
const TOKEN = process.env.TOKEN;
const telegramBot = require('node-telegram-bot-api');
const bot = new telegramBot(TOKEN, { polling: true });
const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const getMonoCurrency = require('./controllers/currency/monoCotroller.js');
const getPrivatCurrency = require('./controllers/currency/privatController.js');
const getWeatherThree = require('./controllers/weather/weather3hours.js');
const getWeatherSix = require('./controllers/weather/weather6hours.js');

bot.onText(/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome to the weather forecatsting bot!', {
        reply_markup: {
            keyboard: [
                ['Forecast every 3 hours.', 'Forecast every 6 hours.'],
                ['Privatbank actual currency.', 'Monobank actual currency.'],
            ],
        },
    });
});

bot.onText(/Forecast every 3 hours./, (msg) => {
    const chatId = msg.chat.id;
    getWeatherThree().then((result) => {
        bot.sendMessage(chatId, result, {
            parse_mode: 'HTML',
        });
    });
});

bot.onText(/Forecast every 6 hours./, (msg) => {
    const chatId = msg.chat.id;
    getWeatherSix().then((result) => {
        bot.sendMessage(chatId, result, {
            parse_mode: 'HTML',
        });
    });
});

bot.onText(/Privatbank actual currency./, (msg) => {
    const chatId = msg.chat.id;
    getPrivatCurrency().then((result) => {
        bot.sendMessage(chatId, result, {
            parse_mode: 'HTML',
        });
    });
});

bot.onText(/Monobank actual currency./, (msg, match) => {
    const chatId = msg.chat.id;
    getMonoCurrency().then((result) => {
        console.log(result);
        bot.sendMessage(chatId, result, {
            parse_mode: 'HTML',
        });
    });
});

const server = express()
    .use((res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));

const wws = new Server({ server });

wws.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
    wws.clients.forEach(() => {
        http.get('https://tranquil-caverns-28706.herokuapp.com/');
    });
}, 300000);

setInterval(() => {
    wws.clients.forEach((client) => {
        client.send(date.toTimeString());
    });
}, 1000);
