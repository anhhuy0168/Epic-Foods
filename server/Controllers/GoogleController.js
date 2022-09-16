const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
require("dotenv").config();
class GoogleController {
  async saveUser(req, res) {
    try {
      const { name, avatar, email } = req.body.body;
      const user = await User.findOne({ email });
      if (user) {
        const accessToken = jwt.sign(
          {
            userId: user._id,
            username: user.username,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        return res
          .status(200)
          .json({ success: true, message: "User has exist", accessToken });
      } else {
        const password = "password123";
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({
          username: name,
          email: email,
          password: hashedPassword,
          avatar: avatar,
          role: "user",
        });
        await newUser.save();
        // return token
        const accessToken = jwt.sign(
          { userId: newUser._id },
          process.env.ACCESS_TOKEN_SECRET
        );

        res.json({
          success: true,
          message: "User created successfully",
          accessToken,
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}
module.exports = new GoogleController();
