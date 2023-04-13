const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = mongoose.model("User");
const bcrypt = require('bcrypt');
require('dotenv').config();


  


router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).send({ error: "All fields required" });
  }

  try {
    const existingUser = await User.findOne({ email:email });

    if (existingUser) {
      return res.status(400).send({ error: "User already exists" });
    }
    const user = new User({
      name,
      email,
      password
    });

    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(200).send({ message: "User registered successfully", token });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(422).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(422).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ message: "Signin successfully", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
});





module.exports = router;
