import React, { useEffect, useState } from "react";
import { socket } from "./socket/socket";

export const App = () => {

    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function updateConnectionStatus() {
            setIsConnected(socket.connected);
        }
        setIsConnected(socket.connected);
        socket.on('connect', updateConnectionStatus);
        socket.on('disconnect', updateConnectionStatus);

        console.log(socket.connected);
    }, []);


    return (
        <>
            <h1>Hola desde app, state: {isConnected ? 'Conectado' : 'Desconectado'}</h1>
        </>
    )
}

