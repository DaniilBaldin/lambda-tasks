import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import getEndpoints from './controllers/cronController';

import router from './routes/router';

const PORT = process.env.PORT || 3000;
const app = express();

app.use('/', router);

app.listen(PORT, () => {
    getEndpoints();
    console.log(`Server is running on port ${PORT}.`);
});
