// controllers/offerController.js
const Offer = require('../models/Offer');

// Create an offer
async function createOffer(req, res) {
  const { offerNumber,capacity, description, isAvailable, startDate, endDate } = req.body;
  const image = req.file.path; // This stores the image path

  try {
    const offer = new Offer({offerNumber, capacity, image, description, isAvailable, startDate, endDate });
    await offer.save();
    res.json(offer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create offer' });
  }
}

// Update an offer
async function updateOffer(req, res) {
  // Implement update logic here
}

// Delete an offer
async function deleteOffer(req, res) {
  // Implement delete logic here
}

// Get all offers
async function getAllOffers(req, res) {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch offers' });
  }
}

module.exports = {
  createOffer,
  updateOffer,
  deleteOffer,
  getAllOffers,
};
