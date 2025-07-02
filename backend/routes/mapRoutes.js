const express = require("express");
const router = express.Router();

const mapController = require("../controllers/itemControllers/mapView");

router.post('/view', mapController.getRoute);

module.exports = router;