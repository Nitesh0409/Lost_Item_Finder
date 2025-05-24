const Claim = require("../../models/claim");
const LostItem = require("../../models/lostItem");
const FoundItem = require("../../models/foundItem");

exports.createClaim = async (req, res, next) => {
    try {
        // const claimantId = req.userId; // logged-in user
        const { itemId, itemType } = req.body;

        if (!["LostItem", "FoundItem"].includes(itemType)) {
            const error = new Error("Invalid item type");
            error.statusCode = 400;
            return next(error);
        }

        let item;
        if (itemType === "LostItem") {
            item = await LostItem.findById(itemId);
        } else {
            item = await FoundItem.findById(itemId);
        }

        if (!item) {
            const error = new Error("Item not found");
            error.statusCode = 404;
            return next(error);
        }

        const authorId = item.userId;

        const existingClaim = await Claim.findOne({ itemId, itemType, claimantId });
        if (existingClaim) {
            const error = new Error("Claim already exists");
            error.statusCode = 409;
            return next(error);
        }

        const claim = new Claim({
            itemId,
            itemType,
            claimantId,
            authorId,
        });

        const savedClaim = await claim.save();

        res.status(201).json({
            message: "Claim created successfully!",
            claim: savedClaim,
        });
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
};
  


// Get all claims for a specific user (as claimant or author)
exports.getClaimsByUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const claims = await Claim.find({
            $or: [{ claimantId: userId }, { authorId: userId }],
        })
            .populate("claimantId", "name email")
            .populate("authorId", "name email");

        res.status(200).json(claims);
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
};

// Accept or reject a claim
exports.updateClaimStatus = async (req, res, next) => {
    try {
        const { claimId } = req.params;
        const { status } = req.body;

        if (!["accepted", "rejected"].includes(status)) {
            const error = new Error("Invalid status value");
            error.statusCode = 400;
            return next(error);
        }

        const claim = await Claim.findByIdAndUpdate(
            claimId,
            { status },
            { new: true }
        );

        if (!claim) {
            const error = new Error("claimed not found");
            error.statusCode = 400;
            return next(error);
        };

        res.status(200).json(claim);
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
    
};

// Mark item as delivered
exports.markDelivered = async (req, res, next) => {
    try {
        const { claimId } = req.params;

        const claim = await Claim.findByIdAndUpdate(
            claimId,
            {
                delivered: true,
                deliveredAt: new Date(),
            },
            { new: true }
        );

        if (!claim) {
            const error = new Error("Claim not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({ message: "Item marked as delivered", claim });
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
};
  
