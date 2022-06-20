require("dotenv").config({
  path: __dirname + "/.env",
});
process.env["NTBA_FIX_319"] = 1;
process.env["NTBA_FIX_350"] = 1;
const TOKEN = process.env.TOKEN;
const telegramBot = require("node-telegram-bot-api");
const axios = require("axios").default;
const bot = new telegramBot(TOKEN, { polling: true });
const fs = require("fs");

const weatherEndpoint = `https://api.openweathermap.org/data/2.5/forecast?id=703845&lang=ru&cnt=10&units=metric&appid=c4c46354448fbca0506d311fc6df279e`;

const weatherTemplate = (city, elem) => {
  let weather = `Погода в <b>г.${city}</b>, ${elem.dt_txt}:
    +${Math.trunc(elem.main.temp)}°C, ощущается как: +${Math.trunc(
    elem.main.feels_like
  )}°C, ${elem.weather[0].description}.
  `;
  return weather;
};

const getWeatherThree = (chatId, msg) => {
  const endPoint = weatherEndpoint;
  axios.get(endPoint).then(
    (resp) => {
      const data = resp.data.list;
      const city = resp.data.city.name;
      const res = [];
      function iterator(target) {
        if (typeof target === "object") {
          target.forEach((e) => {
            res.push(weatherTemplate(city, e));
          });
        }
      }
      iterator(data);
      let text = "";
      for (let i = 0; i < res.length; i++) {
        text += res[i] + " ";
      }
      bot.sendMessage(chatId, text, { parse_mode: "HTML" });
    },
    (error) => {
      console.log("error", error);
      bot.sendMessage(chatId, "Error");
    }
  );
};

const getWeatherSix = (chatId, msg) => {
  const endPoint = weatherEndpoint;
  axios.get(endPoint).then(
    (resp) => {
      const data = resp.data.list;
      const city = resp.data.city.name;
      const res = [];
      function iterator(target) {
        if (typeof target === "object") {
          target.forEach((e) => {
            res.push(weatherTemplate(city, e));
          });
        }
      }
      iterator(data);
      const filter_hours = (arr, nth) =>
        arr.filter((e, x) => x % nth === nth - 1);
      const filter_res = filter_hours(res, 2);
      let text = "";
      for (let i = 0; i < filter_res.length; i++) {
        text += filter_res[i] + " ";
      }
      bot.sendMessage(chatId, text, { parse_mode: "HTML" });
    },
    (error) => {
      console.log("error", error);
      bot.sendMessage(chatId, "Error");
    }
  );
};
bot.onText(/start/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, "Welcome to the weather forecatsting bot!", {
    reply_markup: {
      keyboard: [["Forecast every 3 hours.", "Forecast every 6 hours."]],
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
