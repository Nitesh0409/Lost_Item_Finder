const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");


require("dotenv").config();


const app = express()
const port = process.env.PORT || 5000;

const lostItemRoutes = require("./routes/lostItemRoutes");
const foundItemRoutes = require("./routes/foundItemRoutes");
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/home");
const claimRoutes = require("./routes/claimRoutes");
const mapRoutes = require("./routes/mapRoutes");

const dbConnect = require("./config/db");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // ✅ specific origin
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true"); // ✅ needed for auth

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});



dbConnect();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use("/api/auth",ItemRoutes.);
app.use("/api/items/lost", lostItemRoutes);
app.use("/api/items/found", foundItemRoutes);

// user routes
app.use("/api/user", authRoutes);

//claim item
app.use("/api/claim", claimRoutes);

app.use("/api/map", mapRoutes);

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