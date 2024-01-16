import React, { useEffect } from 'react';
import { socket } from '../socket/socket.ts';

export const RegisterUser = () => {
    useEffect(()=>{
        socket.on('connect',()=>{
            console.log(socket.connected);
        })
    },[])
    return (
        <form action="">
            register
        </form>
    );
}