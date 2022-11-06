import React, { useEffect, useState } from "react";
import { socket } from "../App";
import MessageContainer from "./messageContainer";

const addMessage = (e) => {
    let hour = new Date();
    e.preventDefault();
    const msg = {
        author: {
            id: e.target[0].value,
            nombre: "test",
            apellido: "test",
            edad: "test",
            alias: "test",
            avatar: "test",
        },
        text: e.target[1].value,
        day: hour.toLocaleDateString(),
        hour: hour.toLocaleTimeString(),
    };

    socket.emit("newMsg", msg);
    return false;
};

const Messages = () => {
    const [msg, setMessage] = useState([]);

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
