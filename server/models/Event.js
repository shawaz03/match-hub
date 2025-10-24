const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  sport: {
    type: String,
    required: true,
    enum: ['basketball', 'football', 'soccer', 'tennis', 'baseball', 'volleyball', 'cricket', 'other'],
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    venue: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
  },
  availableSlots: {
    type: Number,
    required: true,
  },
  registrationFee: {
    type: Number,
    required: true,
    min: 0,
  },
  registrationDeadline: {
    type: Date,
    required: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming',
  },
  image: {
    type: String,
    default: null,
  },
  rules: {
    type: String,
    default: '',
  },
  contactEmail: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Index for searching events
eventSchema.index({ title: 'text', description: 'text', sport: 'text' });
eventSchema.index({ date: 1 });
eventSchema.index({ sport: 1 });

module.exports = mongoose.model('Event', eventSchema);
