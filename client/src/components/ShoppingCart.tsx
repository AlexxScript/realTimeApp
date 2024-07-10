import React, { useState, useEffect, useContext } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { socket } from "../socket/socket";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface ItemCart {
    item_name: string; //Item name for each item
    description: string; //Description for each item
    price: any; //Price for each item
    available: boolean; //Is or not avaiable
    quantity: number; //Total quantity
    qY: number; //Quantity selected by the user
}

interface PropCart {
    dataItem: ItemCart[];
    totalAcum: number;
}

export const ShoppingCart: React.FC<PropCart> = ({ dataItem, totalAcum }) => {
    const contextAu = useContext(AuthContext);
    const [total, setTotal] = useState<number>(0);
    const { cart, dispatch } = useShoppingCart();
    const [selectedQuantities, setSelectedQuantities] = useState<{ [itemName: string]: number }>({});
    const [messageOrder, setMessageOrder] = useState('');

    useEffect(() => {
        setTotal(totalAcum);
    }, [totalAcum]);

    useEffect(() => {
        let newTotal = 0;
        for (const item of cart) {
            newTotal += item.price * item.qY;
        }
        setTotal(newTotal);
    }, [cart, selectedQuantities]);

    const handleDelete = (itemName: string) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: itemName });
    };

    const handleChange = (itemName: string, quantity: number) => {
        if (quantity === 0) {
            dispatch({ type: "REMOVE_FROM_CART", payload: itemName });
        } else {
            setSelectedQuantities(prevQuantities => ({
                ...prevQuantities,
                [itemName]: quantity,
            }));
            dispatch({ type: "UPDATE_QY", payload: itemName, qY: quantity })
        }

    };

    const makeOrder = () => {
        socket.emit("makeOrderClient", { cart: JSON.stringify(cart), totalAcum, idSchool: contextAu.user.idSchool, email: contextAu.user.email });
        socket.on("orderCreatedServer", (data) => {
            setMessageOrder(data.message);
        })
    };

    if (messageOrder === "succes") {
        return <Navigate to="/" replace />
    }

    return (
        // <div className="shoppingCart">
        <div className={`bg-slate-800 bg-opacity-50 flex justify-center items-center top-0 right-0 bottom-0 left-0 flex-1 fixed`}>
            <div className="flex h-64 justify-center">
                <div className="relative ">
                    <div className="flex flex-row cursor-pointer truncate p-2 px-4  rounded">
                        <div className="flex flex-row-reverse ml-2 w-full ">
                            <button slot="icon" className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" className="bi bi-x-circle feather text-white feather-shopping-cart w-6 h-6 mt-2 hover:text-red-500 transition-all duration-150" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    {dataItem.map((item, index) => (
                        <div className="p-2 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100" key={index} >
                            <div className="flex-auto text-sm w-32">
                                <div className="font-bold">{item.item_name}</div>
                                <div className="truncate">{item.price}</div>
                                <div className="text-gray-400">
                                    <label htmlFor="">How many?</label>
                                    {
                                        cart.map((i, index) => (
                                            <h4 key={index}>
                                                {i.item_name === item.item_name ? i.qY : ''}
                                            </h4>
                                        ))
                                    }
                                    <select
                                        name={item.item_name}
                                        value={cart.find((cartItem) => cartItem.item_name === item.item_name)?.qY || selectedQuantities[item.item_name]}
                                        onChange={(e) => handleChange(item.item_name, parseInt(e.target.value))}
                                    >
                                        {[...Array(item.quantity + 1).keys()].map((i) => (
                                            <option key={i} value={i}>
                                                {i}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="text-gray-400">{item.available}</div>
                            </div>
                            <button onClick={() => handleDelete(item.item_name)} className="flex flex-col w-18 font-medium items-end">
                                <div className="w-4 h-4 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-trash-2 ">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                </div>
                                ${item.qY * item.price}
                            </button>
                        </div>
                    ))}
                    <div className="p-4 justify-center flex">
                        <button onClick={makeOrder} className="text-base  undefined  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                                    hover:bg-teal-700 hover:text-teal-100 
                                    bg-teal-100 
                                    text-teal-700 
                                    border duration-200 ease-in-out 
                                    border-teal-600 transition">Checkout: {total}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};