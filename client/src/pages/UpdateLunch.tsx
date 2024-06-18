import React, { ChangeEvent, useContext, useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { socket } from '../socket/socket';
import { AuthContext } from "../context/AuthContext";

interface ListItem {
    id_item: any,
    item_name: string,
    description: string,
    price: any,
    quantity: any,
    available: boolean
}


export const UpdateLunch = () => {
    
    const [loading, setLoading] = useState(true);
    const [fields, setFields] = useState({
        id_item: "",
        item_name: "",
        description:"",
        price: 0,
        quantity: 0,
        available: false,
    });
    const [stateNav, setStateNav] = useState('');
    const contextAu = useContext(AuthContext);
    const { lunchId } = useParams();

    useEffect(() => {
        socket.emit("callItemClient",{
            id:lunchId,
            schoolId:contextAu.user.idSchool
        })
        socket.on("responseItemServer",(data:{rows: ListItem[]})=>{
            setFields({
                id_item:data.rows[0].id_item,
                item_name:data.rows[0].item_name,
                description:data.rows[0].description,
                price:data.rows[0].price,
                quantity:data.rows[0].quantity,
                available:data.rows[0].available
            });
            setLoading(false);
        })
        console.log(fields.description);

        return () => {
            socket.off('callItemClient');
            setLoading(true);
        }
    },[])

    useEffect(() => {
        const room = contextAu.user.idSchool;
        const email = contextAu.user.email;

        if (contextAu.user.authenticated) {
            socket.emit('joinRoomClient', { room, email });
        }

        return () => {
            socket.off('joinRoomClient');
        };
    }, [socket, contextAu.user.idSchool, contextAu.user.email, contextAu.user.authenticated, contextAu.setUser]);

    useEffect(() => {
        if (contextAu.user.authenticated !== false) {
            setLoading(false)
        }
    }, [contextAu.user.authenticated])


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
            description: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(fields);
        socket.emit('updateItemClient', {
            idItem:fields.id_item,
            item: fields.item_name,
            descriptionLunch: fields.description,
            priceLunch: fields.price,
            availableLunch: fields.available,
            idSchool: contextAu.user.idSchool,
            qyItems: fields.quantity
        });
        socket.on("updateItemServer",(data)=>{
            console.log(data);
        })
    };

    if (stateNav == "succes") {
        return <Navigate to="/admin/manage"/>
    }

    if (loading) {
        return <p>Loading...</p>; // Display a loading message while fetching data
    }

    if (contextAu.user.role !== 'ADMIN' || !contextAu.user.authenticated) {
        return <Navigate to="/" />
    }

    return (
        <section>
            <form onSubmit={handleSubmit} className="min-h-screen flex flex-col justify-center">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="relative px-1 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                        <div className="max-w-md mx-auto">
                            <div className="flex items-center space-x-5">
                                <div className="flex justify-center items-center flex-col pl-2 font-semibold text-xl self-start text-gray-700">
                                    <h2 className="leading-relaxed">Update lunch</h2>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-1 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Lunch name</label>
                                        <input type="text" className="px-2 py-2 border focus:ring-gray-500 focus:border-[#e25d14] w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Lunch name"
                                            onChange={handleChange}
                                            value={fields.item_name}
                                            name="item_name"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Description lunch</label>
                                        <textarea
                                            onChange={handleChangeTextArea}
                                            value={fields.description}
                                            name="description"
                                            className="px-2 py-2 border focus:ring-gray-500 focus:border-[#e25d14] w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex flex-col">
                                            <label className="leading-loose">Quantity of lunches</label>
                                            <div className="relative focus-within:text-gray-600 text-gray-400">
                                                <input
                                                    onChange={handleChange}
                                                    value={fields.quantity}
                                                    type="number"
                                                    name="quantity"
                                                    className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-[#e25d14] w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="leading-loose">Check if it's available</label>
                                            <div className="relative focus-within:text-gray-600 text-gray-400">
                                                <input
                                                    onChange={handleChange}
                                                    checked={fields.available}
                                                    type="checkbox"
                                                    name="available"
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
                                            value={fields.price}
                                            name="price"
                                        />
                                    </div>
                                <div className="pt-4 flex items-center space-x-4">
                                    <button className="bg-[#e25d14] flex justify-center items-center w-full text-white px-2 py-2 rounded-md focus:outline-none" type="submit">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}