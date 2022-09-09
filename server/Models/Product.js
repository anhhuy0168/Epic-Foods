const mongoose = require("mongoose");
const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "food name already exists"],
    minLength: [5, "name must be at least 5 character"],
    maxLength: 255,
  },
  description: {
    type: String,
    minLength: [8, "Description must be at least 8 character"],
  },
  price: {
    type: Number,
  },
  productImage: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  createdAt: { type: Date, default: Date.now() },
});
ProductsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
  });
  next();
});
module.exports = mongoose.model("product", ProductsSchema);
