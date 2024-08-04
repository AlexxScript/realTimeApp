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
            if (res.ok) {
                alert("Log out succesfully")
            }
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
            <header className="fixed top-0 z-20 w-screen bg-amber-200">
                <nav className=" flex justify-between items-center h-16 w-[80%] mx-auto
                                xl:w-[1024px]">
                    <Link className="text-[20px]" to="/">Logo</Link>
                    <div className="">
                        <ul className={`flex flex-col  h-screen w-screen mt-[50px] ${navState ? "absolute right-0" : "absolute right-[-110%]"} transition-all duration-100 bg-slate-50
                                        md:bg-transparent md:flex-row md:h-full md:w-full md:m-0 md:[position:unset] lg:max-w-[900px] lg:w-full min[1440px]:max-w-[1200px]`}>
                            <li className="border-b md:border-0"><Link className="w-full block py-3 px-5" to="/login">Log in</Link></li>
                            <li className="border-b md:border-0"><Link className="w-full block py-3 px-5" to="/register">Register user</Link></li>
                            <li className="border-b md:border-0"><Link className="w-full block py-3 px-5" to="/newschool">Register school</Link></li>
                        </ul>
                        <button className="md:hidden" onClick={handleMenuButton}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className=" bi bi-list" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </header>
        )
    }

    if (contextAu.user.role === 'ADMIN') {
        return (
            <header className="fixed top-0 z-20 w-screen bg-amber-200">
                <nav className=" flex justify-between items-center h-16 w-[80%] mx-auto
                                xl:w-[1024px]">
                    <Link className="text-[20px]" to="/">Logo</Link>
                    <div className="">
                        <ul className={`flex flex-col  h-screen w-screen mt-[50px] ${navState ? "absolute right-0" : "absolute right-[-110%]"} transition-all duration-100 bg-slate-50
                                        md:bg-transparent md:flex-row md:h-full md:w-full md:m-0 md:[position:unset] lg:max-w-[1000px] lg:w-full min[1440px]:max-w-[1200px]`}>
                            <li className="border-b md:border-0"><Link className="w-full block py-3 px-5" to="/profile">{contextAu.user.email}</Link></li>
                            <li className="border-b md:border-0"><Link className="w-full block py-3 px-5" to="/admin">Manage orders</Link></li>
                            <li className="border-b md:border-0"><Link className="w-full block py-3 px-5" to="/admin/manage">Manage menu</Link></li>
                            <li className="border-b md:border-0"><Link className="w-full block py-3 px-5" to="/">Orders</Link></li>
                            <li className="border-b md:border-0"><button className="w-full block py-3 px-5" onClick={handleButtonLog}>Log out</button></li>
                        </ul>
                        <button className="md:hidden" onClick={handleMenuButton}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </header>
        )
    }

    return (
        <header className="fixed top-0 z-20 w-screen bg-amber-200">
            <nav className=" flex justify-between items-center h-16 w-[80%] mx-auto
                                xl:w-[1024px]">
                <Link className="text-[20px]" to="/">Logo</Link>
                <div className="">
                    <ul className={`flex flex-col  h-screen w-screen mt-[50px] ${navState ? "absolute right-0" : "absolute right-[-110%]"} transition-all duration-100 bg-slate-50
                                        md:bg-transparent md:flex-row md:h-full md:w-full md:m-0 md:[position:unset] lg:max-w-[900px] lg:w-full min[1440px]:max-w-[1200px]`}>
                        <li className="border-b md:border-0"><Link className="w-full block py-3 px-5" to="/profile">{contextAu.user.email}</Link></li>
                        <li className="border-b md:border-0"><Link className="w-full block py-3 px-5" to="/menu">Menu</Link></li>
                        <li className="border-b md:border-0"><Link className="w-full block py-3 px-5" to="/">Orders</Link></li>
                        <li className="border-b md:border-0">
                            <button onClick={handleButtonModalCart} className="w-full block py-3 px-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                </svg>
                            </button>
                        </li>
                        <li className="border-b md:border-0"><button className="w-full block py-3 px-5" onClick={handleButtonLog}>Log out</button></li>
                    </ul>
                    <button className="md:hidden" onClick={handleMenuButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </button>
                </div>
                <ShoppingCart modalShoppingCart={modalShoppingCart} handleButtonModalCart={handleButtonModalCart} />
            </nav>
        </header>
    )
}