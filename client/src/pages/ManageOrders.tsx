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
    is_completed: any;
}

interface Order {
    description: string;
    item_name: string;
    price: any;
    qY: number;
    is_completed: any;
}

export const ManageOrders = () => {

    const contextAu = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [orders, setOrders] = useState<ListOrder[]>([]);
    const [pickedUp, setPickedUp] = useState<Boolean>(false);

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

    const handlePickedUp = (idOrder: number | string,idSchool:number | string) => {
        socket.emit('updateStatusPickedupClient',{idOrder,idSchool})
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
                <div className="inline-block min-w-full overflow-hidden">

                    {
                        orders.map((item, index) => (
                            <div key={index} className="min-w-full leading-normal mt-10">
                                {item.is_completed=="COMPLETED" ?
                                    <div></div>
                                    :
                                    <div className="border-solid border-2" >
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
                                                        Total item
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {item.orders_content.map((it: Order, ind: number) => (
                                                    <tr key={ind}>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            {`${new Date(item.orders_time).getHours()}:${new Date(item.orders_time).getMinutes()}`}
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">{it.item_name}</p>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {it.qY}
                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {it.price}
                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {it.price * it.qY}
                                                            </p>
                                                        </td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                        <div className='flex flex-row justify-around items-center gap-4 my-4'>
                                            <h3> ID user is: {item.user_id}</h3>
                                            <h3> Total to pay is: {item.total_amount}</h3>
                                        </div>

                                        {item.is_completed != "PICKED" ?

                                            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                                                <div className="inline-flex mt-2 xs:mt-0 gap-2">
                                                    <button
                                                        onClick={() => handlePickedUp(item.id_orders,item.school_id)}
                                                        className="text-sm text-indigo-50 transition duration-150 hover:bg-[#ffa755] bg-[#fdb850] font-semibold py-2 px-4 rounded-l">
                                                        Picked up order
                                                    </button>

                                                    <button
                                                        onClick={() => handleCancelOrder(item.id_orders, item.school_id)}
                                                        className="text-sm text-indigo-50 transition duration-150 hover:bg-[#a43947] bg-[#D1495B] font-semibold py-2 px-4 rounded-r">
                                                        Cancel order
                                                    </button>
                                                </div>
                                            </div>
                                            :
                                            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                                                <div className="inline-flex mt-2 xs:mt-0 gap-2">
                                                    <button
                                                        onClick={() => handleClick(item.id_orders, item.school_id)}
                                                        className="text-sm text-indigo-50 transition duration-150 hover:bg-[#387942] bg-[#479a53] font-semibold py-2 px-4 rounded-l">
                                                        Complete order
                                                    </button>
                                               </div>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}