import express, { Request, Response, NextFunction } from 'express';
import { connectToDatabase } from './middlewares/database';
import router from './routes/routes';

const port = 3000;
const app = express();

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

connectToDatabase().then(() => {
    app.use('/', router);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
