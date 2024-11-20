const route = require("express").Router();
const checkPrivilege = require("../middleware/checkPrivilege");
const Category = require("../models/Category");
const upload = require("../middleware/uploadInBlog");
require("dotenv").config();
const fs = require("fs");

// get categories [GET: http://localhost:8000/api/category/categories]  (register not required)
route.get("/categories", async (req, res) => {
  try {
    const data = await Category.find();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Enternal Server Error" });
  }
});

// get categories [GET: http://localhost:8000/api/category/category/:id]  (register not required)
route.get("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Enternal Server Error" });
  }
});

// Post categories [POST: http://localhost:8000/api/category/category]  (register required)
route.post(
  "/category",
  checkPrivilege,
  upload.single("image"),
  async (req, res) => {
    try {
      const { categoryName, displayOrder, active, showTop } = req.body;
      // check category already exist or not
      const checkExistance = await Category.findOne({ categoryName });
      if (checkExistance)
        return res.status(400).json({ error: "Category Already Exist" });
      // adding new category
      let imgPath = req.file ? process.env.domain + req.file.path : "";

      const category = await new Category({
        categoryName,
        displayOrder,
        showTop,
        active,
        image: imgPath,
      });
      if (!category) return res.json({ error: "Unable To Add Category" });
      await category.save();
      res.json({ success: "Category Added", data: category });
    } catch (e) {
      res.status(500).json({ error: "Enternal Server Error " + e });
    }
  }
);
// Update categories [PATCH: http://localhost:8000/api/category/category/:id]  (register required)
route.patch(
  "/category/:id",
  checkPrivilege,
  upload.single("image"),
  async (req, res) => {
    try {
      const { categoryName, displayOrder, active, showTop } = req.body;
      // check category is exist or not
      const category = await Category.findById(req.params.id);
      if (!category)
        return res.status(400).json({ error: "Category doesn't exist" });

      // set update detail in a new variable
      const newCategory = {};
      if (categoryName) {
        newCategory.categoryName = categoryName;
      }
      if (displayOrder) {
        newCategory.displayOrder = displayOrder;
      }
      if (String(active).length > 2) {
        newCategory.active = active;
      }
      if (String(showTop).length > 2) {
        newCategory.showTop = showTop;
      }
      if (req.file) {
        // If a new image is provided, update the image path
        newCategory.image = process.env.domain + req.file.path;

        // Delete the old image if it exists
        if (category.image) {
          const oldImagePath = category.image.slice(process.env.domain.length);
          fs.unlinkSync(oldImagePath);
        }
      }

      // Find the category and update
      const categorynew = await Category.findByIdAndUpdate(
        req.params.id,
        { $set: newCategory },
        { new: true }
      );
      res.json({
        success: "Category update successful",
        category: categorynew,
      });
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error " + e });
    }
  }
);

// delete categories [DELETE: http://localhost:8000/api/category/category/:id]  (register required)
route.delete("/category/:id", checkPrivilege, async (req, res) => {
  try {
    const categoryId = req.params.id;
    // Find category and check if it exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ error: "Category Not Found" });
    }

    // Delete the category
    await Category.findByIdAndDelete(categoryId);

    // Delete the associated image if it exists
    if (category.image) {
      const imagePath = category.image.slice(process.env.domain.length);
      fs.unlinkSync(imagePath);
    }

    res.json({ success: "Category Deleted Successfully" });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error " + e });
  }
});

module.exports = route;
