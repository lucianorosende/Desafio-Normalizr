import React, { useEffect, useState } from "react";
import { socket } from "../App";
import MessageContainer from "./messageContainer";

const Messages = () => {
    const [msg, setMessage] = useState([]);
    const [id, setID] = useState("");
    const [text, setText] = useState("");

    const addMessage = (e) => {
        let hour = new Date();
        e.preventDefault();
        const msg = {
            author: {
                id: id,
                nombre: "test",
                apellido: "test",
                edad: "test",
                alias: "test",
                avatar: "test",
            },
            text: text,
            day: hour.toLocaleDateString(),
            hour: hour.toLocaleTimeString(),
        };

        socket.emit("newMsg", msg);
        return false;
    };

    useEffect(() => {
        socket.on("messages", (data) => {
            setMessage(data);
        });
    }, [socket]);
    const deleteMessages = () => {
        socket.emit("deleteMessages", "delete");
    };
    return (
        <div className="container mt-3 mb-3">
            <div className="jumbotron">
                <h1>Centro de mensajes</h1>
                <br />

                <form autoComplete="off" onSubmit={addMessage}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            className="form-control"
                            type="email"
                            name="email"
                            required
                            placeholder="lucianorosende@gmail.com"
                            onChange={(e) => setID(e.target.value)}
                        />
                    </div>
                    <hr />
                    <div id="msgContainer" className="mb-2 mt-2">
                        <MessageContainer msgContainer={msg} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="msg">Tu mensaje...</label>
                        <input
                            id="msg"
                            className="form-control"
                            type="text"
                            name="msg"
                            placeholder="Contanos lo que quieras!"
                            required
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Enviar"
                        className="btn btn-success mt-3 mb-3"
                    ></input>
                    <input
                        type="button"
                        value="Eliminar"
                        className="btn btn-danger m-2 mt-3 mb-3"
                        onClick={() => deleteMessages()}
                    ></input>
                </form>
            </div>
        </div>
    );
};

export default Messages;
