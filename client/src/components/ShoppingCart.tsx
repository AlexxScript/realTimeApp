import React, { useState,useEffect } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";

interface ItemCart {
    item_name: string;
    price: number;
    available: boolean;
    quantity: number;
  }
  
  interface PropCart {
    dataItem: ItemCart[];
  }
  
  export const ShoppingCart: React.FC<PropCart> = ({ dataItem }) => {
    const [total, setTotal] = useState<number>(0);
    const [message, setMessage] = useState('');
    const { cart, dispatch } = useShoppingCart();
    const [selectedQuantities, setSelectedQuantities] = useState<{ [itemName: string]: number }>({});
  
    useEffect(() => {
      // Update total whenever cart or selectedQuantities change
      let newTotal = 0;
      for (const item of cart) {
        const selectedQuantity = selectedQuantities[item.item_name] || 0;
        newTotal += item.price * selectedQuantity;
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
    };
  
    const makeOrder = () => {
      console.log(cart);
    };
  
    return (
      <div>
        {dataItem.map((item, index) => (
          <div key={index}>
            <h3>{item.item_name}</h3>
            <p>{item.price}</p>
            <label htmlFor="">How many?</label>
            <select
              name={item.item_name}
              value={selectedQuantities[item.item_name] || 0}
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
            {message}
          </div>
        ))}
        <button onClick={makeOrder}>Make order</button>
        Total: {total}
      </div>
    );
  };