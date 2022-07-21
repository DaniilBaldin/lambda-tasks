/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import Coin from '../../models/coins';
const api_endpoint = 'https://api.coinstats.app/public/v1/coins?skip=0&limit=20&currency=USD';

// eslint-disable-next-line no-async-promise-executor
const endpoint = async () => {
    try {
        await axios.get(api_endpoint).then((response: AxiosResponse) => {
            const respData = response.data.coins;
            respData.forEach((e: any) => {
                const shop = 'CoinStats';
                const short = e.symbol;
                const price = e.price;
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
