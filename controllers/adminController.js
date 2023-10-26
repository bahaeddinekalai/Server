const Reservation = require("../models/Reservation");
const Admin = require("../models/Admin");

async function createAdmin(req, res) {

  const { username, password } = req.body;

  try {
    // Check if an admin with the provided username already exists
    const existingAdmin = await Admin.findOne({ username });
  
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin user with this username already exists" });
    }
  
    // If no existing admin found, create a new admin user
    const admin = new Admin({ username, password });
    await admin.save();
    res.json({ message: "Admin user registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create admin user" });
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
  const { reservationId } = req.params;

  try {
    
    await Reservation.findByIdAndDelete(reservationId);
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
