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
      const order = await Order.findDeleted({ user: req.userId });
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
  async checkOrder(req, res) {
    console.log(req.params.id);
    try {
      const orderCheckCondition = { _id: req.params.id };
      const checkOrder = await Order.delete(orderCheckCondition);

      if (!checkOrder)
        return res.status(401).json({
          success: false,
          message: "Order not found ",
        });
      res.json({ success: true, order: checkOrder });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  async getHistoryOrder(req, res) {
    try {
      const listHistoryOrder = await Order.findDeleted({});
      res.json({ success: true, listHistoryOrder });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  async deleteOrder(req, res) {
    try {
      const orderDeleteCondition = { _id: req.params.id };
      const deleteOrder = await Order.findOneAndDelete(orderDeleteCondition);

      if (!deleteOrder)
        return res.status(401).json({
          success: false,
          message: "Order not found ",
        });
      res.json({ success: true, order: deleteOrder });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}
module.exports = new PaymentController();
