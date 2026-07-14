const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const {
  createTrip,
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip,
  addStop,
  removeStop,
} = require('../controllers/tripController');

// Nested route imports
const itineraryRoutes = require('./itineraryRoutes');
const bookingRoutes = require('./bookingRoutes');

const router = express.Router();

// All trip routes require authentication
router.use(protect);

// Re-route into nested resources
router.use('/:tripId/itinerary', itineraryRoutes);
router.use('/:tripId/bookings', bookingRoutes);

router
  .route('/')
  .post(
    [
      body('title').notEmpty().withMessage('Title is required').trim(),
      body('startDate').isISO8601().withMessage('Valid start date is required'),
      body('endDate').isISO8601().withMessage('Valid end date is required'),
    ],
    validate,
    createTrip
  )
  .get(getTrips);

router.route('/:id').get(getTrip).put(updateTrip).delete(deleteTrip);

// Stop sub-routes
router.post(
  '/:id/stops',
  [body('name').notEmpty().withMessage('Stop name is required').trim()],
  validate,
  addStop
);
router.delete('/:id/stops/:stopId', removeStop);

module.exports = router;
