const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  itemType: {
    type: String, enum: ["lost", "found"],
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", required: true
  },
  notificationType: { type: String },
  status: {
    type: String,
    enum: ["sent", "claimed", "unclaimed"],
    default: "sent",
  },
  timestamp: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = notification;
