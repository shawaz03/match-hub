const Registration = require('../models/Registration');
const Event = require('../models/Event');

// Create new registration
exports.createRegistration = async (req, res) => {
  try {
    const { eventId, participantInfo, paymentInfo } = req.body;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if event is still accepting registrations
    if (new Date() > event.registrationDeadline) {
      return res.status(400).json({ error: 'Registration deadline has passed' });
    }

    // Check if slots are available
    if (event.availableSlots <= 0) {
      return res.status(400).json({ error: 'No available slots for this event' });
    }

    // Check if user is already registered
    const existingRegistration = await Registration.findOne({
      event: eventId,
      user: req.user._id,
    });

    if (existingRegistration) {
      return res.status(400).json({ error: 'You are already registered for this event' });
    }

    // Create registration
    const registration = new Registration({
      event: eventId,
      user: req.user._id,
      participantInfo,
      paymentInfo,
      paymentStatus: paymentInfo ? 'completed' : 'pending',
    });

    await registration.save();

    // Update available slots
    event.availableSlots -= 1;
    await event.save();

    // Populate event and user details
    await registration.populate('event');
    await registration.populate('user', 'name email');

    res.status(201).json(registration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user's registrations
exports.getUserRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user._id })
      .populate('event')
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single registration
exports.getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate('event')
      .populate('user', 'name email phone');

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    // Check if user has access to this registration
    if (registration.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to view this registration' });
    }

    res.json(registration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel registration
exports.cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    // Check if user has access to cancel this registration
    if (registration.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to cancel this registration' });
    }

    // Update registration status
    registration.status = 'cancelled';
    await registration.save();

    // Update available slots
    const event = await Event.findById(registration.event);
    if (event) {
      event.availableSlots += 1;
      await event.save();
    }

    res.json({ message: 'Registration cancelled successfully', registration });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get registrations for an event (organizer/admin only)
exports.getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Check if event exists and user is authorized
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to view registrations for this event' });
    }

    const registrations = await Registration.find({ event: eventId })
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update registration (for check-in, status updates)
exports.updateRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    // Check authorization
    const event = await Event.findById(registration.event);
    if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this registration' });
    }

    // Update allowed fields
    const allowedUpdates = ['status', 'checkInStatus', 'checkInTime', 'notes', 'paymentStatus'];
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        registration[key] = req.body[key];
      }
    });

    await registration.save();
    res.json(registration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
