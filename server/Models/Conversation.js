const mongoose = require("mongoose");
const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);
module.exports = mongoose.model("conversation", ConversationSchema);
