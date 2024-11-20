const route = require("express").Router();
const User = require("../models/Auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// middleweares for authontications
const checkSuperAdmin = require("../middleware/checkSuperAdmin");
const upload = require("../middleware/uploadpp");
const fetchUser = require("../middleware/fetchuser");
const fs = require("fs");
const checkPrivilege = require("../middleware/checkPrivilege");

// get all register users [GET: http://localhost:8000/api/auth/users]
route.get("/users", fetchUser, async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (e) {
    res.status(500).json({ error: "Some error accuired " + e });
  }
});

// Find Is This Valid Credintial Or Not [POST: http://localhost:8000/api/auth/user/:id]  (register required)
route.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (e) {
    res.status(500).json({ error: "some error accuired" + e });
  }
});
// Find Is This Valid Credintial Or Not [POST: http://localhost:8000/api/auth/myprofile]  (register required)
route.get("/myprofile", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (e) {
    res.status(500).json({ error: "some error accuired" + e });
  }
});

// delete user account [DELTET: http://localhost:8000/api/auth/user/:userId]
route.delete("/user/:id", checkSuperAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    // check user exist or not
    const user = User.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });
    // find user and delete
    await User.findByIdAndDelete(userId);
    res.json({ success: "User Delete Success" });
  } catch (e) {
    res.status(500).json({ error: "Some error accuired " + e });
  }
});

// Register new user [POST: http://localhost:8000/api/auth/register]
route.post("/register", upload.single("image"), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Input validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    // Check if superAdmin exists
    const checkAdmin = await User.findOne({ name: "superadmin" });
    if (name.toLowerCase() === "superadmin" && checkAdmin) {
      return res.status(400).json({ error: "superAdmin is a reserved name" });
    }

    // Check if user already exists
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    let image = "";
    if (req.file) {
      image = process.env.domain + req.file.path;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: securePass,
      image,
      privilege: email === "superadmin@gmail.com" ? 2 : 0,
      like: email === "superadmin@gmail.com" ? true : false,
    });

    // Save the user
    await user.save();

    // Generate a JSON Web Token
    const data = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(data, process.env.SECURITY_KEY);

    const finalUser = {
      email: user.email,
      image: user.image,
      privilege: user.privilege,
      _id: user._id,
    };

    res.json({
      token,
      msg: "Registration success",
      user: finalUser,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
});

// Login existing user [POST: http://localhost:8000/api/auth/login]  (register required)
route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({ error: "Please Enter Valid Credential Email" });
    // match the password
    const pass = await bcrypt.compare(password, checkUser.password);
    if (!pass) return res.json({ error: "Please Enter Valid Credential" });

    const data = {
      user: {
        id: checkUser.id,
      },
    };
    const token = jwt.sign(data, process.env.SECURITY_KEY);
    const finalUser = {
      email: checkUser.email,
      image: checkUser.image,
      privilege: checkUser.privilege,
      _id: checkUser._id,
    };
    res.json({
      token,
      msg: "Login success",
      user: finalUser,
    });
  } catch (e) {
    res.status(500).json({ error: "some error accuired" + e });
  }
});

// [PATCH: http://localhost:8000/api/auth/user/admin/:id]
route.patch("/user/admin/:id", checkSuperAdmin, async (req, res) => {
  try {
    const { privilege } = req.body;
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(400).send({ error: "User not found" });
    const data = { privilege };
    const userData = await User.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    res.json({ success: "Update Success", user: userData });
  } catch (e) {
    res.status(500).json({ error: "some error accuired" + e });
  }
});

// [PATCH: http://localhost:8000/api/auth/user/profile]
route.patch(
  "/user/profile",
  fetchUser,
  upload.single("image"),
  async (req, res) => {
    const { id } = req.user;
    try {
      // find user by id
      const user = await User.findById(id);
      if (!user) return res.status(400).json({ error: "User Not Found" });
      const image = { image: process.env.domain + req.file.path };
      await User.findByIdAndUpdate(id, { $set: image }, { new: true });

      if (req.file) {
        if (user.image !== null) {
          fs.unlinkSync(
            user.image.slice(process.env.domain.length, user.image.length)
          );
        }
      }
      return res.json({ success: "Image uploaded" });
    } catch (e) {
      res.status(500).json({ error: "some error accuired" + e });
    }
  }
);

module.exports = route;
