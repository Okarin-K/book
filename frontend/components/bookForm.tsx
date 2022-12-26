import { Button, Container, FormControl, FormLabel, HStack, Input, Select, Spacer, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function BookForm() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [impressionOfBook, setImpressionOfBook] = useState("");

    const router = useRouter();

    const submit = () => {
        const requestBody = {
            id: 'hogehoge',
            title,
            category,
            impressionOfBook
        };

        console.log(requestBody);

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        try {
            fetch('http://localhost:5000/v1/api/books', {
                method: 'post',
                headers,
                body: JSON.stringify(requestBody)
            }).then((response) => {
                response.json().then(json => {
                    console.log(json);

                    if(json.results.status === 500) {
                        alert('サーバーエラーです')
                    }
                });

                setTitle("");
                setCategory("マンガ");
                setImpressionOfBook("");
                
                router.replace('/');
            });
        } catch(error) {
            console.error(error)
        }
    }

    return (
        <>
            <Container>
                <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Category</FormLabel>
                    <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value='マンガ'>マンガ</option>
                        <option value='小説'>小説</option>
                        <option value='技術書'>技術書</option>
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Impression of Book</FormLabel>
                    <Textarea value={impressionOfBook} onChange={e => setImpressionOfBook(e.target.value)}></Textarea>
                </FormControl>
                <HStack marginTop='24px'>
                    <Spacer />
                    <Button onClick={submit}>登録</Button>
                    <Spacer />
                </HStack>
            </Container>
        </>
    )
}