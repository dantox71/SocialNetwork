const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const db = config.get("mongoURI");

const dbConnection = async () => {
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

  console.log("DB Connected");
};

module.exports = dbConnection;
