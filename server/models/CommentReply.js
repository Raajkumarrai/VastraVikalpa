const mongoose = require("mongoose");

const CommnetReply = mongoose.Schema({
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments",
  },
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blogs" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  description: {
    type: String, // Add this field for comment description
    required: true,
  },
  likeId: [{ type: mongoose.Schema.Types.ObjectId, ref: "user", default: [] }],
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("CommentReply", CommnetReply);
