const express = require("express");
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

const authenticateUser = require("../middlewares/authMiddleware");

const claimController = require("../controllers/itemControllers/claim");

router.use(authenticateUser);

router.post("/createClaim", upload.single("proof"), claimController.createClaim);

router.get("/hasAnyClaim", claimController.hasAnyClaims);

router.get("/allClaims", claimController.getClaimsByUser);

router.get("/pendingVerification", claimController.getAllPendingVerifications);
router.post("/getAllDetailsPendingVerification", claimController.getDetailsPendingVerification);


module.exports = router;
