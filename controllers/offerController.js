// controllers/offerController.js
const Offer = require('../models/Offer');

// Create an offer
async function createOffer(req, res) {
  const { offerNumber,capacity,image, description, isAvailable, startDate, endDate } = req.body;

  try {
    const offer = new Offer({offerNumber, capacity, image, description, isAvailable, startDate, endDate });
    const offer2 = await Offer.findOne({ offerNumber });
    if(offer2){
      res.status(500).json({ error: 'offer already exists ' });
    }else{
      await offer.save();
      res.json(offer);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to create offer' });
  }
}

// Update an offer
async function updateOfferByOfferNumber(req, res) {
  // Update offer number from URL parameters
  const { offerNumber } = req.params;
  // Update offer details from request body
  const { capacity, image, description, isAvailable, startDate, endDate } = req.body;
  // Build an offer object based on fields from request body
  const offerFields = {
    capacity,
    image,
    description,
    isAvailable,
    startDate,
    endDate,
  };

  try {
    // Find offer by offer number
    let offer = await Offer.findOne({ offerNumber });
    // If offer not found, return 404 status code
    if (!offer) return res.status(404).json({ error: 'Offer not found', offerNumber });
    // Update offer
    offer = await Offer.findOneAndUpdate(
      { offerNumber },
      { $set: offerFields },
      { new: true }
    );
    // Return updated offer
    res.json(offer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update offer' });
  }
  
}


// Delete an offer
async function deleteOfferByOfferNumber(req, res) {
  // Delete offer number from URL parameters
  const { offerNumber } = req.params;

  try {
    // Find offer by offer number
    let offer = await Offer.findOne({ offerNumber });
    // If offer not found, return 404 status code
    if (!offer) return res.status(404).json({ error: 'Offer not found', offerNumber });
    // Delete offer
    await Offer.findOneAndRemove({ offerNumber });
    // Return a success message with deleted offer number
    res.json({ message: 'Offer deleted successfully', offerNumber });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete offer' });
  }
  

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
  updateOfferByOfferNumber,
  deleteOfferByOfferNumber,
  getAllOffers,
};
