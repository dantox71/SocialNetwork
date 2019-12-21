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
      return res.status(400).json({ errors: errors.array() });
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

//  @route      DELETE api/posts/:post_Id
//  @desc       Delete post by id
//  @access     Private
//  @return     Delete post
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.post_id);

    if (!post) {
      return res.status(400).json({ msg: "There's no post with such id" });
    }

    res.json(post);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "There's no post with such id" });
    }

    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//  @route      PUT api/posts/like/:post_id
//  @desc       like post
//  @access     Private
//  @return     Array of likes on post including new one
router.put("/like/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post with this id not found" });
    }

    //Check if post has been already liked by logged in user
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Post is already like by this user" });
    }

    //Insert like at the beginning of the array
    post.likes.unshift({
      user: req.user.id
    });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post with this id not found" });
    }

    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//  @route      PUT api/posts/unlike/:post_id
//  @desc       unlike post
//  @access     Private
//  @return     Array of likes on post without deleted one
router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post with this id not found" });
    }

    //Check if post has been already liked by logged in user
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res
        .status(400)
        .json({ msg: "Post hasn't been liked by this user yet" });
    }

    const removeIndex = post.likes.map(like => like.user).indexOf(req.user.id);

    //Remove unliked like from array of likes
    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post with this id not found" });
    }

    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//  @route      PUT api/posts/comment/:post_id
//  @desc       comment on the post
//  @access     Private
//  @return     Array of comments
router.put("/comment/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    const user = await User.findById(req.user.id);
    const profile = await Profile.findOne({ user: req.user.id });

    if (!post) {
      return res.status(404).json({ msg: "Post with this id not found" });
    }

    if (!profile) {
      return res
        .status(404)
        .json({ msg: "To comment you have to create profile" });
    }

    const comment = {
      user: req.user.id,
      avatar: profile.avatar,
      text: req.body.text
    };

    post.comments.unshift(comment);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post with this id not found" });
    }

    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
