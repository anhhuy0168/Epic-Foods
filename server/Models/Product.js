const mongoose = require("mongoose");
const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "food name already exists"],
    minLength: [8, "name must be at least 8 character"],
    maxLength: 255,
  },
  description: {
    type: String,
    unique: [true, "Description already exists"],
    minLength: [8, "Description must be at least 8 character"],
    maxLength: 255,
  },
  price: {
    type: Number,
    unique: [true, "Price already exists"],
  },
  productImage: {
    type: String,
    unique: [true, "Product Image already exists"],
  },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
});
module.exports = mongoose.model("product", ProductsSchema);
