import express from 'express';

const booksRouter = express.Router();

type Book = {
    title: string | undefined;
    author: string | undefined;
    description: string | undefined;
    imageLink: string | undefined;
    infoLink: string | undefined;
};

const books: Book[] = [];

booksRouter.get('/', (req, res, next) => {
    res.send({
        data: {
            books,
        },
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

        if (!body.title || body.title.length <= 0) {
            throw new Error('Bad Request');
        }

        const bookData: Book = {
            title: body.title,
            author: body.author,
            description: body.description,
            imageLink: body.imageLink,
            infoLink: body.infoLink,
        };

        if (books.find((book) => book.title === bookData.title)) {
            throw new Error('重複しています。');
        }

        books.push(bookData);

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
