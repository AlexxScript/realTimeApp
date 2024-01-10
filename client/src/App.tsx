import React, { useEffect, useState } from "react";
import { socket } from "./socket/socket";
import { ConnectionManager } from "./components/ConectionManager";

export const App = () => {

    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function updateConnectionStatus() {
            setIsConnected(socket.connected);
        }
        setIsConnected(socket.connected);
        socket.on('connect', updateConnectionStatus);
        socket.on('disconnect', updateConnectionStatus);

        return () => {
            socket.off('connect', updateConnectionStatus);
            socket.off('disconnect', updateConnectionStatus);
        };

    }, []);


    return (
        <>
            <h1>Hola desde app, state: {isConnected ? 'Conectado' : 'Desconectado'}</h1>
            <ConnectionManager />
        </>
    )
}

