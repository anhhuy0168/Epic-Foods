const User = require("../models/Users");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sendEmail = require("./SendMailController");
class AccountController {
  // @route GET api/auth
  // @desc Check if user is logged in
  async checkUser(req, res) {
    try {
      const user = await User.findById(req.userId).select("-password");
      if (!user)
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      res.json({ success: true, user });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  //login
  async userLogin(req, res) {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing username and/or password" });

    try {
      // check existing user
      const user = await User.findOne({ username });
      if (!user)
        return res
          .status(400)
          .json({ success: false, message: "Incorrect username or password" });

      //username found
      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid)
        return res
          .status(400)
          .json({ success: false, message: "Incorrect username or password" });

      // all good
      // return token
      const accessToken = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        success: true,
        message: "User logged in successfully",
        accessToken,
      });
    } catch (err) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  // register
  async userRegister(req, res, next) {
    const { username, password, email, dateOfBirth, address, phoneNumber } =
      req.body;
    // Simple validation
    if (!username || !password || !email || !address || !phoneNumber)
      return res
        .status(400)
        .json({ success: false, message: "Missing information" });
    try {
      // Check for existing user
      const user = await User.findOne({ username });
      if (user)
        return res
          .status(400)
          .json({ success: false, message: "Username already taken" });

      // All good

      // const newUser1 = new User({ phoneNumber,role :'user', email,address,dateOfBirth,username, password: hashedPassword })
      const newUser = {
        username,
        email,
        password,
        address,
        role: "user",
        phoneNumber,
      };

      // Return token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "2h" }
      );

      const activation_token = jwt.sign(
        { user: newUser },
        process.env.ACTIVATION_TOKEN_SECRET,
        { expiresIn: "2h" }
      );
      const url = `${process.env.CLIENT_URL}/user/activate/${activation_token}`;
      sendEmail(email, url, "Verify your email address");

      res.json({
        msg: "Register Success! Please activate your email to start.",
        success: true,
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  // activate email
  async activateEmail(req, res) {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );
      console.log(user.user);
      // 	// var decoded = jwt_decode(user);
      const { username, email, address, phoneNumber, password } = user.user;

      const check = await User.findOne({ email });
      if (check)
        return res.status(400).json({ msg: "This email already exists." });
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        address,
        phoneNumber,
        role: "user",
      });

      await newUser.save();
      res.json({ msg: "account has been activated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
  //forgot pass
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });
      // get access token
      const access_token = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "2h" }
      );
      const url = `${process.env.CLIENT_URL}/user/reset/${access_token}`;

      sendEmail(email, url, "Reset your password");
      res.json({ msg: "Re-send the password, please check your email." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
  // reset pass
  async resetPassword(req, res) {
    try {
      const { password } = req.body;
      console.log(password);
      const passwordHash = await argon2.hash(password);
      console.log(req.user.userId);
      await User.findOneAndUpdate(
        { _id: req.user.userId },
        {
          password: passwordHash,
        }
      );

      res.json({ msg: "Password successfully changed!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
}
module.exports = new AccountController();
