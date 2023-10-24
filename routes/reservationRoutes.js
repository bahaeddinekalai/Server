const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Routes for Visiter
// Create a reservation
router.post('/reservations', reservationController.createReservation);

// Get a reservation by reservation code
router.get('/reservations/:reservationCode', reservationController.getReservationByCode);

// Routes for Admin
// List all reservations 
router.get('/reservations', reservationController.listReservations);

// Update a reservation 
router.put('/reservations/:reservationId', reservationController.updateReservation);

// Delete a reservation 
router.delete('/reservations/:reservationId', reservationController.deleteReservation);

module.exports = router;