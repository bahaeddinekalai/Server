const Reservation = require("../models/Reservation");
const generateCode = require("../middleware/generateCode");
const Offer = require("../models/Offer"); // Import the Offer model

async function createReservation(req, res) {
  const { firstName, lastName, date, hours, numberOfPersons, offerNumber } =
    req.body;

// Generate a unique reservation code
    let reservationCode;
    let isDuplicate = true;
    while (isDuplicate) {
      reservationCode = generateCode();
      const existingReservation = await Reservation.findOne({ reservationCode });
      if (!existingReservation) {
        isDuplicate = false;
      }
    }
  
  try {
    const offer = await Offer.findOne({ offerNumber });

    if (!offer) {
      return res.status(404).json({ error: 'Offer not found',offer });
    }
    if (offer.capacity <= 0) {
      return res.status(400).json({ error: 'Not enough capacity in the offer' });
    }
    const reservation = new Reservation({
      firstName,
      lastName,
      date,
      hours,
      numberOfPersons,
      offer: offer.offerNumber,
      reservationCode,
    });
    // Update offer capacity by subtracting 1 from the current capacity value in the database and save the updated offer
    offer.capacity -= 1;
    offer.isAvailable = false
    await offer.save();
    
    await reservation.save();
    res.json(reservation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create reservation" });
  }
}

async function updateReservation(req, res) {
  // Implement update logic here
}

async function deleteReservation(req, res) {
  // Implement delete logic here
}

async function getReservationByCode(req, res) {
  const { reservationCode } = req.params;

  try {
    const reservation = await Reservation.findOne({ reservationCode });

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reservation" });
  }
}

module.exports = {
  createReservation,
  updateReservation,
  deleteReservation,
  getReservationByCode,
};
