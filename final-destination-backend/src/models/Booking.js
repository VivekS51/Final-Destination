const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['flight', 'hotel', 'car', 'train', 'activity', 'other'],
      required: [true, 'Booking type is required'],
    },
    provider: {
      type: String,
      trim: true,
    },
    confirmationNumber: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Booking title is required'],
      trim: true,
    },
    startDateTime: {
      type: Date,
      required: [true, 'Start date/time is required'],
    },
    endDateTime: {
      type: Date,
    },
    location: {
      type: String,
      trim: true,
    },
    cost: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    attachmentUrl: {
      type: String, // Cloudinary URL
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

// Index for fetching bookings by trip, sorted by date
bookingSchema.index({ trip: 1, startDateTime: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
