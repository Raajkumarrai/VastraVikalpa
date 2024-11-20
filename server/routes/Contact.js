const checkPrivilege = require("../middleware/checkPrivilege");
const fetchUser = require("../middleware/fetchuser");
const User = require("../models/Auth");
const Contact = require("../models/Contact");

const route = require("express").Router();

// send all contact details GET [http://localhost:8000/api/contact/contacts]
route.get("/contacts", checkPrivilege, async (req, res) => {
  try {
    const realdata = await Contact.find();
    const data = realdata.reverse();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Some error accuired " + e });
  }
});

// send all contact details GET [http://localhost:8000/api/contact/contact/id]
route.get("/contact/:id", checkPrivilege, async (req, res) => {
  try {
    const { id } = req.params;
    const realdata = await Contact.findById(id);
    if (!realdata) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json(realdata); // If it's not an array, send it as is
  } catch (e) {
    res.status(500).json({ error: "Some error occurred: " + e.message });
  }
});

// Post contact contact details POST [http://localhost:8000/api/contact/contact]
route.post("/contact", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, title, msg } = req.body;
    // check user exist or not
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "user not found" });
    if (!name) return res.status(400).json({ error: "Please Enter vaid name" });
    if (!email)
      return res.status(400).json({ error: "Please Enter vaid email" });
    if (!title)
      return res.status(400).json({ error: "Please Enter vaid title" });
    if (!msg) return res.status(400).json({ error: "Please Enter vaid msg" });
    const contact = await new Contact({
      userId,
      name,
      email,
      title,
      msg,
    });
    await contact.save();
    res.json({ success: "Contact Success" });
  } catch (e) {
    res.status(500).json({ error: "Some error accuired " + e });
  }
});

// contact delete DELETE [http://localhost:8000/api/contact/contact/:id]
route.delete("/contact/:id", checkPrivilege, async (req, res) => {
  try {
    const id = req.params.id;
    // check contact exist or not
    const contact = await Contact.findById(id);
    if (!contact) return res.status(400).json({ error: "Contact not found" });
    // find contact and delete
    await Contact.findByIdAndDelete(id);
    res.json({ success: "Contact Delete Success" });
  } catch (e) {
    res.status(500).json({ error: "Some error accuired " + e });
  }
});

route.put("/contact/:id/notify", checkPrivilege, async (req, res) => {
  try {
    const id = req.params.id;
    // Check if the contact exists
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(400).json({ error: "Contact not found" });
    }

    // Set isNotified to true and save the updated contact
    contact.isNotified = true;
    await contact.save();

    res.json({ success: "Contact updated successfully", data: contact });
  } catch (e) {
    res.status(500).json({ error: "Some error occurred: " + e.message });
  }
});

route.get("/contacts/count-false", checkPrivilege, async (req, res) => {
  try {
    const unreadMessages = await Contact.find({ isNotified: false });

    res.json({ unreadMessages });
  } catch (e) {
    res.status(500).json({ error: "Some error occurred: " + e.message });
  }
});
module.exports = route;
