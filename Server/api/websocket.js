import { io } from "../server.js";
import Contenedor from "./products.js";
import { url, connect } from "../options/optionsMongo.js";
import MessageModel from "../models/messages.model.js";

// Websocket ----------------------------------------------------------------------------
const Container = new Contenedor();
const mongoUrl = url;
const MongoConnect = connect;

const Connect = () => {
    io.on("connection", async (socket) => {
        let dataDB = await MessageModel.find({});
        console.log("new connection");
        socket.emit("messages", dataDB);
        socket.on("newMsg", async (data) => {
            await MessageModel.create(data);
            let DBUpdate = await MessageModel.find({});
            io.sockets.emit("messages", DBUpdate);
        });
        socket.on("deleteMessages", async (data) => {
            if (data === "delete") {
                await MessageModel.deleteMany({});
                let db = await MessageModel.find({});
                io.sockets.emit("messages", db);
            }
        });
    });
};

export default Connect;
