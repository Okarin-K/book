import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import booksRouter from './routes/booksRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use('/v1/api/books', booksRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('エラーハンドラーです');
    console.error(err.message);

    res.send({
        data: {},
        results: {
            status: 500,
            code: 'Server error.'
        }
    });
});

app.listen(5000, () => {
    console.log('Listening to server...');
});
