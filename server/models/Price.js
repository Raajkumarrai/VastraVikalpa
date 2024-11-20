const mongoose = require("mongoose");

const Price = mongoose.Schema({
    gold: Number,
    silver: Number,
    date:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Price", Price);