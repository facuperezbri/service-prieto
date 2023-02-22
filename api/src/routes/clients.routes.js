const { Router } = require("express");

const {
  getClients,
  getClientByDni,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientsControllers");

const router = Router();

router.route("/").get(getClients).post(createClient).put(updateClient).delete(deleteClient);

router.get("/:dni", getClientByDni);

module.exports = router;
