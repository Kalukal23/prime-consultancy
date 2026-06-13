const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please add full name'],
  },
  email: {
    type: String,
    required: [true, 'Please add email'],
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Please add phone number'],
  },
  company: {
    type: String,
  },
  service: {
    type: String,
    required: [true, 'Please select a service'],
  },
  preferredDate: {
    type: Date,
    required: [true, 'Please select preferred date'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);