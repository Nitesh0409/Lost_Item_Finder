const express = require('express');
const foundItemValidators = require("../validators/foundItemsValidators");
const foundItemControllers = require("../controllers/itemControllers/foundItems");

const router = express.Router();

// Add a new found item
router.post("/addFoundItem", foundItemValidators, foundItemControllers.addFoundItem);

// Get a specific found item by ID
router.get("/foundItem/:id", foundItemControllers.getFoundItem);

// Get all found items
router.get("/foundItems", foundItemControllers.getAllFoundItems);

// Delete a found item by ID
router.delete("/foundItem/:id", foundItemControllers.deleteFoundItem);

// Update a found item by ID
router.put("/foundItem/:id", foundItemValidators, foundItemControllers.updateFoundItem);

module.exports = router;
