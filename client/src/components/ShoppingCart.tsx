import React, { useState, useEffect, useContext } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { socket } from "../socket/socket";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface ItemCart {
    item_name: string; //Item name for each item
    description: string; //Description for each item
    price: any; //Price for each item
    available: boolean; //Is or not avaiable
    quantity: number; //Total quantity
    qY: number; //Quantity selected by the user
}

interface PropCart {
    dataItem: ItemCart[];
    totalAcum: number;
}

export const ShoppingCart: React.FC<PropCart> = ({ dataItem, totalAcum }) => {
    const contextAu = useContext(AuthContext);
    const [total, setTotal] = useState<number>(0);
    const { cart, dispatch } = useShoppingCart();
    const [selectedQuantities, setSelectedQuantities] = useState<{ [itemName: string]: number }>({});
    const [messageOrder,setMessageOrder] = useState('');

    useEffect(() => {
        setTotal(totalAcum);
    }, [totalAcum]);

    useEffect(() => {
        let newTotal = 0;
        for (const item of cart) {
            newTotal += item.price * item.qY;
        }
        setTotal(newTotal);
    }, [cart, selectedQuantities]);

    const handleDelete = (itemName: string) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: itemName });
    };

    const handleChange = (itemName: string, quantity: number) => {
        if (quantity === 0) {
            dispatch({ type: "REMOVE_FROM_CART", payload: itemName });
        } else {
            setSelectedQuantities(prevQuantities => ({
                ...prevQuantities,
                [itemName]: quantity,
            }));
            dispatch({ type: "UPDATE_QY", payload: itemName, qY: quantity })
        }

    };

    const makeOrder = () => {
        console.log(cart,totalAcum,contextAu.user.idSchool);
        socket.emit("makeOrderClient",{cart,totalAcum,idSchool:contextAu.user.idSchool,email:contextAu.user.email});
        socket.on("orderCreatedServer",(data)=>{
            console.log(data.content);
            setMessageOrder(data.message);
        })
    };

    if (messageOrder === "succes") {
        return <Navigate to="/" replace/>
    }

    return (
        <div className="shoppingCart">
            {dataItem.map((item, index) => (
                <div key={index}>
                    <h3>{item.item_name}</h3>
                    <p>{item.price}</p>
                    <label htmlFor="">How many?</label>
                    {
                        cart.map((i, index) => (
                            <h1 key={index}>
                                {i.item_name === item.item_name ? i.qY : ''}
                            </h1>
                        ))
                    }
                    <select
                        name={item.item_name}
                        // value={selectedQuantities[item.item_name] || item.qY}
                        value={cart.find((cartItem) => cartItem.item_name === item.item_name)?.qY || selectedQuantities[item.item_name]}

                        onChange={(e) => handleChange(item.item_name, parseInt(e.target.value))}
                    >
                        {[...Array(item.quantity + 1).keys()].map((i) => (
                            <option key={i} value={i}>
                                {i}
                            </option>
                        ))}
                    </select>
                    <p>{item.available}</p>
                    <button onClick={() => handleDelete(item.item_name)}>Delete</button>
                </div>
            ))}
            <button onClick={makeOrder}>Make order</button>
            Total: {total}
        </div>
    );
};