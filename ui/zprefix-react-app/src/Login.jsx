import './Login.css';
import { useContext, useEffect, useState } from 'react';
import bcrypt from "bcryptjs";
import { AppContext } from './App.jsx';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { username, setUsername, isLoggedIn, setIsLoggedIn } = useContext(AppContext)
    const [password, setPassword] = useState('');
    const [hashedPassword, setHashedPassword] = useState('');
    const navigate = useNavigate();

    function handleSignUp() {
        navigate('/signup')
    }
    function handleSubmit() {
        if (!username || !password) {
            alert('Please enter username and password');
        }
        fetch(`http://localhost:8000/users/username/${username}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Username not found");
                } else {
                    return res.json();
                }
            })
            .then(user => {
                console.log(user)
                bcrypt.compare(password, user[0].password, function (err, result) {
                    if (err) {
                        console.log('Error comparing passwords:', err);
                    } else {
                        console.log('Password match: ', result);
                        if (!result) {
                            alert("incorect password")
                        } else {
                            setIsLoggedIn(true)
                            // localStorage.setItem('username', username);
                            localStorage.setItem('user', JSON.stringify(user[0]));
                            navigate('/items')
                        }
                    }
                });
            });
        return
    }

    function handleAllItems() {
        navigate('/allitems')
    }
    return (
        <>
            <div className="login-header flex justify-self-center gap-50 text-align-center mt-25">
                <h1>Inventory Manager</h1>
            </div>
            <div className="login-page bg-white dark:bg-gray-800 gap-y-3 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5 mt-50">
                <h3>Login:</h3>
                <input className="border rounded-sm" type="email" name="email" placeholder=" Enter Username " onChange={e => setUsername(e.target.value)}></input>
                <input className="border rounded-sm" type="password" name="password" placeholder=" Enter Password " onChange={e => setPassword(e.target.value)}></input>
                <div className="flex justify-center gap-6 mt-4">
                    <button className="bg-white text-gray-700 border border-gray-300
            rounded-md px-3 py-1 text-sm font-medium
            shadow-sm hover:bg-gray-50 hover:border-gray-400
            active:bg-gray-100 transition-all"
                        onClick={() => handleSignUp()}>Sign Up</button>
                    <button className="bg-white text-gray-700 border border-gray-300
            rounded-md px-3 py-1 text-sm font-medium
            shadow-sm hover:bg-gray-50 hover:border-gray-400
            active:bg-gray-100 transition-all"
                        onClick={() => handleSubmit()}>Submit</button>
                    <button className="bg-white text-gray-700 border border-gray-300
            rounded-md px-3 py-1 text-sm font-medium
            shadow-sm hover:bg-gray-50 hover:border-gray-400
            active:bg-gray-100 transition-all"
                        onClick={() => handleAllItems()}>Browse all Items</button>
                </div>
            </div>
        </>
    )
}

export default Login