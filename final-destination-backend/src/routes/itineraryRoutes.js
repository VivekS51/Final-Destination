const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const {
  getItinerary,
  createItineraryDay,
  updateItineraryDay,
  deleteItineraryDay,
} = require('../controllers/itineraryController');

// mergeParams gives access to :tripId from the parent router
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getItinerary)
  .post(
    [
      body('date').isISO8601().withMessage('Valid date is required'),
      body('dayNumber').isInt({ min: 1 }).withMessage('Day number must be a positive integer'),
    ],
    validate,
    createItineraryDay
  );

router.route('/:dayId').put(updateItineraryDay).delete(deleteItineraryDay);

module.exports = router;
