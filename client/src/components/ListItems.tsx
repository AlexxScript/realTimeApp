import React, { useContext, useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { AuthContext } from "../context/AuthContext";

interface ListItem {
    item_name: string,
    description: string,
    price: any,
    quantity:any,
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
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>{item.item_name + item.description + item.price + item.available + item.quantity}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};
