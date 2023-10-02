const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CartSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);
CartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user_id",
    path: "product",
  });
  next();
});
module.exports = mongoose.model("cart", CartSchema);
