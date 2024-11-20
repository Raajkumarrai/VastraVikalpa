const mongoose = require("mongoose");

const Order = mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Blogs" },
      quantity: { type: Number, default: 1 },
      price: { type: Number },
    },
  ],
  totalPrice: { type: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  userName: { type: String, default: "User" },
  detailId: { type: mongoose.Schema.Types.ObjectId, ref: "OrderAddress" },
  billing: { type: Boolean, default: false },
  COD: { type: Boolean, default: false },
  billingRef: { type: String },
  isNotified: { type: Boolean, default: false },
  orderSuccess: {
    type: Number,
    default: 0,
  },
  date: { type: Date, default: Date.now() },
  updateData: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Order", Order);
