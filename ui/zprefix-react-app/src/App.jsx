import { useState, useEffect, useContext, createContext } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './Login.jsx';
import SignUp from './Signup.jsx';
// import Users from './Users.jsx';
// import Items from './Items.jsx';

export const AppContext = createContext(null);



function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <AppContext value={{ username, setUsername, isLoggedIn, setIsLoggedIn }}>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/users" element={<Users />} />
          <Route path="/items/:id" element={<Items />} /> */}
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AppContext>
    </>
  )
}

export default App
