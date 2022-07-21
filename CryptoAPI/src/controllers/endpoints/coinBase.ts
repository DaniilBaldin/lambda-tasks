/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosResponse } from 'axios';
import endpoints from '../../utils/coinBaseEnpoints';
import Coin from '../../models/coins';
const endpoint = async () => {
    try {
        const promise = endpoints.map((endpoint: string) =>
            axios.get(endpoint).then((response: AxiosResponse) => {
                const endRes = response.data.data;
                const shop = 'CoinBase';
                const short = endRes.base;
                const price = endRes.amount;
                const date = new Date().toLocaleDateString();
                const time = new Date().toLocaleTimeString();
                const coin = new Coin(shop, short, price, date, time);
                coin.save()
                    .then(() => {})
                    .catch((err) => {
                        console.log(err.message);
                    });
            })
        );
        Promise.all([...promise]).then(() => {});
    } catch (err) {
        console.log((err as Error).message);
    }
};

export default endpoint;
