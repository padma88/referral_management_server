const express = require("express");

const user = require("../app/controllers/users.controller.js");

const router = express.Router();

router.post("/login", user.login);
router.post("/", user.createUser);
router.get("/:id", user.getUser);
router.post("/fetch-all", user.getAllUsers)

module.exports = router;