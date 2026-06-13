const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Initial services data to seed
const defaultServices = [
  { title: 'Corporate & Business Strategy', description: 'Helping organizations define vision, mission, strategic objectives, and actionable growth plans.', icon: 'chart-line', order: 1 },
  { title: 'Growth & Business Transformation', description: 'Designing strategies that accelerate business growth and improve performance.', icon: 'rocket', order: 2 },
  { title: 'Organizational Design & Development', description: 'Creating efficient organizational structures and governance frameworks.', icon: 'building', order: 3 },
  { title: 'Project Feasibility Studies', description: 'Comprehensive market, financial, technical, and operational feasibility assessments.', icon: 'chart-pie', order: 4 },
  { title: 'Training & Capacity Building', description: 'Professional training focused on leadership and project management.', icon: 'chalkboard-user', order: 5 },
  { title: 'Research & Advisory Services', description: 'Data-driven studies, market research, and strategic recommendations.', icon: 'microphone-alt', order: 6 },
];

// @desc    Get all services
router.get('/', async (req, res) => {
  try {
    let services = await Service.find().sort({ order: 1 });
    if (services.length === 0) {
      services = await Service.insertMany(defaultServices);
    }
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;