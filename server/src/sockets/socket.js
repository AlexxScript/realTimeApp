import { Server as SocketIOServer } from 'socket.io';
import { MenuItems } from '../models/MenuItems.js';
import { Order } from '../models/Order.js';
import { User } from '../models/User.js';

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
            const { nameLunch, descriptionLunch, priceLunch, availableLunch, idSchool, qyItems } = data;
            // console.log(nameLunch, descriptionLunch, priceLunch, availableLunch, idSchool, qyItems)
            const parseId = parseInt(idSchool)
            const parseQy = parseInt(qyItems)
            try {
                const menuItems = new MenuItems();
                const checkExis = await menuItems.consultItemByName(nameLunch, parseId);
                console.log(checkExis.rows);
                if (checkExis.rows.length > 0) {
                    io.in(idSchool).emit('existItemMessageServer', { message: "Item exist in the menu" })
                } else {
                    await menuItems.createItem(nameLunch, descriptionLunch, priceLunch, availableLunch, idSchool, parseQy)
                    io.in(idSchool).emit("messageCreatedSuccesServer", { message: "succesfully" });
                }
            } catch (error) {
                console.log(error);
            }
        })

        socket.on('listItemsClient', async (data) => {
            const { room } = data;
            socket.join(room)
            try {
                const menuItems = new MenuItems();
                const result = await menuItems.consultAllItems(room);
                console.log(result);
                io.in(room).emit('listItemsServer', result)
            } catch (error) {
                console.log(error);
            }
        })

        socket.on('makeOrderClient', async (data) => {
            socket.join(data.idSchool);
            try {
                const order = new Order();
                const user = new User();
                const idUser = await user.selectUser(data.email);
                console.log(idUser.rows[0].id_users);
                const content = await order.createOrder(data.idSchool, data.cart, data.totalAcum, 'FALSE', idUser.rows[0].id_users)
                io.in(data.idSchool).emit("orderCreatedServer", { message: "succes", content: content })
            } catch (error) {
                console.log(error);
            }
        })

        socket.on('listOrdersClient', async (data) => {
            const { room } = data;
            socket.join(room);
            try {
                const order = new Order();
                const result = await order.listAllOrders(room);
                io.in(room).emit("listOrdersServer", { result })
            } catch (error) {
                console.log(error)
            }
        })

        socket.on("updateStatuOrderClient", async (data) => {
            const order = new Order();
            socket.join(data.idSchool);
            try {
                const result = await order.updateOrderStatus(data.idOrder);
                console.log(result);
                io.in(data.idSchool).emit("messageUpdateStatusServer", { result });
            } catch (error) {
                console.log(error);
            }
        })

        socket.on("updateStatusPickedupClient", async (data) => {
            const order = new Order();
            socket.join(data.idSchool);
            try {
                const result = await order.updatePickedUpStatus(data.idOrder);
                console.log(result);
                io.in(data.idSchool).emit("messageUpdateStatusServer", { result });
            } catch (error) {
                console.log(error);
            }
        })

        socket.on("cancelOrderClient",async (data) => {
            socket.join(data.idSchool);
            const order = new Order();
            try {
                await order.deleteOrder(data.idOrder,data.idSchool)
                const result = await order.listAllOrders(data.idSchool);
                io.in(data.idSchool).emit("listOrdersServer", { result })
            } catch (error) {
                console.log(error);
            }
        })

        socket.on("callItemClient",async(data) => {
            const { id, schoolId } = data;
            try{
                socket.join(schoolId);
                const menuItems = new MenuItems();
                const result = await menuItems.consultItem(id,schoolId);
                io.in(schoolId).emit('responseItemServer', result);
            } catch (error) {
                console.log(error);
            } 
        })

        socket.on("updateItemClient",async (data)=>{
            const { item, descriptionLunch, priceLunch, availableLunch, idSchool, qyItems, idItem } = data;
            try {
                socket.join(idSchool);
                const menuItems = new MenuItems();
                await menuItems.updateItem(idSchool,item,descriptionLunch,priceLunch,availableLunch,qyItems,idItem);
                io.in(idSchool).emit("updateItemServer",{message:"succes"});
            } catch (error) {
                console.log(error);
            }
        })

        socket.on("deleteItemClient",async (data) => {
            const {idItem, itemName, idSchool} = data;
            try {
               socket.join(idSchool);
               const menuItems = new MenuItems();
               await menuItems.deleteItem(idItem,itemName,idSchool);
               io.in(idSchool).emit("deleteItemServer",{message:"succes"}); 
            } catch (error) {
                console.log(error);
            }
        })
    });

    return io;
};

export { initializeSocketIO, io };
