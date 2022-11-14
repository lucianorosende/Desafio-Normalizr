import Express from "express";

const authRouter = Express.Router();

authRouter.get("/session", (req, res) => {
    res.send(req.session);
});

authRouter.get("/logout", (req, res) => {
    let name = req.session.nombre;
    req.session.destroy((e) => {
        if (e) {
            res.json(e);
        } else {
            res.json(`Hasta Luego, ${name}!`);
        }
    });
});

authRouter.post("/login", (req, res) => {
    req.session.nombre = req.body.nombre;
    res.send(req.session);
});

export default authRouter;
