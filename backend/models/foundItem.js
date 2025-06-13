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
  image: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  location: {
    type: String,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "LostItem",
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
