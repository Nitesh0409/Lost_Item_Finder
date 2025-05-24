const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require("dotenv").config();


const app = express()
const port = process.env.PORT || 5000;

const ItemRoutes = require("./routes/itemRoutes");
const homeRoutes = require("./routes/home");
const dbConnect = require("./config/db");

app.use(bodyParser.json());

const User = require("./models/user");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  next();
});

dbConnect();

// app.use("/api/auth",ItemRoutes.);
app.use("/api/items", ItemRoutes);

app.use("/", homeRoutes);

app.use((error, req, res, next) => {
  console.log(error);

  const status = error.statusCode || 500; 
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message, data });
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});