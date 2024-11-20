const mongoose = require("mongoose");

const Order = mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Blogs" },
  quntity: { type: Number, default: 1 },
  prize: { type: Number },
  totalPrize: { type: Number },
  // goldRate: { type: Number },
  // silverRate: { type: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userName: { type: String, default: "User" },
  detailId: { type: mongoose.Schema.Types.ObjectId, ref: "OrderAddress" },
  billing: { type: Boolean, default: false },
  isNotified: { type: Boolean, default: false },
  orderSuccess: {
    type: Number,
    default: 0,
  },
  date: { type: Date, default: Date.now() },
  updateData: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Order", Order);
