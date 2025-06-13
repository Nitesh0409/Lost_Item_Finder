const express = require('express');
const {validateFoundItem} = require("../validators/foundItemsValidators");
const foundItemControllers = require("../controllers/itemControllers/foundItems");

const authenticateUser = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticateUser);

// Add a new found item
router.post("/addFoundItem", validateFoundItem, foundItemControllers.addFoundItem);

// Get a specific found item by ID
router.get("/foundItem/:id", foundItemControllers.getFoundItem);

// Get all found items
router.get("/foundItems", foundItemControllers.getAllFoundItems);

// Delete a found item by ID
router.delete("/foundItem/:id", foundItemControllers.deleteFoundItem);

// Update a found item by ID
router.put("/foundItem/:id", validateFoundItem, foundItemControllers.updateFoundItem);

module.exports = router;
