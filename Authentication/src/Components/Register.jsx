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
    Text,
    FormHelperText,
    FormControl
} from '@chakra-ui/react';

import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';

import { useAuth } from '../Context/AuthContext';

const Register = () => {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { signup } = useAuth();

    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setErrorMessage('');
            setLoading(true);
            await signup(email, password);
            navigate('/');
        } catch (error) {
            setErrorMessage(error.message);
            setShowErrorAlert(true);
            setTimeout(() => {
                setShowErrorAlert(false);
                setErrorMessage('');
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
                <SimpleGrid minChildWidth='300px' spacing='40px'>
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
                    <form onSubmit={handleSubmit}>
                        <Box p={3}>
                            <Heading as="h3" color="teal" textAlign="center" sx={{ marginBottom: "2rem" }}>
                                Create Account
                            </Heading>

                            <Stack spacing={5}>
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
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder='Enter password'
                                        focusBorderColor='teal'
                                        name='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='sm' onClick={handleClickShowPassword}>
                                            {showPassword ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none'>
                                            <RiLockPasswordLine color='teal' />
                                        </InputLeftElement>
                                        <Input
                                            pr='4.5rem'
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder='Confirm password'
                                            focusBorderColor='teal'
                                            name='password'
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />

                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleClickShowConfirmPassword}>
                                                {showConfirmPassword ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    {
                                        password !== confirmPassword &&
                                        <FormHelperText textColor="red.400">Passwords should match</FormHelperText>
                                    }
                                </FormControl>
                            </Stack>
                            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                                <Button
                                    colorScheme='teal'
                                    type='submit'
                                    isLoading={loading}
                                >
                                    Sign Up
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </SimpleGrid>
            </Box>
        </Container >
    )
}

export default Register;

