const userModel = require("../models/user.model");
const { login, register } = require("./../controllers/auth.controller");

const router = require("express").Router();

router.post("/register", register);

router.post("/login", login);

module.exports = router;
