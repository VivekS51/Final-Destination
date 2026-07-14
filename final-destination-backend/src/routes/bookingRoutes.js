const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');

// mergeParams gives access to :tripId from the parent router
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getBookings)
  .post(
    [
      body('type')
        .isIn(['flight', 'hotel', 'car', 'train', 'activity', 'other'])
        .withMessage('Invalid booking type'),
      body('title').notEmpty().withMessage('Booking title is required').trim(),
      body('startDateTime').isISO8601().withMessage('Valid start date/time is required'),
    ],
    validate,
    createBooking
  );

router.route('/:bookingId').put(updateBooking).delete(deleteBooking);

module.exports = router;
