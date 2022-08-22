const express = require("express");
const router = express.Router();
const AdminController = require("../Controllers/AdminController");

router.get("/getStaff", AdminController.getAllStaff);
router.get("/getUser", AdminController.getAllUser);
router.delete("/delete_staff/:id", AdminController.deleteStaff);

module.exports = router;
