import './App.css';

import { Heading } from '@chakra-ui/react'

import Authentication from './Components/Authentication';

function App() {

  return (
    <div>
      <Heading sx={{ textAlign: "center", margin: '5rem 0' }}>Firebase</Heading>
      <Authentication />
    </div>
  )
}

export default App
