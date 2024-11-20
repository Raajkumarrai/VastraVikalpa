const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/Auth");

const checkPrivilege = async (req, res, next) => {
  try {
    const header = req.header("Auth-token");
    if (!header)
      return res.status(400).json({ error: "Please Register or Login" });
    const data = jwt.verify(header, process.env.SECURITY_KEY);
    if (!data)
      return res.status(400).json({ error: "Sorry Some Credential Changed" });
    const userData = await User.findById(data.user.id);
    if (Number(userData.privilege) < 1)
      return res
        .status(400)
        .json({ error: "Access Denide, You Cannot Access This prev" });
    req.user = data.user;
    next();
  } catch (e) {
    res.status(400).json({ error: "Sorry Some Credential Changed" });
  }
};

module.exports = checkPrivilege;
