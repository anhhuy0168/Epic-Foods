const Comment = require("../Models/Comment");

class CommentController {
  async getComment(req, res) {
    console.log(req.params.id);
    try {
      const comment = await Comment.find({ product: req.params.id }).populate(
        "product",
        ["name"]
      );
      res.json({ success: true, comment });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  async createComment(req, res) {
    console.log(req.body);
    const { content, product, user_id } = req.body;
    try {
      const newComment = new Comment({
        content,
        product,
        user_id,
      });

      await newComment.save();

      res.json({ success: true, message: "success!", comment: newComment });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  async deleteComment(req, res) {}
}
module.exports = new CommentController();
