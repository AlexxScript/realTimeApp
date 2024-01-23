import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { AuthContext } from "../context/AuthContext";

interface ListItem {
    item_name: string,
    description: string,
    price: any,
    available: boolean
}

export const ManageLunch = () => {
    const contextAu = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ListItem[]>([]);
    const [message, setMessage] = useState('');

    const [fields, setFields] = useState({
        nameLunch: "",
        descriptionLunch: "",
        priceLunch: 0,
        availableLunch: false,
    });

    useEffect(() => {
        socket.emit('listItemsClient', { room: contextAu.user.idSchool });

        socket.on('listItemsServer', (data: { rows: ListItem[] }) => {
            setData(data.rows);
            setLoading(false);
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
            });
        });
        return () => {
            socket.off('existItemMessageServer')
            socket.off('messageCreatedSuccesServer')
            socket.off('listItemsClient');
        }
    }, [socket, contextAu.user.idSchool])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setFields(prevFields => ({
            ...prevFields,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setFields(prevFields => ({
            ...prevFields,
            descriptionLunch: e.target.value
        }));
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket.emit('createLunchCliente', {
            nameLunch: fields.nameLunch,
            descriptionLunch: fields.descriptionLunch,
            priceLunch: fields.priceLunch,
            availableLunch: fields.availableLunch,
            idSchool: contextAu.user.idSchool
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nameLunch">Lunch name</label>
                    <input
                        onChange={handleChange}
                        value={fields.nameLunch}
                        type="text"
                        name="nameLunch"
                    />
                </div>
                <div>
                    <label htmlFor="descriptionLunch">Lunch description</label>
                    <textarea
                        onChange={handleChangeTextArea}
                        value={fields.descriptionLunch}
                        name="descriptionLunch"
                    />
                </div>
                <div>
                    <label htmlFor="priceLunch">Lunch price</label>
                    <input
                        onChange={handleChange}
                        value={fields.priceLunch}
                        type="number"
                        name="priceLunch"
                    />
                </div>
                <div>
                    <label htmlFor="availableLunch">Lunch available</label>
                    <input
                        onChange={handleChange}
                        checked={fields.availableLunch}
                        type="checkbox"
                        name="availableLunch"
                    />
                </div>
                <button type="submit">Create</button>
                {message}
            </form>
            {/* {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>{item.item_name + item.description + item.price + item.available}</li>
                        // Adjust the property used based on your actual data structure
                    ))}
                </ul>
            )} */}
        </div>

    );
}