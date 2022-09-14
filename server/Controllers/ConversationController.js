const Conversation = require("../Models/Conversation");
class ConversationController {
  // new conv
  async newConversation(req, res) {
    const newConversation = new Conversation({
      members: [req.body._id, req.body.staffId],
    });
    const data = await Conversation.findOne(newConversation);

    if (data) {
      return res
        .status(400)
        .json({ success: false, message: "Conversation has exist" });
    }
    try {
      const savedConversation = await newConversation.save();
      res.status(200).json({
        success: true,
        message: "Create complete !",
        conversation: savedConversation,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  async getConversation(req, res) {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      }).sort([["createdAt", -1]]);
      res.status(200).json({ success: true, conversation });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
module.exports = new ConversationController();
