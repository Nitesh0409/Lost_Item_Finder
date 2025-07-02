const mongoose = require("mongoose");

const foundItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  categories: {
    type: String,
    required: false
  },
  image: {
    filename: String,
    path: String,
    mimetype: String,
    size: Number,
  },
  description: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  coordinates: {
    type: [Number], // [latitude, longitude]
    index: '2dsphere',
    required: false,
  },
  
  dateFound: {
    type: Date,
    required: false,
  },
  tags: {
    type: [String],
    default: [],
  },

  contactInfo: {
    type: String,
    required: false,
  },
  safeLocation: {
    type: String,
    required: false,
  },
  dateReported: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["open", "claimed", "closed"],
    default: "open",
  },
  matchedLostItems: [
    {
      claimId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Claim',
      },
      claimedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Optional index for searchability
foundItemSchema.index({ title: "text", description: "text" });

const FoundItem = mongoose.model("FoundItem", foundItemSchema);

module.exports = FoundItem;
