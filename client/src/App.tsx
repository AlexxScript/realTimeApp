import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { NavBar } from "./components/NavBar";
import { Orders } from "./pages/Orders";

export const App = () => {

    const contextAu = useContext(AuthContext);

    if (contextAu.user.authenticated) {
        return (
            <div>
                <NavBar />
                <Orders />
            </div>
        )
    }

    return (
        <>
            <NavBar />
            <h1>Hey would you like to innovate the way to manage a coffe shop</h1>
        </>
    )
}

