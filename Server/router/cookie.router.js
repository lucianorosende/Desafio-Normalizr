import Express from "express";

const cookieRouter = Express.Router();

cookieRouter.get("/set", (req, res) => {
    res.json({ normales: req.cookies, firmadas: req.signedCookies });
});

const getSessionName = (req) => req.session.name ?? "";

cookieRouter.get("/session", (req, res) => {
    console.log("test");
    if (req.session.counter) {
        req.session.counter++;
        res.send(
            `hola ${getSessionName(req)} visitaste la pagina ${
                req.session.counter
            } veces`
        );
    } else {
        req.session.counter = 1;
        req.session.name = req.query.name;
        res.send(`hola ${getSessionName(req)}!`);
    }
});

cookieRouter.get("/logout", (req, res) => {
    let name = getSessionName(req);
    req.session.destroy((e) => {
        if (e) {
            res.json(e);
        } else {
            res.send(`hasta luego ${name}`);
        }
    });
});

cookieRouter.post("/set", (req, res) => {
    const { nombre, valor, tiempo } = req.body;
    if (!nombre || !valor) {
        res.json({ error: "faltan datos" });
    }
    if (tiempo) {
        res.cookie(nombre, valor, { signed: true, maxAge: parseInt(tiempo) });
    } else {
        res.cookie(nombre, valor, { signed: true });
    }
    res.send("Set Cookie");
});

cookieRouter.delete("/delete", (req, res) => {
    res.clearCookie(req.body.nombre).send("cookie deleted");
});

export default cookieRouter;
