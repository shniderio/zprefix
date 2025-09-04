function DeleteItem({ itemId, onDelete }) {
    async function handleDelete() {
        try {
            const res = await fetch(`http://localhost:8000/items/${itemId}`, {
                method: "DELETE"
            });
            if(!res.ok) throw new Error("What a suprise something failed to work again. didnt delete");
            onDelete(itemId);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={handleDelete}>Delete</button>
    );
}

export default DeleteItem;