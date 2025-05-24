const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "itemType",
    },
    itemType: {
        type: String,
        required: true,
        enum: ["LostItem", "FoundItem"], 
    },
    claimantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
    },
    delivered: {
        type: Boolean,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Claim = mongoose.model("Claim", claimSchema);

module.exports = Claim;
