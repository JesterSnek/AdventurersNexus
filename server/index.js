require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const DB = require("./utils/DBString");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// importing routes
const userRoutes = require("./routes/userRoutes");
const characterRoutes = require("./routes/characterRoutes");

// routes
app.use("/api/user", userRoutes);
app.use("/api/character", characterRoutes);

// connecting to database on mongo atlas
mongoose
  .connect(DB, { dbName: process.env.DBNAME })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Couldn't connect to MongoDB");
  });

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
