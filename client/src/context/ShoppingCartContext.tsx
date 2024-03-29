import React, { Dispatch, createContext, useContext, useReducer } from "react";

interface CartItem {
    item_name: string; //Item name for each item
    description: string; //Description for each item
    price: any; //Price for each item
    available: boolean; //Is or not avaiable
    quantity: number; //Total quantity
    qY:number; //Quantity selected by the user
}

type CartAction =
    | { type: "ADD_TO_CART"; payload: CartItem; qY: number }
    | { type: "REMOVE_FROM_CART"; payload: string }
    | { type: "UPDATE_QY"; payload: string; qY: number };

interface ShoppingCartContextType {
    cart: CartItem[];
    dispatch: Dispatch<CartAction>
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

const cartReducer: React.Reducer<CartItem[], CartAction> = (state, action) => {
    if (action.type === 'ADD_TO_CART') {
        // const newItem = { ...action.payload, total: action.payload.price * action.qY };
        const newItem = { ...action.payload, qY: action.qY };

        return [...state, newItem];
    }
    if (action.type === 'REMOVE_FROM_CART') {
        return state.filter(item => item.item_name !== action.payload);
    }
    if (action.type === 'UPDATE_QY') {
        const updatedCart = state.map(item => {
            if (item.item_name === action.payload) {
                return { ...item, qY: action.qY };
            }
            return item;
        });
        return updatedCart;
    }
    return state;
};

export const ShoppingCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    return (
        <ShoppingCartContext.Provider value={{ cart, dispatch }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};


export const useShoppingCart = () => {
    const context = useContext(ShoppingCartContext);
    if (context !== undefined) {
        return context;
    }
    throw new Error("useShoppingCart must be used within a ShoppingCartProvider");
}