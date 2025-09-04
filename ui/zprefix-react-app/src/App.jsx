import { useState, useEffect, useContext, createContext } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './Login.jsx';
import SignUp from './Signup.jsx';
import UserItems from './UserItems.jsx';
import Items from './Items.jsx';

export const AppContext = createContext(null);



function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const savedUsername = localStorage.getItem('username');
  //   if(savedUsername) {
  //     setUsername(savedUsername);
  //     setIsLoggedIn(true);
  //   }
  // },[]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUsername(user.username);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <AppContext.Provider value={{ username, setUsername, isLoggedIn, setIsLoggedIn }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/items" element={<UserItems />} />
          <Route path="/allitems" element={<Items />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AppContext.Provider>
    </>
  )
}

export default App
