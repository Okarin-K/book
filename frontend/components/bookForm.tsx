import { Button, Flex, FormControl, FormLabel, HStack, Image, Input, Link, Spacer, Stack, useToast, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export type Book = {
    title: string | undefined;
    author: string | undefined;
    description: string | undefined;
    imageLink: string | undefined;
    infoLink: string | undefined;
};

export default function BookForm() {
    const router = useRouter();
    const toast = useToast();

    const [title, setTitle] = useState('');
    const [searchBooks, setSearchBooks] = useState([]);
    const [requestBody, setRequestBody] = useState<Book | undefined>(undefined);

    const search = async () => {
        if (!title) {
            return;
        }

        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&maxResults=10&filter=paid-ebooks`);
        const json = await response.json();

        if (!json.items || !json.items.length) {
            alert('見つかりません');
            return;
        }

        const books = json.items.map((item: any) => ({
            id: item.id ?? '',
            title: item.volumeInfo?.title ?? '',
            author: item.volumeInfo?.authors ? item.volumeInfo.authors[0] : '',
            description: item.volumeInfo?.description ?? '',
            imageLink: item.volumeInfo?.imageLinks?.thumbnail ?? '',
            infoLink: item.volumeInfo?.infoLink ?? '',
        }));

        setSearchBooks(books);
    };

    const submit = async () => {
        console.log(requestBody);

        if (!requestBody) {
            toast({
                title: '登録する本を選んでください',
                status: 'error',
                duration: 9000,
                position: 'top-right',
                isClosable: true,
            });
            return;
        }

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        try {
            const response = await fetch('http://localhost:5000/v1/api/books', {
                method: 'post',
                headers,
                body: JSON.stringify(requestBody),
            });

            const json = await response.json();
            console.log(json);

            if (json.results.status === 500) {
                alert('サーバーエラーです');
            }

            setTitle('');

            toast({
                title: '登録しました！',
                status: 'success',
                duration: 9000,
                position: 'top-right',
                isClosable: true,
            });
        } catch (error) {
            console.error(error);
            toast({
                title: 'サーバーエラーが発生しました',
                description: '時間をおいて再度実行してください',
                status: 'error',
                duration: 9000,
                position: 'top-right',
                isClosable: true,
            });
        }
    };

    return (
        <>
            <VStack w="80%" ml="auto" mr="auto">
                <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setSearchBooks([]);
                        }}
                    />
                </FormControl>
                <Button onClick={async () => search()}>検索</Button>
                <Flex direction="row" flexWrap="wrap">
                    {searchBooks.map((book: any) => (
                        <Stack key={book.title} direction="column" ml="4" mr="4">
                            <Image w="100px" h="150px" src={book.imageLink}></Image>
                            <Link href={book.infoLink} target="_blank">
                                {book.title}
                            </Link>
                            <Button
                                onClick={() => {
                                    const body = {
                                        title: book.title,
                                        author: book.author,
                                        description: book.description,
                                        imageLink: book.imageLink,
                                        infoLink: book.infoLink,
                                    };

                                    setRequestBody(body);

                                    toast({
                                        title: '選択しました！',
                                        status: 'success',
                                        duration: 9000,
                                        position: 'top-right',
                                        isClosable: true,
                                    });
                                }}
                            >
                                選択する
                            </Button>
                        </Stack>
                    ))}
                </Flex>
                <HStack marginTop="24px">
                    <Spacer />
                    <Button onClick={submit}>保存</Button>
                    <Spacer />
                </HStack>
            </VStack>
        </>
    );
}
