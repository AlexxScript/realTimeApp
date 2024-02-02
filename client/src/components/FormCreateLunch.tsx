import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { AuthContext } from "../context/AuthContext";

export const FormCreateLunch = () => {

    const contextAu = useContext(AuthContext);
    const [message, setMessage] = useState('');

    const [fields, setFields] = useState({
        nameLunch: "",
        descriptionLunch: "",
        priceLunch: 0,
        qyItems:0,
        availableLunch: false,
    });

    useEffect(() => {
        socket.on('existItemMessageServer', (data) => {
            setMessage(data.message);
        });
        socket.on('messageCreatedSuccesServer', (data) => {
            setMessage(data.message);
        });
        return () => {
            socket.off('existItemMessageServer')
            socket.off('messageCreatedSuccesServer')
        }
    }, [socket])

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
            idSchool: contextAu.user.idSchool,
            qyItems:fields.qyItems
        });
    };

    return (
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
                <label htmlFor="qyItems">Quantity of items</label>
                <input
                    onChange={handleChange}
                    value={fields.qyItems}
                    type="number"
                    name="qyItems"
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
    );
};