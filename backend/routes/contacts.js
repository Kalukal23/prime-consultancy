const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

const nodemailer = require('nodemailer');
const { protect } = require('../middleware/auth');

// @desc    Get all contacts
router.get('/', protect, async (req, res) => {
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

// @desc    Reply to a contact message
router.post('/:id/reply', protect, async (req, res) => {
  try {
    const { replyMessage } = req.body;
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    if (!replyMessage) {
      return res.status(400).json({ message: 'Please provide a reply message' });
    }

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@primeconsultancy.com',
      to: contact.email,
      subject: `Reply to your inquiry at Prime Consultancy`,
      text: replyMessage,
      html: `
        <h3>Hello ${contact.fullName},</h3>
        <p>Thank you for reaching out to Prime Consultancy.</p>
        <p><strong>Your message:</strong> <em>${contact.message}</em></p>
        <p><strong>Our reply:</strong></p>
        <p>${replyMessage.replace(/\n/g, '<br/>')}</p>
        <br/>
        <p>Best regards,<br/>Prime Consultancy Team</p>
      `
    };

    // Attempt to send email
    try {
      if(process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await transporter.sendMail(mailOptions);
      } else {
        console.log('Skipping real email send. Missing EMAIL_USER and EMAIL_PASS in .env');
        console.log('Mock email content:', mailOptions);
      }
    } catch (err) {
      console.error('Email send failed:', err);
      return res.status(500).json({ message: 'Error sending email: ' + err.message });
    }

    // Update contact status
    contact.status = 'replied';
    contact.replyMessage = replyMessage;
    contact.repliedAt = Date.now();
    await contact.save();

    res.json({ success: true, data: contact, message: 'Reply sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;