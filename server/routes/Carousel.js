const route = require("express").Router();
const Carousel = require("../models/Carousel");
// const CheckSuperAdmin = require("../middleware/CheckSuperAdmin");
const checkPrivilege = require("../middleware/checkPrivilege");
const upload = require("../middleware/uploadInBlog");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

// Function to delete an image
const deleteImage = (imagePath) => {
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
};

// Function to get the full image path
const getFullImagePath = (relativePath) => {
  return process.env.domain + relativePath;
};

// get carousel [GET: http://localhost:8000/api/carousel/carousel/:id]  (register not required)
route.get("/carousel/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Carousel.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Carousel not found" });
    }
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error " + e });
  }
});
// get carousel [GET: http://localhost:8000/api/carousel/carousels/highlight]  (register not required)
route.get("/carousels/highlight", async (req, res) => {
  try {
    const data = await Carousel.find({ bannerHighlights: true });
    if (!data) {
      return res.status(404).json({ error: "Carousel not found" });
    }
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error " + e });
  }
});
// get carousel [GET: http://localhost:8000/api/carousel/carouseles]  (register not required)
route.get("/carouseles", async (req, res) => {
  try {
    const data = await Carousel.find();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error " + e });
  }
});

// post carousel [POST: http://localhost:8000/api/carousel/carousel]  (register required)
route.post(
  "/carousel",
  checkPrivilege,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, description, active, category, bannerHighlights } =
        req.body;
      const findTitle = await Carousel.findOne({ title });
      if (findTitle) {
        deleteImage(req.file.path);
        return res.status(400).json({ error: "Carousel Title Already Exists" });
      }
      if (!req.file) {
        deleteImage(req.file.path);
        return res.status(400).json({ error: "Please Upload an Image" });
      }

      const imagePath = getFullImagePath(req.file.path);

      const carouselItem = {
        title,
        description,
        image: imagePath,
        active,
        category,
        bannerHighlights,
      };
      const carousel = await new Carousel(carouselItem);
      await carousel.save();
      res.json({ success: "Carousel Added Successfully", carousel });
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error " + e });
    }
  }
);

// Delete carousel [DELETE: http://localhost:8000/api/carousel/carousel/:id]  (register required)
route.delete("/carousel/:id", checkPrivilege, async (req, res) => {
  try {
    // check carousel exists or not
    const carouselId = req.params.id;
    const checkCarousel = await Carousel.findById(carouselId);
    if (!checkCarousel) {
      return res.status(400).json({ error: "Carousel Not Exist" });
    }

    const imagePath = path.join(
      __dirname,
      "..",
      checkCarousel.image.slice(process.env.domain.length)
    );

    await Carousel.findByIdAndDelete(carouselId);
    deleteImage(imagePath);
    res.json({ success: "Carousel Data Deleted" });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error " + e });
  }
});

// Update carousel [PATCH: http://localhost:8000/api/carousel/carousel/:id]  (register required)
route.patch(
  "/carousel/:id",
  checkPrivilege,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, description, active, category, bannerHighlights } =
        req.body;
      // check carousel exists or not
      const carouselId = req.params.id;
      const checkCarousel = await Carousel.findById(carouselId);
      if (!checkCarousel) {
        return res.status(400).json({ error: "Carousel Not Exist" });
      }

      let updateCarousel = {};
      if (title) updateCarousel.title = title;
      if (description) updateCarousel.description = description;
      if (active) updateCarousel.active = active;
      if (bannerHighlights) updateCarousel.bannerHighlights = bannerHighlights;
      if (category) updateCarousel.category = category;
      let imagePath = checkCarousel.image;

      if (req.file) {
        deleteImage(
          path.join(
            __dirname,
            "..",
            checkCarousel.image.slice(process.env.domain.length)
          )
        );
        imagePath = getFullImagePath(req.file.path);
      }

      updateCarousel.image = imagePath;

      const carousel = await Carousel.findByIdAndUpdate(
        carouselId,
        { $set: updateCarousel },
        { new: true }
      );
      res.json({ success: "Carousel Update Success", carousel: carousel });
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error " + e });
    }
  }
);

module.exports = route;
