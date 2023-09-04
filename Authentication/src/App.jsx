import { Routes, Route, Navigate } from 'react-router-dom';

import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Pages/Home';

import { useAuth } from './Context/AuthContext';

function App() {

  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path='/' element={currentUser ? <Home /> : <Navigate to="/login" />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App;
