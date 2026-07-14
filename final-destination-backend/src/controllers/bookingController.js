const Booking = require('../models/Booking');
const Trip = require('../models/Trip');

/**
 * Helper: verify trip access (owner or collaborator).
 */
const verifyTripAccess = async (req, res) => {
  const trip = await Trip.findById(req.params.tripId);
  if (!trip) {
    res.status(404).json({ message: 'Trip not found' });
    return null;
  }

  const isOwner = trip.user.toString() === req.user._id.toString();
  const isCollaborator = trip.collaborators.some(
    (c) => c.toString() === req.user._id.toString()
  );

  if (!isOwner && !isCollaborator) {
    res.status(403).json({ message: 'Not authorized to access this trip' });
    return null;
  }

  return trip;
};

// @desc    Get all bookings for a trip
// @route   GET /api/trips/:tripId/bookings
// @access  Private
exports.getBookings = async (req, res, next) => {
  try {
    const trip = await verifyTripAccess(req, res);
    if (!trip) return;

    const bookings = await Booking.find({ trip: req.params.tripId })
      .populate('user', 'name email avatar')
      .sort('startDateTime');

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a booking
// @route   POST /api/trips/:tripId/bookings
// @access  Private
exports.createBooking = async (req, res, next) => {
  try {
    const trip = await verifyTripAccess(req, res);
    if (!trip) return;

    const booking = await Booking.create({
      ...req.body,
      trip: req.params.tripId,
      user: req.user._id,
    });

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a booking
// @route   PUT /api/trips/:tripId/bookings/:bookingId
// @access  Private
exports.updateBooking = async (req, res, next) => {
  try {
    const trip = await verifyTripAccess(req, res);
    if (!trip) return;

    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.bookingId, trip: req.params.tripId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a booking
// @route   DELETE /api/trips/:tripId/bookings/:bookingId
// @access  Private
exports.deleteBooking = async (req, res, next) => {
  try {
    const trip = await verifyTripAccess(req, res);
    if (!trip) return;

    const booking = await Booking.findOneAndDelete({
      _id: req.params.bookingId,
      trip: req.params.tripId,
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted' });
  } catch (error) {
    next(error);
  }
};
