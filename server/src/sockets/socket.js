import { Server as SocketIOServer } from 'socket.io';

let io;

const initializeSocketIO = (httpServer) => {
    const io = new SocketIOServer(httpServer, {
        cors: {
            origin: "http://localhost:3000"
        }
    });

    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });

        socket.on("error", (err) => {
            console.error(`Socket error: ${err.message}`);
        });

        socket.on("join_room:client", (data) => {
            const { userName, room } = data;
            console.log(room, userName);
            socket.join(room);
        });
    });

    return io;
};

export {initializeSocketIO,io};
