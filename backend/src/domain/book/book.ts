export class Book {
    public readonly id: number | undefined;
    public readonly title: string;
    public readonly author: string;
    public readonly description: string;
    public readonly imageLink: string;
    public readonly infoLink: string;

    public constructor(
        id: number | undefined | undefined,
        title: string | undefined,
        author: string | undefined,
        description: string | undefined,
        imageLink: string | undefined,
        infoLink: string | undefined
    ) {
        if (!title || title.length <= 0) {
            throw new Error('No title.');
        }

        this.id = id;
        this.title = title;
        this.author = author ?? '';
        this.description = description ?? '';
        this.imageLink = imageLink ?? '';
        this.infoLink = infoLink ?? '';
    }
}
