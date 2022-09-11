const User = require("../models/Users");
const Category = require("../Models/Category");
class AdminController {
  async getAllStaff(req, res) {
    try {
      const user = await User.find({ role: "staff" }).sort([["createdAt", -1]]);
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
      const listUser = await User.find({ role: "user" }).sort([
        ["createdAt", -1],
      ]);
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
  async getAllCategory(req, res) {
    try {
      const category = await Category.find().sort([["createdAt", -1]]);
      // category.sort({ createdAt });
      // console.log(category);
      console.log(category);
      res.json({ success: true, category });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  async createCategory(req, res) {
    try {
      const { name } = req.body;
      const product = await Category.findOne({ name });
      if (product)
        return res
          .status(400)
          .json({ success: false, message: "Category has exist" });
      if (!name)
        return res
          .status(400)
          .json({ success: false, message: "Name is required" });
      const newCategory = new Category({
        name,
      });
      await newCategory.save();
      res.json({
        success: true,
        message: "Create complete !",
        category: newCategory,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  async updateCategory(req, res) {
    const { name } = req.body;
    // Simple validation
    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Missing information !" });
    try {
      let updateCategory = {
        name,
      };
      const updateCategoryCondition = { _id: req.params.id };
      updateCategory = await Category.findByIdAndUpdate(
        updateCategoryCondition,
        updateCategory,
        { new: true }
      );
      if (!updateCategory)
        return res.status(401).json({
          success: false,
          message: "Category not found",
        });

      res.json({
        success: true,
        message: "Excellent progress!",
        category: updateCategory,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  async deleteCategory(req, res) {
    try {
      const categoryDeleteCondition = { _id: req.params.id };
      const deleteCategory = await Category.findOneAndDelete(
        categoryDeleteCondition
      );

      if (!deleteCategory)
        return res.status(401).json({
          success: false,
          message: "Product not found ",
        });
      res.json({ success: true, category: deleteCategory });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = new AdminController();
