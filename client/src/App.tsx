import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { NavBar } from "./components/NavBar";
import { Orders } from "./pages/Orders";

export const App = () => {

    const contextAu = useContext(AuthContext);

    if (contextAu.user.authenticated) {
        return (
            <>
                <NavBar />
                <main>
                    <section className="mainContent">
                        <Orders />
                    </section>
                </main>
            </>
        )
    }

    return (
        <>
            <NavBar />
            <main>
                <section className="mainContent">
                    <h1>Hey would you like to innovate the way to manage a coffe shop?</h1>
                </section>
            </main>
        </>
    )
}

