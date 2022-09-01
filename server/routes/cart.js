const express = require("express");
const router = express.Router();
const CartController = require("../Controllers/CartControllers");
const auth = require("../middleware/auth");
router.patch("/cart_user", CartController.addToCart);
router.get("/", auth, CartController.getCartUser);
router.delete("/cart_product/:id", auth, CartController.deleteProductCart);
router.patch("/cart_product/:id", auth, CartController.changeAmountCart);

module.exports = router;
