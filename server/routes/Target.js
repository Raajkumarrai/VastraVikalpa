const express = require("express");
const router = express.Router();
const Target = require("../models/Target");
const checkPrivilege = require("../middleware/checkPrivilege");

// Create a new target [POST: http://localhost:8000/api/target/target]
router.post("/target", checkPrivilege, async (req, res) => {
  try {
    const { daily, weekly, monthly } = req.body;
    const newTarget = new Target({
      daily,
      weekly,
      monthly,
    });

    const savedTarget = await newTarget.save();
    res.json(savedTarget);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all targets [GET: http://localhost:8000/api/target/target]
router.get("/target", checkPrivilege, async (req, res) => {
  try {
    const data = await Target.find();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a target by ID [PUT: http://localhost:8000/api/target/target/:id]
router.put("/target/:id", checkPrivilege, async (req, res) => {
  try {
    const { id } = req.params;
    const { daily, weekly, monthly } = req.body;

    const updatedTarget = await Target.findByIdAndUpdate(
      id,
      { daily, weekly, monthly },
      { new: true } // Return the modified document
    );

    if (!updatedTarget) {
      return res.status(404).json({ error: "Target not found" });
    }

    res.json({ success: "Updated success", data: updatedTarget });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a target by ID [DELETE: http://localhost:8000/api/target/target/:id]
router.delete("/target/:id", checkPrivilege, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTarget = await Target.findByIdAndDelete(id);

    if (!deletedTarget) {
      return res.status(404).json({ error: "Target not found" });
    }

    res.json(deletedTarget);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
