const express = require("express");
const router = express.Router();
const GoogleController = require("../Controllers/GoogleController");
router.post("/user", GoogleController.saveUser);

module.exports = router;
