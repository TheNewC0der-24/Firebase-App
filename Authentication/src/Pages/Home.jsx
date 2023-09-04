import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    CardBody,
    Image,
    CardFooter,
    Heading,
    Text,
    Divider,
    Button,
} from '@chakra-ui/react';

import { SiFirebase } from 'react-icons/si';

import logo from '../assets/logo.png';

import { useAuth } from '../Context/AuthContext';

const Home = () => {

    const navigate = useNavigate();

    const email = localStorage.getItem("email");
    const formattedEmail = email?.replace(/"/g, "");

    const { logout, currentUser } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("email");
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <React.Fragment>
            <Box p={2}>
                <Heading sx={{ display: "flex" }} size='md' textTransform='uppercase'>
                    Powered by ~ <SiFirebase style={{ marginLeft: "0.5rem", marginRight: "0.2rem", color: "FFA611" }} />Firebase
                </Heading>
            </Box>
            <Box sx={{ display: "grid", margin: "auto", padding: "5rem 0" }} maxWidth="container.sm">
                <Card variant="filled" align="center">
                    <CardBody align="center">
                        <Image
                            src={logo}
                            alt='logo'
                            width={100}
                        />
                        <Box mt={5}>
                            <Heading size='md'>
                                Hey {formattedEmail || currentUser.email} <span role='img'>👋</span>
                            </Heading>
                            <Heading size='md'>
                                Welcome to the our app
                            </Heading>
                            <Text pt='2' fontSize='md'>
                                You are logged in, Hurray!
                            </Text>
                        </Box>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Button variant='solid' colorScheme='teal' onClick={handleLogout}>
                            Logout
                        </Button>
                    </CardFooter>
                </Card>
            </Box>
        </React.Fragment>
    )
}

export default Home;
