import React, { useContext, useEffect, useState } from 'react';
import { socket } from '../socket/socket';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { NavBar } from '../components/NavBar';

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

    const handleCancelOrder = (idOrder: number | string, idSchool: number | string) => {
        socket.emit('cancelOrderClient', { idOrder, idSchool });
    }

    if (loading) {
        return <h1>Loading</h1>
    }
    if (contextAu.user.role != 'ADMIN') {
        return <Navigate to="/" replace />
    }
    if (contextAu.user.authenticated) {
        return (
            <div className='mainContent'>
                <h1>Manage order</h1>
                {
                    orders.map((item, index) => (
                        <div className='listOrdersAdmin' key={index}>
                            {
                                !item.is_completed ?
                                    <div>
                                        <h1>{item.total_amount}</h1>
                                        <h2>Id user is: {item.user_id}</h2>
                                        {item.orders_content.map((it: Order, ind: number) => (
                                            <div className='listContentAdmin' key={ind}>
                                                <h3>{it.item_name}</h3>
                                                <h4>Quantity:{it.qY} Unitary price:{it.price}</h4>
                                            </div>
                                        ))}
                                        {`Time ${new Date(item.orders_time).getHours()}:${new Date(item.orders_time).getMinutes()}`}
                                        <button onClick={() => handleClick(item.id_orders, item.school_id)}>Complete order</button>
                                        <button onClick={() => handleCancelOrder(item.id_orders, item.school_id)}>Cancel order</button>
                                    </div>
                                    :
                                    <div>

                                    </div>
                            }
                        </div>
                    ))
                }
            </div>
        )
    }
}