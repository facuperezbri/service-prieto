const { Router } = require("express");
const router = Router();

const clientsRouter = require("./clients.routes");
const usersRouter = require("./users.routes");
const quotesRouter = require("./quotes.routes");

router.use("/clients", clientsRouter);
router.use("/users", usersRouter);
router.use("/quotes", quotesRouter);

module.exports = router;
