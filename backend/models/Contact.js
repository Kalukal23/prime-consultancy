const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  companyName: String,
  email: {
    type: String,
    required: true,
  },
  phone: String,
  service: String,
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'replied'],
    default: 'pending'
  },
  replyMessage: String,
  repliedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Contact', ContactSchema);