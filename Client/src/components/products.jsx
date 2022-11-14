import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductContainer from "./productsContainer";

const ProductForm = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    let saveData = async () => {
        let data = await fetch("http://localhost:3001/api/productos/test");
        let result = await data.json();
        setProducts(result);
    };

    useEffect(() => {
        let getUserName = async () => {
            const res = await fetch("http://localhost:3001/cookie/session", {
                credentials: "include",
            });
            const data = await res.json();
            setName(data.nombre);
        };
        getUserName();

        if (name === undefined) {
            navigate("/");
        }
    }, [name]);

    return (
        <>
            <div className="container mt-3">
                <h1 className="alert alert-success">
                    Bienvenido {name}
                    <Link to="/logout">
                        <button className="btn btn-warning m-3 justify-content-end">
                            Desloguear
                        </button>
                    </Link>
                </h1>
            </div>
            <div className="containerProducts">
                <input
                    type="submit"
                    value="Generar Productos"
                    className="btn btn-success mt-3 mb-3"
                    onClick={() => saveData()}
                ></input>
                <b className="m-3">
                    Realmente los productos en si no tienen mucho sentido
                </b>

                <ProductContainer prod={products} />
            </div>
        </>
    );
};

export default ProductForm;
