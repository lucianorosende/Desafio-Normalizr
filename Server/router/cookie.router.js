import Express from "express";

const cookieRouter = Express.Router();

cookieRouter.get("/set", (req, res) => {
    res.json({ normales: req.cookies, firmadas: req.signedCookies });
});

const getSessionName = (req) => req.session.nombre ?? "";

cookieRouter.get("/session", (req, res) => {
    res.send(req.session);
    // if (req.session.counter) {
    //     req.session.counter++;
    //     res.send(
    //         `hola ${getSessionName(req)} visitaste la pagina ${
    //             req.session.counter
    //         } veces`
    //     );
    // } else {
    //     req.session.counter = 1;
    //     req.session.name = req.query.name;
    //     res.send(`hola ${getSessionName(req)}!`);
    // }
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

cookieRouter.post("/login", (req, res) => {
    req.session.nombre = req.body.nombre;
    console.log(req.session);
    res.send("done");
});

export default cookieRouter;
