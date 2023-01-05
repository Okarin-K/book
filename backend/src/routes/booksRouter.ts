import express from 'express';
import { BookService } from 'src/application/service/bookService';

const booksRouter = express.Router();

booksRouter.get('/', async (req, res, next) => {
    const service = new BookService();
    const data = await service.findAll();

    res.send({
        data,
        results: {
            status: 200,
            code: 'Success',
        },
    });
});

booksRouter.post('/', (req, res, next) => {
    try {
        const body = req.body as Book;

        console.log(body);

        res.send({
            data: {},
            results: {
                status: 200,
                code: 'Success',
            },
        });
    } catch (error) {
        next(error);
    }
});

export default booksRouter;
