const route = require("express").Router();
const fetchuser = require("../middleware/fetchuser");
const Blog = require("../models/Blogs");
require("dotenv").config();
const upload = require("../middleware/uploadInBlog");
const fs = require("fs");
const { default: mongoose } = require("mongoose");
// const CheckSuperAdmin = require("../middleware/CheckSuperAdmin");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const checkPrivilege = require("../middleware/checkPrivilege");

// delete image if some error accuired
const deleteImage = (array) => {
  array.forEach((e) => {
    fs.unlinkSync(e.path);
  });
};

// get Blogs [GET: http://localhost:8000/api/post/blogs]  (register not required)
route.get("/blogs", async (req, res) => {
  try {
    const norevdata = await Blog.find();
    // const data = await norevdata.reverse();
    res.json(norevdata);
  } catch (e) {
    res.status(500).json({ error: "Enternal Server Error " + e });
  }
});

// get Blog [GET: http://localhost:8000/api/post/blog/:id]  (register not required)
route.get("/blog/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const data = await Blog.findById(blogId);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Enternal Server Error " + e });
  }
});

// get by metal [GET: http://localhost:8000/api/post/blog/filter/:metal]  (register not required)
route.get("/blog/filter/:metal", async (req, res) => {
  try {
    const metal = req.params.metal;
    const norevdata = await Blog.find({ metal });
    const data = norevdata;
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Enternal Server Error " + e });
  }
});
// get by category [GET: http://localhost:8000/api/post/blog/category/filter/:category]  (register not required)
route.get("/blog/category/filter/:category", async (req, res) => {
  try {
    const categoryId = req.params.category;
    const norevdata = await Blog.find({ categoryId });
    const data = norevdata;
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Enternal Server Error " + e });
  }
});

// get by subcategory [GET: http://localhost:8000/api/post/blog/subcategory/filter/:subcategory]  (register not required)
route.get("/blog/subcategory/filter/:subcategory", async (req, res) => {
  try {
    const subcategoryId = req.params.subcategory;
    const norevdata = await Blog.find({ subcategoryId });
    const data = norevdata;
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Enternal Server Error " + e });
  }
});

// Post Blogs [POST: http://localhost:8000/api/post/blogs] (register required)
route.post(
  "/blogs",
  checkPrivilege,
  upload.array("image", 8),
  async (req, res) => {
    try {
      let {
        categoryId,
        subcategoryId,
        title,
        description,
        like,
        price,
        maxQuantity,
        address,
        phNumber,
        gendertype,
        productcolor,
        discount,
      } = req.body;

      // check if file is uploaded or not
      if (!req.files.length > 0)
        return res.status(400).json({ error: "Please Upload File" });

      const category = await Category.findById(categoryId);
      // check category
      if (!category) {
        deleteImage(req.files);
        return res.status(400).json({ error: "Sorry Category Not Found" });
      }

      let subcategoryName = "";
      // check subcategory
      if (subcategoryId !== "") {
        const subcategory = await Subcategory.findById(subcategoryId);
        if (!subcategory) {
          deleteImage(req.files);
          return res.status(400).json({ error: "Sorry Subategory Not Found" });
        } else {
          subcategoryName = subcategory.subCategoryName;
        }
      }

      let images = [];
      const likeId = req.user.id;

      if (req.files.length > 0) {
        images = req.files.map((file) => {
          return process.env.domain + file.path;
        });
      }
      if (!Array.isArray(productcolor)) {
        productcolor = [productcolor];
      }

      const blog = new Blog({
        title,
        description,
        like,
        price,
        maxQuantity,
        address,
        phNumber,
        categoryId,
        categoryName: category.categoryName,
        subcategoryId: subcategoryId === "" ? null : subcategoryId,
        subcategoryName,
        gendertype,
        productcolor,
        discount,
        image: images,
        likeId: String(like).toLowerCase() === "true" ? likeId : [],
      });

      if (!blog) {
        deleteImage(req.files);
        return res.json({ error: "Unable To Add Category" });
      }

      await blog.save();
      res.json({ success: "Blog Added", product: blog });
    } catch (e) {
      if (req.files.length > 0) {
        deleteImage(req.files);
      }
      res.status(500).json({ error: "Internal Server Error " + e });
    }
  }
);

// Delete Blogs [DELETE: http://localhost:8000/api/post/blogs/:id] (register required)
route.delete("/blogs/:id", checkPrivilege, async (req, res) => {
  try {
    const blogId = req.params.id;
    // Find Blog and check if it exists
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(400).json({ error: "Blog Not Found" });

    // Delete the associated images
    blog.image.forEach((imagePath) => {
      try {
        fs.unlinkSync(
          imagePath.slice(process.env.domain.length, imagePath.length)
        );
      } catch (err) {
        // Handle the error, e.g., log it or ignore it
        console.error("Error deleting file:", err);
      }
    });

    // Delete the blog itself
    await Blog.findByIdAndDelete(blogId);

    res.json({ success: "Blog Deleted Success" });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error " + e });
  }
});

// Update Blogs [PATCH: http://localhost:8000/api/post/blogs/:id] (register required)
route.patch(
  "/blogs/:id",
  checkPrivilege,
  upload.array("image", 4),
  async (req, res) => {
    try {
      const blogId = req.params.id;
      // Get old Blog
      const oldBlog = await Blog.findById(blogId);
      if (!oldBlog) {
        deleteImage(req.files);
        return res.status(404).json({ error: "Blog Not Found" });
      }

      const {
        categoryId,
        subcategoryId,
        title,
        description,
        like,
        price,
        maxQuantity,
        address,
        phNumber,
        metal,
        gendertype,
        productcolor,
        discount,
      } = req.body;

      // Initialize variables for image handling
      let newImages = oldBlog.image;
      const likeId = req.user.id;

      // Handle like updates
      const isLiked = String(like).toLowerCase() === "true";
      const hasUserLiked = oldBlog.likeId.includes(likeId);

      if (isLiked && !hasUserLiked) {
        newImages = req.files.map((file) => file.path);
        oldBlog.likeId.push(likeId);
      } else if (!isLiked && hasUserLiked) {
        const userIndex = oldBlog.likeId.indexOf(likeId);
        oldBlog.likeId.splice(userIndex, 1);
      }

      const category = await Category.findById(categoryId);
      // check category
      if (!category) {
        return res.status(400).json({ error: "Sorry Category Not Found" });
      }

      // Handle image updates
      if (req.files.length > 0) {
        // Add new image paths with the full address
        newImages = req.files.map((file) => process.env.domain + file.path);

        // Delete old image files if they exist
        oldBlog.image.forEach((imagePath) => {
          try {
            fs.unlinkSync(
              imagePath.slice(process.env.domain.length, imagePath.length)
            );
          } catch (err) {
            // Handle the error, e.g., log it or ignore it
            console.error("Error deleting file:", err);
          }
        });
      }

      const updatedBlog = {
        categoryId,
        subcategoryId,
        title,
        description,
        like: isLiked,
        price,
        maxQuantity,
        address,
        phNumber,
        metal,
        gendertype,
        productcolor,
        discount,
        image: newImages,
      };

      // Update category and subcategory information
      if (categoryId) {
        const category = await Category.findById(categoryId);
        if (category) {
          updatedBlog.categoryName = category.categoryName;
          updatedBlog.subcategoryId = null;
        }
      }

      if (subcategoryId) {
        const subcategory = await Subcategory.findById(subcategoryId);
        if (subcategory) {
          updatedBlog.subcategoryId = subcategoryId;
          updatedBlog.subcategoryName = subcategory.subCategoryName;
        }
      }

      if (!Array.isArray(productcolor)) {
        updatedBlog.productcolor = [productcolor];
      }

      const blog = await Blog.findByIdAndUpdate(
        blogId,
        { $set: updatedBlog },
        { new: true }
      );
      await blog.save();
      res.json({ success: "Blog Update Success", product: blog });
    } catch (e) {
      if (req.files.length > 0) {
        deleteImage(req.files);
      }
      res.status(500).json({ error: "Internal Server Error " + e });
    }
  }
);

// Update Blogs like [PATCH: http://localhost:8000/api/post/blogs/like/:id]  (register required)
route.patch("/blogs/like/:id", fetchuser, async (req, res) => {
  try {
    // get old Blog
    const oldBlog = await Blog.findById(req.params.id);
    if (!oldBlog) {
      return res.status(404).json({ error: "Blog Not Found" });
    }
    const likeId = req.user.id;

    // to increse/decreasing like
    const reso = oldBlog.likeId.filter((e) => String(e) === String(likeId));
    if (reso.length <= 0) {
      Blog.updateOne(
        { _id: oldBlog.id },
        { $push: { likeId: mongoose.Types.ObjectId(likeId) } },
        (err, result) => {}
      );
      res.json({ success: "Like Success" });
    } else {
      Blog.updateOne(
        { _id: oldBlog.id }, // filter to match all documents
        { $pull: { likeId: likeId } }, // remove userIdToRemove from userIds array
        { returnOriginal: false }, // return the updated document
        (err, result) => {
          if (err) {
            console.error("Failed to remove userId:", err);
            return;
          }
        }
      );
      res.json({ success: "Dislike success" });
    }
  } catch (e) {
    res.status(500).json({ error: "Enternal Server Error " + e });
  }
});

module.exports = route;
