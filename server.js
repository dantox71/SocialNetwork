const express = require("express");
const dbConnection = require("./config/db");

const app = express();

//Connect with database
dbConnection();

//Init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Test");
});

//Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT} port `));
