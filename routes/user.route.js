const express = require("express");

const user = require("../app/controllers/users.controller.js");
const auth = require("../middleware/auth.js");
const router = express.Router();

router.post("/", auth, user.createUser);
router.delete("/:id", auth, user.deleteUser);
router.get("/:id", auth, user.getUser);
router.post("/fetch-all", auth, user.getAllUsers);

module.exports = router;
