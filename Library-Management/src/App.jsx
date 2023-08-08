import React from 'react';
import { Container, Divider } from '@chakra-ui/react';

import AddBooks from './Components/AddBooks';
import BookList from './Components/BookList';

function App() {

  return (
    <React.Fragment>
      <Container maxW='xl'>
        <AddBooks />
      </Container>
      <Divider sx={{ mt: 5, mb: 5 }} />
      <Container maxW='5xl'>
        <BookList />
      </Container>
    </React.Fragment>
  )
}

export default App;
