const { body } = require('express-validator');

exports.contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2–100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required')
    .isLength({ min: 2, max: 200 }).withMessage('Subject must be 2–200 characters'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 5000 }).withMessage('Message must be 10–5000 characters'),
];
