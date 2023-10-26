// models/Offer.js
const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  offerNumber: {type: String, required: true, unique: true},
  capacity: Number,
  image: String, // Store the image path or URL
  description: String,
  isAvailable: Boolean,
  startDate: Date,
  endDate: Date,
});

module.exports = mongoose.model("Offer", offerSchema);
