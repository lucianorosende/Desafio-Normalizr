import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 2000);
    }, []);

    return (
        <div className="jumbotron container mt-3">
            <h1 className="alert alert-primary">Hasta luego, test</h1>
        </div>
    );
};

export default Logout;
