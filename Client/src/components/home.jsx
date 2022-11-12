import { useState, useEffect } from "react";
import ProductForm from "./products";
import Messages from "./messages";

function Home() {
    return (
        <div className="container mt-3">
            <ProductForm />
            <Messages />
        </div>
    );
}

export default Home;
