/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import Coin from '../models/coins';

// eslint-disable-next-line no-async-promise-executor
const findCoinByShort: RequestHandler = async (req, res) => {
    try {
        const market = req.params.market;
        const short = req.params.short;
        Coin.find(market, short)
            .then(([coin]) => {
                const result: any = coin;
                if (result.length === 0) {
                    res.send('Please check route correctness.');
                } else {
                    res.send(result.slice(-1));
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    } catch (err) {
        console.log((err as Error).message);
    }
};

export default findCoinByShort;
