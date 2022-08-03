import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

import getEnpoints from './controllers/cron/cronController';

import router from './routes/router';

const { BOT_TOKEN, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const URI = `/webhook/${BOT_TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;
const PORT = process.env.PORT || 3000;
const app = express();

const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
    console.log(res.data);
};

app.use('/', router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

app.listen(PORT, async () => {
    getEnpoints();
    console.log(`Server is running on port ${PORT}`);
    await init();
});
