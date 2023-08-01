import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Pages/Home';
import LoadingScreen from './LoadingScreen/LoadingScreen';

function App() {

  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <React.Fragment>
      {
        isLoading ? (
          <LoadingScreen />
        ) : (
          <Routes>
            <Route path='/' element={<Navigate to="/register" replace />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={
              localStorage.getItem('access_token') || localStorage.getItem('email') !== null
                ? <Home />
                : <Navigate to="/login" replace />
            } />
          </Routes>
        )
      }
    </React.Fragment>
  )
}

export default App;
