const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI is not set in .env');
  process.exit(1);
}

mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Connection error:', err.message || err);
    process.exit(1);
  });
