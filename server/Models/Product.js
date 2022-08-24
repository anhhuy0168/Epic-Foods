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
    unique: [true, "Price already exists"],
  },
  productImage: {
    type: String,
    unique: [true, "Product Image already exists"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
});
ProductsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
  });
  next();
});
module.exports = mongoose.model("product", ProductsSchema);
