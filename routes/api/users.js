const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validationResult, check } = require("express-validator");

//Models
const User = require("../../models/User");

//  @route      POST api/users
//  @desc       Register a user
//  @access     Public
//  @return     JWT token
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Email is required")
      .not()
      .isEmpty(),
    check("email", "Please enter correct email").isEmail(),
    check(
      "password",
      "Password should be between 7 and 21 characters "
    ).isLength({
      min: 7,
      max: 21
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    //Check if user with given email already exists in database
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
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
          expiresIn: "360000000000000"
        }
      );

      res.json({ token });

      //Save to database
      await user.save();
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
