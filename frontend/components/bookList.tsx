import { SimpleGrid, Spinner, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import BookCard from './bookCard';
import { Book } from './bookForm';

export default function BookList() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:5000/v1/api/books');
                const json = await response.json();

                console.log(json);

                setBooks(json.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <>
            <SimpleGrid padding="12px" spacing={4} templateColumns="repeat(auto-fill, minmax(400px, 1fr))">
                {books ? (
                    books.map((book) => <BookCard book={book} />)
                ) : (
                    <VStack>
                        <Spinner />
                    </VStack>
                )}
            </SimpleGrid>
        </>
    );
}
