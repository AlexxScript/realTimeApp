import React, { useContext, useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { AuthContext } from "../context/AuthContext";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { ShoppingCart } from "../components/ShoppingCart";
import { NavBar } from "../components/NavBar";
import { Navigate } from "react-router-dom";

interface ListItem {
    item_name: string; //Item name for each item
    description: string; //Description for each item
    price: any; //Price for each item
    available: boolean; //Is or not avaiable
    quantity: number; //Total quantity
    qY: number; //Quantity selected by the user
}

export const MenuList = () => {

    const contextAu = useContext(AuthContext); //Data auth
    const [loading, setLoading] = useState(true); //Loading data
    const [data, setData] = useState<ListItem[]>([]); //All items available or not to buy
    const { cart, dispatch } = useShoppingCart(); //cart: all items selected; dispatch: actions
    const [selectedQuantities, setSelectedQuantities] = useState<{ [itemName: string]: number }>({});//Count quantities per item
    const [total, setTotal] = useState<number>(0); //Total amount to pay

    useEffect(() => {
        const room = contextAu.user.idSchool;
        const email = contextAu.user.email;

        if (contextAu.user.authenticated) {
            socket.emit('joinRoomClient', { room, email });
        }

        return () => {
            socket.off('joinRoomClient');
        };
    }, [socket, contextAu.user.idSchool, contextAu.user.email, contextAu.user.authenticated, contextAu.setUser]);

    useEffect(() => {
        let newTotal = 0;
        for (const item of cart) {
            newTotal += item.price * item.qY;
        }
        setTotal(newTotal);
    }, [cart, selectedQuantities]);

    useEffect(() => {
        socket.emit('listItemsClient', { room: contextAu.user.idSchool });
        socket.on('listItemsServer', (data: { rows: ListItem[] }) => {
            console.log(data.rows);
            setData(data.rows);
            for (let i of data.rows) {
                i.qY = 0;
            }
        });
        return () => {
            socket.off('listItemsClient');
            setData([]);
        }
    }, [socket, contextAu.user.idSchool])

    useEffect(() => {
        if (contextAu.user.idSchool != null) {
            setLoading(false)
        }
    }, [contextAu.user.authenticated])

    useEffect(() => {
        socket.on('messageCreatedSuccesServer', (data) => {
            socket.emit('listItemsClient', { room: contextAu.user.idSchool });
            socket.on('listItemsServer', (data: { rows: ListItem[] }) => {
                setData(data.rows);
                setLoading(false);
            });
        });
        return () => {
            socket.off('existItemMessageServer')
            socket.off('messageCreatedSuccesServer')
            socket.off('listItemsClient')
        }
    }, [socket, contextAu.user.idSchool])

    const handleChange = (itemName: string, quantity: number) => {
        setSelectedQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemName]: quantity,
        }));
        dispatch({ type: "UPDATE_QY", payload: itemName, qY: quantity })
    };

    const handleCart = (item: ListItem) => {
        dispatch({ type: "ADD_TO_CART", payload: item, qY: selectedQuantities[item.item_name] });
        alert("Added to cart")
    }

    if (!contextAu.user.authenticated) {
        return <Navigate to="/" />
    }

    return (
        <div>
            <NavBar />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <section className="mainContent grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((item, index) => (
                        <div className="itemsList relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-blue-gray-100" key={index}>
                            <div className="relative bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none !m-0 p-6">
                                <h5 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900 capitalize">{item.item_name}</h5>
                                <p className="block antialiased font-sans text-sm leading-normal text-inherit font-normal !text-gray-500">{item.description}</p>
                                <h3 className="antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 flex gap-1 mt-4">Unitary price ${item.price}<span className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 -translate-y-0.5 self-end opacity-70"></span></h3>
                                { item.available ? <div>
                                    <span className="mx-2">Select quantities</span>
                                    <select
                                        className="my-4"
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
                                    {item.available}
                                    <button  onClick={() => handleCart(item)} className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg border border-green-500 text-green-500 hover:opacity-75 focus:ring focus:ring-green-200 active:opacity-[0.85] block w-full mt-6" type="button">Add to cart</button>
                                </div> : <h1 className="text-red-300">No available by moment</h1>}

                            </div>
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
}