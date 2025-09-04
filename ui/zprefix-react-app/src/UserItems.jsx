import { useEffect, useState, useContext } from "react";
import { AppContext } from "./App.jsx";
import LogoutButton from './Logout.jsx';
import { useNavigate } from 'react-router-dom';
import AddItem from "./AddItem.jsx";
import EditItem from "./EditItem.jsx";
import DeleteItem from "./DeleteItem.jsx"

//Pretty much all commented out code was for cart functionality that I spent many hours on only to realize that it wasn't necessary... I didn't want to delete it so I just commented it out. What a thrill that was to discover... EXTRA CREDIT??!!? plz...


function UserItems() {
    const { username } = useContext(AppContext);
    const [userItems, setUserItems] = useState([]);
    // const [allItems, setAllItems] = useState([]); //for cart
    const [isEditMode, setIsEditMode] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    // const [userInventory, setUserInventory] = useState([]);  //for cart
    const navigate = useNavigate();

    function handleItemAdded(newItem) {
        setUserItems((prev) => [...prev, newItem]);
    }

    function handleEditItem(editedItem) {
        setUserItems((prev) => prev.map((item) => (item.id === editedItem.id ? editedItem : item))
        );
        setEditItemId(null);
    }

    function handleItemDeleted(itemId) {
        setUserItems((prev) => prev.filter((item) => item.id !== itemId));
    }

    // useEffect(() => {
    //     if(!username) return;
    //     const storedInventory = localStorage.getItem(`inventory_${username}`);
    //     if (storedInventory) {
    //         setUserInventory(JSON.parse(storedInventory));
    //     }
    // },[username]);

    // useEffect(() => {
    //     if(!username) return;
    //     localStorage.setItem(`inventory_${username}`, JSON.stringify(userInventory))
    // }, [userInventory, username]);

    // useEffect(() => {
    //     fetch('http://localhost:8000/items')
    //         .then((res) => res.json())
    //         .then((data) => setAllItems(data))
    //         .catch((err) => console.error(err));
    // }, []);


    useEffect(() => {
        async function fetchItems() {
            try {
                const res = await fetch(`http://localhost:8000/items/user/${username}`);
                if (!res.ok) throw new Error("failed to get the stuff");
                const data = await res.json();
                setUserItems(data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchItems();
        ////////\\\\\\\\
        // Cart stuff \\
        // fetch(`http://localhost:8000/items/user/${username}`)
        //     .then((res) => res.json())
        //     .then((data) => {
        //         if (Array.isArray(data) && data.length > 0){
        //             setUserItems(data);
        //         }
        //     })
    }, [username]);

    // useEffect(() => {
    //     fetch('http://localhost:8000/items')
    //         .then((res) => res.json())
    //         .then((data) => setAllItems(data))
    //         .catch((err) => console.error(err))
    // }, []);

    // function handleAddToInventory(item) {
    //     setUserInventory((prev) => [...prev,item]);
    // }

    // const combinedInventory = [...userItems, ...userInventory];



    // async function addItemToUser(item) {
    //     try {
    //         const res = await fetch('http://localhost:8000/items/assign', {
    //             method: 'POST',
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 user_id: userItems[0]?.user_id || item.user_id,
    //                 item_name: item.item_name,
    //                 description: item.description,
    //                 quantity: item.quantity,
    //             }),
    //         });
    //         if (res.ok) {
    //             alert('Item added');
    //             setUserItems([...userItems, item]);
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    function handleAllItems() {
        navigate('/allitems')
    }

    return (
        <div className='p-6'>
            <h1 className="text-2xl font-bold mb-4">{username}'s Items</h1>
            <button className="bg-white text-gray-700 border border-gray-300
            rounded-md px-3 py-1 text-sm font-medium
            shadow-sm hover:bg-gray-50 hover:border-gray-400
            active:bg-gray-100 transition-all"
                onClick={() => handleAllItems()}>Browse all Items</button>
            <LogoutButton />
            {userItems.length === 0 ? (
                <p>No items found.</p>
            ) : (
                <ul className="space-y-2">
                    {userItems.map((item, index) => (
                        <li key={item.id || `local-${index}`} className="border p-3 rounded-md shadow-sm bg-gray-700">
                            {editItemId === item.id ? (
                                <EditItem
                                    item={item}
                                    onSave={handleEditItem}
                                    onCancel={() => setEditItemId(null)}
                                />
                            ) : (
                                <>
                                    <p><strong>Item Name: </strong>{item.item_name}<strong>Description:</strong> {item.description} <strong>Quantity: </strong>{item.quantity}</p>
                                    <div className="mt-2 space-x-2">
                                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => setEditItemId(item.id)}>Edit</button>
                                        <DeleteItem itemId={item.id} onDelete={handleItemDeleted} />
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            {/* <button className="bg-gree-500 text-white px-2 py-1 rounded hover:bg-green-600" onClick={() => addItemToUser(item)}>Add Items</button> */}
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => setIsEditMode(!isEditMode)}>
                {isEditMode ? "Done Adding" : "Add Inventory"}
            </button>

            {isEditMode && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold mb-2">Add items to your inventory </h2>
                    <AddItem onItemAdded={handleItemAdded} />
                    {/* <ul className="space-y-2">
                        {allItems.map((item) => (
                            <li key={item.id} className="border p-2 rounded bg-gray-100 dark:bg-gray-700 flex justify-between">
                                Description: {item.description} (Quantity: {item.quantity})
                                <button className="bg-gree-500 text-white px-2 py-1 rounded hover:bg-green-600" onClick={() => addItemToUser(item)}>Add</button>
                            </li>
                        ))}
                    </ul> */}
                </div>
            )}
        </div>
    );
}

export default UserItems;