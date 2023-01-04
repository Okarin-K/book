import { Box, Button, Container, Heading, HStack, Spacer, Spinner, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Books } from '../../../components/bookList';

export default function BookPage() {
    const router = useRouter();
    const id = router.query.id as string;

    const [loading, setLoading] = useState(true);

    const [book, setBook] = useState<Books | undefined>(undefined);

    useEffect(() => {
        const bookFetch = async () => {
            if (id == undefined) {
                return;
            }

            const response = await fetch(`http://localhost:5000/v1/api/books/${id}`);
            const json = await response.json();

            if (id) {
                console.log('入りました');
                setBook(json.data.book);
                setLoading(false);
            }
        };

        bookFetch();
    }, [id]);

    return loading ? (
        <Container>
            <Spinner />
        </Container>
    ) : (
        <>
            <Link href="/">もどるっぴ</Link>
            <VStack width="60%" ml="auto" mr="auto">
                <Heading>タイトル: {book?.title}</Heading>
                <Box>種別: {book?.category}</Box>
                <Heading size="sm">感想・レビュー</Heading>
                <Text fontSize="md">{book?.impressionOfBook}</Text>
            </VStack>
        </>
    );
}
