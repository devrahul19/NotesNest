const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const cookieParser = require('cookie-parser');
const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://notes-nest-olive.vercel.app'];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Enable pre-flight requests
app.options('*', cors());

//Routes
const userRoutes = require('./routes/user.routes');
const notesRoutes = require('./routes/note.routes')
// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/user', userRoutes);
app.use('/notes', notesRoutes);

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
