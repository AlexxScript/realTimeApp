import React, { useContext, useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { AuthContext } from "../context/AuthContext";

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

export const Orders = () => {
    const contextAu = useContext(AuthContext);
    const [loadingS, setLoadingS] = useState<boolean>(true);
    const [orders, setOrders] = useState<ListOrder[]>([]);

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

    useEffect(() => {
        if (contextAu.user.idSchool !== null) {
            setLoadingS(false);
        }
    }, [contextAu.user.idSchool])

    const buttonCancelOrder = (idOrder: number | string, idSchool: number | string) => {
        socket.emit('cancelOrderClient', { idOrder, idSchool });
    }

    if (loadingS) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='mainContent'>
            <h1>Orders</h1>
            <h2>Your user id is: {contextAu.user.idUser}</h2>
            {orders.map((item, index) => (
                <div className="listOrdersClient" key={index}>
                    {
                        (item.user_id === contextAu.user.idUser && !item.is_completed) ? <button onClick={() => buttonCancelOrder(item.id_orders, item.school_id)}>Cancel order</button> : ''
                    }
                    <h2>{item.total_amount}</h2>
                    <h3>Id user: {item.user_id}</h3>
                    {item.orders_content.map((it: Order, ind: number) => (
                        <div className='listContentClient' key={ind}>
                            <h3>{it.item_name}</h3>
                            <h4>Quantity:{it.qY} Unitary price:{it.price}</h4>
                        </div>
                    ))}
                    {
                        item.is_completed ?
                            <div>
                                completed
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                </svg>
                            </div>
                            :
                            <div>
                                No completed
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg>
                            </div>
                    }
                    {`Time ${new Date(item.orders_time).getHours()}:${new Date(item.orders_time).getMinutes()}`}
                </div>
            ))}
        </div>
    )
}