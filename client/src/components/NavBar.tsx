import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const NavBar = () => {

    const contextAu = useContext(AuthContext);

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
            <header>
                <nav>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="burguerButton bi bi-list" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </button>
                    <ul className="ulNavbar">
                        <li><Link to="/login">Log in</Link></li>
                        <li><Link to="/register">Register user</Link></li>
                        <li><Link to="/newschool">Register school</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }

    if (contextAu.user.role === 'ADMIN') {
        return (
            <header>
                <nav>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="burguerButton bi bi-list" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </button>
                    <ul className="ulNavbar">
                        <li><Link to="/profile">{contextAu.user.email}</Link></li>
                        <li><Link to="/admin">Manage orders</Link></li>
                        <li><Link to="/admin/manage">Manage menu</Link></li>
                        <li><Link to="/">Orders</Link></li>
                        <li><button onClick={handleButtonLog}>Log out</button></li>
                    </ul>
                </nav>
            </header>
        )
    }

    return (
        <header>
            <nav>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="burguerButton bi bi-list" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                    </svg>
                </button>
                <ul className="ulNavbar">
                    <li><Link to="/profile">{contextAu.user.email}</Link></li>
                    <li><Link to="/menu">Menu</Link></li>
                    <li><Link to="/">Orders</Link></li>
                    <li><button onClick={handleButtonLog}>Log out</button></li>
                </ul>
            </nav>
        </header>
    )
}