import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./App";

function LogoutButton() {
    const { setUsername, setIsLoggedIn } = useContext(AppContext);
    const navigate = useNavigate();

    function handleLogout(){
        localStorage.removeItem('username');
        setUsername('');
        setIsLoggedIn(false);
        navigate('/');
    }

    return(
        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 absolute top-5 right-5" onClick={handleLogout}>Logout</button>
    );
}

export default LogoutButton;