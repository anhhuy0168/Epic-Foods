const FoodsController = require("../Controllers/FoodsControllers");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = require("../utils/multer");

router.get("/get_foods", FoodsController.getAllFoods);
router.post(
  "/create_foods",
  upload.single("productImage"),
  FoodsController.createFoods
);
router.put(
  "/update_foods/:id",
  upload.single("productImage"),
  FoodsController.updateFoods
);
router.delete("/delete_product/:id", FoodsController.deleteFoods);

module.exports = router;
