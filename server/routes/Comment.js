const route = require("express").Router();
const fetchUser = require("../middleware/fetchuser");
// const CheckSuperAdmin = require("../middleware/CheckSuperAdmin");
const checkPrivilege = require("../middleware/checkPrivilege");
const Comment = require("../models/Comment");
const Blogs = require("../models/Blogs");
const mongoose = require("mongoose");
const User = require("../models/Auth"); // Import the User model
const CommentReply = require("../models/CommentReply"); // Import the User model

// get comments [GET: http://localhost:8000/api/comment/blog/comment]  (register not required)
route.get("/blog/comment", async (req, res) => {
  try {
    const noRevComments = await Comment.find();
    const comments = noRevComments;
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Enternal Server Error " + error });
  }
});
// get comments [GET: http://localhost:8000/api/comment/blog/:blogId/comments]  (register not required)
// route.get("/blog/:blogId/comments", async (req, res) => {
//   try {
//     const blogId = req.params.blogId;
//     const comments = await Comment.find({ blogId }).populate({
//       path: "userId",
//       model: "user", // Use the correct model name ("user" in this case)
//       select: "name email image", // Select the fields you want to populate
//     });
//     res.json(comments);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error " + error });
//   }
// });

route.get("/blog/:blogId/comments", async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const comments = await Comment.find({ blogId })
      .populate({
        path: "userId",
        model: "user", // Use the correct model name ("User" in this case)
        select: "name email image", // Select the fields you want to populate
      })
      .populate({
        path: "commentRep", // Populate comment replies
        model: "CommentReply", // Assuming the model name is "Comment"
        populate: {
          path: "userId",
          model: "user",
          select: "name email image",
        },
      })
      .populate({
        path: "likeId", // Populate users who liked the comments
        model: "user",
        select: "name email image",
      });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error " + error });
  }
});

// post comments [POST: http://localhost:8000/api/comment/blog/comment] (registration required)
route.post("/blog/comment", fetchUser, async (req, res) => {
  try {
    const { blogId, description } = req.body;
    const userId = req.user.id;

    const blog = await Blogs.findById(blogId);
    if (!blog) return res.status(400).json({ error: "We Cannot Find Blog" });

    const newComment = new Comment({
      blogId,
      description,
      userId,
      likeId: [],
    });
    const data = await newComment.save();

    blog.comment.push(newComment._id);
    await blog.save();

    res.json({ success: "Comment Success", data });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error " + error });
  }
});

// delete SuperAdmin comments [DELETE: http://localhost:8000/api/comment/blog/comment/:id]  (register required)
route.delete("/blog/comments/:id", checkPrivilege, async (req, res) => {
  try {
    const commentId = req.params.id;
    // find comment exist or not
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(400).json({ error: "Comment Not Found" });
    await Comment.findByIdAndDelete(commentId);

    // add comment id in blog
    const oldBlog = await Blogs.findById(comment.blogId);
    if (oldBlog) {
      const reso = oldBlog.comment.filter(
        (e) => String(e) === String(commentId)
      );
      if (reso.length > 0) {
        const num = oldBlog.comment.indexOf(mongoose.Types.ObjectId(commentId));
        Blogs.updateOne({ id: oldBlog.id }, (err, blog) => {
          if (err) {
          } else {
            oldBlog.comment.splice(num, 1);
            oldBlog.save((err) => {});
          }
        });
      }
    }

    res.json({ success: "Comment Deleted Success" });
  } catch (e) {
    res.status(500).json({ error: "Enternal Server Error " + e });
  }
});

// delete Registered User comments [DELETE: http://localhost:8000/api/comment/blog/comment/:id]  (register required)
route.delete("/blog/comment/:id", fetchUser, async (req, res) => {
  try {
    const commentId = req.params.id;
    // find comment exist or not
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(400).json({ error: "Comment Not Found" });
    if (String(comment.userId) !== req.user.id)
      return res.status(400).json({ error: "Access Denide" });
    await Comment.findByIdAndDelete(commentId);

    // add comment id in blog
    const oldBlog = await Blogs.findById(comment.blogId);
    if (oldBlog) {
      const reso = oldBlog.comment.filter(
        (e) => String(e) === String(commentId)
      );
      if (reso.length > 0) {
        const num = oldBlog.comment.indexOf(mongoose.Types.ObjectId(commentId));
        Blogs.updateOne({ id: oldBlog.id }, (err, blog) => {
          if (err) {
          } else {
            oldBlog.comment.splice(num, 1);
            oldBlog.save((err) => {});
          }
        });
      }
    }
    res.json({ success: "Comment Deleted Success" });
  } catch (e) {
    res.status(500).json({ error: "Enternal Server Error " + e });
  }
});

// Update comments [PATCH: http://localhost:8000/api/comment/blog/comment/:id]  (register required)
route.patch("/blog/comments/:id", checkPrivilege, async (req, res) => {
  try {
    const commentId = req.params.id;
    // find comment exist or not
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(400).json({ error: "Comment Not Found" });
    const { description, like } = req.body;
    let updatedComment = {};
    if (description) updatedComment.description = description;

    const likeId = req.user.id;

    // check can update or not
    if (String(comment.userId) !== String(req.user.id))
      return res.status(400).json({ error: "You Cannot Update It" });

    // to increse/decreasing like
    if (String(like).toLocaleLowerCase() === "true") {
      const reso = comment.likeId.filter((e) => String(e) === String(likeId));
      if (reso.length <= 0) {
        Comment.updateOne(
          { _id: comment.id },
          { $push: { likeId: mongoose.Types.ObjectId(likeId) } },
          (err, result) => {}
        );
      }
    } else {
      const reso = comment.likeId.filter((e) => String(e) === String(likeId));
      if (reso.length > 0) {
        const num = comment.likeId.indexOf(mongoose.Types.ObjectId(likeId));
        Comment.updateOne({ id: comment.id }, (err, blog) => {
          if (err) {
          } else {
            comment.likeId.splice(num, 1);
            comment.save((err) => {});
          }
        });
      }
    }

    await Comment.findByIdAndUpdate(
      commentId,
      { $set: updatedComment },
      { new: true }
    );
    res.json({ success: "Comment Updated Success" });
  } catch (error) {
    res.status(500).json({ error: "Enternal Server Error " + error });
  }
});

// Update comments like [PATCH: http://localhost:8000/api/comment/blog/comment/like/:id]  (register required)
route.patch("/blog/comment/like/:id", fetchUser, async (req, res) => {
  try {
    // get old Blog
    const oldComment = await Comment.findById(req.params.id);
    if (!oldComment) {
      return res.status(404).json({ error: "Blog Not Found" });
    }
    const likeId = req.user.id;

    // to increse/decreasing like
    const reso = oldComment.likeId.filter((e) => String(e) === String(likeId));
    if (reso.length <= 0) {
      Comment.updateOne(
        { _id: oldComment.id },
        { $push: { likeId: mongoose.Types.ObjectId(likeId) } },
        (err, result) => {}
      );
    } else {
      Comment.updateOne(
        { _id: oldComment.id }, // filter to match all documents
        { $pull: { likeId: likeId } }, // remove userIdToRemove from userIds array
        { returnOriginal: false }, // return the updated document
        (err, result) => {
          if (err) {
            console.error("Failed to remove userId:", err);
            return;
          }
        }
      );
    }

    res.json({ success: "Munupulation Of Like Success" });
  } catch (error) {
    res.status(500).json({ error: "Enternal Server Error " + error });
  }
});

module.exports = route;
