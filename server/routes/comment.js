const express = require("express");
const router = express.Router();
const CommentController = require("../Controllers/CommentController");
router.get("/getComment/:id", CommentController.getComment);
router.post("/createComment", CommentController.createComment);
router.delete("/deleteComment/:id", CommentController.deleteComment);

module.exports = router;
