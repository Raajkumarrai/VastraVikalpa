const checkPrivilege = require("../middleware/checkPrivilege");
const User = require("../models/Auth");
const router = require("express").Router();
const Order = require("../models/Order");

router.get("/total-user/all", checkPrivilege, async (req, res) => {
  try {
    // Use your User model to count the total number of users
    const totalUsers = await User.countDocuments();

    res.json({ totalUsers });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while counting total users." });
  }
});

router.get("/total-user/thismonth", checkPrivilege, async (req, res) => {
  try {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    const totalUsers = await User.countDocuments({
      date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
    });

    res.json({ totalUsers });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while counting total users." });
  }
});

router.get("/total-orders/all", checkPrivilege, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({
      orderSuccess: 0,
    });

    res.json({ totalOrders });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while counting total orders." });
  }
});

router.get("/total-orders/thismonth", checkPrivilege, async (req, res) => {
  try {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    const totalOrders = await Order.countDocuments({
      date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
      orderSuccess: 0,
    });

    res.json({ totalOrders });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while counting total orders." });
  }
});
router.get("/total-delivery/all", checkPrivilege, async (req, res) => {
  try {
    const totalDelivery = await Order.countDocuments({
      orderSuccess: { $gt: 0 },
    });

    res.json({ totalDelivery });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while counting total delivery." });
  }
});
router.get("/total-delivery/thismonth", checkPrivilege, async (req, res) => {
  try {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    const totalDelivery = await Order.countDocuments({
      updateData: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
      orderSuccess: { $gt: 0 },
    });

    res.json({ totalDelivery });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while counting total delivery." });
  }
});
router.get("/total-revenue/all", checkPrivilege, async (req, res) => {
  try {
    const totalRevenue = await Order.aggregate([
      {
        $match: { orderSuccess: { $gte: 0 } },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    if (totalRevenue.length > 0) {
      res.json({ totalRevenue: totalRevenue[0].totalRevenue });
    } else {
      res.json({ totalRevenue: 0 });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while calculating total revenue." });
  }
});

router.get("/total-revenue/thismonth", checkPrivilege, async (req, res) => {
  try {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    // Calculate the start and end of the current day
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    // Calculate the start and end of the current week
    const currentDayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const startOfThisWeek = new Date(today);
    startOfThisWeek.setDate(today.getDate() - currentDayOfWeek);
    startOfThisWeek.setHours(0, 0, 0, 0);
    const endOfThisWeek = new Date(startOfThisWeek);
    endOfThisWeek.setDate(startOfThisWeek.getDate() + 7);

    const totalRevenueThisMonth = await Order.aggregate([
      {
        $match: {
          orderSuccess: { $gte: 0 },

          updateData: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalRevenueToday = await Order.aggregate([
      {
        $match: {
          orderSuccess: { $gte: 0 },
          updateData: { $gte: startOfToday, $lt: endOfToday },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalRevenueThisWeek = await Order.aggregate([
      {
        $match: {
          orderSuccess: { $gte: 0 },
          updateData: { $gte: startOfThisWeek, $lt: endOfThisWeek },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const response = {
      totalRevenueThisMonth:
        totalRevenueThisMonth.length > 0
          ? totalRevenueThisMonth[0].totalRevenue
          : 0,
      totalRevenueToday:
        totalRevenueToday.length > 0 ? totalRevenueToday[0].totalRevenue : 0,
      totalRevenueThisWeek:
        totalRevenueThisWeek.length > 0
          ? totalRevenueThisWeek[0].totalRevenue
          : 0,
    };

    res.json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while calculating total revenue." });
  }
});

router.get("/monthly-revenue", async (req, res) => {
  try {
    const today = new Date();
    const currentMonth = today.getMonth();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const startMonthIndex =
      currentMonth >= 5 ? currentMonth - 5 : currentMonth + 7;
    const endMonthIndex = currentMonth;

    const monthlyRevenue = await Promise.all(
      Array.from({ length: 6 }, (_, index) => {
        const monthIndex = (startMonthIndex + index) % 12;
        const month = months[monthIndex];
        const firstDayOfMonth = new Date(today.getFullYear(), monthIndex, 1);
        const lastDayOfMonth = new Date(today.getFullYear(), monthIndex + 1, 0);

        return Order.aggregate([
          {
            $match: {
              orderSuccess: { $gte: 0 },
              updateData: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
            },
          },
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: "$totalPrice" },
            },
          },
        ]).then((totalRevenue) => ({
          name: month,
          Total:
            totalRevenue.length > 0
              ? totalRevenue[0].totalRevenue.toFixed(2)
              : 0,
        }));
      })
    );

    res.json(monthlyRevenue);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while calculating monthly revenue." });
  }
});

router.get("/monthly-data/barchart", async (req, res) => {
  try {
    const today = new Date();
    const currentMonth = today.getMonth();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const startMonthIndex =
      currentMonth >= 5 ? currentMonth - 5 : currentMonth + 7;
    const endMonthIndex = currentMonth;

    const monthlyData = await Promise.all(
      Array.from({ length: 6 }, (_, index) => {
        const monthIndex = (startMonthIndex + index) % 12;
        const month = months[monthIndex];
        const firstDayOfMonth = new Date(today.getFullYear(), monthIndex, 1);
        const lastDayOfMonth = new Date(today.getFullYear(), monthIndex + 1, 0);

        const totalUsers = User.countDocuments({
          date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
        });

        const totalOrders = Order.countDocuments({
          date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
          orderSuccess: 0,
        });

        const totalDelivered = Order.countDocuments({
          updateData: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
          orderSuccess: { $gt: 0 },
        });

        return Promise.all([totalUsers, totalOrders, totalDelivered]).then(
          ([users, orders, delivered]) => ({
            name: month,
            users,
            order: orders,
            delivered,
          })
        );
      })
    );

    res.json(monthlyData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while generating monthly data." });
  }
});
router.get("/monthly-data/barchart/:userId", async (req, res) => {
  try {
    const today = new Date();
    const currentMonth = today.getMonth();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const startMonthIndex =
      currentMonth >= 5 ? currentMonth - 5 : currentMonth + 7;
    const endMonthIndex = currentMonth;

    const userId = req.params.userId;

    const monthlyData = await Promise.all(
      Array.from({ length: 6 }, (_, index) => {
        const monthIndex = (startMonthIndex + index) % 12;
        const month = months[monthIndex];
        const firstDayOfMonth = new Date(today.getFullYear(), monthIndex, 1);
        const lastDayOfMonth = new Date(today.getFullYear(), monthIndex + 1, 0);

        const totalOrders = Order.countDocuments({
          userId: userId,
          date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
          orderSuccess: { $gte: 0 },
        });

        const totalDelivered = Order.countDocuments({
          userId: userId,
          updateData: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
          orderSuccess: { $gt: 0 },
        });

        return Promise.all([totalOrders, totalDelivered]).then(
          ([orders, delivered]) => ({
            name: month,
            totalOrder: orders,
            delivered,
          })
        );
      })
    );

    res.json(monthlyData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while generating monthly data." });
  }
});

module.exports = router;
