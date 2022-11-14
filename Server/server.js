import Express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import apiRouter from "./router/products.router.js";
import CartRouter from "./router/cart.router.js";
import cookieRouter from "./router/cookie.router.js";
import Connect from "./api/websocket.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongodb-session";

// Creando Servidor -------------------------------------------------------------------------
const app = Express();
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
        credentials: true,
    })
);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    next();
});
const server = http.createServer(app);
const port = 3001;

const MongoDBstore = MongoStore(session);

const sessionStore = new MongoDBstore({
    uri: "mongodb+srv://coderhouse:coderhouse@react-ecommerce.aija2lu.mongodb.net/React-ecommerce?retryWrites=true&w=majority",
    collection: "sessions",
});
app.use(
    session({
        store: sessionStore,
        secret: "secret",
        resave: true,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: 60000,
            secure: false,
        },
    })
);

// Declarando Rutas ----------------------------------------------------------------------
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cookieParser("qweqweqweqTEST"));
app.use("/api/productos", apiRouter);
app.use("/api/carrito", CartRouter);
app.use("/cookie", cookieRouter);

// Levanta el server -----------------------------------------------------------------
const srv = server.listen(port, () => {
    console.log(`server up on ${srv.address().port}`);
});
srv.on("error", (err) => console.log("server error: " + err));

// Websocket Runtime --------------------------------------------------------------
export const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
Connect();

import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export const url = process.env.MONGO_URL;
export const connect = mongoose.connect(url);
