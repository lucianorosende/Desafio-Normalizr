import React, { useEffect, useState } from "react";
import ProductContainer from "./productsContainer";

let getData = async () => {
    let data = await fetch("http://localhost:3001/api/productos/test");
    let result = await data.json();
    return result;
};

const ProductForm = () => {
    const [products, setProducts] = useState([]);

    let saveData = async () => {
        let data = await getData();
        setProducts(data);
    };

    return (
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
    );
};

export default ProductForm;
