class Book {
    public constructor(
        public readonly id: number | undefined,
        public readonly title: string,
        public readonly author: string,
        public readonly description: string,
        public readonly imageLink: string,
        public readonly infoLink: string
    ) {
        if (title.length <= 0) {
            throw new Error('No title.');
        }
    }
}
