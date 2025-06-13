const mongoose = require("mongoose");

const lostItemSchema = new mongoose.Schema({
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
  description: String,
  location: {
    type: String,
    required: false,
  },
  dateLost: {
    type: Date,
    required: false,
  },

  tags: {
    type: [String],
    default: [],
  },

  contactInfo: {
    type: String, // or break it into email/phone if needed
    required: false,
  },

  reward: {
    type: Number, // or Number if you're expecting monetary values
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
  matchedFoundItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoundItem",
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// lostItemSchema.index({ location: "2dsphere" });
// lostItemSchema.index({ tags: 1 });
lostItemSchema.index({ title: "text", description: "text" });

const LostItem = mongoose.model("LostItem", lostItemSchema);

module.exports = LostItem;
