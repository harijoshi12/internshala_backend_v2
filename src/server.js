// src/server.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const seedOpportunities = require('./utils/seedOpportunity.util');


const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/internship-portal';

// Connect to MongoDB
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    seedOpportunities(); // Seed opportunities on startup
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
