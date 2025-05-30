const express = require('express');
const lostItemValidators = require("../validators/lostItemsValidators");
const lostItemControllers = require("../controllers/itemControllers/lostItems");

const router = express.Router();

// Add a new lost item
router.post("/addLostItem", lostItemValidators, lostItemControllers.addLostItem);

// Get a specific lost item by ID
router.get("/lostItem/:id", lostItemControllers.getLostItem);

// Get all lost items
router.get("/lostItems", lostItemControllers.getAllLostItems);

// Delete a lost item by ID
router.delete("/lostItem/:id", lostItemControllers.deleteLostItem);

// Update a lost item by ID
router.put("/lostItem/:id", lostItemValidators, lostItemControllers.updateLostItem);

module.exports = router;
