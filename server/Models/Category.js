const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);
module.exports = mongoose.model("category", CategorySchema);
