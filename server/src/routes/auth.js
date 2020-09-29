const express = require("express");

const router = express.Router();

const auth = require("../controllers/auth");

router.get("/register", auth.getUser);

router.post("/register", auth.registerUser);

router.post("/login", auth.loginUser);

module.exports = router;
