import React, { useContext, useEffect, useState } from "react";
import { socket } from "./socket/socket";
import { AuthContext } from "./context/AuthContext";

interface ListOrder {
    id_orders: any; 
    user_id: any; 
    school_id: any; 
    is_completed: boolean; 
    total_amount: number;
    orders_content: any;
    orders_time:any,
}

export const App = () => {

    const contextAu = useContext(AuthContext);
    const [loadingS,setLoadingS] = useState<boolean>(true);
    const [orders, setOrders] = useState<ListOrder[]>([]);

    useEffect(() => {
        const room = contextAu.user.idSchool;
        const email = contextAu.user.email;
        if (contextAu.user.authenticated) {
            socket.emit('joinRoomClient', { room, email });
        }
        return () => {
            socket.off('joinRoomClient');
        };
    }, [socket, contextAu.user.idSchool, contextAu.user.email, contextAu.user.authenticated]);

    useEffect(()=>{
        socket.emit("listOrdersClient",{room:contextAu.user.idSchool});
        socket.on('listOrdersServer',(data:{result:ListOrder[]})=>{
            console.log(data.result);
        })
        return () => {
            socket.off("listOrdersClient");
            socket.off("listOrdersServer");
        }
    },[socket,contextAu.user.idSchool]);

    useEffect(()=>{
        if (contextAu.user.idSchool !== null) {
            setLoadingS(false);
        }
    },[contextAu.user.idSchool])

    if (loadingS) {
        return <h1>Loading...</h1>
    }

    if (contextAu.user.authenticated) {
        return (
            <div>
                {/* {orders.map((item,index)=>(
                    <h2 key={index}>hi {item.total_amount}</h2>
                ))} */}
            </div>
        )
    }

    return (
        <>
            <h1>Hey would you like to innovate the way to manage a coffe shop</h1>
        </>
    )
}

