const { Router } = require("express");
const router = Router();

const verifyJWT = require("../middlewares/verifyJWT");

const authRouter = require("./auth.routes");
const clientsRouter = require("./api/clients.routes");
const usersRouter = require("./api/users.routes");
const quotesRouter = require("./api/quotes.routes");

router.use("/auth", authRouter);
router.use(verifyJWT);
router.use("/clients", clientsRouter);
router.use("/users", usersRouter);
router.use("/quotes", quotesRouter);

module.exports = router;
