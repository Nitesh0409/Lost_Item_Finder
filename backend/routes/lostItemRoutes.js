const express = require('express');
const {validateLostItem} = require("../validators/lostItemsValidators");
const lostItemControllers = require("../controllers/itemControllers/lostItems");

const authenticateUser = require("../middlewares/authMiddleware");

const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // folder must exist
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

router.use(authenticateUser);

router.post("/addLostItem", upload.single("image"), validateLostItem, lostItemControllers.addLostItem);

// Get a specific lost item by ID
router.get("/lostItem/:id", lostItemControllers.getLostItem);

// Get all lost items
router.get("/lostItems", lostItemControllers.getAllLostItems);

// Delete a lost item by ID
router.delete("/lostItem/:id", lostItemControllers.deleteLostItem);

// Update a lost item by ID
router.put("/lostItem/:id", validateLostItem, lostItemControllers.updateLostItem);

module.exports = router;
