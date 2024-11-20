const mongoose = require("mongoose");

const Blogs = mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcategory",
    default: null,
  },
  title: String,
  categoryName: String,
  subcategoryName: String,
  description: String,
  likeId: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  like: {
    type: Boolean,
    default: true,
  },
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
  price: Number,
  discount: Number,
  maxQuantity: Number,
  gendertype: Number,
  productcolor: [String],
  address: String,
  phNumber: Number,
  date: {
    type: Date,
    default: Date.now(),
  },
  image: {
    type: Array,
  },
});

module.exports = mongoose.model("Blogs", Blogs);
