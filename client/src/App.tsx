import React, { useContext, useEffect, useState } from "react";
import { socket } from "./socket/socket";
import { AuthContext } from "./context/AuthContext";

export const App = () => {

    const contextAu = useContext(AuthContext);

    const [messageW, setMessageW] = useState<{email:string}[]>([]);

    useEffect(() => {
        const room = contextAu.user.idSchool;
        const email = contextAu.user.email;
        if (contextAu.user.authenticated) {
            socket.emit('joinRoomClient', { room, email });
        }
        socket.on('welcomeMessageServer', (data) => {
            setMessageW((prevMessage)=>[...prevMessage,data])
        })

        return () => {
            socket.off('joinRoomClient');
            socket.off('welcomeMessageServer');
        };
    }, [socket, contextAu.user.idSchool, contextAu.user.email, contextAu.user.authenticated]);

    if (contextAu.user.authenticated) {
        return (
            <div>
                {messageW.map((message,index)=>(
                    <h2 key={index}>hi {message.email}</h2>
                ))}
            </div>
        )
    }

    return (
        <>
            <h1>Hey would you like to innovate the way to manage a coffe shop</h1>
        </>
    )
}

