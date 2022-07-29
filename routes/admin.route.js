const express = require("express");

const admin = require("../app/controllers/admin.controller.js");

const router = express.Router();


router.post("/", admin.createAdmin);

module.exports = router;