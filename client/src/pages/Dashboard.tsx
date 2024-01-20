import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { socket } from '../socket/socket';
import { Navigate, Outlet } from 'react-router-dom';

export const Dashboard = () => {
    const contextAu = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const room = contextAu.user.idSchool;
        const email = contextAu.user.email;

        if (contextAu.user.authenticated) {
            socket.emit('joinRoomClient', { room, email });
        }

        return () => {
            socket.off('joinRoomClient');
        };
    }, [socket, contextAu.user.idSchool, contextAu.user.email, contextAu.user.authenticated, contextAu.setUser]);

    useEffect(()=>{
        if (contextAu.user.authenticated !== false) {
            setLoading(false)
        }
    },[contextAu.user.authenticated])

    if (loading) {
        return <p>Loading...</p>; // Display a loading message while fetching data
    }

    if (contextAu.user.role !== 'ADMIN' || !contextAu.user.authenticated) {
        return <Navigate to="/" />
    }

    return (
        <Outlet/>
    );
};
