const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  time: { type: String }, // e.g. "09:00"
  location: { type: String },
  category: {
    type: String,
    enum: ['sightseeing', 'food', 'transport', 'accommodation', 'activity', 'other'],
    default: 'other',
  },
  cost: { type: Number, default: 0 },
  notes: { type: String },
  completed: { type: Boolean, default: false },
});

const itineraryDaySchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    dayNumber: {
      type: Number,
      required: [true, 'Day number is required'],
    },
    activities: [activitySchema],
  },
  { timestamps: true }
);

// Unique compound index: one entry per trip + dayNumber
itineraryDaySchema.index({ trip: 1, dayNumber: 1 }, { unique: true });

module.exports = mongoose.model('ItineraryDay', itineraryDaySchema);
