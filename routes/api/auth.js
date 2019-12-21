const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth").auth;
const config = require("config");
const User = require("../../models/User");
const { validationResult, check } = require("express-validator");

//  @route    GET api/auth
//  @desc     Get logged in user's data
//  @access   Private
//  @return   User's data
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id);

  res.send(user);
});

//  @route      POST api/auth
//  @desc       Authorize a user
//  @access     Public
//  @return     JWT token assigned to account
router.post(
  "/",
  [
    check("email", "Email is required")
      .not()
      .isEmpty(),
    check("password", "Password is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    //Check if not user
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password);

      //Check if passwords doesn't match
      if (!isMatch) {
        res.status(400).json({ msg: "Invalid Credentials" });
      }

      const payload = {
        user: {
          id: user._id
        }
      };

      const token = await jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: "360000"
      });

      res.json({ token });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
