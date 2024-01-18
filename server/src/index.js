import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { createServer } from "node:http";
import cors from "cors";
import dotenv from "dotenv/config";
import homeRoute from "./routes/homeRoute.js";
import userRoute from "./routes/userRoute.js";
import schoolRoute from "./routes/schoolRoute.js";
import {initializeSocketIO} from "./sockets/socket.js";
//https://www.freecodecamp.org/news/build-a-realtime-chat-app-with-react-express-socketio-and-harperdb/#how-rooms-work-in-socket-io
const app = express();
const httpServer = new createServer(app);

const io = initializeSocketIO(httpServer);
const port = process.env.PORT ?? 8081;

app.use(cors({
    "origin": "http://localhost:3000",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));

//-----------------ROUTES------------------
app.use("/",homeRoute);
app.use("/user",userRoute);
app.use("/school",schoolRoute);

httpServer.listen(port,() => {
    console.log(`Server running at port ${port}`);
})