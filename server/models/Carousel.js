const mongoose = require("mongoose");

const Carousel = mongoose.Schema({
  title: String,
  description: String,
  active: Boolean,
  bannerHighlights: Boolean,
  category: String,
  image: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("carousel", Carousel);
