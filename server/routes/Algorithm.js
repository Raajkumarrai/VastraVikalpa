const express = require("express");
const route = express.Router();
const User = require("../models/Auth");
const Product = require("../models/Blogs");
const fetchuser = require("../middleware/fetchuser");
require("dotenv").config();
const fs = require("fs");
const { default: mongoose } = require("mongoose");

// Cosine similarity function
function cosineSimilarity(userA, userB) {
  const setA = new Set(userA.likedProducts.map(String));
  const setB = new Set(userB.likedProducts.map(String));

  const intersection = new Set([...setA].filter((x) => setB.has(x))).size;
  const denominator = Math.sqrt(setA.size) * Math.sqrt(setB.size);

  return denominator === 0 ? 0 : intersection / denominator;
}

// controllers/recommendCollaborativeFiltering.js

async function recommendCollaborativeFiltering(req, res) {
  try {
    const userId = req.user.id;

    // Fetch target user and all users
    const targetUser = await User.findById(userId).populate("likedProducts");
    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const allUsers = await User.find({ _id: { $ne: userId } }).populate(
      "likedProducts"
    );

    // Calculate similarity scores with other users
    const similarities = allUsers.map((user) => ({
      user,
      score: cosineSimilarity(targetUser, user),
    }));

    // Sort by similarity score in descending order
    similarities.sort((a, b) => b.score - a.score);

    // Gather products liked by similar users, but not by the target user
    const recommendedProducts = [];
    const targetLikedProductIds = new Set(
      targetUser.likedProducts.map((p) => p._id.toString())
    );

    for (const { user, score } of similarities) {
      if (score === 0) break; // Stop if similarity score is zero

      for (const product of user.likedProducts) {
        if (!targetLikedProductIds.has(product._id.toString())) {
          recommendedProducts.push(product);
          if (recommendedProducts.length >= 5) break;
        }
      }
      if (recommendedProducts.length >= 5) break;
    }

    res.json(recommendedProducts);
  } catch (error) {
    console.error("Error in recommendation:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

route.get("/recommend", fetchuser, recommendCollaborativeFiltering);

module.exports = route;
