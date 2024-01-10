import React, { useEffect, useState } from "react";
import { socket } from "./socket/socket";

export const App = () => {

    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnected() {
            setIsConnected(true);
        }
        function onDisconnected() {
            setIsConnected(false);
        }
        socket.on('connect', onConnected);
        socket.on('disconnect', onDisconnected);

        return () => {
            socket.off('connect', onConnected);
            socket.off('disconnect', onDisconnected);
        };

    }, []);


    return (
        <h1>Hola desde app {isConnected}</h1>
    )
}

