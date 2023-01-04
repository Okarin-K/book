import {
    Box,
    Button,
    Heading,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    useDisclosure,
} from '@chakra-ui/react';
import Head from 'next/head';
import BookForm from '../components/bookForm';
import BookList from '../components/bookList';

export default function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Head>
                <title>book manager</title>
                <meta name="description" content="book manager." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <HStack>
                <Spacer />
                <Button onClick={onOpen}>買った本を登録する</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>登録する本を選んでね</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <BookForm />
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Spacer />
            </HStack>
            <Box maxW="80%" ml="auto" mr="auto">
                <BookList />
            </Box>
        </>
    );
}
