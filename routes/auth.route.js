const express = require("express");

const auth = require("../app/controllers/auth.controller.js");

const router = express.Router();

router.post("/", auth.login);

module.exports = router;