import Express from "express";
import Contenedor from "../api/products.js";
import { faker } from "@faker-js/faker";

//Router --------------------------------------------------------------------------------

const Container = new Contenedor();
const apiRouter = Express.Router();

const isAdmin = (req, res, next) => {
    if (req.query.admin === "true") {
        next();
    } else {
        res.send({ error: "You are not allowed to access this" });
    }
};

// get Products
apiRouter.get("/", async (req, res) => {
    let PRODUCTS = await Container.getWithKnex();

    PRODUCTS.length === 0
        ? res.json({ error: "No products found" })
        : res.json({ PRODUCTS: PRODUCTS });
});
apiRouter.get("/test", async (req, res) => {
    let dataStore = [];
    let id = 1;
    for (let i = 0; i < 5; i++) {
        let fakerObj = {
            nombre: faker.commerce.product(),
            descripcion: faker.commerce.productDescription(),
            codigo: faker.finance.account(5),
            precio: faker.commerce.price(100, 1500, 0),
            stock: faker.commerce.price(0, 100, 0),
            foto: faker.image.abstract(1920, 1080, true),
            productId: id++,
        };
        dataStore.push(fakerObj);
    }
    res.json(dataStore);
});

// get Products based off id
apiRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    let product = await Container.getById(id);
    product === null
        ? res.json({ error: "Product not found" })
        : res.json({ PRODUCT: product });
});

// add products and add id
apiRouter.post("/", isAdmin, async (req, res) => {
    let saveProduct = await Container.saveProduct(req.body);

    saveProduct === null
        ? res.send("completar todo el formulario")
        : res.send(`producto con id: ${saveProduct}`);
});

// update product based off id
apiRouter.put("/:id", isAdmin, async (req, res) => {
    let update = await Container.update(req.params.id, req.body);

    update === 0
        ? res.send("no hay producto para actualizar")
        : res.send(`producto actualizado con id: ${req.params.id}`);
});

// delete product based off id
apiRouter.delete("/:id", isAdmin, async (req, res) => {
    const result = await Container.delete(req.params.id);

    result === null
        ? res.send(`no hay producto con id: ${req.params.id}`)
        : res.send(result);
});
apiRouter.delete("/", isAdmin, async (req, res) => {
    const result = await Container.deleteAll();
    result === 0
        ? res.send("no hay productos para borrar")
        : res.send("TODOS LOS PRODUCTOS BORRADOS");
});

export default apiRouter;
