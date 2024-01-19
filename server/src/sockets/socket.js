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

        socket.on("joinRoomClient", (data) => {
            const { room, email } = data;
            console.log(`User ${socket.id} joined room ${room} with email ${email}`);
            socket.join(room);
            io.to(room).emit("welcomeMessageServer",{email:email});
        });
    });

    return io;
};

export {initializeSocketIO,io};
