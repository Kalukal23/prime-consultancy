const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// @desc    Get all appointments
const { protect } = require('../middleware/auth');

// @desc    Get all appointments
// @route   GET /api/appointments
router.get('/', protect, async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create new appointment
// @route   POST /api/appointments
router.post('/', async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json({
      success: true,
      data: appointment,
      message: 'Appointment request sent successfully!',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    res.json({ success: true, data: appointment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
router.delete('/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Appointment deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;