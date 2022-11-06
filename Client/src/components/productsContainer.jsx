import React, { useEffect, useState } from "react";
import "../App.css";

const ProductContainer = ({ prod }) => {
    return (
        <>
            {prod.length === 0 ? (
                <div className="warning">NO HAY PRODUCTOS</div>
            ) : (
                <div className="table">
                    <table className="table table-responsive table-dark">
                        <tbody>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Precio</th>
                                <th>Foto</th>
                                <th>Codigo</th>
                                <th>Stock</th>
                                <th>ID</th>
                            </tr>
                            {prod.map((p) => (
                                <tr key={p.productId}>
                                    <td>{p.nombre}</td>
                                    <td>{p.descripcion}</td>
                                    <td>${p.precio}</td>
                                    <td>
                                        <img
                                            width="50"
                                            src={p.foto}
                                            alt="not found"
                                        />
                                    </td>
                                    <td>{p.codigo}</td>
                                    <td>{p.stock}</td>
                                    <td>{p.productId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};
export default ProductContainer;
