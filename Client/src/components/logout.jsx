import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const [logInfo, setLogInfo] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        let logout = async () => {
            const res = await fetch("http://localhost:3001/cookie/logout", {
                credentials: "include",
            });
            const data = await res.json();
            setLogInfo(data);
            setTimeout(() => {
                navigate("/");
            }, 2000);
        };
        logout();
    }, []);

    return (
        <div className="jumbotron container mt-3">
            <h1 className="alert alert-primary">{logInfo}</h1>
        </div>
    );
};

export default Logout;
