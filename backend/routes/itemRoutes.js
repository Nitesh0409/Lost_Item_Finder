const itemsControllers = require("../controllers/itemControllers/items");

const {validateLostItem } = require("../validators/lostItemsValidators");

const express = require('express');

const router = express.Router();

router.post("/addLostItem", validateLostItem, itemsControllers.addLostItem);

router.post("/addfoundItem", itemsControllers.addFoundItem);

router.get("/lostItems", itemsControllers.getAllLostItems);

router.get("/foundItems", itemsControllers.getAllFoundItems);

module.exports = router;