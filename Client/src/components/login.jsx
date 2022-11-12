import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="container mt-3">
            <div className="jumbotron">
                <h1>Login de Usuario</h1>
                <br />
                <form action="" method="" autoComplete="off">
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
                    <Link to="/products" className="btn btn-success mt-3">
                        Enviar
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
