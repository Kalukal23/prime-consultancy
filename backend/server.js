const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const appointments = require('./routes/appointments');
const contacts = require('./routes/contacts');
const services = require('./routes/services');
const testimonials = require('./routes/testimonials');

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Mount routes
app.use('/api/appointments', appointments);
app.use('/api/contacts', contacts);
app.use('/api/services', services);
app.use('/api/testimonials', testimonials);

// Basic route
app.get('/api/health', (req, res) => {
  res.json({ message: 'API is running', status: 'OK' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});