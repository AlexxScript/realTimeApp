import React, { useContext, useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { AuthContext } from "../context/AuthContext";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { ShoppingCart } from "../components/ShoppingCart";

interface ListItem {
    item_name: string;
    description: string;
    price: any;
    available: boolean;
    quantity: number;
    total: number;
}

export const MenuList = () => {

    const contextAu = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ListItem[]>([]);
    const { cart, dispatch } = useShoppingCart();

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
        socket.emit('listItemsClient', { room: contextAu.user.idSchool });
        socket.on('listItemsServer', (data: { rows: ListItem[] }) => {
            setData(data.rows);
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
    }, [socket])

    useEffect(() => {
        console.log(cart);
    }, [cart]);

    const handleCart = (item: ListItem) => {
        dispatch({ type: "ADD_TO_CART", payload: item });
    }

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {data.map((item, index) => (
                        <div key={index}>
                            <p>{item.item_name + item.description + item.price + item.available + item.quantity}</p>
                            <select name="">
                                {[...Array(item.quantity).keys()].map(i => (
                                    <option key={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                            <button onClick={() => handleCart(item)}>add to cart</button>
                        </div>
                    ))}
                    <ShoppingCart dataItem={cart} />
                </div>
            )}
        </div>
    );
}