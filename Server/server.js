import Express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import apiRouter from "./router/products.router.js";
import CartRouter from "./router/cart.router.js";
import { MARIADBTable } from "./tables/mariaDB.js";
import { SQLITETable, dropSQLITETable } from "./tables/sqlite3.js";
import Connect from "./api/websocket.js";

const app = Express();
app.use(cors());
const server = http.createServer(app);
const port = 3001;

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use("/api/productos", apiRouter);
app.use("/api/carrito", CartRouter);

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

// TABLES -------------------------------------------------------------------------
// MARIADBTable();
SQLITETable();
