import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Home";
import Login from "./Login";
import Registration from "./Registration";
import ComplitedOrders from "./ComplitedOrders";
import Cart from './Cart';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Routing() {

    const [pets, setPets] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [cart, setCart] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailIsValid, setEmailIsValid] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [orders, setOrders] = useState([])

    useEffect(() => {

        const emailStore = localStorage.getItem("email");
        const passwordStore = localStorage.getItem("password");
        const usersStore = JSON.parse(localStorage.getItem("users"))["users"];

        if (emailStore && passwordStore) {
            setUser({ emailStore, passwordStore });
        }
        
        if (Array.isArray(usersStore)) {
            setUsers(usersStore);
        }

    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={<Login
                        users={users}
                        setUsers={setUsers}
                        user={user}
                        setUser={setUser}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        emailIsValid={emailIsValid}
                        setEmailIsValid={setEmailIsValid}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        error={error}
                        setError={setError}
                        isLoaded={isLoaded}
                        pets={pets}
                    />}
                />
                <Route 
                    path="/register"
                    element={<Registration 
                        users={users}
                        setUsers={setUsers}
                        user={user}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        setEmailIsValid={setEmailIsValid}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        error={error}
                        setError={setError}
                        setUser={setUser}
                        isLoaded={isLoaded}
                        pets={pets}
                    />}
                />
                <Route
                    path="/cart"
                    element={<Cart
                        cart={cart}
                        setCart={setCart}
                        pets={pets}
                        orders={orders}
                        setOrders={setOrders}
                        user={user}
                        />}
                />
                <Route
                    path="/orders"
                    element={<ComplitedOrders
                        user={user}
                        orders={orders}
                    />}
                />
                <Route
                    path="/"
                    element={<Home
                        pets={pets}
                        user={user}
                        cart={cart}
                        setCart={setCart}
                        setPets={setPets}
                        isLoaded={isLoaded}
                        setIsLoaded={setIsLoaded} 
                    />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Routing />
    </React.StrictMode>
);
