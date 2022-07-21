/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import Coin from '../../models/coins';
const api_endpoint = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=20&convert=USD';
const api_key = 'e06c8663-3101-464c-85c0-83e3d855620e';

// eslint-disable-next-line no-async-promise-executor
const endpoint = async () => {
    try {
        await axios
            .get(api_endpoint, {
                headers: {
                    'X-CMC_PRO_API_KEY': api_key,
                },
            })
            .then((response: AxiosResponse) => {
                const respData = response.data.data;
                respData.forEach((e: any) => {
                    const shop = 'CoinMarketCap';
                    const short = e.symbol;
                    const price = e.quote.USD.price;
                    const date = new Date().toLocaleDateString();
                    const time = new Date().toLocaleTimeString();
                    const coin = new Coin(shop, short, price, date, time);
                    coin.save()
                        .then(() => {})
                        .catch((err) => {
                            console.log(err.message);
                        });
                });
            });
    } catch (err) {
        console.log((err as Error).message);
    }
};

export default endpoint;
