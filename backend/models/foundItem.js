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
  images: {
    type: String,
    required: false,
  },
  description: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  tags: [String], // e.g., ['purse', 'black']
  dateReported: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["open", "claimed", "closed"],
    default: "open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

foundItemSchema.index({ location: "2dsphere" });
foundItemSchema.index({ tags: 1 });
foundItemSchema.index({ title: "text", description: "text" });

const FoundItem = mongoose.model("FoundItem", foundItemSchema);

module.exports = FoundItem;
