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
      },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    contactInfo: {
        type: String,
        required: false,
    },

    proof: {
        filename: String,
        path: String,
        mimetype: String,
        size: Number,
      },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Claim = mongoose.model("Claim", claimSchema);

module.exports = Claim;
