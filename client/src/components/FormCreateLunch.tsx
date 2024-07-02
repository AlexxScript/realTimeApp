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
        qyItems: 0,
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
            qyItems: fields.qyItems
        });
    };

    return (
        <form onSubmit={handleSubmit} className="min-h-screen flex flex-col justify-center">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-1 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                        <div className="flex items-center space-x-5">
                            <div className="flex justify-center items-center flex-col pl-2 font-semibold text-xl self-start text-gray-700">
                                <h2 className="leading-relaxed">Create a Lunch</h2>
                                <p className="text-sm text-gray-500 font-normal leading-relaxed">Let's create a lunch</p>
                            </div>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-1 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="flex flex-col">
                                    <label className="leading-loose">Lunch name</label>
                                    <input type="text" className="px-2 py-2 border focus:ring-gray-500 focus:border-[#e25d14] w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Lunch name"
                                        onChange={handleChange}
                                        value={fields.nameLunch}
                                        name="nameLunch"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="leading-loose">Description lunch</label>
                                    <textarea
                                        onChange={handleChangeTextArea}
                                        value={fields.descriptionLunch}
                                        name="descriptionLunch"
                                        className="px-2 py-2 border focus:ring-gray-500 focus:border-[#e25d14] w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                    />
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Quantity of lunches</label>
                                        <div className="relative focus-within:text-gray-600 text-gray-400">
                                            <input
                                                onChange={handleChange}
                                                value={fields.qyItems}
                                                type="number"
                                                name="qyItems"
                                                className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-[#e25d14] w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Check if it's available</label>
                                        <div className="relative focus-within:text-gray-600 text-gray-400">
                                            <input
                                                onChange={handleChange}
                                                checked={fields.availableLunch}
                                                type="checkbox"
                                                name="availableLunch"
                                                className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-[#e25d14] w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="leading-loose">Lunch price</label>
                                <input type="number" className="px-2 py-2 border focus:ring-gray-500 focus:border-[#e25d14] w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Lunch name"
                                    onChange={handleChange}
                                    value={fields.priceLunch}
                                    name="priceLunch"
                                />
                            </div>
                            <div className="pt-4 flex items-center space-x-4">
                                <button className="bg-[#e25d14] flex justify-center items-center w-full text-white px-2 py-2 rounded-md focus:outline-none" type="submit">Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};