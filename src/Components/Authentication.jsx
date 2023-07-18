import { useState } from 'react';

import {
    Box,
    Container,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Stack,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';

import { app } from '../Config/FirebaseConfig';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Authentication = () => {

    let auth = getAuth();

    const [show, setShow] = useState(false);
    const [data, setData] = useState({});

    const handleClick = () => setShow(!show);

    const handleInput = (event) => {
        const input = { [event.target.name]: event.target.value };
        setData({ ...data, ...input });
    }

    const handleSubmit = () => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                document.getElementById('alert').style.display = 'flex';
                document.getElementById('alertMessage').innerHTML = error.message;
            })
    }

    return (
        <Container maxW="3xl">
            <Alert status='error' style={{ display: "none", marginBottom: "2rem" }} id='alert'>
                <AlertIcon />
                <span id='alertMessage'></span>
            </Alert>
            <Stack spacing={3}>
                <Input
                    type='email'
                    placeholder='Enter email'
                    focusBorderColor='teal'
                    name='email'
                    onChange={(event) => handleInput(event)}
                />

                <InputGroup>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        focusBorderColor='teal'
                        name='password'
                        onChange={(event) => handleInput(event)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Stack>
            <Box sx={{ mt: 3 }}>
                <Button colorScheme='teal' onClick={handleSubmit}>Submit</Button>
            </Box>
        </Container>
    )
}

export default Authentication
