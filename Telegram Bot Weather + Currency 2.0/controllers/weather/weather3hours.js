const axios = require('axios');

const weatherTemplate = require('./weatherTemplate');

const weatherEndpoint = `https://api.openweathermap.org/data/2.5/forecast?id=703845&lang=ru&cnt=10&units=metric&appid=c4c46354448fbca0506d311fc6df279e`;

const getWeatherThree = async () => {
    const endPoint = weatherEndpoint;
    const response = await axios
        .get(endPoint)
        .then((resp) => {
            const data = resp.data.list;
            const city = resp.data.city.name;
            const cityTemp = `<b>Погода в г.${city}</b>`;
            const res = [];
            data.map((e) => {
                const test = weatherTemplate(e);
                res.push(test);
            });
            let text = '';
            for (let i = 0; i < res.length; i++) {
                text += res[i] + ' ';
            }
            const finalRes = `\n${cityTemp} \n${text}`;
            return finalRes;
        })
        .catch((err) => {
            console.log(err);
        });
    return response;
};

module.exports = getWeatherThree;
