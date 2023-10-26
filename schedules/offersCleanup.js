const schedule = require('node-schedule');
const Offer = require('../models/Offer');

// Define a scheduled job to run daily to check and delete expired offers
const  offersCleanupJob = schedule.scheduleJob('0 0 * * *', async () => {
  try {
    const currentDate = new Date();
    console.log('Running offers cleanup job...');
    console.log('Current date:', currentDate);
    const deletedOffers = await Offer.find({ endDate: { $lt: currentDate } });

    // Log the offerNumbers of the deleted offers
    deletedOffers.forEach((offer) => {
      console.log(`Deleted offer with offerNumber: ${offer.offerNumber}`);
    });

    // Delete the expired offers
    await Offer.deleteMany({ endDate: { $lt: currentDate } });

    console.log('Expired offers deleted.');
  } catch (error) {
    console.error('Failed to delete expired offers:', error);
  }
});

module.exports = offersCleanupJob;