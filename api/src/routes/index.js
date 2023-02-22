const { Router } = require("express");
const router = Router();

const clientsRouter = require("./clients.routes");
const usersRouter = require("./users.routes");

router.use("/clients", clientsRouter);
router.use("/users", usersRouter);

module.exports = router;
