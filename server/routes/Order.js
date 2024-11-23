// const CheckSuperAdmin = require("../middleware/CheckSuperAdmin");
const route = require("express").Router();
const Order = require("../models/Order");
const Blogs = require("../models/Blogs");
const User = require("../models/Auth");
const OrderAddress = require("../models/OrderAddress");
const Price = require("../models/Price");
const fetchUser = require("../middleware/fetchuser");
const checkPrivilege = require("../middleware/checkPrivilege");
const checkIsSuccess = require("../middleware/checkIsSuccess");

route.get("/product/order", async (req, res) => {
  try {
    const norevdata = await Order.find()
      .populate("products.productId")
      .populate("userId")
      .populate("detailId");
    const data = norevdata.reverse();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Some error accuired " + e });
  }
});

route.get("/product/order/one/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId)
      .populate("products.productId")
      .populate("userId")
      .populate("detailId");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (e) {
    res.status(500).json({ error: "Some error occurred " + e });
  }
});

route.get("/product/all/order", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({
      userId,
      billing: true,
      billingRef: { $exists: true },
    })
      .populate("products.productId")
      .populate("userId")
      .populate("detailId");
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

route.get("/product/order/:uId", fetchUser, async (req, res) => {
  try {
    const { uId } = req.params;
    const orders = await Order.find({
      userId: uId,
      billing: true,
      billingRef: { $exists: true },
    })
      .populate("products.productId")
      .populate("userId")
      .populate("detailId");
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

route.get("/product/orders/eachuser", fetchUser, async (req, res) => {
  try {
    const uId = req.user.id;
    const orders = await Order.find({
      userId: uId,
    })
      .populate("products.productId")
      .populate("userId")
      .populate("detailId");
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

route.post("/product/order", fetchUser, async (req, res) => {
  try {
    const { products, detailId, billing, COD } = req.body;
    const userId = req.user.id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });

    // Validate products
    for (const product of products) {
      const { productId, quantity } = product;

      // Check if product exists
      const blog = await Blogs.findById(productId);
      if (!blog)
        return res
          .status(400)
          .json({ error: `Product with ID ${productId} not found` });

      // Check if quantity is available
      if (blog.maxQuantity < quantity)
        return res
          .status(400)
          .json({ error: `Product ${blog.name} is currently out of stock` });
    }

    // Check if order address exists
    const orderAddress = await OrderAddress.findById(detailId);
    if (!orderAddress)
      return res.status(400).json({ error: "Order address not found" });

    // Calculate total price
    let totalPrice = 0;
    for (const product of products) {
      const { productId, quantity } = product;
      const blog = await Blogs.findById(productId);
      const discountedPrice = blog.price * (1 - (blog.discount || 0) / 100);
      totalPrice += quantity * discountedPrice;
    }

    // Create new order
    const newOrder = new Order({
      products,
      totalPrice: totalPrice + 100,
      userId,
      billing,
      detailId,
      userName: user.name,
      COD: COD,
    });

    const dataOrder = await newOrder.save();

    // Get unique product IDs from order
    const productIds = [
      ...new Set(products.map((product) => product.productId)),
    ];

    // Add ordered product IDs to likedProducts if not already present
    await User.findByIdAndUpdate(userId, {
      $addToSet: { likedProducts: { $each: productIds } },
    });

    res.json({ success: "Order placed successfully", data: dataOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Internal server error" });
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
const getOrderByIdRouteHandler = async (Id) => {
  try {
    const order = await Order.findById(Id);

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  } catch (e) {
    throw e; // Rethrow the error to be caught by the caller
  }
};

// http://localhost:8000/api/order/order/payment-success/65dc379c43d89a02dc86b0f6/10900/EPAYTEST
route.put(
  "/order/payment-success/:pid/:totalAmount/:scd",
  checkIsSuccess,
  fetchUser,
  async (req, res) => {
    try {
      const paymentData = req.paymentData;
      const resData = await getOrderByIdRouteHandler(paymentData.pid);

      if (!resData) return res.status(400).json({ error: "Order not found" });

      // Check if the logged-in user matches the user associated with the order
      if (String(req.user.id) !== String(resData.userId)) {
        return res.status(400).json({ error: "User does not match" });
      }

      // Update the order's billing information
      resData.billing = true;
      resData.billingRef = paymentData.refId;

      // Save the updated order
      await resData.save();

      for (const product of resData.products) {
        const { productId, quantity } = product;
        const blog = await Blogs.findById(productId);
        const updatedQuantity = blog.maxQuantity - quantity;
        await Blogs.updateOne(
          { _id: productId },
          { $set: { maxQuantity: updatedQuantity } }
        );
      }

      // Send response with updated order data
      res.json({ resData });
    } catch (e) {
      res.status(500).json({ error: "Some error occurred: " + e.message });
    }
  }
);

route.delete("/product/order/each/:id", fetchUser, async (req, res) => {
  try {
    const orderId = req.params.id;

    // Check if the order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Delete the order
    await Order.findByIdAndDelete(orderId);

    // Update the associated product's quantity
    for (const product of order.products) {
      const productId = product.productId;
      const quantity = product.quantity;

      // Find the product by ID
      const blog = await Blogs.findById(productId);
      if (!blog) {
        continue; // Move to the next product if the associated product is not found
      }

      // Update the product's maxQuantity
      await Blogs.findByIdAndUpdate(productId, {
        $inc: { maxQuantity: quantity },
      });
    }

    res.json({ success: "deleted" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Some error occurred " + error });
  }
});

module.exports = route;
