import { RequestHandler } from 'express';
import { collections } from '../middlewares/database';
import { jsonUrl, jsonBody } from '../models/jsonDocument';

export const postJson: RequestHandler = async (req, res, next) => {
    try {
        const url = req.params.route as unknown as jsonUrl;
        const reqBody = req.body as jsonBody;
        const oldUrl = await collections.jsonCollection?.findOne({ url });
        if (oldUrl) {
            res.status(500).send('Url already exists! Please enter new url.');
        }
        const result = await collections.jsonCollection?.insertOne({ url, reqBody });
        result ? res.status(201).send('Succesfully created new item in database!') : res.status(500).send('Failed to create a new item!');
    } catch (err) {
        return err;
    }
};
