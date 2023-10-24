const Reservation = require("../models/Reservation");
const Admin = require("../models/Admin");

async function createAdmin(req, res) {
  const { username, password } = req.body;

  try {
    const admin = new Admin({ username, password });
    await admin.save();
    res.json({ message: "Admin user registered successfully" });
  } catch (error) {
    res.status(500).json({ error:"Failed to create admin user" });
  }
}

async function listReservationsForAdmin(req, res) {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
}

async function deleteReservationForAdmin(req, res) {
  const { reservationCode } = req.params;

  try {
    //await Reservation.findByIdAndDelete(reservationId);
   //await Reservation.findOneAndDelete({reservationCode:reservationCode});
    res.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete reservation" });
  }
}

module.exports = {
  createAdmin,
  listReservationsForAdmin,
  deleteReservationForAdmin,
};
