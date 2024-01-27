import React, { useState, useEffect } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";

interface ItemCart {
    item_name: string;
    price: number;
    available: boolean;
    quantity: number;
    qY:number;
}

interface PropCart {
    dataItem: ItemCart[];
    totalAcum: number;
}

export const ShoppingCart: React.FC<PropCart> = ({ dataItem,totalAcum }) => {
    const [total, setTotal] = useState<number>(0);
    const { cart, dispatch } = useShoppingCart();
    const [selectedQuantities, setSelectedQuantities] = useState<{ [itemName: string]: number }>({});
    
    useEffect(() => {
        setTotal(totalAcum);
    }, [totalAcum]);

    useEffect(() => {
        let newTotal = 0;
        for (const item of cart) {
            // const selectedQuantity = selectedQuantities[item.item_name] || 0;
            newTotal += item.price * item.qY;
        }
        setTotal(newTotal);
    }, [cart, selectedQuantities]);

    const handleDelete = (itemName: string) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: itemName });
    };

    const handleChange = (itemName: string, quantity: number) => {
        setSelectedQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemName]: quantity,
        }));
        dispatch({type:"UPDATE_QY",payload:itemName,qY:quantity})
    };

    const makeOrder = () => {
        console.log(cart);

    };

    return (
        <div className="shoppingCart">
            {dataItem.map((item, index) => (
                <div key={index}>
                    <h3>{item.item_name}</h3>
                    <p>{item.price}</p>
                    <label htmlFor="">How many?</label>
                    <select
                        name={item.item_name}
                        value={selectedQuantities[item.item_name] || item.qY}
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