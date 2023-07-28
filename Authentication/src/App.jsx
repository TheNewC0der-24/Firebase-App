import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { getAuth, onAuthStateChanged } from 'firebase/auth';


import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Pages/Home';

function App() {

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    } else {
      return <Navigate to="/home" replace />;
    }
  });

  return (
    <Routes>
      <Route path='/' element={<Navigate to="/register" replace />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
    </Routes>
  )
}

export default App;
