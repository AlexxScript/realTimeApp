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
    qY:number;
}

export const MenuList = () => {

    const contextAu = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ListItem[]>([]);
    const { cart, dispatch } = useShoppingCart();
    const [selectedQuantities, setSelectedQuantities] = useState<{ [itemName: string]: number }>({});
    const [total, setTotal] = useState<number>(0);

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
            const selectedQuantity = selectedQuantities[item.item_name] || 0;
            newTotal += item.price * selectedQuantity;
        }
        setTotal(newTotal);
    }, [cart, selectedQuantities]);

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

    const handleChange = (itemName: string, quantity: number,item:ListItem) => {
        setSelectedQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemName]: quantity,
        }));
        item.qY = quantity;
    };

    const handleCart = (item: ListItem) => {
        dispatch({ type: "ADD_TO_CART", payload: item, qY:selectedQuantities[item.item_name]});
        console.log(total);
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
                            <select
                                name={item.item_name}
                                value={selectedQuantities[item.item_name] || 0}
                                onChange={(e) => handleChange(item.item_name, parseInt(e.target.value),item)}
                            >
                                {[...Array(item.quantity + 1).keys()].map((i) => (
                                    <option key={i} value={i}>
                                        {i}
                                    </option>
                                ))}
                            </select>
                            <button onClick={() => handleCart(item)}>add to cart</button>
                        </div>
                    ))}
                    <ShoppingCart dataItem={cart} totalAcum={total}/>
                </div>
            )}
            
        </div>
    );
}