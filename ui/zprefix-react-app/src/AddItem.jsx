import { useState, useContext } from "react";
import { AppContext } from "./App.jsx";

function AddItem({ onItemAdded }) {
    const { username } = useContext(AppContext);
    const [formData, setFormData] = useState({
        item_name: '',
        description: '',
        quantity: 1,
    });

    const [loading, setLoading] = useState(false);
    const [logCheck, setLogCheck] = useState('');

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!username) {
            setLogCheck('You must be logged in to add an item.')
            return;
        }

        setLoading(true);
        setLogCheck('');

        try {
            const res = await fetch('http://localhost:8000/items', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    username,
                }),
            });

            if (!res.ok) throw new Error('Failed to add item');
            const newItem = await res.json();

            if (onItemAdded) onItemAdded(newItem);
            setFormData({ item_name: '', description: '', quantity: 1 });
        } catch (err) {
            setLogCheck(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3 p-4 border rounded-md shadow-md bg-white">
            <h2 className="text-black text-xl font-bold">Add New Item</h2>
            
            {logCheck && <p className="text-red-500">{logCheck}</p>}

            <div>
                <label className="text-black block font-semibold">Item Name</label>
                <input type="text" name="item_name" value={formData.item_name} onChange={handleChange} className="text-black border px-2 py-1 rounded w-full"  />
            </div>
            
            <div>
                <label className="text-black block font-semibold">Description</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} className="text-black border px-2 py-1 rounded w-full"  />
            </div>

            <div>
                <label className="text-black block font-semibold">Quantity</label>
                <input type="text" name="quantity" value={formData.quantity} min='1' onChange={handleChange} className="text-black border px-2 py-1 rounded w-full"  />
            </div>

            <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded hoveer:bg-blue-600 disabled:opacity-50">{loading ? "Adding..." : "Add Item"}</button>
        </form>
    );
}

export default AddItem;