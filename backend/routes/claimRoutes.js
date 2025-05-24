const express = require("express");
const router = express.Router();
const claimController = require("../controllers/itemControllers/claim");

router.post("/", claimController.createClaim);
router.get("/user/:userId", claimController.getClaimsByUser);
router.put("/status/:claimId", claimController.updateClaimStatus);
router.post("/delivered/:claimId", claimController.markDelivered);

module.exports = router;
