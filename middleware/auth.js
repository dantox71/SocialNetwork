const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports.auth = function(req, res, next) {
  //Check if there's token in headers array
  const token = req.headers["x-auth-token"];

  //Check if no token
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Token not found. Authorization denied" });
  }

  try {
    //Decoded will hold whole payload
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //Sign to user property of req user property of payload
    req.user = decoded.user;

    //Call next middleware in chain of middlewares
    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ msg: "Token invalid" });
  }
};
