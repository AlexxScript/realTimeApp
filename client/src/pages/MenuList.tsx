import React, { useContext, useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { AuthContext } from "../context/AuthContext";
import { useShoppingCart } from "../context/ShoppingCartContext";

interface ListItem {
    item_name: string,
    description: string,
    price: any,
    available: boolean
}

export const MenuList = () => {

    const contextAu = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ListItem[]>([]);
    const { cart,dispatch } = useShoppingCart();

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

    const handleCart = (item:ListItem) => {
        dispatch({type:"ADD_TO_CART",payload:item});
    }

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {data.map((item, index) => (
                        <div key={index}>
                            <p>{item.item_name + item.description + item.price + item.available}</p>
                            <button onClick={()=>handleCart(item)}>add to cart</button>
                        </div>
                    ))}
                    {cart.map((item,index)=>(
                        <div key={index}>
                            <p>{item.item_name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}