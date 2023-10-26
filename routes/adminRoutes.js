const express = require("express");
const router = express.Router();
const adminAuthMiddleware = require("../middleware/adminAuth");
const adminController = require("../controllers/adminController");
const offerController = require("../controllers/offerController");
const Admin = require("../models/Admin");

// Admin login route
router.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findByCredentials(username, password);
    const token = admin.generateAuthToken();
    res.header('x-auth-token', token).json({ message: 'Admin logged in successfully' });
  } catch (error) {
    res.status(401).json({ error: 'Login failed' });
  }
});

// List all reservations (for admin)
router.get(
  "/admin/reservations",
  adminAuthMiddleware,
  adminController.listReservationsForAdmin
);
// Admin registration
router.post("/admin/register", adminController.createAdmin);
// Create an offer (protected by admin authentication)
router.post(
  "/admin/offers",
  adminAuthMiddleware,
  offerController.createOffer
);

// Update an offer (protected by admin authentication)
router.put(
  "/admin/offers/:offerNumber",
  adminAuthMiddleware,
  offerController.updateOfferByOfferNumber
);

// Delete an offer (protected by admin authentication)
router.delete(
  "/admin/offers/:offerNumber",
  adminAuthMiddleware,
  offerController.deleteOfferByOfferNumber
);

// Delete a reservation (for admin)
router.delete(
  "/admin/reservations/:reservationId",
  adminAuthMiddleware,
  adminController.deleteReservationForAdmin
);

module.exports = router;
