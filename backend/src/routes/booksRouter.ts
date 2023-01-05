import express from 'express';
import { BookService } from '../application/service/bookService';
import { Book } from '../domain/book/book';
import { BookRequest } from '../presentation/request/book';

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

booksRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body as BookRequest;

        const book = new Book(undefined, body.title, body.author, body.description, body.imageLink, body.infoLink);

        const service = new BookService();
        await service.create(book);

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
