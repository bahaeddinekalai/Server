// models/Reservation.js
const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  date: Date,
  hours: String,
  numberOfPersons: Number,
  offer: {
    type: mongoose.Schema.Types.String,
    ref: "Offer", // Reference to the Offer model
    required: true,
  },
  reservationCode: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Reservation", reservationSchema);
