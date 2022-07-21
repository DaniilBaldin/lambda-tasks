/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import coins from '../../utils/coinsList';
import Coin from '../../models/coins';
const api_endpoint = 'https://api.kucoin.com/api/v1/prices';

// eslint-disable-next-line no-async-promise-executor
const endpoint = async () => {
    try {
        await axios.get(api_endpoint).then((response: AxiosResponse) => {
            const respData = response.data.data;
            for (const i in respData) {
                const priceCoin = respData[i];
                coins.forEach((el) => {
                    if (el === i) {
                        const shop = 'Kucoin';
                        const short = i;
                        const price = priceCoin;
                        const date = new Date().toLocaleDateString();
                        const time = new Date().toLocaleTimeString();
                        const coin = new Coin(shop, short, price, date, time);
                        coin.save()
                            .then(() => {})
                            .catch((err) => {
                                console.log(err.message);
                            });
                    }
                });
            }
        });
    } catch (err) {
        console.log((err as Error).message);
    }
};

export default endpoint;
