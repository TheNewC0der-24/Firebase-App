import React, { useState } from 'react';
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
import { FcGoogle } from 'react-icons/fc';

import { app } from '../Config/FirebaseConfig';

import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {

    let auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

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

    const handleLoginWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((response) => {
                localStorage.setItem('email', JSON.stringify(response.user.email));
                navigate('/home');
            })
            .catch((error) => {
                setShowErrorAlert(true);
                setErrorMessage(error.message);

                setTimeout(() => {
                    setShowErrorAlert(false);
                }, 3000);
            });
    }

    const handleSubmit = () => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((response) => {
                localStorage.setItem('access_token', JSON.stringify(response.user.accessToken));
                localStorage.setItem('email', JSON.stringify(response.user.email));
                setShowSuccessAlert(true);

                setTimeout(() => {
                    setShowSuccessAlert(false);
                    navigate('/home');
                }, 1000);
            })
            .catch((error) => {
                setShowErrorAlert(true);
                setErrorMessage(error.message);

                setTimeout(() => {
                    setShowErrorAlert(false);
                }, 3000);
            });
    }

    return (
        <Container maxW="4xl">

            <Box sx={{ margin: "2rem 0", height: "50px" }}>
                {showSuccessAlert && (
                    <Alert status='success'>
                        <AlertIcon />
                        <span>Login successfully</span>
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
                    <Box p={3}>
                        <Heading as="h3" color="teal" textAlign="center" sx={{ marginBottom: "2rem" }}>
                            Sign in to Account
                        </Heading>

                        <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
                            <Button onClick={handleLoginWithGoogle}>
                                <FcGoogle size={25} style={{ marginRight: "0.5rem" }} />
                                Sign in with Google
                            </Button>
                        </Box>

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
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                    <Box bgColor="teal" sx={{ padding: "3rem" }}>
                        <Heading as="h3" color="white" textAlign="center">
                            Hello, Friend!
                        </Heading>
                        <Text color="white" fontSize='lg' textAlign="center" sx={{ marginTop: "2rem" }}>
                            Fill up personal information and start journey with us
                        </Text>

                        <Button
                            sx={{
                                marginTop: "2rem", width: "100%", color: "white",
                                _hover: { bg: "white", color: "teal" }
                            }}
                            variant='outline'
                            onClick={() => navigate('/register')}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </SimpleGrid>
            </Box>
        </Container>
    )
}

export default Login;
