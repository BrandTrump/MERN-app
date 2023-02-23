require("dotenv").config();

const express = require("express");

const workoutRoutes = require("./routes/workouts");

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
