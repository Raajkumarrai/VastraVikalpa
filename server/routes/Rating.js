const express = require("express");
const router = express.Router();
const Rating = require("../models/rating"); // Assuming your Rating model is imported correctly
const fetchUser = require("../middleware/fetchuser");
const checkPrivilege = require("../middleware/checkPrivilege");

// get all rating of a blog [GET: http://localhost:8000/api/post/ratings/blogId]
router.get("/ratings/:blogId", async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const ratings = await Rating.find({ blogId });
    res.status(200).json(ratings);
  } catch (error) {
    console.error("Error fetching ratings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new rating for a blog [POST: http://localhost:8000/api/post/ratings/:blogId]
router.post("/ratings/:blogId", fetchUser, async (req, res) => {
  try {
    const { blogId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    // Check if the user has already rated this blog
    const existingRating = await Rating.findOne({ userId, blogId });

    if (existingRating) {
      return res
        .status(400)
        .json({ error: "You have already rated this blog." });
    }

    // Validate the input data
    if (!userId || !blogId || isNaN(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Invalid input data." });
    }

    const newRating = new Rating({
      userId,
      blogId,
      rating,
    });

    await newRating.save();

    res.status(201).json(newRating);
  } catch (error) {
    console.error("Error creating rating:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update rating form a blog [PATCH: http://localhost:8000/api/post/ratings/:ratingId]
router.patch("/ratings/:ratingId", fetchUser, async (req, res) => {
  try {
    const { ratingId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    // Validate the input data
    if (!userId || isNaN(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Invalid input data." });
    }

    const updatedRating = await Rating.findByIdAndUpdate(
      ratingId,
      { rating },
      { new: true }
    );

    if (!updatedRating) {
      return res.status(404).json({ error: "Rating not found." });
    }

    res.status(200).json(updatedRating);
  } catch (error) {
    console.error("Error updating rating:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete rating form a blog [DELETE: http://localhost:8000/api/post/ratings/:ratingId]
router.delete("/ratings/:ratingId", checkPrivilege, async (req, res) => {
  try {
    const { ratingId } = req.params;

    const deletedRating = await Rating.findByIdAndRemove(ratingId);

    if (!deletedRating) {
      return res.status(404).json({ error: "Rating not found." });
    }

    res.status(200).json({ message: "Rating deleted successfully" });
  } catch (error) {
    console.error("Error deleting rating:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
