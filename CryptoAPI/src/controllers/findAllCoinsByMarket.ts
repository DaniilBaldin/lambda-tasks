/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import Coin from '../models/coins';

// eslint-disable-next-line no-async-promise-executor
const findAllCoins: RequestHandler = async (req, res) => {
    const market = req.params.market;
    Coin.findAll(market).then(([market]) => {
        let result: any = market;
        result = result.reverse();
        const response: any = [];
        try {
            for (let i = 0; i < 20; i++) {
                if (result[i] !== undefined) {
                    response.push(result[i]);
                }
            }
        } catch (err) {
            res.status(500).send('Please check route correctness!');
        }
        if (response.length !== 0) {
            res.status(200).send(response.reverse());
        } else {
            res.send('Something went wrong.(Check route.)');
        }
    });
};

export default findAllCoins;
