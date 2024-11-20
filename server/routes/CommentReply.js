const route = require("express").Router();
const fetchUser = require("../middleware/fetchuser");
const Commnets = require("../models/Comment");
const Blogs = require("../models/Blogs");
const User = require("../models/Auth"); // Import the User model
const mongoose = require("mongoose");
// const CheckSuperAdmin = require("../middleware/CheckSuperAdmin");
const checkPrivilege = require("../middleware/checkPrivilege");
const CommentReply = require("../models/CommentReply");

// get comments [GET: http://localhost:8000/api/comment/blog/commentreply]  (register not required)
route.get("/blog/commentreply", async (req, res) => {
  try {
    const commentreply = await CommentReply.find();
    res.json(commentreply);
  } catch (error) {
    res.status(500).json({ error: "Enternal Server Error " + error });
  }
});
// get comments [GET: http://localhost:8000/api/comment/blog/:commentId/commentreply]  (register not required)
route.get("/blog/:commentId/commentreply", async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const comments = await CommentReply.find({ commentId }).populate({
      path: "userId",
      model: "user", // Use the correct model name ("User" in this case)
      select: "name email image", // Select the fields you want to populate
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Enternal Server Error " + error });
  }
});

// post comments [POST: http://localhost:8000/api/comment/blog/commentreply]  (register required)
route.post("/blog/commentreply", fetchUser, async (req, res) => {
  try {
    const { commentId, description, blogId } = req.body;
    const userId = req.user.id;

    // check comment id exist or not
    const findComment = await Commnets.findById(commentId);
    if (!findComment)
      return res.status(400).json({ error: "Sorry, We Cannot Find Comment" });
    const blog = await Blogs.findById(blogId);
    if (!blog)
      return res.status(400).json({ error: "Sorry, We Cannot Find Blog" });

    const newCommnetrep = await new CommentReply({
      commentId,
      description,
      likeId: [],
      userId,
      blogId,
    });
    const data = await newCommnetrep.save();

    // update in commnet
    const newCommentRep = await CommentReply.find({
      blogId,
      userId,
      commentId,
    });
    if (newCommentRep.length > 0) {
      Commnets.updateOne(
        { _id: commentId },
        { $push: { commentRep: mongoose.Types.ObjectId(newCommnetrep._id) } },
        (err, result) => {}
      );
    }

    res.json({ success: "Comment Success", data });
  } catch (error) {
    res.status(500).json({ error: "Enternal Server Error " + error });
  }
});

// delete comments [DELETE: http://localhost:8000/api/comment/blog/commentreply/:id]  (register required)
route.delete("/blog/commentreply/:id", checkPrivilege, async (req, res) => {
  try {
    const commentRepId = req.params.id;
    // find comment exist or not
    const commentRep = await CommentReply.findById(commentRepId);
    if (!commentRep)
      return res.status(400).json({ error: "Replied Comment Not Found" });
    await CommentReply.findByIdAndDelete(commentRepId);
    Commnets.updateOne(
      { _id: commentRep.commentId }, // filter to match all documents
      { $pull: { commentRep: commentRepId } }, // remove userIdToRemove from userIds array
      { returnOriginal: false }, // return the updated document
      (err, result) => {
        if (err) {
          console.error("Failed to remove userId:", err);
          return;
        }
      }
    );
    res.json({ success: "Replied Comment Deleted Success" });
  } catch (e) {
    res.status(500).json({ error: "Enternal Server Error " + e });
  }
});

// Update comments [PATCH: http://localhost:8000/api/comment/blog/commentreply/:id]  (register required)
route.patch("/blog/commentreply/:id", fetchUser, async (req, res) => {
  try {
    const commentRepId = req.params.id;
    // find comment exist or not
    const commentReply = await CommentReply.findById(commentRepId);
    if (!commentReply)
      return res.status(400).json({ error: "Replied Comment Not Found" });
    const { description, like } = req.body;
    if (String(commentReply.userId) !== String(req.user.id))
      return res.status(400).json({ error: "You Cannot Update This Comment" });
    const updatedComment = {};
    if (description) updatedComment.description = description;
    const likeId = req.user.id;
    // to increse/decreasing like
    if (String(like).toLocaleLowerCase() === "true") {
      const reso = commentReply.likeId.filter(
        (e) => String(e) === String(likeId)
      );
      if (reso.length <= 0) {
        CommentReply.updateOne(
          { _id: commentReply.id },
          { $push: { likeId: mongoose.Types.ObjectId(likeId) } },
          (err, result) => {}
        );
      }
    } else {
      const reso = commentReply.likeId.filter(
        (e) => String(e) === String(likeId)
      );
      if (reso.length > 0) {
        const num = commentReply.likeId.indexOf(
          mongoose.Types.ObjectId(likeId)
        );
        CommentReply.updateOne({ id: commentReply.id }, (err, blog) => {
          if (err) {
          } else {
            commentReply.likeId.splice(num, 1);
            commentReply.save((err) => {});
          }
        });
      }
    }
    await CommentReply.findByIdAndUpdate(
      commentRepId,
      { $set: updatedComment },
      { new: true }
    );
    res.json({ success: "Replied Comment Updated Success" });
  } catch (error) {
    res.status(500).json({ error: "Enternal Server Error " + error });
  }
});

// Update comments like [PATCH: http://localhost:8000/api/comment/blog/commentreply/like/:id]  (register required)
route.patch("/blog/commentreply/like/:id", fetchUser, async (req, res) => {
  try {
    // get old Blog
    const oldCommentReply = await CommentReply.findById(req.params.id);
    if (!oldCommentReply) {
      return res.status(404).json({ error: "Blog Not Found" });
    }
    const { like } = req.body;
    const likeId = req.user.id;

    // to increse/decreasing like
    if (String(like).toLocaleLowerCase() === "true") {
      const reso = oldCommentReply.likeId.filter(
        (e) => String(e) === String(likeId)
      );
      if (reso.length <= 0) {
        CommentReply.updateOne(
          { _id: oldCommentReply.id },
          { $push: { likeId: mongoose.Types.ObjectId(likeId) } },
          (err, result) => {}
        );
      }
    } else {
      const reso = oldCommentReply.likeId.filter(
        (e) => String(e) === String(likeId)
      );
      if (reso.length > 0) {
        const num = oldCommentReply.likeId.indexOf(
          mongoose.Types.ObjectId(likeId)
        );
        CommentReply.updateOne({ id: oldCommentReply.id }, (err, blog) => {
          if (err) {
          } else {
            oldCommentReply.likeId.splice(num, 1);
            oldCommentReply.save((err) => {});
          }
        });
      }
    }

    res.json({ success: "Munupulation Of Like Success" });
  } catch (error) {
    res.status(500).json({ error: "Enternal Server Error " + error });
  }
});

module.exports = route;
