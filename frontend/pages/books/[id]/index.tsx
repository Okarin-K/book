import { Box, Container, Heading, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Books } from "../../../components/bookList";

export default function BookPage() {
    const router = useRouter();
    const id = router.query.id as string;

    console.log(router.query);

    const [loading, setLoading] = useState(true);

    const [book, setBook] = useState<Books | undefined>(undefined);

    useEffect(() => {
        const bookFetch = async () => {
            const response = await fetch(`http://localhost:5000/v1/api/books/${id}`);
            const json = await response.json();

            setBook(json.data.book);
        }

        bookFetch().then(() => {
            if(book) {
                setLoading(false);
            }
        });
    }, []);

    return (
        loading ?
        <Container>
            <Spinner />
        </Container>
        :
        <Box>
            <Heading size='md'>{book?.title}</Heading>
            <Text>{book?.category}</Text>
            <Text>{book?.impressionOfBook}</Text>
        </Box>
    )
}