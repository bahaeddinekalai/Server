// routes/offerRoutes.js
const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');

// Get all offers (public route)
router.get('/offers', offerController.getAllOffers);

module.exports = router;
