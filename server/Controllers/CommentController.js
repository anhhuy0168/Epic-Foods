const Comment = require("../Models/Comment");

class CommentController {
  async getComment(req, res) {
    try {
      const comment = await Comment.find({ product: req.params.id });
      res.json({ success: true, comment });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  async createComment(req, res) {
    const { content, product } = req.body;
    const { userId } = req;
    if (!product || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Missing information" });
    }

    try {
      const newComment = new Comment({
        content,
        product,
        user_id: userId,
      });
      console.log(newComment);
      await newComment.save();

      res.json({ success: true, message: "success!", comment: newComment });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  async deleteComment(req, res) {
    const commentDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedComment = await Comment.findOneAndDelete(
      commentDeleteCondition
    );
    if (!deletedComment)
      return res.status(401).json({
        success: false,
        message: "comment not found",
      });
    res.json({ success: true, comment: deletedComment });
  }
  catch(error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
  async editComment(req, res) {
    const { content, product } = req.body;
    const { userId } = req;
    // Simple validation
    if (!content)
      return res
        .status(400)
        .json({ success: false, message: "Missing information !" });
    try {
      let updateComment = {
        content,
        product,
        user_id: userId,
      };
      const updateCommentCondition = { _id: req.params.id };
      updateComment = await Comment.findByIdAndUpdate(
        updateCommentCondition,
        updateComment,
        { new: true }
      );
      if (!updateComment)
        return res.status(401).json({
          success: false,
          message: "Comment not found",
        });

      res.json({
        success: true,
        message: "Excellent progress!",
        comment: updateComment,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}
module.exports = new CommentController();
