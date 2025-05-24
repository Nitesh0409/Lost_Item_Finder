const homeControllers = require("../controllers/dashBoard");

const express = require("express");

const router = express.Router();


router.get("/home", homeControllers.getHome);

module.exports = router;