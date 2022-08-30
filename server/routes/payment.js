const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const PaymentController = require("../Controllers/PaymentController");
router.get("/orders", PaymentController.getOrder);

router.post("/order/payment", PaymentController.createOrder);

module.exports = router;
