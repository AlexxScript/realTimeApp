import { Server as SocketIOServer } from 'socket.io';
import { MenuItems } from '../models/MenuItems.js';

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
            io.to(room).emit("welcomeMessageServer", { email: email });
        });
        socket.on('createLunchCliente', async (data) => {
            const { nameLunch, descriptionLunch, priceLunch, availableLunch, idSchool } = data;
            console.log(nameLunch, descriptionLunch, priceLunch, availableLunch, idSchool)
            const parseId = parseInt(idSchool)
            try {
                const menuItems = new MenuItems();
                const checkExis = await menuItems.consultItem(nameLunch, parseId);
                if (checkExis.rows.length > 0) {
                    socket.emit('existItemMessageServer', { message: "Item exist in the menu" })
                } else {
                    const create = await menuItems.createItem(nameLunch, descriptionLunch, priceLunch, availableLunch, idSchool)
                    socket.emit("messageCreatedSuccesServer",{message:"Created succesfully"});
                }
            } catch (error) {
                console.log(error);
            }
        })
    });

    return io;
};

export { initializeSocketIO, io };
