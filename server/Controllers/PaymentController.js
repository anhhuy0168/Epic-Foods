const Order = require("../Models/Orders");
const stripe = require("stripe")(
  "sk_test_51LbyNZFYvAR2okGPH5W9yBKhqohbFj9HLTdN8kootT9igdoSo8LNoRlxptCSQUQaqiGaiWIN13R0b4YNEKRzulqd00tCD5PtDY"
);
class PaymentController {
  async getOrder(req, res, next) {
    try {
      const listOrder = await Order.find();
      res.json({ success: true, listOrder });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  async getUserOrder(req, res) {
    try {
      const order = await Order.find({ user: req.userId });
      res.json({ success: true, order });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  async createOrder(req, res) {
    console.log(req.body);
    const { token = {}, amount = 0, user, product, price, cart } = req.body;

    if (!Object.keys(token).length || !amount) {
      res.status(400).json({ success: false });
    }

    const { id: customerId } = await stripe.customers
      .create({
        email: token.email,
        source: token.id,
      })
      .catch((e) => {
        console.log(e);
        return null;
      });

    if (!customerId) {
      res.status(500).json({ success: false });
      return;
    }

    const invoiceId = `${
      token.email
    }-${Math.random().toString()}-${Date.now().toString()}`;

    const charge = await stripe.charges.create(
      {
        amount: price * 100,
        currency: "USD",
        customer: customerId,
        receipt_email: token.email,
        description: "Epic-Foods-Payment",
      },
      { idempotencyKey: invoiceId }
    );
    if (!charge) {
      res.status(500).json({ success: false });
      return;
    }
    if (product) {
      const newOrder = new Order({
        user: user._id,
        price: price,
        amount: amount,
        product: product._id,
        cart,
      });
      await newOrder.save();
    }
    if (!product) {
      const newOrder = new Order({
        user: user._id,
        price: price,
        cart,
      });
      await newOrder.save();
    }
  }
  catch(error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
module.exports = new PaymentController();
