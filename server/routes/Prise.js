const route = require("express").Router();
const checkPrivilege = require("../middleware/checkPrivilege");

const Price = require("../models/Price");

// get price [GET: http://localhost:8000/api/metal/price]  (register not required)
route.get("/price", async (req, res) => {
  try {
    const data = await Price.find();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Enternal Server Error" });
  }
});
// Post price [POST: http://localhost:8000/api/metal/price]  (register required)
route.post("/price", checkPrivilege, async (req, res) => {
  try {
    const { gold, silver } = req.body;
    if (!gold) {
      return res.status(400).json({ error: "Please enter gold price" });
    }
    if (!silver)
      return res.status(400).json({ error: "Please enter silver price" });

    const priceItem = { gold, silver };
    const price = await new Price(priceItem);
    await price.save();
    res.json({ success: "Price Added Success" });
  } catch (e) {
    res.status(500).json({ error: "Enternal Server Error" });
  }
});

// Patch price [PATCH: http://localhost:8000/api/metal/price]  (register required)
route.patch("/price/:id", checkPrivilege, async (req, res) => {
  try {
    const { gold, silver } = req.body;
    if (!gold) {
      return res.status(400).json({ error: "Please enter gold price" });
    }
    if (!silver)
      return res.status(400).json({ error: "Please enter silver price" });

    // set update detail in new variable
    const newPrice = {};
    if (gold) {
      newPrice.gold = gold;
    }
    if (silver) {
      newPrice.silver = silver;
    }
    // find note and update
    await Price.findByIdAndUpdate(
      req.params.id,
      { $set: newPrice },
      { new: true }
    );
    res.json({ success: "Price Update Success" });
  } catch (e) {
    res.status(500).json({ error: "Enternal Server Error " + e });
  }
});

// delete categories [DELETE: http://localhost:8000/api/metal/price/:id]  (register required)
route.delete("/price/:id", checkPrivilege, async (req, res) => {
  try {
    const priceId = req.params.id;
    // find price exist or not
    const price = await Price.findById(priceId);
    if (!price) return res.status(400).json({ error: "price Not Found" });
    await Price.findByIdAndDelete(priceId);
    res.json({ success: "price Deleted Success" });
  } catch (e) {
    res.status(500).json({ error: "Enternal Server Error " + e });
  }
});

module.exports = route;
