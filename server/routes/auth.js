const express = require("express");
const router = express.Router();
const AccountController = require("../Controllers/AccountController");
const verifyToken = require("../middleware/auth");

router.post("/register", AccountController.userRegister);
router.post("/login", AccountController.userLogin);
router.get("/", verifyToken, AccountController.checkUser);
router.post("/activation", AccountController.activateEmail);

module.exports = router;
