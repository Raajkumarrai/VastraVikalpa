const mongoose = require("mongoose");

const Contact = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  email: String,
  title: String,
  msg: String,
  isNotified: { type: Boolean, default: false },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Contact", Contact);
