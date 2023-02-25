const { Router } = require("express");

const { handleRegister, handleLogin, handleLogout } = require("../controllers/authController");
const handleRefreshToken = require("../controllers/refreshTokenController");

const router = Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.get("/refresh", handleRefreshToken);
router.get("/logout", handleLogout);

module.exports = router;
