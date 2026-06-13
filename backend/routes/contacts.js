const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @desc    Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Submit contact form
router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Message sent successfully! We will contact you soon.',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;