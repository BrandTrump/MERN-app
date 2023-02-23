require("dotenv").config();

const express = require("express");

const app = express();

const port = process.env.PORT || 4000;

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.json({ mssg: "Welcome to the app" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
