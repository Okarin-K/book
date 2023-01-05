import { Book } from '../../domain/book/book';
import { BookDao } from '../../infrastructure/book/bookDao';
import { BookRepository } from '../../infrastructure/book/bookRepository';

export class BookService {
    private dao: BookDao;
    private repository: BookRepository;

    constructor() {
        this.dao = new BookDao();
        this.repository = new BookRepository();
    }

    async findAll(): Promise<Book[]> {
        return this.dao.findAll();
    }

    async create(book: Readonly<Book>): Promise<void> {
        await this.repository.save(book);
    }
}
