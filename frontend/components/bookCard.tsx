import { Card, CardBody, Heading, Image, Link, Stack, Text } from '@chakra-ui/react';
import { Book } from './bookForm';

export default function BookCard({ book }: { book: Book }) {
    return (
        <>
            <Card>
                <CardBody>
                    <Stack mt="6" spacing="3">
                        <Link href={book.infoLink} target="_blank">
                            <Image src={book.imageLink}></Image>
                        </Link>
                        <Heading size="sm">{book.title}</Heading>
                    </Stack>
                </CardBody>
            </Card>
        </>
    );
}
