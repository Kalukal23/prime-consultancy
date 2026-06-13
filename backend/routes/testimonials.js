const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');

// @desc    Get all testimonials
// @route   GET /api/testimonials
router.get('/', async (req, res) => {
	try {
		const testimonials = await Testimonial.find().sort({ createdAt: -1 });
		res.json(testimonials);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// @desc    Create a testimonial
// @route   POST /api/testimonials
router.post('/', async (req, res) => {
	try {
		const testimonial = await Testimonial.create(req.body);
		res.status(201).json({ success: true, data: testimonial });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
