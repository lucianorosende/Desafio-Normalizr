import Home from "./components/home";
import Login from "./components/login";
import io from "socket.io-client";
import "./bootstrap.css";
import "./app.css";
import { Routes, Route } from "react-router-dom";

export const socket = io.connect("http://localhost:3001/");

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/products" element={<Home />} />
        </Routes>
    );
}

export default App;
