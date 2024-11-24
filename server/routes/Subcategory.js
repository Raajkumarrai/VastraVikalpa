const route = require("express").Router();
const Subcategory = require("../models/Subcategory");
const checkPrivilege = require("../middleware/checkPrivilege");
const Category = require("../models/Category");

// Get a specific subcategory [GET: http://localhost:8000/api/subcategory/subcategory/:id]
route.get("/subcategory/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the subcategory and ensure it has products
    const subcategory = await Subcategory.findOne({
      _id: id,
      items: { $gt: 0 },
    });

    if (!subcategory) {
      return res
        .status(404)
        .json({ error: "Subcategory not found or has no products" });
    }

    res.json(subcategory);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error: " + e.message });
  }
});

// Get all subcategories [GET: http://localhost:8000/api/subcategory/subcategory]
route.get("/subcategory", async (req, res) => {
  try {
    // Find only subcategories with products
    const subcategories = await Subcategory.find({ items: { $gt: 0 } });
    res.json(subcategories);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error: " + e.message });
  }
});

// Add a new subcategory [POST: http://localhost:8000/api/subcategory/subcategory]
route.post("/subcategory", checkPrivilege, async (req, res) => {
  try {
    const { subCategoryName, categoryId } = req.body;

    const findCategory = await Category.findById(categoryId);
    if (!findCategory) {
      return res.status(400).json({ error: "Category does not exist" });
    }

    // Check if the subcategory already exists
    const checkExistance = await Subcategory.findOne({
      categoryId,
      subCategoryName,
    });
    if (checkExistance) {
      return res.status(400).json({ error: "Subcategory already exists" });
    }

    // Create a new subcategory
    const subcategory = new Subcategory({ subCategoryName, categoryId });
    const savedSubcategory = await subcategory.save();

    if (savedSubcategory) {
      return res.json({ success: "Subcategory added", data: subcategory });
    }
    res.status(500).json({ error: "Unable to add subcategory" });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error: " + e.message });
  }
});

// Delete a subcategory [DELETE: http://localhost:8000/api/subcategory/subcategory/:id]
route.delete("/subcategory/:id", checkPrivilege, async (req, res) => {
  try {
    const { id } = req.params;

    // Find the subcategory to ensure it exists
    const subcategory = await Subcategory.findById(id);
    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    // Delete the subcategory
    await Subcategory.findByIdAndDelete(id);
    res.json({ success: "Subcategory deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error: " + e.message });
  }
});

// Update a subcategory [PATCH: http://localhost:8000/api/subcategory/subcategory/:id]
route.patch("/subcategory/:id", checkPrivilege, async (req, res) => {
  try {
    const { subCategoryName, categoryId } = req.body;

    // Find the subcategory to ensure it exists
    const subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory does not exist" });
    }

    // Prepare updated details
    const updates = {};
    if (subCategoryName) updates.subCategoryName = subCategoryName;
    if (categoryId) {
      const findCategory = await Category.findById(categoryId);
      if (!findCategory) {
        return res.status(400).json({ error: "Invalid category ID" });
      }
      updates.categoryId = categoryId;
    }

    // Update the subcategory
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    res.json({
      success: "Subcategory updated successfully",
      data: updatedSubcategory,
    });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error: " + e.message });
  }
});

module.exports = route;
