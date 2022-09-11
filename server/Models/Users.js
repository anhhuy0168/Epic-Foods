const mongoose = require("mongoose");
const UsersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "Username already exists"],
      minLength: [8, "Username must be at least 8 character"],
      maxLength: 255,
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Password must be at least 6 character"],
      maxLength: 255,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already exists"],
    },
    avatar: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    phoneNumber: {
      type: Number,
      required: true,
      maxLength: 255,
    },
    address: {
      type: String,
      required: true,
      maxLength: 255,
    },
    role: {
      type: String,
      required: true,
    },
    Cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UsersSchema);
