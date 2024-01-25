import React from "react";

interface ItemCart {
    item_name:string;
    price:number;
    available:boolean;
}

interface PropCart {
    dataItem: ItemCart[];
}

export const ShoppingCart = ({dataItem}:PropCart) => {
    return (
        <div>
            {
                dataItem.map((item,index)=>(
                    <div key={index}>
                        <h1>{item.item_name}</h1>
                        <button>Delete</button>
                    </div>
                ))
            }
        </div>
    )
}