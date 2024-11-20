const route = require("express").Router();
const checkPrivilege = require("../middleware/checkPrivilege");
const fetchUser = require("../middleware/fetchuser");
const OrderAddress = require("../models/OrderAddress");

// TODO: Order Detail

// Get Order Address Of User [GET: http://localhost:8000/api/order/orderaddress]
route.get("/orderaddress", fetchUser, async (req, res) => {
  try {
    const data = await OrderAddress.find();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Some error accuired " + e });
  }
});

// Post Order Address Of User [POST: http://localhost:8000/api/order/orderaddress]
route.post("/orderaddress", fetchUser, async (req, res) => {
  try {
    const {
      fName,
      email,
      mobileNumber,
      province,
      city,
      area,
      address,
      landmark,
    } = req.body;
    const userId = req.user.id;
    if (
      !fName ||
      !mobileNumber ||
      !province ||
      !city ||
      !area ||
      !address ||
      !email
    )
      return res.status(400).json({ error: "Please Fill Proper Detail" });
    const newAdd = await new OrderAddress({
      fName,
      mobileNumber,
      province,
      email,
      city,
      area,
      address,
      landmark,
      userId,
    });
    await newAdd.save();
    res.json({ success: "Order Address Added", addId: newAdd._id });
  } catch (e) {
    res.status(500).json({ error: "Some error accuired " + e });
  }
});

// Delete Order Address Of User [DELETE: http://localhost:8000/api/order/orderaddress/:id]
route.delete("/orderaddress/:id", checkPrivilege, async (req, res) => {
  try {
    // find user
    const reqaddId = req.params.id;
    const addDet = await OrderAddress.findById(reqaddId);
    if (!addDet) {
      return res.status(400).json({ error: "Order Address Not Found" });
    }
    await OrderAddress.findByIdAndDelete(reqaddId);
    res.json({ success: "Order Address Delete Success" });
  } catch (e) {
    res.status(500).json({ error: "Some error accuired " + e });
  }
});

// Update Order Address of User [DELETE: http://localhost:8000/api/order/orderaddress/:id]
route.patch("/orderaddress/:id", checkPrivilege, async (req, res) => {
  try {
    const reqaddId = req.params.id;
    const addDet = await OrderAddress.findById(reqaddId);
    if (!addDet) {
      return res.status(400).json({ error: "Order Address Not Found" });
    }
    const { fName, mobileNumber, province, city, area, address, landmark } =
      req.body;
    let updateAddData = {};
    if (fName) updateAddData.fName = fName;
    if (mobileNumber) updateAddData.mobileNumber = mobileNumber;
    if (province) updateAddData.province = province;
    if (city) updateAddData.city = city;
    if (area) updateAddData.area = area;
    if (email) updateAddData.email = email;
    if (address) updateAddData.address = address;
    if (landmark) updateAddData.landmark = landmark;
    await OrderAddress.findByIdAndUpdate(
      reqaddId,
      { $set: updateAddData },
      { new: true }
    );
    res.json({ success: "Order Address Updated Success" });
  } catch (e) {
    res.status(500).json({ error: "Some error accuired " + e });
  }
});

module.exports = route;
