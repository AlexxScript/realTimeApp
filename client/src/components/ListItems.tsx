import React, { useContext, useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { AuthContext } from "../context/AuthContext";

interface ListItem {
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
                <table className="border-collapse w-full">
                    <thead>
                        <tr>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Item name</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Item description</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Status</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Actions</th>
                        </tr>
                    </thead>
                    {data.map((item, index) => (

                        <tbody key={index}>
                            <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Company name</span>
                                    {item.item_name}
                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Country</span>
                                    {item.description}
                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                    <span className="rounded bg-green-400 py-1 px-3 text-xs font-bold">active</span>
                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
                                    <a href="#" className="text-blue-400 hover:text-blue-600 underline">Edit</a>
                                    <a href="#" className="text-blue-400 hover:text-blue-600 underline pl-6">Remove</a>
                                </td>
                            </tr>
                        </tbody>

                    ))}
                </table>
            )}
        </div>
    );
};