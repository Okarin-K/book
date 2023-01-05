export interface BookRepositoryInterface {
    save(book: Readonly<Book>): Promise<void>;
}
