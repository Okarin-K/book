import { Box, Button, HStack, Spacer } from '@chakra-ui/react'
import { Inter } from '@next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import BookList from '../components/bookList'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>book manager</title>
        <meta name="description" content="book manager." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <HStack>
        <Spacer />
        <Link href='/book-register'>
          <Button>読んだ本を登録する</Button>
        </Link>
        <Spacer />
      </HStack>
      <Box maxW='80%' ml='auto' mr='auto'>
        <BookList />
      </Box>
    </>
  )
}
