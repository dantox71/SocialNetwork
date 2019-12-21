const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth").auth;
const config = require("config");
const { validationResult, check } = require("express-validator");

//Models
const User = require("../../models/User");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
//  @route      GET api/posts
//  @desc       Get all posts
//  @access     Public
//  @return     All posts
router.get("/", async (req, res) => {
  const posts = await Post.find();

  res.json(posts);
});

//  @route      POST api/posts
//  @desc       create a post
//  @access     Private
//  @return     Created post
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //Check for errors
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id);
      const profile = await Profile.findOne({ user: req.user.id });

      const post = new Post({
        text: req.body.text,
        user: req.user.id,
        name: user.name,
        avatar: profile.avatar,
        likes: [],
        comments: []
      });

      //Save post in database
      await post.save();

      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
