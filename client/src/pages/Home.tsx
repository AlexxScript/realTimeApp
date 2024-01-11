import React, { useState } from "react"
import { socket } from "../socket/socket";

export const Home = () => {

    const[userName,setUserName] = useState('');
    const[room,setRoom] = useState('');

    function joinRoom() {
        setRoom('coffe');
        if (room != '' && userName != '') {
            socket.emit('join_room',{userName,room});            
        }
        console.log("runned");
    }

    return (
        <div>
            <h1>Enter to orders</h1>
            <input type="text" name="userName" placeholder="User name" id="" onChange={(e)=>setUserName(e.target.value)}/>
            <input type="text" name="room" id="" readOnly value="coffe" />
            <button onClick={joinRoom}>Enter</button>
        </div>
    )
}