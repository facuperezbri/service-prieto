const { Router } = require("express");

const { getUsers, getUserByDni, createUser, updateUser, deleteUser } = require("../controllers/usersControllers");

const router = Router();

router.route("/").get(getUsers).post(createUser).put(updateUser).delete(deleteUser);

router.get("/:dni", getUserByDni);

module.exports = router;
