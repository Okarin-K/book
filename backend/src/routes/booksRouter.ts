import express from 'express';

const booksRouter = express.Router();

const books = [
    {
        id: 1,
        title: 'aaa',
        category: 'マンガ',
        impressionOfBook: '面白かったぽん'
    },
    {
        id: 2,
        title: 'bbb',
        category: '小説',
        impressionOfBook: '面白かったぽん'
    },
    {
        id: 3,
        title: 'ccc',
        category: '技術書',
        impressionOfBook: '面白かったぽん'
    },
];

booksRouter.get('/', (req, res, next) => {
    res.send({
        data: {
            books 
        },
        results: {
            status: 200,
            code: 'Success'
        }
    });
});

booksRouter.post('/', (req, res, next) => {
    try {
        const body = req.body;

        console.log(body);

        if(body.title.length <= 0) {
            throw new Error('Bad Request');
        }

        const bookData = {
            id: body.id,
            title: body.title,
            category: body.category,
            impressionOfBook: body.impressionOfBook
        }

        books.push(bookData);

        res.send({
            data: {},
            results: {
                status: 200,
                code: 'Success'
            }
        });
    } catch(error) {
        next(error);
    }
});

booksRouter.get('/:id', (req, res, next) => {
    const id = req.params.id ? Number(req.params.id) : undefined;

    console.log(req.params);

    const data = books.filter(book => book.id === id);

    res.send({
        data: {
            book: data[0]
        },
        results: {
            status: 200,
            code: 'Success'
        }
    });
})

export default booksRouter;