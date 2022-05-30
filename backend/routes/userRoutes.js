const express = require("express");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();
const user = require("../controllers/user.controller");
router.post("/register", user.register);
router.post("/login", user.login);
router.post("/me", authenticateToken, user.getMe);

module.exports = router;
