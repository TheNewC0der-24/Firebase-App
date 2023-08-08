import React, { useState } from 'react';
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

const AddBooks = () => {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState("Available");
    const [flag, setFlag] = useState(true);
    const [message, setMessage] = useState({ error: false, msg: "" });

    return (
        <React.Fragment>
            <Box sx={{ margin: "2rem 0 1rem 0", height: "50px" }}>
                {message?.msg && (
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
                        <Input type="text" placeholder="Book title" onChange={(e) => setTitle(e.target.value)} />
                        <Input type="text" placeholder="Book author" onChange={(e) => setAuthor(e.target.value)} />
                        <ButtonGroup spacing='2'>
                            <Button disabled={flag} colorScheme="blue" variant={flag ? "solid" : "outline"}
                                onClick={() => {
                                    setStatus("Available");
                                    setFlag(true);
                                }}
                            >
                                Available
                            </Button>
                            <Button disabled={!flag} colorScheme="blue" variant={!flag ? "solid" : "outline"}
                                onClick={() => {
                                    setStatus("Unavailable");
                                    setFlag(false);
                                }}
                            >
                                Unavailable
                            </Button>
                        </ButtonGroup>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <Button sx={{ width: "100%" }} type="Submit" colorScheme="blue" variant="solid">
                        Add Book
                    </Button>
                </CardFooter>
            </Card>
        </React.Fragment>
    )
}

export default AddBooks;
