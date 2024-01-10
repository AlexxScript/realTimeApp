import express from "express";
import morgan from "morgan";
import { createServer } from "node:http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv/config";
import homeRoute from "./routes/homeRoute.js";

const app = express();
const httpServer = new createServer(app);

const io = new Server(httpServer,{
    cors:{
        origin:"http://localhost:5173"
    }
});
const port = process.env.PORT ?? 8081;

app.use(cors({
    "origin": "http://localhost:5173",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    credentials:true
}));

app.use(morgan("tiny"));

app.use("/",homeRoute);

io.on('connection',(socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });

    socket.on("error", (err) => {
        console.error(`Socket error: ${err.message}`);
    });
});

httpServer.listen(port,() => {
    console.log(`Server running at port ${port}`);
})