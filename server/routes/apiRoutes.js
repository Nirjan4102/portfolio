const express = require('express');
const rateLimit = require('express-rate-limit');

const { getAllProjects } = require('../controllers/projectController');
const { getAllSkills } = require('../controllers/skillController');
const { getProfile } = require('../controllers/profileController');
const { submitContact } = require('../controllers/contactController');
const { contactValidation } = require('../middleware/validator');

const router = express.Router();

// Rate limiter for contact endpoint (5 requests per 15 min window)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Profile route
router.get('/profile', getProfile);

// Project routes
router.get('/projects', getAllProjects);

// Skill routes
router.get('/skills', getAllSkills);

// Contact routes (rate-limited + validated)
router.post('/contact', contactLimiter, contactValidation, submitContact);

module.exports = router;
