import { Card, CardBody, Heading, Link, Stack } from "@chakra-ui/react";
import { Books } from "./bookList";

export default function BookCard({book}: {book: Books}) {
    return (
        <>
            <Card>
                <CardBody>
                    <Stack mt='6' spacing='3'>
                        <Link href={`/books/${book.id}`}>
                            <Heading size='md'>{book.id}</Heading>
                        </Link>
                    </Stack>
                </CardBody>
            </Card>
        </>
    )
}