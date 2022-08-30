const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new mongoose.Schema({
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },
  amount: {
    type: Number,
  },
  price: {
    type: Number,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  createdAt: { type: Date, default: Date.now },
});
OrderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
  })
    .populate({
      path: "product",
    })
    .populate({
      path: "cart",
    });
  next();
});
module.exports = mongoose.model("orders", OrderSchema);
