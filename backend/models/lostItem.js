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
  images: {
    type: String,
    required: false,
  },
  description: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: false,
    },
    coordinates: {
      type: [Number],
      required: false,
    },
  },
  tags: [String],
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

lostItemSchema.index({ location: "2dsphere" });
lostItemSchema.index({ tags: 1 });
lostItemSchema.index({ title: "text", description: "text" });

const LostItem = mongoose.model("LostItem", lostItemSchema);

module.exports = LostItem;
