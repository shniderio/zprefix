import { useContext, useEffect, useState } from 'react';
import { AppContext } from './App.jsx';
import { useNavigate } from 'react-router-dom';

function Items() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/items')
            .then(res => res.json())
            .then(data => setItems(data))
    }, [])
    if (items.length < 1) return <p>Loading...</p>
    return (
        <>
            <div className="
                login-page 
                bg-white 
                dark:bg-gray-800 
                rounded-lg 
                px-6 
                py-8 
                ring 
                shadow-xl 
                ring-gray-900/5 
                mt-50">
                <h1>All Items</h1>
                <br></br>
            </div>
            <table className="border w-2/3 mx-auto mt-10">
                <thead>
                    <tr>
                        <th className="border px-2 py-1">Username</th>
                        <th className="border px-2 py-1">Item Name</th>
                        <th className="border px-2 py-1">Item Description</th>
                        <th className="border px-2 py-1">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item.id} className="border">
                            <td className="border px-2 py-1">{item.username}</td>
                            <td className="border px-2 py-1">{item.item_name}</td>
                            <td className="border px-2 py-1">{item.description}</td>
                            <td className="border px-2 py-1">{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Items