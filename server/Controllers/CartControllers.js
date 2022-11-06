const Cart = require("../models/Cart");
const { ObjectId } = require("mongodb");
class CartController {
  async getCartUser(req, res) {
    try {
      const cart = await Cart.find({ user_id: req.userId }).sort([
        ["createdAt", -1],
      ]);
      res.json({ success: true, cart });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  async addToCart(req, res) {
    const { product, users_id } = req.body;
    const infor = await Cart.find({ product: ObjectId(product) });
    if (infor.length !== 0) {
      return res
        .status(400)
        .json({ success: false, message: "Product has exist" });
    }

    try {
      const cartUser = await Cart.find({ user_id: req.userId });
      console.log(cartUser);
      if (cartUser) {
        const user_id = ObjectId(users_id);
        const newCart = new Cart({
          amount: 1,
          product,
          user_id: user_id,
        });

        await newCart.save();

        res.json({ success: true, message: "Happy buy!", cart: newCart });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  async changeAmountCart(req, res) {
    const { amount } = req.body;
    console.log(amount);
    if (amount < 1) {
      return res
        .status(400)
        .json({ success: false, message: "product not < 0" });
    }
    try {
      const cartAmountChange = await Cart.findByIdAndUpdate(req.params.id, {
        amount: amount,
      });
      const allCart = await Cart.find({ userId: req.userId });
      res.json({
        success: true,
        message: "Happy buy!",
        cart: allCart,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  async deleteProductCart(req, res) {
    const cartDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedCart = await Cart.findOneAndDelete(cartDeleteCondition);
    if (!deletedCart)
      return res.status(401).json({
        success: false,
        message: "product cart not found",
      });
    res.json({ success: true, cart: deletedCart });
  }
  catch(error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
module.exports = new CartController();
