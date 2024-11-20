const mongoose = require("mongoose");

const Target = mongoose.Schema({
  daily: Number,
  weekly: Number,
  monthly: Number,
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("target", Target);
