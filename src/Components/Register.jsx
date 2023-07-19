import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    Container,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Button,
    Stack,
    Alert,
    AlertIcon,
    SimpleGrid,
    Heading,
    Text
} from '@chakra-ui/react';

import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {

    let auth = getAuth();

    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [data, setData] = useState({});

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleClick = () => setShow(!show);

    const handleInput = (event) => {
        const input = { [event.target.name]: event.target.value };
        setData({ ...data, ...input });
    }

    const handleSubmit = () => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((response) => {
                console.log(response);
                setShowSuccessAlert(true);

                setTimeout(() => {
                    setShowSuccessAlert(false);
                    navigate('/login');
                }, 3000);
            })
            .catch((error) => {
                setShowErrorAlert(true);
                setErrorMessage(error.message);

                setTimeout(() => {
                    setShowErrorAlert(false);
                }, 3000);
            })
    }

    return (
        <Container maxW="4xl">

            <Box sx={{ margin: "2rem 0", height: "50px" }}>
                {showSuccessAlert && (
                    <Alert status='success'>
                        <AlertIcon />
                        <span>User Register successfully</span>
                    </Alert>
                )}

                {showErrorAlert && (
                    <Alert status='error'>
                        <AlertIcon />
                        <span>{errorMessage}</span>
                    </Alert>
                )}
            </Box>

            <Box>
                <SimpleGrid minChildWidth='250px' spacing='40px'>
                    <Box bgColor="teal" sx={{ padding: "3rem" }}>
                        <Heading as="h3" color="white" textAlign="center">
                            Welcome Back!
                        </Heading>
                        <Text color="white" fontSize='lg' textAlign="center" sx={{ marginTop: "2rem" }}>
                            To keep connected with us please login with your personal information
                        </Text>

                        <Button
                            sx={{
                                marginTop: "2rem", width: "100%", color: "white",
                                _hover: { bg: "white", color: "teal" }
                            }}
                            variant='outline'
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Button>
                    </Box>
                    <Box p={3}>
                        <Heading as="h3" color="teal" textAlign="center" sx={{ marginBottom: "2rem" }}>
                            Create Account
                        </Heading>

                        <Stack spacing={3}>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <HiOutlineMail color='teal' />
                                </InputLeftElement>
                                <Input
                                    type='email'
                                    placeholder='Enter email'
                                    focusBorderColor='teal'
                                    name='email'
                                    onChange={(event) => handleInput(event)}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <RiLockPasswordLine color='teal' />
                                </InputLeftElement>
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
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                            <Button
                                colorScheme='teal'
                                onClick={handleSubmit}
                            >
                                Sign Up
                            </Button>
                        </Box>
                    </Box>
                </SimpleGrid>
            </Box>
        </Container>
    )
}

export default Register;

