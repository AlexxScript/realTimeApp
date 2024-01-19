import React, { useContext, useEffect } from "react";
import { socket } from "./socket/socket";
import { AuthContext } from "./context/AuthContext";

export const App = () => {

    const contextAu = useContext(AuthContext);

    useEffect(() => {
        const room = contextAu.user.idSchool;
        const email = contextAu.user.email;
        if (contextAu.user.authenticated) {
            socket.emit('joinRoomClient', { room,email });
        }

        socket.on('welcomeMessageServer', (data) => {
            console.log(data);
        })

        return () => {
            socket.off('joinRoomClient');
            socket.off('welcomeMessageServer');
        };
    }, [socket,contextAu.user.idSchool,contextAu.user.email,contextAu.user.authenticated]);

    if (contextAu.user.authenticated) {
        return <h1>Hey! what's going on today? {contextAu.user.email}</h1>
    }

    return (
        <>
            <h1>Hey would you like to innovate the way to manage a coffe shop</h1>
        </>
    )
}

