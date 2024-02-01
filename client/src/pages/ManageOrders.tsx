import React, { useContext, useEffect, useState } from 'react';
import { socket } from '../socket/socket';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

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

export const ManageOrders = () => {

    const contextAu = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [orders, setOrders] = useState<ListOrder[]>([]);

    useEffect(() => {
        socket.emit('listOrdersClient', { room: contextAu.user.idSchool });
        socket.on('listOrdersServer', (data: { result: ListOrder[] }) => {
            setOrders(data.result);
            for (let i of data.result) {
                i.orders_content = JSON.parse(i.orders_content)
            }
        })

        return () => {
            socket.off('listOrdersClient');
            socket.off('listOrdersServer');
        }
    }, [socket, contextAu.user.authenticated])

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
        if (contextAu.user.idSchool != null) {
            setLoading(false)
        }
    }, [contextAu.user.idSchool])

    useEffect(() => {
        for (let i of orders) {
            console.log(i.is_completed);
        }
    }, [orders])

    const handleClick = (idOrder: number | string, idSchool: number | string) => {
        socket.emit('updateStatuOrderClient', { idOrder, idSchool })
    }

    if (loading) {
        return <h1>Loading</h1>
    }
    if (contextAu.user.role != 'ADMIN') {
        return <Navigate to="/" replace />
    }
    if (contextAu.user.authenticated) {
        return (
            <div>
                <h1>Manage order</h1>
                {
                    orders.map((item) => (
                        <div key={item.id_orders}>
                            {
                                !item.is_completed ?
                                    <div>
                                        <h1>{item.total_amount}</h1>
                                        {item.orders_content.map((it: Order,ind:number) => (
                                            <div key={ind}>
                                                <h3>{it.item_name}</h3>
                                                <h4>Quantity:{it.qY} Unitary price:{it.price}</h4>
                                            </div>
                                        ))}
                                        {`Time ${new Date(item.orders_time).getHours()}:${new Date(item.orders_time).getMinutes()}`}
                                        <button onClick={() => handleClick(item.id_orders, item.school_id)}>Complete order</button>
                                    </div>
                                    : 
                                    <div>
                                        <h1>{item.id_orders}: </h1>completed
                                    </div>
                            }
                        </div>
                    ))
                }
            </div>
        )
    }
}