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

import { useAuth } from '../Context/AuthContext';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {

    let auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [show, setShow] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClick = () => setShow(!show);

    const handleLoginWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((response) => {
                localStorage.setItem('email', JSON.stringify(response.user.email));
                navigate('/');
            })
            .catch((error) => {
                setShowErrorAlert(true);
                setErrorMessage(error.message);

                setTimeout(() => {
                    setShowErrorAlert(false);
                }, 3000);
            });
    }

    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setErrorMessage('');
            setLoading(true);
            await login(email, password);
            navigate('/');
        } catch (error) {
            setShowErrorAlert(true);
            setErrorMessage(error.message);
            setTimeout(() => {
                setShowErrorAlert(false);
            }, 3000);
        }
        setLoading(false);
    }

    return (
        <Container maxW="4xl">

            <Box sx={{ margin: "2rem 0", height: "50px" }}>
                {showErrorAlert && (
                    <Alert status='error'>
                        <AlertIcon />
                        <span>{errorMessage}</span>
                    </Alert>
                )}
            </Box>

            <Box>
                <SimpleGrid minChildWidth='250px' spacing='40px'>
                    <form onSubmit={handleSubmit}>
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
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
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
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
                                    type='submit'
                                    isLoading={loading}
                                >
                                    Sign In
                                </Button>
                            </Box>
                        </Box>
                    </form>
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
