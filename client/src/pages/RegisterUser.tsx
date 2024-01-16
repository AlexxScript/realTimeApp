import React, { useEffect } from 'react';
import { socket } from '../socket/socket.ts';
import { useParams } from 'react-router-dom';


export const RegisterUser = () => {
    const { idSchool } = useParams();

    return (
        <form action="">
            register
        </form>
    );
}