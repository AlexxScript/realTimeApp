import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { ShoppingCart } from "./ShoppingCart";

export const NavBar = () => {

    const contextAu = useContext(AuthContext);
    const [navState, setNavState] = useState<boolean>(false);
    const [modalShoppingCart, setModalShoppingCart] = useState<boolean>(false);

    const handleButtonModalCart = (): void => {
        setModalShoppingCart(!modalShoppingCart);
    }

    const handleMenuButton = () => {
        setNavState(!navState)
        // console.log(cart);
    }

    const handleButtonLog = async () => {
        try {
            const res = await fetch("http://localhost:8080/user/logout", {
                method: "POST",
                credentials: "include",
            });
            const data = await res.json()
            console.log(data);
            contextAu.setUser({
                authenticated: false,
                email: '',
                role: '',
                idSchool: null,
                idUser: ''
            })
        } catch (error) {
            console.log(error);
        }
    }

    if (!contextAu.user.role) {
        return (
            <nav className="navBarNav">
                <div className="navContainer">
                    <button className="buttonBurger text-[#783016]" onClick={handleMenuButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="burguerButton bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </button>
                    <ul className={`ulNavbar ${navState ? "active" : "inactive"}`}>
                        <li><Link className="linkNav" to="/login">Log in</Link></li>
                        <li><Link className="linkNav" to="/register">Register user</Link></li>
                        <li><Link className="linkNav" to="/newschool">Register school</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }

    if (contextAu.user.role === 'ADMIN') {
        return (
            <nav className="navBarNav">
                <div className="navContainer">
                    <button className="buttonBurger text-[#783016]" onClick={handleMenuButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="burguerButton bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </button>
                    <ul className={`ulNavbar ${navState ? "active" : "inactive"}`}>
                        <li><Link className="linkNav" to="/profile">{contextAu.user.email}</Link></li>
                        <li><Link className="linkNav" to="/admin">Manage orders</Link></li>
                        <li><Link className="linkNav" to="/admin/manage">Manage menu</Link></li>
                        <li><Link className="linkNav" to="/">Orders</Link></li>
                        <li><button onClick={handleButtonLog}>Log out</button></li>
                    </ul>
                </div>
            </nav>
        )
    }

    return (
        <nav className="navBarNav">
            <div className="navContainer">
                <div className="flex flex-row justify-between">
                    <button className="buttonBurger text-[#783016]" onClick={handleMenuButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="burguerButton bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </button>
                    
                </div>
                <ul className={`ulNavbar ${navState ? "active" : "inactive"}`}>
                    <li><Link className="linkNav" to="/profile">{contextAu.user.email}</Link></li>
                    <li><Link className="linkNav" to="/menu">Menu</Link></li>
                    <li><Link className="linkNav" to="/">Orders</Link></li>
                    <li><button onClick={handleButtonLog}>Log out</button></li>
                    <li>
                        <button onClick={handleButtonModalCart} className="buttCart">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
            <ShoppingCart modalShoppingCart={modalShoppingCart} handleButtonModalCart={handleButtonModalCart} />
        </nav>
    )
}