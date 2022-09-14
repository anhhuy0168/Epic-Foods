const express = require("express");
const router = express.Router();
const AdminController = require("../Controllers/AdminController");

router.get("/getStaff", AdminController.getAllStaff);
router.get("/getUser", AdminController.getAllUser);
router.delete("/delete_staff/:id", AdminController.deleteStaff);

//category
router.get("/getCategory", AdminController.getAllCategory);
router.post("/createCategory", AdminController.createCategory);
router.delete("/deleteCategory/:id", AdminController.deleteCategory);
router.patch("/updateCategory/:id", AdminController.updateCategory);

module.exports = router;
