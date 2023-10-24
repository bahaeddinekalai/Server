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
      return res.status(404).json({ error: 'Offer not found' });
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
    await reservation.save();
    res.json(reservation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create reservation" });
  }
}

async function listReservations(req, res) {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reservations" });
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
  listReservations,
  updateReservation,
  deleteReservation,
  getReservationByCode,
};
