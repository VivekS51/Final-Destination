const ItineraryDay = require('../models/Itinerary');
const Trip = require('../models/Trip');

/**
 * Helper: verify trip access (owner or collaborator).
 * Returns the trip document or sends a 403/404 response.
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

// @desc    Get all itinerary days for a trip
// @route   GET /api/trips/:tripId/itinerary
// @access  Private
exports.getItinerary = async (req, res, next) => {
  try {
    const trip = await verifyTripAccess(req, res);
    if (!trip) return;

    const days = await ItineraryDay.find({ trip: req.params.tripId }).sort('dayNumber');
    res.json(days);
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update an itinerary day
// @route   POST /api/trips/:tripId/itinerary
// @access  Private
exports.createItineraryDay = async (req, res, next) => {
  try {
    const trip = await verifyTripAccess(req, res);
    if (!trip) return;

    const day = await ItineraryDay.create({
      ...req.body,
      trip: req.params.tripId,
    });
    res.status(201).json(day);
  } catch (error) {
    next(error);
  }
};

// @desc    Update an itinerary day
// @route   PUT /api/trips/:tripId/itinerary/:dayId
// @access  Private
exports.updateItineraryDay = async (req, res, next) => {
  try {
    const trip = await verifyTripAccess(req, res);
    if (!trip) return;

    const day = await ItineraryDay.findOneAndUpdate(
      { _id: req.params.dayId, trip: req.params.tripId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!day) {
      return res.status(404).json({ message: 'Itinerary day not found' });
    }

    res.json(day);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an itinerary day
// @route   DELETE /api/trips/:tripId/itinerary/:dayId
// @access  Private
exports.deleteItineraryDay = async (req, res, next) => {
  try {
    const trip = await verifyTripAccess(req, res);
    if (!trip) return;

    const day = await ItineraryDay.findOneAndDelete({
      _id: req.params.dayId,
      trip: req.params.tripId,
    });

    if (!day) {
      return res.status(404).json({ message: 'Itinerary day not found' });
    }

    res.json({ message: 'Itinerary day deleted' });
  } catch (error) {
    next(error);
  }
};
