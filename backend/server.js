const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { DBConn } = require("./db/conn");
const app = express();
const path = require("path");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 4000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
DBConn();
app.use("/goal", require("./routes/goalRoutes"));
app.use("/user", require("./routes/userRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
