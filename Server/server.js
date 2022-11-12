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
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";

// Creando Servidor -------------------------------------------------------------------------
const app = Express();
app.use(cors());
const server = http.createServer(app);
const port = 3001;
const FileStoreInit = FileStore(session);
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
app.use(
    session({
        store: MongoStore.create({
            mongoUrl:
                "mongodb+srv://coderhouse:coderhouse@react-ecommerce.aija2lu.mongodb.net/React-ecommerce?retryWrites=true&w=majority",
            mongoOptions: advancedOptions,
        }),
        secret: "secret",
        resave: false,
        saveUninitialized: false,
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
