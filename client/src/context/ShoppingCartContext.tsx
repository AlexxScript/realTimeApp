import React, { Dispatch, createContext, useContext, useReducer } from "react";

interface CartItem {
    item_name: string;
    description: string;
    price: any;
    available: boolean;
    quantity: number;
    total: number; // Add this property
}

type CartAction =
    | { type: "ADD_TO_CART"; payload: CartItem }
    | { type: "REMOVE_FROM_CART"; payload: string };

interface ShoppingCartContextType {
    cart: CartItem[];
    dispatch: Dispatch<CartAction>
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

const cartReducer: React.Reducer<CartItem[], CartAction> = (state, action) => {
    if (action.type === 'ADD_TO_CART') {
        const newItem = { ...action.payload, total: action.payload.price * action.payload.quantity };
        return [...state, newItem];
    }
    if (action.type === 'REMOVE_FROM_CART') {
        return state.filter(item => item.item_name !== action.payload);
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