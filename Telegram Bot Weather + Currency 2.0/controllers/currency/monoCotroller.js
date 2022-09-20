const axios = require('axios').default;

const monoEndpoint = `https://api.monobank.ua/bank/currency`;

const date = new Date();

let monoCurr = [];
const monoData = () => {
    setInterval(() => {
        const endpoint = monoEndpoint;
        axios
            .get(endpoint)
            .then((resp) => {
                console.log('Saved!');
                monoCurr.push(resp.headers.date, resp.data[0], resp.data[1]);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, 61000);
};
monoData();

const getMonoCurrency = async () => {
    try {
        const finalRes = monoCurr;
        const monoCurrency = `${date.toLocaleString()}.\nMonobank actual currency is: \nUSD: Buy:${parseFloat(finalRes[1].rateBuy).toFixed(
            2
        )}; Sell:${parseFloat(finalRes[1].rateSell).toFixed(2)} \nEUR: Buy:${parseFloat(finalRes[2].rateBuy).toFixed(2)}; Sell:${parseFloat(
            finalRes[2].rateSell
        ).toFixed(2)}`;
        return monoCurrency;
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = getMonoCurrency;
