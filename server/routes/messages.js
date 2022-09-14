const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const MessageController = require("../Controllers/MessageController");
router.post("/", MessageController.addMessage);
router.get("/:conversationId", MessageController.getMessage);

module.exports = router;
