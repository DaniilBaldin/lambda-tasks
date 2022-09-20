const axios = require('axios');

const weatherTemplate = require('./weatherTemplate');

const weatherEndpoint = `https://api.openweathermap.org/data/2.5/forecast?id=703845&lang=ru&cnt=10&units=metric&appid=c4c46354448fbca0506d311fc6df279e`;

const getWeatherSix = async () => {
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
            const filter_hours = (arr, nth) => arr.filter((e, x) => x % nth === nth - 1);
            const filter_res = filter_hours(res, 2);
            let text = '';
            for (let i = 0; i < filter_res.length; i++) {
                text += filter_res[i] + ' ';
            }
            const finalRes = `${cityTemp} \n${text}`;
            return finalRes;
        })
        .catch((err) => {
            console.log(err);
        });
    return response;
};

module.exports = getWeatherSix;
