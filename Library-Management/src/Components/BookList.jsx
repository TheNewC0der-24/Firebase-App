import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Tag,
} from '@chakra-ui/react';

import { AiFillEdit } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';

import BookDataService from '../Service/BookServices';

const BookList = ({ getBookId }) => {

    const [books, setBooks] = useState([]);

    const getBooks = async () => {
        const data = await BookDataService.getAllBooks();
        setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        getBooks();
    }, []);

    const deleteHandle = async (id) => {
        await BookDataService.deleteBook(id);
        getBooks();
    };

    // const getBookId = async (id) => {
    //     const data = await BookDataService.getBookById(id);
    // };

    return (
        <Box sx={{ mb: 5 }}>
            <Button onClick={getBooks}>
                Refresh List
            </Button>
            <TableContainer>
                <Table variant="striped" colorScheme="blue" mt={5}>
                    <TableCaption>
                        List of Books
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Book Name</Th>
                            <Th>Author</Th>
                            <Th>Status</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            books.map((book) => (
                                <Tr key={book.id}>
                                    <Td>{book.title}</Td>
                                    <Td>{book.author}</Td>
                                    <Td>
                                        <Tag colorScheme={book.status === "Available" ? "green" : "red"}>
                                            {book.status}
                                        </Tag>
                                    </Td>
                                    <Td>
                                        <Button colorScheme="yellow" variant="solid" mr={3} onClick={(e) => getBookId(book.id)}>
                                            <AiFillEdit style={{ marginRight: "0.2rem" }} /> Edit
                                        </Button>
                                        <Button colorScheme="red" variant="solid" onClick={(e) => deleteHandle(book.id)}>
                                            <FaTrash style={{ marginRight: "0.2rem" }} /> Delete
                                        </Button>
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default BookList;
