const Trip = require('../models/Trip');
const ItineraryDay = require('../models/Itinerary');
const Booking = require('../models/Booking');

// @desc    Create a trip
// @route   POST /api/trips
// @access  Private
exports.createTrip = async (req, res, next) => {
  try {
    const trip = await Trip.create({ ...req.body, user: req.user._id });
    res.status(201).json(trip);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all trips for the logged-in user (owned or shared)
// @route   GET /api/trips
// @access  Private
exports.getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({
      $or: [{ user: req.user._id }, { collaborators: req.user._id }],
    })
      .populate('user', 'name email avatar')
      .sort('-createdAt');

    res.json(trips);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single trip
// @route   GET /api/trips/:id
// @access  Private (owner, collaborator, or public trip)
exports.getTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate('user', 'name email avatar')
      .populate('collaborators', 'name email avatar');

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Check access: owner, collaborator, or public
    const isOwner = trip.user._id.toString() === req.user._id.toString();
    const isCollaborator = trip.collaborators.some(
      (c) => c._id.toString() === req.user._id.toString()
    );

    if (!isOwner && !isCollaborator && !trip.isPublic) {
      return res.status(403).json({ message: 'Not authorized to view this trip' });
    }

    res.json(trip);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a trip
// @route   PUT /api/trips/:id
// @access  Private (owner only)
exports.updateTrip = async (req, res, next) => {
  try {
    let trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    if (trip.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this trip' });
    }

    trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(trip);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a trip and cascade-delete itinerary days and bookings
// @route   DELETE /api/trips/:id
// @access  Private (owner only)
exports.deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    if (trip.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this trip' });
    }

    // Cascade delete related data
    await ItineraryDay.deleteMany({ trip: trip._id });
    await Booking.deleteMany({ trip: trip._id });
    await Trip.findByIdAndDelete(trip._id);

    res.json({ message: 'Trip and related data deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a stop to a trip
// @route   POST /api/trips/:id/stops
// @access  Private (owner only)
exports.addStop = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    if (trip.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    trip.stops.push(req.body);
    await trip.save();

    res.status(201).json(trip);
  } catch (error) {
    next(error);
  }
};

// @desc    Remove a stop from a trip
// @route   DELETE /api/trips/:id/stops/:stopId
// @access  Private (owner only)
exports.removeStop = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    if (trip.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    trip.stops = trip.stops.filter(
      (s) => s._id.toString() !== req.params.stopId
    );
    await trip.save();

    res.json(trip);
  } catch (error) {
    next(error);
  }
};
