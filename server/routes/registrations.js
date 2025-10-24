const express = require('express');
const router = express.Router();
const { auth, isOrganizerOrAdmin } = require('../middleware/auth');
const registrationController = require('../controllers/registrationController');

// Protected routes (all require authentication)
router.post('/', auth, registrationController.createRegistration);
router.get('/my-registrations', auth, registrationController.getUserRegistrations);
router.get('/:id', auth, registrationController.getRegistrationById);
router.put('/:id/cancel', auth, registrationController.cancelRegistration);

// Organizer/Admin routes
router.get('/event/:eventId', auth, isOrganizerOrAdmin, registrationController.getEventRegistrations);
router.put('/:id', auth, isOrganizerOrAdmin, registrationController.updateRegistration);

module.exports = router;
