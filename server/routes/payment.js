const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const PaymentController = require("../Controllers/PaymentController");
router.get("/orders", PaymentController.getOrder);
router.get("/historyOrder", PaymentController.getHistoryOrder);
router.get("/orderUser", auth, PaymentController.getUserOrder);
router.delete("/check_orderUser/:id", PaymentController.checkOrder);
router.delete("/deleteOrder/:id", PaymentController.deleteOrder);
router.post("/order/payment", PaymentController.createOrder);

module.exports = router;
