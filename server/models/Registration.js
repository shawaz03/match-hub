const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  participantInfo: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    emergencyContact: {
      name: String,
      phone: String,
    },
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  paymentInfo: {
    transactionId: String,
    amount: Number,
    paymentMethod: String,
    paidAt: Date,
  },
  status: {
    type: String,
    enum: ['registered', 'confirmed', 'cancelled', 'waitlist'],
    default: 'registered',
  },
  checkInStatus: {
    type: Boolean,
    default: false,
  },
  checkInTime: {
    type: Date,
    default: null,
  },
  notes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Compound index to prevent duplicate registrations
registrationSchema.index({ event: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
