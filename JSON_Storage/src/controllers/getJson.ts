import { RequestHandler } from 'express';
import { collections } from '../middlewares/database';
import { jsonUrl, jsonBody } from '../models/jsonDocument';

export const getJson: RequestHandler = async (req, res, next) => {
    try {
        const url = req.params.route as unknown as jsonUrl;
        const findUrl = await collections.jsonCollection?.findOne({ url });
        if (findUrl) {
            res.status(200).send(findUrl);
        } else res.status(404).send('Route not found!');
    } catch (err) {
        return err;
    }
};
