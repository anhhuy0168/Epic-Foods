const User = require("../models/Users");
class AdminController {
  async getAllStaff(req, res) {
    try {
      const user = await User.find({ role: "staff" });
      res.json({ success: true, user });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  async getAllUser(req, res) {
    try {
      const listUser = await User.find({ role: "user" });
      res.json({ success: true, listUser });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  async deleteStaff(req, res) {
    try {
      const userDeleteCondition = { _id: req.params.id };
      const deletedUser = await User.findOneAndDelete(userDeleteCondition);

      if (!deletedUser)
        return res.status(401).json({
          success: false,
          message: "User not found ",
        });
      res.json({ success: true, user: deletedUser });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = new AdminController();
