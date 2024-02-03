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
    is_completed: boolean;
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

    useEffect(() => {
        socket.on('messageUpdateStatusServer', () => {
            socket.emit('listOrdersClient', { room: contextAu.user.idSchool });
            socket.on('listOrdersServer', (data: { result: ListOrder[] }) => {
                setOrders(data.result);
            });
        });
        return () => {
            socket.off('listOrdersClient');
            socket.off('listOrdersServer');
        }
    }, [socket])
    
    // useEffect(() => {
    //     for(let i of orders){
    //         const fecha = new Date(i.orders_time);
    //         console.log(fecha.getHours(),fecha.getMinutes())
    //     }
    // }, [orders])

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
                <h1>Orders</h1>
                <h2>Your id user is {contextAu.user.idUser}</h2>
                {orders.map((item, index) => (
                    <div className="listOrdersClient" key={index}>
                        <h2>{item.total_amount}</h2>
                        <h3>Id user: {item.user_id}</h3>
                        {item.orders_content.map((it: Order,ind:number) => (
                            <div className='listContentClient' key={ind}>
                                <h3>{it.item_name}</h3>
                                <h4>Quantity:{it.qY} Unitary price:{it.price}</h4>
                            </div>
                        ))}
                        {
                            item.is_completed ? <b>completed</b> : <b>No completed</b>
                        }
                        {`Time ${new Date(item.orders_time).getHours()}:${new Date(item.orders_time).getMinutes()}`}
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

