import { RequestHandler } from 'express';

const startMessage: RequestHandler = (req, res) => {
    res.status(200).json({
        Hello: `Hello. Please send request with '/help' route to see all available commands.`,
    });
};

export default startMessage;
