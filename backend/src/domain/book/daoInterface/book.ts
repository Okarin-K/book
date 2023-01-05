import { Book } from '../book';

export interface BookDaoInterface {
    findAll(): Promise<Book[]>;
}
