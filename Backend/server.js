const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Basic middleware
app.use(express.json());

// Database connection with better error handling
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) =>   console.error('MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
