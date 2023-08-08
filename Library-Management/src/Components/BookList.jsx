import React from 'react';
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
} from '@chakra-ui/react';

import { AiFillEdit } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';

const BookList = () => {
    return (
        <Box sx={{ mb: 5 }}>
            <Button>
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
                        <Tr>
                            <Td>Book Name</Td>
                            <Td>Author</Td>
                            <Td>ISBN</Td>
                            <Td>
                                <Button colorScheme="yellow" variant="solid" mr={3}>
                                    <AiFillEdit style={{ marginRight: "0.2rem" }} /> Edit
                                </Button>
                                <Button colorScheme="red" variant="solid">
                                    <FaTrash style={{ marginRight: "0.2rem" }} /> Delete
                                </Button>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default BookList;
