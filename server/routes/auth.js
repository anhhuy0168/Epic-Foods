const express = require("express");
const router = express.Router();
const AccountController = require("../Controllers/AccountController");
const verifyToken = require("../middleware/auth");
const verifyTokenPassword = require("../middleware/VerifyTokenPassword");
const upload = require("../utils/multer");
router.get("/get_user", AccountController.getUser);
router.get("/friends/:userId", AccountController.getFriend);
router.post("/register", AccountController.userRegister);
router.post("/login", AccountController.userLogin);
router.get("/", verifyToken, AccountController.checkUser);
router.post("/activation", AccountController.activateEmail);
router.post("/forgot", AccountController.forgotPassword);
router.post("/reset", verifyTokenPassword, AccountController.resetPassword);
router.patch("/updateUser/:id", AccountController.updateProfile);
router.patch(
  "/updateAvatar/:id",
  upload.single("avatar"),
  AccountController.updateAvatar
);

module.exports = router;
