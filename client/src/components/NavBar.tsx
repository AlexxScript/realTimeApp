import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const NavBar = () => {
    
    const contextAu = useContext(AuthContext);

    return (
        <header>
            <nav>
                <h1>{contextAu.user.email}</h1>
            </nav>
        </header>
    )
}