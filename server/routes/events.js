const express = require('express');
const router = express.Router();
const { auth, isOrganizerOrAdmin } = require('../middleware/auth');
const { createEventLimiter } = require('../middleware/rateLimiter');
const eventController = require('../controllers/eventController');

// Public routes
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);

// Protected routes (require authentication)
router.post('/', auth, isOrganizerOrAdmin, createEventLimiter, eventController.createEvent);
router.put('/:id', auth, isOrganizerOrAdmin, eventController.updateEvent);
router.delete('/:id', auth, isOrganizerOrAdmin, eventController.deleteEvent);
router.get('/organizer/my-events', auth, isOrganizerOrAdmin, eventController.getOrganizerEvents);

module.exports = router;
