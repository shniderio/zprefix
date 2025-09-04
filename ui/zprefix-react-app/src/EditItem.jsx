import { useState } from "react";

function EditItem({ item, onSave, onCancel }) {
    const [editData, setEditData] = useState({
        item_name: item.item_name,
        description: item.description,
        quantity: item.quantity
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSave() {
        try {
            const res = await fetch(`http://localhost:8000/items/${item.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editData),
            });
            if (!res.ok) throw new Error("Failed to update for some reason");
            const updatedItem = await res.json();
            onSave(updatedItem);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="space-y-2">
            <input type="text" name="item_name" value={editData.item_name} onChange={handleChange} className="text-white border px-2 py-1 rounded w-full"/>
            <input type="text" name="description" value={editData.description} onChange={handleChange} className="text-white border px-2 py-1 rounded w-full"/>
            <input type="number" name="quantity" value={editData.quantity} onChange={handleChange} className="text-white border px-2 py-1 rounded w-full"/>
            <div className="space-x-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={handleSave}>Save</button>
                <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default EditItem;