import React, { useContext, useEffect, useState } from "react";
import { socket } from "./socket/socket";
import { AuthContext } from "./context/AuthContext";

interface ListOrder {
    id_orders: any;
    user_id: any;
    school_id: any;
    orders_content: any;
    orders_time: any,
    total_amount: number;
    is_completed: boolean;
}

interface Order {
    description: string;
    item_name: string;
    price: any;
    qY: number;
}

export const App = () => {

    const contextAu = useContext(AuthContext);
    const [loadingS, setLoadingS] = useState<boolean>(true);
    const [orders, setOrders] = useState<ListOrder[]>([]);
    const [content, setContent] = useState<Order[]>([]);

    useEffect(() => {
        const room = contextAu.user.idSchool;
        const email = contextAu.user.email;
        if (contextAu.user.authenticated) {
            socket.emit('joinRoomClient', { room, email });
        }
        return () => {
            socket.off('joinRoomClient');
        };
    }, [socket, contextAu.user.idSchool, contextAu.user.email, contextAu.user.authenticated]);

    useEffect(() => {
        socket.emit("listOrdersClient", { room: contextAu.user.idSchool });
        socket.on('listOrdersServer', (data: { result: ListOrder[] }) => {
            setOrders(data.result);
            for (let i of data.result) {
                i.orders_content = JSON.parse(i.orders_content)
            }
        })

        return () => {
            socket.off("listOrdersClient");
            socket.off("listOrdersServer");
        }
    }, [socket, contextAu.user.idSchool]);


    // useEffect(()=>{
    // },[])

    useEffect(() => {
        if (contextAu.user.idSchool !== null) {
            setLoadingS(false);
        }
    }, [contextAu.user.idSchool])

    if (loadingS) {
        return <h1>Loading...</h1>
    }

    if (contextAu.user.authenticated) {
        return (
            <div>
                {orders.map((item, index) => (
    <div key={index}>
        <h2>{item.total_amount}</h2>
        <div>
            {item.orders_content.map((it:Order) => (
                <h1 key={it.qY}>{it.item_name}</h1>
            ))}
        </div>
    </div>
))}



            </div>
        )
    }

    return (
        <>
            <h1>Hey would you like to innovate the way to manage a coffe shop</h1>
        </>
    )
}

