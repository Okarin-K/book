import { BookDao } from 'src/infrastructure/book/bookDao';

export class BookService {
    private dao: BookDao;

    constructor() {
        this.dao = new BookDao();
    }

    async findAll(): Promise<Book[]> {
        return this.dao.findAll();
    }
}
