const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

//register new user
router.post("/register", register);

//login existing user
router.post("/login", login);

module.exports = router;
