const route = require("express").Router();
const Subcategory = require("../models/Subcategory");
const checkPrivilege = require("../middleware/checkPrivilege");
const Category = require("../models/Category");

// get subcategories [GET: http://localhost:8000/api/subcategory/subcategory/:id]  (register not required)
route.get("/subcategory/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Subcategory.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Subcategory not found" });
    }
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Enternal Server Error" });
  }
});

// get subcategories [GET: http://localhost:8000/api/subcategory/subcategory]  (register not required)
route.get("/subcategory", async (req, res) => {
  try {
    const data = await Subcategory.find();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Enternal Server Error" });
  }
});

// post subcategories [POST: http://localhost:8000/api/subcategory/subcategory]  (register required)
route.post("/subcategory", checkPrivilege, async (req, res) => {
  try {
    const { subCategoryName, categoryId } = req.body;
    const findCategory = await Category.findById(categoryId);
    if (!findCategory)
      return res.status(400).json({ error: "Category not exist" });

    // check category already exist or not
    const checkExistance = await Subcategory.findOne({
      categoryId,
      subCategoryName,
    });
    if (checkExistance)
      return res.status(400).json({ error: "Subcategory Already Exist" });
    // adding new category
    const subcategory = await new Subcategory({
      subCategoryName,
      categoryId,
    });
    const subcatadded = await subcategory.save();
    if (subcatadded) {
      return res.json({ success: "SubCategory Added", data: subcategory });
    }
    return res.json({ error: "Unable To Add SubCategory" });
  } catch (e) {
    res.status(500).json({ error: "Enternal Server Error " + e });
  }
});

route.delete("/subcategory/:id", checkPrivilege, async (req, res) => {
  try {
    const subcategoryId = req.params.id;

    // Find subcategory to check if it exists
    const subcategory = await Subcategory.findById(subcategoryId);

    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory Not Found" });
    }

    // Subcategory exists, proceed with deletion
    await Subcategory.findByIdAndDelete(subcategoryId);
    res.json({ success: "Subcategory Deleted Successfully" });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error " + e });
  }
});

// Update subcategories [PATCH: http://localhost:8000/api/subcategory/subcategory/:id]  (register required)
route.patch("/subcategory/:id", checkPrivilege, async (req, res) => {
  try {
    const { subCategoryName, categoryId } = req.body;
    // check subcategory is exist or not
    const subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory) {
      return res.status(400).json({ error: "SubCategory Doesn't Exist" });
    }

    // Set update details in a new variable
    const newSubCat = {};
    if (subCategoryName) {
      newSubCat.subCategoryName = subCategoryName;
    }
    if (categoryId) {
      const findCategory = await Category.findById(categoryId);
      if (!findCategory) {
        return res
          .status(400)
          .json({ error: "Please Enter a Proper Category-Id" });
      }
      newSubCat.categoryId = categoryId;
    }

    // Find and update the subcategory
    const subcat = await Subcategory.findByIdAndUpdate(
      req.params.id,
      { $set: newSubCat },
      { new: true }
    );

    if (subcat) {
      return res.json({
        success: "SubCategory Update Success",
        subcategory: subcat,
      });
    }
    return res.json({
      error: "Cannot Update SubCategory",
    });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error " + e });
  }
});

module.exports = route;
