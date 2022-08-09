const Foods = require("../models/Foods");
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
class FoodsController {
  //

  //
  async getAllFoods(req, res) {
    try {
      const food = await Foods.find();
      res.json({ success: true, food });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  //create
  async createFoods(req, res) {
    try {
      //upload
      const result = await cloudinary.uploader.upload(req.file.path);
      const { name, description, price } = req.body;
      const product = await Foods.findOne({ name });
      if (product)
        return res
          .status(400)
          .json({ success: false, message: "Product has exist" });
      if (!name)
        return res
          .status(400)
          .json({ success: false, message: "Name is required" });
      const newFood = new Foods({
        name,
        description,
        price,
        productImage: result.secure_url,
      });
      await newFood.save();
      res.json({ success: true, message: "Create complete !", food: newFood });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  //update
  async updateFoods(req, res) {
    console.log(req.body);
    const result = await cloudinary.uploader.upload(req.file.path);

    const { name, description, price, productImage } = req.body;
    // Simple validation
    if (!name && !productImage && !price)
      return res
        .status(400)
        .json({ success: false, message: "Missing information !" });
    try {
      let updateProduct = {
        name,
        description,
        price,
        productImage: result.secure_url,
      };
      const updateProductCondition = { _id: req.params.id };
      updateProduct = await Foods.findByIdAndUpdate(
        updateProductCondition,
        updateProduct,
        { new: true }
      );
      if (!updateProduct)
        return res.status(401).json({
          success: false,
          message: "Product not found",
        });

      res.json({
        success: true,
        message: "Excellent progress!",
        product: updateProduct,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  //delete
  async deleteFoods(req, res) {
    try {
      const productDeleteCondition = { _id: req.params.id };
      const deleteProducts = await Foods.findOneAndDelete(
        productDeleteCondition
      );

      if (!deleteProducts)
        return res.status(401).json({
          success: false,
          message: "Product not found ",
        });
      res.json({ success: true, post: deleteProducts });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}
//upload

module.exports = new FoodsController();
