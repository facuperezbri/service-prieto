const { Router } = require("express");

const isAdmin = require("../../middlewares/isAdmin");
const { getUsers, getUserByDni, createUser, updateUser, deleteUser } = require("../../controllers/usersControllers");

const router = Router();

router.route("/").get(getUsers).put(updateUser).delete(isAdmin, deleteUser);

router.get("/:dni", getUserByDni);

module.exports = router;
