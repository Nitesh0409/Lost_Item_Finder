const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  bio: { type: String, default: "hii this is new user" },
  profilePicture: { type: String, default: "" },
  phone: { type: String },

  itemsReportedLost: [{ type: mongoose.Schema.Types.ObjectId, ref: "LostItem" }],
  itemsReportedFound: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoundItem" }],

  rating: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
