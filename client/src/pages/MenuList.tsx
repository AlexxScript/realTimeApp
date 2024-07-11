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
        console.log(total);
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
                <section className="mainContent">
                    <h1>Menu</h1>
                    {data.map((item, index) => (
                        <div className="itemsList" key={index}>
                            <p>{item.item_name + item.description + item.price + item.available + item.quantity}</p>
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
                            {
                                item.available ? <button onClick={() => handleCart(item)}>add to cart</button> : <button disabled>add to cart</button>
                            }
                        </div>
                    ))}
                </section>
            )}
            {/* <ShoppingCart dataItem={cart} totalAcum={total} /> */}
            {/* <ShoppingCart /> */}
        </div>
    );
}