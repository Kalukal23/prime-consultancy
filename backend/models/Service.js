const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: String,
  order: Number,
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Service', ServiceSchema);