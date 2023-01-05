import { Prisma, PrismaClient } from '@prisma/client';
import { Book } from '../../domain/book/book';
import { BookDaoInterface } from '../../domain/book/daoInterface/book';

export class BookDao implements BookDaoInterface {
    private client: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;

    constructor() {
        this.client = new PrismaClient();
    }

    async findAll(): Promise<Book[]> {
        const allBooks = await this.client.book.findMany();

        return allBooks.map((book) => {
            return new Book(book.id, book.title, book.author, book.description, book.imageLink, book.infoLink);
        });
    }
}
