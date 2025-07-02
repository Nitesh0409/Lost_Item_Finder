const Claim = require("../../models/claim");
const LostItem = require("../../models/lostItem");
const FoundItem = require("../../models/foundItem");
const User = require("../../models/user");


exports.createClaim = async (req, res, next) => {
    try {
        const { itemId, itemType, authorId, description, contactInfo } = req.body;

        const user = req.user.userId;

        const imageInfo = req.file
            ? {
                filename: req.file.filename,
                path: req.file.path,
                mimetype: req.file.mimetype,
                size: req.file.size,
            }
            : null;

        if (!["LostItem", "FoundItem"].includes(itemType)) {
            const error = new Error("Invalid item type");
            error.statusCode = 400;
            return next(error);
        }

        const Model = itemType === "LostItem" ? LostItem : FoundItem;
        const item = await Model.findById(itemId);

        if (!item) {
            const error = new Error("Item not found");
            error.statusCode = 404;
            return next(error);
        }

        const existingClaim = await Claim.findOne({ itemId, itemType, claimantId: user, });
        if (existingClaim) {
            const error = new Error("You have already claimed this item.");
            error.statusCode = 409;
            return next(error);
        }

        const claim = new Claim({
            itemId,
            itemType,
            description,
            proof: imageInfo,
            contactInfo,
            claimantId : user,
            authorId,
        });

        const savedClaim = await claim.save();

        const fieldName = itemType === "LostItem" ? "matchedFoundItems" : "matchedLostItems";

        await Model.findByIdAndUpdate(itemId, {
            $push: {
                [fieldName]: {
                    claimId: savedClaim._id,
                    claimedBy: user,
                },
            },
        });

        

        res.status(201).json({
            message: "Claim created successfully!",
            claim: savedClaim,
        });
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
};
  
exports.hasAnyClaims = async (req, res, next) => {
    const { itemId, itemType } = req.query;
    const userId = req.user.userId;

    try {
        const existingClaim = await Claim.findOne({ itemId, itemType });

        if (!existingClaim) {
            return res.status(200).json({
                hasClaims: false,
                totalClaimants: 0,
                claimedByCurrentUser: false,
            });
        }

        const claimedByCurrentUser = existingClaim.claimantId == userId.toString();

        res.status(200).json({
            hasClaims: true,
            totalClaimants: 1,   // i need to update this
            claimedByCurrentUser,
        });
    } catch (err) {
        next(err);
    }
};
  
  


// Get all claims for a specific user (as claimant or author)
exports.getClaimsByUser = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const claims = await Claim.find({
            claimantId: userId,
        })
            .populate("itemId", "title description image")
            .populate("authorId", "userName email");

        res.status(200).json({
            message: "User claims fetched successfully",
            claims: claims,
        });

    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
};

exports.getAllPendingVerifications = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const verifications = await FoundItem.find({
            "userId": userId, // Match nested user ID
            matchedLostItems: { $exists: true, $not: { $size: 0 } } // Ensure array is not empty
        });

        res.status(200).json({
            message: "User claims fetched successfully",
            verifications,
        });

    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
};

exports.getDetailsPendingVerification = async (req, res, next) => {
    try {

        // const userId = req.user.userId;
        const { matchedLostItems } = req.body;

        if (!matchedLostItems || matchedLostItems.length == 0) {
            const error = new Error("not find claimIds");
            error.statusCode = 400;
            return next(error);
        }

        const populatedItems = await Promise.all(
            matchedLostItems.map(async (item) => {
                const claim = await Claim.findById(item.claimId)
                    .populate("claimantId")
                return {
                    claimId: claim,
                };
            })
        );

        return res.status(200).json({ matchedDetails: populatedItems });
    } catch (err) {
        console.error("Error in getDetailsPendingVerification:", err);
        if (!err.statusCode) err.statusCode = 500;
        next(err);
        }
};


  

// // Accept or reject a claim
// exports.updateClaimStatus = async (req, res, next) => {
//     try {
//         const { claimId } = req.params;
//         const { status } = req.body;

//         if (!["accepted", "rejected"].includes(status)) {
//             const error = new Error("Invalid status value");
//             error.statusCode = 400;
//             return next(error);
//         }

//         const claim = await Claim.findByIdAndUpdate(
//             claimId,
//             { status },
//             { new: true }
//         );

//         if (!claim) {
//             const error = new Error("claimed not found");
//             error.statusCode = 400;
//             return next(error);
//         };

//         res.status(200).json(claim);
//     } catch (err) {
//         if (!err.statusCode) err.statusCode = 500;
//         next(err);
//     }
    
// };



  
