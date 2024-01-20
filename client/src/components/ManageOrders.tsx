import React, { useContext, useEffect, useState } from 'react';
import { socket } from '../socket/socket';
import { AuthContext } from '../context/AuthContext';

export const ManageOrders = () => {

    const contextAu = useContext(AuthContext);
    const [message, setMessage] = useState<{ email: string }[]>([]);
    const [loading,setLoading] = useState<boolean>(true)

    useEffect(() => {
        const room = contextAu.user.idSchool;
        const email = contextAu.user.email;
        if (contextAu.user.authenticated) {
            socket.emit('joinRoomClient', { room, email });
        }
        socket.on('welcomeMessageServer', (data) => {
            setMessage((prevMessage) => [...prevMessage, data])
        });
        return () => {
            socket.off('joinRoomClient');
            socket.off('welcomeMessageServer');
        }
    }, [socket, contextAu.user.idSchool, contextAu.user.email, contextAu.user.authenticated])

    useEffect(()=>{
        if (contextAu.user.authenticated !== false) {
            setLoading(false)
        }
    },[])
    if (loading) {
        return <h1>Loading</h1>
    }
    return (
        <div>
            {
                message.map((data, index) => (
                    <h1 key={index}>{data.email} had joinded</h1>
            ))
            }
        </div>

    )
}