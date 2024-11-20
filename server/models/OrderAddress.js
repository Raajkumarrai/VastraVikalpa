const mongoose = require("mongoose");

const OrderAddress = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  fName: {
    type: String,
    require: true,
  },
  mobileNumber: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  province: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
    default: "kathmandu",
  },
  area: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  landmark: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("OrderAddress", OrderAddress);
