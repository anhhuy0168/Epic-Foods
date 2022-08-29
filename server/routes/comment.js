const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const CommentController = require("../Controllers/CommentController");
router.get("/getComment/:id", CommentController.getComment);
router.post("/createComment", auth, CommentController.createComment);
router.delete("/deleteComment/:id", auth, CommentController.deleteComment);
router.patch("/editComment/:id", CommentController.editComment);

module.exports = router;
