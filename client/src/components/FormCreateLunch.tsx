import React, { ChangeEvent, useState } from "react";
import { socket } from "../socket/socket";

export const FormCreateLunch = () => {
    const [fields, setFields] = useState({
        nameLunch: "",
        descriptionLunch: "",
        priceLunch: 0,
        availableLunch: false
    });

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
        console.log(fields);
        socket.emit('createLunchCliente',{ 
            nameLunch:fields.nameLunch,
            descriptionLunch:fields.descriptionLunch,
            priceLunch:fields.priceLunch,
            availableLunch:fields.availableLunch 
        })
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
                <label htmlFor="availableLunch">Lunch available</label>
                <input
                    onChange={handleChange}
                    checked={fields.availableLunch}
                    type="checkbox"
                    name="availableLunch"
                />
            </div>
            <button type="submit">Create</button>
        </form>
    );
};
