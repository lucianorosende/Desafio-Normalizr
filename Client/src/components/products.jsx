import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductContainer from "./productsContainer";

let getData = async () => {
    let data = await fetch("http://localhost:3001/api/productos/test");
    let result = await data.json();
    return result;
};

let getUserName = async () => {
    const res = await fetch("http://localhost:3001/cookie/session", {
        withCredentials: true,
    });
    const data = await res.json();
    console.log(data);
};

const ProductForm = () => {
    const [products, setProducts] = useState([]);

    let saveData = async () => {
        let data = await getData();
        setProducts(data);
    };
    useEffect(() => {
        getUserName();
    }, []);

    return (
        <>
            <div className="container mt-3">
                <h1 className="alert alert-success">
                    Bienvenido test
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
