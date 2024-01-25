import React, { useContext, useEffect, useState } from 'react';
import { socket } from '../socket/socket';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const ManageOrders = () => {

    const contextAu = useContext(AuthContext);
    const [message, setMessage] = useState<{ email: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        socket.on('welcomeMessageServer', (data) => {
            setMessage((prevMessage) => [...prevMessage, data])
        });
        return () => {
            socket.off('welcomeMessageServer');
        }
    }, [socket, contextAu.user.idSchool, contextAu.user.email, contextAu.user.authenticated])

    useEffect(() => {
        if (contextAu.user.idSchool != null) {
            setLoading(false)
        }
    }, [contextAu.user.idSchool])
    if (loading) {
        return <h1>Loading</h1>
    }
    if (contextAu.user.role!='ADMIN') {
        return <Navigate to="/" replace/> 
    }
    if (contextAu.user.authenticated) {
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
}