import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        let name = {
            nombre: e.target[0].value,
        };

        try {
            const res = await fetch("http://localhost:3001/cookie/login", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(name),
            });
        } catch (e) {
            console.log(e);
        }

        navigate("/home");
    };

    return (
        <div className="container mt-3">
            <div className="jumbotron">
                <h1>Login de Usuario</h1>
                <br />
                <form
                    action=""
                    method=""
                    autoComplete="off"
                    onSubmit={loginUser}
                >
                    <div className="form-group">
                        <label htmlFor="nombre">Ingrese su nombre</label>
                        <input
                            id="nombre"
                            className="form-control"
                            type="text"
                            name="nombre"
                            required
                        />
                    </div>

                    <input
                        className="btn btn-success mt-3"
                        type="submit"
                        value="Enviar"
                    />
                </form>
            </div>
        </div>
    );
}

export default Login;
