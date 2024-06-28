import React, { useContext, useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

interface ListItem {
    id_item: any,
    item_name: string,
    description: string,
    price: any,
    quantity: any,
    available: boolean
}

export const ListItems = () => {
    const contextAu = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ListItem[]>([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket.emit('listItemsClient', { room: contextAu.user.idSchool });

        socket.on('listItemsServer', (data: { rows: ListItem[] }) => {
            setData(data.rows);
            setLoading(false);
            console.log(data.rows);
        });
        console.log(data);

        return () => {
            socket.off('listItemsClient');
            setData([]);
            setLoading(true);
        }
    }, [socket, contextAu.user.idSchool]);

    useEffect(() => {
        socket.on('existItemMessageServer', (data) => {
            setMessage(data.message);
        });
        socket.on('messageCreatedSuccesServer', (data) => {
            setMessage(data.message);
            socket.emit('listItemsClient', { room: contextAu.user.idSchool });
            socket.on('listItemsServer', (data: { rows: ListItem[] }) => {
                setData(data.rows);
                setLoading(false);
                console.log(data.rows);
            });
        });
        return () => {
            socket.off('existItemMessageServer')
            socket.off('messageCreatedSuccesServer')
            socket.off('listItemsClient');
        }
    }, [socket, contextAu.user.idSchool])

    return (
        <div>
            {message}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="border-collapse w-full mb-7">
                    <thead>
                        <tr>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Item name</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Item description</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Item price</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Quantity</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Available</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Edit</th>
                        </tr>
                    </thead>
                    {data.map((item, index) => (

                        <tbody key={index}>
                            <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                    {item.item_name}
                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                    {item.description}
                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                    {item.price}
                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                    {item.quantity}
                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                    <span className={item.available ? "p-2 bg-green-500 rounded-md" : "p-2 bg-red-500 rounded-md"}>{item.available ? "Available" : "Unavailable"}</span>
                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                    <Link to={`/admin/manage/${item.id_item}`} className="text-blue-400 hover:text-blue-600 underline">Edit</Link>
                                    <Link to="#" className="text-blue-400 hover:text-blue-600 underline pl-6">Remove</Link>
                                </td>
                            </tr>
                        </tbody>

                    ))}
                </table>
            )}
        </div>
    );
};