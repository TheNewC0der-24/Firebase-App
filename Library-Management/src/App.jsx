import React, { useState } from 'react';
import { Container, Divider } from '@chakra-ui/react';

import AddBooks from './Components/AddBooks';
import BookList from './Components/BookList';

function App() {

  const [bookId, setBookId] = useState("");

  const getBookIdHandler = (id) => {
    setBookId(id);
  }

  return (
    <React.Fragment>
      <Container maxW='xl'>
        <AddBooks id={bookId} setBookId={setBookId} />
      </Container>
      <Divider sx={{ mt: 5, mb: 5 }} />
      <Container maxW='5xl'>
        <BookList getBookId={getBookIdHandler} />
      </Container>
    </React.Fragment>
  )
}

export default App;
