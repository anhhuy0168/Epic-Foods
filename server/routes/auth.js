const express = require("express");
const router = express.Router();
const AccountController = require("../Controllers/AccountController");
const verifyToken = require("../middleware/auth");
const verifyTokenPassword = require("../middleware/VerifyTokenPassword");

router.post("/register", AccountController.userRegister);
router.post("/login", AccountController.userLogin);
router.get("/", verifyToken, AccountController.checkUser);
router.post("/activation", AccountController.activateEmail);
router.post("/forgot", AccountController.forgotPassword);
router.post("/reset", verifyTokenPassword, AccountController.resetPassword);
module.exports = router;
