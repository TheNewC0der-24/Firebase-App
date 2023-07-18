import { useState } from 'react';

import {
    Container,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Stack,
    Box,
} from '@chakra-ui/react';

import { app } from '../Config/FirebaseConfig';

const Authentication = () => {

    const [show, setShow] = useState(false);
    const [data, setData] = useState({});

    const handleClick = () => setShow(!show);

    const handleInput = (event) => {
        const input = { [event.target.name]: event.target.value };
        setData({ ...data, ...input });
    }

    return (
        <Container maxW="3xl">
            <Stack spacing={3}>
                <Input
                    type='email'
                    placeholder='Enter email'
                    name='email'
                    onChange={(event) => handleInput(event)}
                />

                <InputGroup>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
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
                <Button colorScheme='blue'>Submit</Button>
            </Box>
        </Container>
    )
}

export default Authentication
