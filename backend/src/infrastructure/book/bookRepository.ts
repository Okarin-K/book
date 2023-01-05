import { Prisma, PrismaClient } from '@prisma/client';
import { Book } from '../../domain/book/book';
import { BookRepositoryInterface } from '../../domain/book/repositoryInterface/book';

export class BookRepository implements BookRepositoryInterface {
    private client: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;

    constructor() {
        this.client = new PrismaClient();
    }

    async save(book: Readonly<Book>): Promise<void> {
        await this.client.book.create({
            data: { ...book },
        });
    }
}
