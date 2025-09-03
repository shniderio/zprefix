import { useContext, useEffect, useState } from 'react';
import { AppContext } from './App.jsx';
import { useNavigate } from 'react-router-dom';

function Items() {
    const [ items, setItems ] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/items')
            .then(res => res.json())
            .then(data => setItems(data))
    },[])
    if (items.length < 1) return <p>Loading...</p>
    return(
        <>
            <h1>All Items</h1>
            <ul>
                {items.map(item =>(
                    <li key={item.id}>id:{item.id} ||| {item.user_id} ||| {item.description} ||| {item.quantity}</li>
                ))}
            </ul>
        </>
    )
}

export default Items