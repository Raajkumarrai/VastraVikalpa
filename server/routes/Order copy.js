// const CheckSuperAdmin = require("../middleware/CheckSuperAdmin");
const route = require("express").Router();
const Order = require("../models/Order");
const Blogs = require("../models/Blogs");
const User = require("../models/Auth");
const OrderAddress = require("../models/OrderAddress");
const Price = require("../models/Price");
const fetchUser = require("../middleware/fetchuser");
const checkPrivilege = require("../middleware/checkPrivilege");

route.get("/product/order", checkPrivilege, async (req, res) => {
  try {
    const norevdata = await Order.find();
    const data = norevdata.reverse();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Some error accuired " + e });
  }
});
route.get("/product/order/:uId", fetchUser, async (req, res) => {
  try {
    const { uId } = req.params;
    const norevdata = await Order.find({ userId: uId });
    const data = norevdata.reverse();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Some error accuired " + e });
  }
});

route.post("/product/order", fetchUser, async (req, res) => {
  try {
    const { productId, quntity, detailId, billing } = req.body;
    const userId = req.user.id;
    // check user exist or not
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User not exist" });

    // check product exist or not
    const blog = await Blogs.findById(productId);
    if (!blog) return res.status(400).json({ error: "Product not exist" });

    // check derail filled or not
    const orderAdd = await OrderAddress.findById(detailId);
    if (!orderAdd)
      return res.status(400).json({ error: "Order address not exist" });

    // to set the price of product
    const prizeData = await Price.find();
    if (!prizeData[prizeData.length - 1])
      return res.status(400).json({ error: "please Enter metal price" });

    if (blog.maxQuantity < quntity)
      return res
        .status(400)
        .json({ error: "This product is currently out of stock" });

    let finalPrice = 0;
    // check product metal
    finalPrice =
      blog.metal === 1
        ? (prizeData[prizeData.length - 1].gold * (blog.weight + blog.westage) -
            (prizeData[prizeData.length - 1].gold *
              (blog.weight + blog.westage) *
              blog.discount) /
              100) /
          100
        : blog.metal === 2
        ? (prizeData[prizeData.length - 1].silver *
            (blog.weight + blog.westage) -
            (prizeData[prizeData.length - 1].silver *
              (blog.weight + blog.westage) *
              blog.discount) /
              100) /
          100
        : blog.weight;

    const dataUp = blog.maxQuantity;
    dataupdate = dataUp - quntity;
    const totalPrize = Math.round(Number(quntity) * Number(finalPrice));

    // now setFinal Data and send
    const newOrder = await new Order({
      productId,
      quntity,
      userId,
      billing,
      prize: Math.round(finalPrice),
      goldRate: prizeData[prizeData.length - 1].gold,
      silverRate: prizeData[prizeData.length - 1].silver,
      totalPrize,
      detailId,
      userName: user.name,
    });

    // update ountity in blogs
    Blogs.updateOne(
      { _id: blog._id },
      { $set: { maxQuantity: dataupdate } },
      (err, result) => {}
    );
    await newOrder.save();
    res.json({ Success: "Order Success" });
  } catch (e) {
    res.status(500).json({ error: "Some error accuired " + e });
  }
});

// delete data
route.delete("/product/order/:id", fetchUser, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.body.id;
    // check order exist or not
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    // check product exist or not
    const blog = await Blogs.findById(order.productId);
    if (blog) {
      await Order.findByIdAndDelete(id);

      Blogs.updateOne(
        { _id: order.productId },
        { $set: { maxQuantity: blog.maxQuantity + order.quntity } },
        (err, result) => {}
      );
      res.json({ success: "Order Deleted" });
    } else {
      await Order.findByIdAndDelete(id);
    }
  } catch (e) {
    res.status(500).json({ error: "Some error accuired " + e });
  }
});

route.patch("/product/order/success/:id", checkPrivilege, async (req, res) => {
  try {
    const { successRate } = req.body;

    // Get the old Order using the Order model
    const oldOrder = await Order.findById(req.params.id);

    if (!oldOrder) {
      return res.status(404).json({ error: "Order Not Found" });
    }

    // Create a new Date object for updateData
    const updateDate = new Date();

    // Update the order's success rate and updateData
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderSuccess: Number(successRate),
        updateData: updateDate,
      },
      { new: true } // This option returns the updated document
    );

    // Respond with a success message and the updated order
    res.json({ success: "Update Success!", data: updatedOrder });
  } catch (e) {
    // Handle any errors and send an appropriate response
    res.status(500).json({ error: "Internal Server Error " + e.message });
  }
});

route.put("/order/:id/notify", checkPrivilege, async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(400).json({ error: "Order not found" });
    }
    order.isNotified = true;
    await order.save();
    res.json({ success: "Order updated successfully", data: order });
  } catch (e) {
    res.status(500).json({ error: "Some error occurred: " + e.message });
  }
});

route.get("/orders/count-false", checkPrivilege, async (req, res) => {
  try {
    const unreadOrder = await Order.find({ isNotified: false });

    res.json({ unreadOrder });
  } catch (e) {
    res.status(500).json({ error: "Some error occurred: " + e.message });
  }
});
route.get("/orders/count-success", checkPrivilege, async (req, res) => {
  try {
    const successOrder = await Order.find({ orderSuccess: 0 });

    res.json({ successOrder });
  } catch (e) {
    res.status(500).json({ error: "Some error occurred: " + e.message });
  }
});

module.exports = route;
