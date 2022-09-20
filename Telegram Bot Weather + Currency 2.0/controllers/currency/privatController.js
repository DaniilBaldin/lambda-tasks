const axios = require('axios');

const privatEndpoint = `https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`;

const date = new Date();

const getPrivatCurrency = () => {
    const endpoint = privatEndpoint;
    const response = axios.get(endpoint).then((resp) => {
        currUsd = resp.data[0];
        currEur = resp.data[1];
        const privatCurr = `${date.toLocaleString()}.\nPrivatbank actual currency is: \nUSD: Buy:${parseFloat(currUsd.buy).toFixed(
            2
        )}; Sell: ${parseFloat(currUsd.sale).toFixed(2)} \nEUR: Buy:${parseFloat(currEur.buy).toFixed(2)}; Sell:${parseFloat(currEur.sale).toFixed(
            2
        )}`;
        return privatCurr;
    });
    return response;
};

module.exports = getPrivatCurrency;
