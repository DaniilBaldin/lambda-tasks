require('dotenv').config({
    path: __dirname + '/.env',
});
process.env['NTBA_FIX_319'] = 1;
process.env['NTBA_FIX_350'] = 1;
const TOKEN = process.env.TOKEN;
const telegramBot = require('node-telegram-bot-api');
const axios = require('axios').default;
const bot = new telegramBot(TOKEN, { polling: true });
const fs = require('fs');
const http = require('http');
const express = require('express');

const weatherEndpoint = `https://api.openweathermap.org/data/2.5/forecast?id=703845&lang=ru&cnt=10&units=metric&appid=c4c46354448fbca0506d311fc6df279e`;
const privatEndpoint = `https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`;
const monoEndpoint = `https://api.monobank.ua/bank/currency`;
const date = new Date();

const getPrivatCurrency = (chatId, msg) => {
    const endpoint = privatEndpoint;
    axios.get(endpoint).then((resp) => {
        currUsd = resp.data[0];
        currEur = resp.data[1];
        const privatCurr = `${date.toLocaleString()}.\nPrivatbank actual currency is: \nUSD: Buy:${parseFloat(currUsd.buy).toFixed(
            2
        )}; Sell: ${parseFloat(currUsd.sale).toFixed(2)} \nEUR: Buy:${parseFloat(currEur.buy).toFixed(2)}; Sell:${parseFloat(currEur.sale).toFixed(
            2
        )}`;
        bot.sendMessage(chatId, privatCurr, {
            parse_mode: 'HTML',
        });
    });
};
let monoCurr = [];
const monoData = () => {
    setInterval(() => {
        const endpoint = monoEndpoint;
        axios
            .get(endpoint)
            .then((resp) => {
                monoCurr.push(resp.headers.date, resp.data[0], resp.data[1]);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, 61000);
};
monoData();

const getMonoCurrency = async (chatId, msg) => {
    try {
        const finalRes = monoCurr;
        const monoCurrency = `${date.toLocaleString()}.\nMonobank actual currency is: \nUSD: Buy:${parseFloat(finalRes[1].rateBuy).toFixed(
            2
        )}; Sell:${parseFloat(finalRes[1].rateSell).toFixed(2)} \nEUR: Buy:${parseFloat(finalRes[2].rateBuy).toFixed(2)}; Sell:${parseFloat(
            finalRes[2].rateSell
        ).toFixed(2)}`;
        bot.sendMessage(chatId, monoCurrency, {
            parse_mode: 'HTML',
        });
    } catch (err) {
        console.log(err.message);
    }
};
const weatherTemplate = (city, elem) => {
    let weather = `\t${elem.dt_txt}:
    +${Math.trunc(elem.main.temp)}°C, ощущается как: +${Math.trunc(elem.main.feels_like)}°C, ${elem.weather[0].description}.
  `;
    return weather;
};

const getWeatherThree = (chatId, msg) => {
    const endPoint = weatherEndpoint;
    axios.get(endPoint).then(
        (resp) => {
            const data = resp.data.list;
            const city = resp.data.city.name;
            const cityTemp = `<b>Погода в г.${city}</b>`;
            const res = [];
            function iterator(target) {
                if (typeof target === 'object') {
                    target.forEach((e) => {
                        res.push(weatherTemplate(city, e));
                    });
                }
            }
            iterator(data);
            let text = '';
            for (let i = 0; i < res.length; i++) {
                text += res[i] + ' ';
            }
            const finalRes = `\n${cityTemp} \n${text}`;
            bot.sendMessage(chatId, finalRes, {
                parse_mode: 'HTML',
            });
        },
        (error) => {
            console.log('error', error);
            bot.sendMessage(chatId, 'Error');
        }
    );
};

const getWeatherSix = (chatId, msg) => {
    const endPoint = weatherEndpoint;
    axios.get(endPoint).then(
        (resp) => {
            const data = resp.data.list;
            const city = resp.data.city.name;
            const cityTemp = `<b>Погода в г.${city}</b>`;
            const res = [];
            function iterator(target) {
                if (typeof target === 'object') {
                    target.forEach((e) => {
                        res.push(weatherTemplate(city, e));
                    });
                }
            }
            iterator(data);
            const filter_hours = (arr, nth) => arr.filter((e, x) => x % nth === nth - 1);
            const filter_res = filter_hours(res, 2);
            let text = '';
            for (let i = 0; i < filter_res.length; i++) {
                text += filter_res[i] + ' ';
            }
            const finalRes = `${cityTemp} \n${text}`;
            bot.sendMessage(chatId, finalRes, { parse_mode: 'HTML' });
        },
        (error) => {
            console.log('error', error);
            bot.sendMessage(chatId, 'Error');
        }
    );
};
bot.onText(/start/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    bot.sendMessage(chatId, 'Welcome to the weather forecatsting bot!', {
        reply_markup: {
            keyboard: [
                ['Forecast every 3 hours.', 'Forecast every 6 hours.'],
                ['Privatbank actual currency.', 'Monobank actual currency.'],
            ],
        },
    });
});
bot.onText(/Forecast every 3 hours./, (msg, match) => {
    const chatId = msg.chat.id;
    getWeatherThree(chatId, match);
});
bot.onText(/Forecast every 6 hours./, (msg, match) => {
    const chatId = msg.chat.id;
    getWeatherSix(chatId, match);
});
bot.onText(/Privatbank actual currency./, (msg, match) => {
    const chatId = msg.chat.id;
    getPrivatCurrency(chatId, match);
});
bot.onText(/Monobank actual currency./, (msg, match) => {
    const chatId = msg.chat.id;
    getMonoCurrency(chatId, match);
});

const PORT = process.env.PORT || 4000;
const INDEX = '/index.html';
const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));

const { Server } = require('ws');
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
        client.send(new Date().toTimeString());
    });
}, 1000);
