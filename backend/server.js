const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");


require("dotenv").config();


const app = express()
const port = process.env.PORT || 5000;

const lostItemRoutes = require("./routes/lostItemRoutes");
const foundItemRoutes = require("./routes/foundItemRoutes");
const authRoutes = require("./routes/authRoutes");
const claimRoutes = require("./routes/claimRoutes");
const mapRoutes = require("./routes/mapRoutes");

const dbConnect = require("./config/db");

app.use(bodyParser.json());

//## You are manually setting headers for CORS, but missing general security headers.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); //## this need to dynamic (process.env)
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});



dbConnect();

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); //## -> this is static 

// app.use("/api/auth",ItemRoutes.);
app.use("/api/items/lost", lostItemRoutes);
app.use("/api/items/found", foundItemRoutes);

// user routes
app.use("/api/user", authRoutes);

//claim item
app.use("/api/claim", claimRoutes);

app.use("/api/map", mapRoutes);

app.use((error, req, res, next) => {
  console.log(error);

  const status = error.statusCode || 500; 
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message, data });
});

app.listen(port, () => {
  console.log(` Server running on port ${port}`);
});