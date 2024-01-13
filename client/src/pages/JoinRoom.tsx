import React, { useState } from "react"
import { socket } from "../socket/socket";
import { useNavigate } from "react-router-dom";

export const JoinRoom = () => {

    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [room, setRoom] = useState('coffe');

    function joinRoom() {
        if (room != '' && userName != '') {
            socket.emit('join_room:client', { userName, room });
            console.log(userName, room);
            navigate('/order',{
                replace:true
            });
        }
    }

    return (
        <div>
            <h1>Enter to changes the way to make orders</h1>
            <input type="text" name="userName" placeholder="User name" id="" onChange={(e) => setUserName(e.target.value)} />
            <input type="text" name="room" id="" readOnly value="coffe" />
            <button onClick={joinRoom}>Enter</button>
        </div>
    )
}