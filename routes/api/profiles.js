const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth").auth;

//Models
const User = require("../../models/User");
const Profile = require("../../models/Profile");

//  @route    GET api/profiles
//  @desc     Get all profiles
//  @access   Private
//  @return   All profiles
router.get("/", auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name"]);

    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//  @route    GET api/profiles
//  @desc     Get logged in user's profile
//  @access   Private
//  @return   logged user profile
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name"]);

    if (!profile) {
      return res
        .status(404)
        .json({ msg: "Logged in user doesn't have profile yet" });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//  @route    GET api/profiles/:profile_id
//  @desc     Get profile by it's id
//  @access   Private
//  @return   profile that match specified id
router.get("/:profile_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findById(
      req.params.profile_id
    ).populate("user", ["name"]);

    if (!profile) {
      return res.status(404).json({ msg: "No profile for such id" });
    }

    res.json(profile);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No profile for  such id" });
    }

    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//  @route    POST api/profiles
//  @desc     Create/Update profile
//  @access   Private
//  @return   Created/Updated profile
router.post("/", auth, async (req, res) => {
  let profile = await Profile.findOne({ user: req.user.id }).populate("user", [
    "name"
  ]);

  try {
    if (profile) {
      //Edit
      const {
        avatar,
        location,
        job,
        status,
        instagram,
        facebook,
        youtube,
        linkedin
      } = req.body;

      if (avatar) profile.avatar = avatar;
      if (location) profile.location = location;
      if (job) profile.job = job;
      if (status) profile.status = status;

      instagram
        ? (profile.social.instagram = instagram)
        : (profile.social.instagram = "");

      facebook
        ? (profile.social.facebook = facebook)
        : (profile.social.facebook = "");

      linkedin
        ? (profile.social.linkedin = linkedin)
        : (profile.social.linkedin = "");

      youtube
        ? (profile.social.youtube = youtube)
        : (profile.social.youtube = "");

      profile.save();
      console.log("Profile edited");

      res.json(profile);
    } else {
      //Add new profile

      const {
        avatar,
        location,
        job,
        status,
        instagram,
        facebook,
        youtube,
        linkedin
      } = req.body;

      const newProfile = {};

      newProfile.user = req.user.id;

      if (avatar) newProfile.avatar = avatar;
      if (location) newProfile.location = location;
      if (job) newProfile.job = job;
      if (status) newProfile.status = status;
      const social = {};
      if (instagram) social.instagram = instagram;
      if (facebook) social.facebook = facebook;
      if (youtube) social.youtube = youtube;
      if (linkedin) social.linkedin = linkedin;

      newProfile.social = social;

      const profile = new Profile(newProfile);

      //Save profile in database
      await profile.save();

      console.log("New profile added");

      res.json(profile);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//  @route    DELETE api/posts
//  @desc     Delete logged in user's profile
//  @access   Private
//  @return   Nothing
router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user.id });

    res.json({ msg: "Profile deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//FOR DEVELOPMENT PURPOSES - DELETE IN PRODUCTION
//  @route    DELETE api/posts
//  @desc     Delete logged in user's profile
//  @access   Private
//  @return   Nothing
router.delete("/:profile_id", auth, async (req, res) => {
  await Profile.findByIdAndDelete(req.params.profile_id);

  res.json({
    msg: "Profile deleted"
  });
});

module.exports = router;
