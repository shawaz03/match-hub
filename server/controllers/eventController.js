const Event = require('../models/Event');
const Registration = require('../models/Registration');

// Get all events with filtering and pagination
exports.getEvents = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sport,
      status,
      search,
      sortBy = 'date',
      sortOrder = 'asc',
    } = req.query;

    const query = {};

    // Apply filters
    if (sport) query.sport = sport;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const events = await Event.find(query)
      .populate('organizer', 'name email')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Event.countDocuments(query);

    res.json({
      events,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer', 'name email phone');

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Get registration count
    const registrationCount = await Registration.countDocuments({ 
      event: event._id, 
      status: { $ne: 'cancelled' } 
    });

    res.json({
      ...event.toObject(),
      registrationCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new event
exports.createEvent = async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      organizer: req.user._id,
      availableSlots: req.body.capacity,
    };

    const event = new Event(eventData);
    await event.save();

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if user is the organizer or admin
    if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this event' });
    }

    // Update fields
    Object.keys(req.body).forEach(key => {
      if (key !== 'organizer') { // Don't allow changing organizer
        event[key] = req.body[key];
      }
    });

    await event.save();
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if user is the organizer or admin
    if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this event' });
    }

    await event.deleteOne();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get events by organizer
exports.getOrganizerEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user._id })
      .sort({ date: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
