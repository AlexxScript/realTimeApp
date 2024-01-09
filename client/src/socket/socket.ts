import { Socket, io } from "socket.io-client";
import dotenv from "dotenv";

const URL = process.env.NODE_ENV || "http://localhost:8080"; 

export const socket:Socket = io(URL,{
    autoConnect:false
})