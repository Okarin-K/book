export interface BookDaoInterface {
    findAll(): Promise<Book[]>;
}
