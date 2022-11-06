import { useState, useEffect } from "react";
import ProductForm from "./components/products";
import Messages from "./components/messages";
import io from "socket.io-client";
import "./bootstrap.css";
import "./app.css";

export const socket = io.connect("http://localhost:3001/");

function App() {
    return (
        <div className="container mt-3">
            <ProductForm />
            <Messages />
        </div>
    );
}

export default App;
