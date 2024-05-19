import React, { useContext, useEffect, useState } from 'react';
import { socket } from '../socket/socket';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { table } from 'console';

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
            <div>
                <h1>Manage order</h1>
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">

                    {
                        orders.map((item, index) => (

                            <div key={index} className="min-w-full leading-normal my-3">
                                {
                                    !item.is_completed ?
                                        <table className="min-w-full leading-normal">
                                            <thead>
                                                <tr>
                                                    <th
                                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Time
                                                    </th>
                                                    <th
                                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Item name
                                                    </th>
                                                    <th
                                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Qy
                                                    </th>
                                                    <th
                                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Unitary price
                                                    </th>
                                                    <th
                                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Total amount
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {item.orders_content.map((it: Order, ind: number) => (
                                                    <tr key={ind}>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            {`Time ${new Date(item.orders_time).getHours()}:${new Date(item.orders_time).getMinutes()}`}
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">{it.item_name}</p>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                Jan 21, 2020
                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                43
                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            <span
                                                                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                                <span aria-hidden
                                                                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                                <span className="relative">Activo</span>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                            <button onClick={() => handleClick(item.id_orders, item.school_id)}>Complete order</button>
                                            <button onClick={() => handleCancelOrder(item.id_orders, item.school_id)}>Cancel order</button>
                                        </table>
                                        :
                                        <div></div>
                                }
                            </div>
                        ))
                    }
                </div>
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