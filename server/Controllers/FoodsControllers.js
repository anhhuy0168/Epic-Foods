const Foods = require("../Models/Product");
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
class FoodsController {
  //get 1
  async getOneFood(req, res) {
    try {
      const food = await Foods.findById({ _id: req.params.id });
      if (!food) {
        res.status(404).json({ success: false, message: "Food is not exist" });
      }
      if (food) res.json({ success: true, food });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  //
  async getAllFoods(req, res) {
    try {
      const food = await Foods.find().sort([["createdAt", -1]]);
      res.json({ success: true, food });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  //create
  async createFoods(req, res, next) {
    try {
      //upload
      const result = await cloudinary.uploader.upload(req.file.path);

      console.log(result);
      const { name, description, price, category } = req.body;
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
        category,
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
    try {
      if (req.file) {
        const { name, description, price, category, productImage } = req.body;

        const result = await cloudinary.uploader.upload(req.file.path);
        let updateProduct = {
          name,
          description,
          price,
          productImage: result.secure_url,
          category,
        };
        const updateProductCondition = { _id: req.params.id };
        updateProduct = await Foods.findByIdAndUpdate(
          updateProductCondition,
          updateProduct,
          { new: true }
        );
        if (!updateProduct)
          return res
            .status(401)
            .json({ success: false, message: "Product not found" });
        res.json({
          success: true,
          message: "Excellent progress!",
          product: updateProduct,
        });
      } else if (!req.file) {
        const { name, description, price, category, productImage } = req.body;
        let updateProduct = {
          name,
          description,
          price,
          category,
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
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server errorrrrr" });
    }
  }
  // const result = await cloudinary.uploader.upload(req.file.path);
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

module.exports = new FoodsController();
