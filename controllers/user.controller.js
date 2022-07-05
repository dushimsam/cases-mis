const express = require("expresss");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User, validateUser } = require("../models/user.model");

router.post("/", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");

    const hashedPass = await bcrypt.hash(req.body.password,10);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });
    const result = await newUser.save();
    res.status(201).send(result);
  } catch (ex) {
    res.status(500).send(ex.message);
  }
});


router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (ex) {
        res.status(500).send(ex.message);
    }
})

router.put("/:id", async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email
        });
        if (!user) return res.status(404).send("User not found");

        res.status(200).send(user);
    } catch (ex) {
        res.status(500).send(ex.message);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send("User not found");

        res.status(200).send(user);
    } catch (ex) {
        res.status(500).send(ex.message);
    }
})


module.exports = router;
