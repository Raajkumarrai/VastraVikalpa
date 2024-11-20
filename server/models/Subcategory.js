const mongoose = require("mongoose");

const Subcategory = mongoose.Schema({
  subCategoryName: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("subcategory", Subcategory);
