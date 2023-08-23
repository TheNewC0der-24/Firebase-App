import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardBody,
    Stack,
    Input,
    CardFooter,
    Divider,
    ButtonGroup,
    Button,
    Alert,
    AlertIcon,
    Heading,
    CardHeader
} from '@chakra-ui/react';

import { IoLibrary } from 'react-icons/io5';
import BookDataService from '../Service/BookServices';

const AddBooks = () => {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState("Available");
    const [message, setMessage] = useState({ error: false, msg: "" });
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (title === "" || author === "") {
            setMessage({ error: true, msg: "Please fill all the fields" });
            return;
        }

        const newBook = {
            title: title,
            author: author,
            status: status
        }

        try {
            await BookDataService.addBooks(newBook);
            setMessage({ error: false, msg: "Book added successfully" });
        } catch (error) {
            setMessage({ error: true, msg: error.message });
        }

        setTitle("");
        setAuthor("");
        setStatus("Available");
    };

    useEffect(() => {
        if (message.msg) {
            setShowAlert(true);
            const timeout = setTimeout(() => {
                setShowAlert(false);
                setMessage({ error: false, msg: '' });
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [message]);

    return (
        <React.Fragment>
            <Box sx={{ margin: "1rem 0 1rem 0", height: "50px" }}>
                {showAlert && (
                    <Alert status={message?.error ? "error" : "success"}>
                        <AlertIcon />
                        <span>{message?.msg}</span>
                    </Alert>
                )}
            </Box>

            <Card variant="outline">
                <CardHeader>
                    <Heading color="blue.500" sx={{ display: "flex", alignItems: "center", gap: '0.5rem' }} size="lg">
                        <IoLibrary /> Library Management</Heading>
                </CardHeader>
                <Divider />
                <CardBody>
                    <Stack spacing={3}>
                        <Input type="text" placeholder="Book title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <Input type="text" placeholder="Book author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                        <ButtonGroup spacing='2'>
                            <Button colorScheme="blue" variant={status === "Available" ? "solid" : "outline"}
                                onClick={() => {
                                    setStatus("Available");
                                }}
                            >
                                Available
                            </Button>
                            <Button colorScheme="blue" variant={status === "Unavailable" ? "solid" : "outline"}
                                onClick={() => {
                                    setStatus("Unavailable");
                                }}
                            >
                                Unavailable
                            </Button>
                        </ButtonGroup>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <Button onClick={handleSubmit} sx={{ width: "100%" }} type="Submit" colorScheme="blue" variant="solid">
                        Add Book
                    </Button>
                </CardFooter>
            </Card>
        </React.Fragment>
    )
}

export default AddBooks;
