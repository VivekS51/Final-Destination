const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
  arrivalDate: { type: Date },
  departureDate: { type: Date },
  notes: { type: String },
  order: { type: Number, default: 0 },
});

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Trip title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    coverImage: {
      type: String, // Cloudinary URL
    },
    stops: [stopSchema],
    budget: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['planning', 'confirmed', 'ongoing', 'completed', 'cancelled'],
      default: 'planning',
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

// Index for fast owner/collaborator lookups
tripSchema.index({ user: 1 });
tripSchema.index({ collaborators: 1 });

module.exports = mongoose.model('Trip', tripSchema);
