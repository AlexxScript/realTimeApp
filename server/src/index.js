import express from "express";
import morgan from "morgan";
import { createServer } from "node:http";
import { Server } from "socket.io";
import dotenv from "dotenv/config";

import homeRoute from "./routes/homeRoute.js";

const app = express();
const httpServer = new createServer(app);
const io = new Server(httpServer);
const port = process.env.PORT ?? 8081;

app.use(morgan("tiny"));

app.use("/",homeRoute);

httpServer.listen(port,() => {
    console.log(`Server running at port ${port}`);
})