import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [ users, setUsers ] = useState([]);
  const [ items, setItems ] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/inventory')
      .then(res => res.json())
      .then(data => setUsers(data))
  },[])
  if(users.length < 1) return <p>Loading...</p>

  return (
    <>
      <ul>
        {users.map(userData =>(
          <li key={userData.id}>{userData.description}</li>
        ))}
      </ul>
    </>
  )
}

export default App
