const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");

//  @route      POST api/users
//  @desc       Register a user
//  @access     Public
//  @return     JWT token
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  //Check if user with given email already exists in database
  if (user) {
    return res.status(400).json({ msg: "User already exists" });
  }

  try {
    user = new User({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);

    //Hash password
    user.password = hash;

    const payload = {
      user: {
        id: user._id
      }
    };

    const token = await jwt.sign(
      payload,

      config.get("jwtSecret"),
      {
        expiresIn: "360000"
      }
    );

    res.json({ token });

    //Save to database
    user.save();
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
