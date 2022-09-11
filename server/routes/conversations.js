const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const ConversationController = require("../Controllers/ConversationController");
router.post("/", ConversationController.newConversation);
router.get("/:userId", ConversationController.getConversation);

module.exports = router;
