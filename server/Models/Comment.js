const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
});
CommentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
  }).populate({
    path: "user_id",
  });
  next();
});

module.exports = mongoose.model("comment", CommentSchema);
