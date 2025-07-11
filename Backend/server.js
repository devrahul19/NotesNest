const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const cookieParser = require('cookie-parser');
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

//Routes
const userRoutes = require('./routes/user.routes');
const notesRoutes = require('./routes/note.routes');
const likeRoutes = require('./routes/likes.routes');
// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/user', userRoutes);
app.use('/notes', notesRoutes);
app.use("/likes", likeRoutes);

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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
