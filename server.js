const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(__dirname));

// --- REST API ENDPOINTS ---

// 1. Get all movies
app.get('/api/movies', (req, res) => {
  try {
    const movies = db.getMovies();
    res.json({ success: true, movies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Get movie details by ID
app.get('/api/movies/:id', (req, res) => {
  try {
    const movie = db.getMovieById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    res.json({ success: true, movie });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Get booked seats for a movie & showtime
app.get('/api/seats', (req, res) => {
  try {
    const { movieId, showtime } = req.query;
    if (!movieId || !showtime) {
      return res.status(400).json({ success: false, message: 'movieId and showtime are required query parameters' });
    }
    const bookedSeats = db.getBookedSeats(movieId, showtime);
    res.json({ success: true, bookedSeats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. Create a new booking
app.post('/api/bookings', (req, res) => {
  try {
    const { movieId, showtime, seats, customerName, customerEmail } = req.body;
    if (!movieId || !showtime || !seats || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid booking data. movieId, showtime, and seats are required.' });
    }

    const booking = db.createBooking({ movieId, showtime, seats, customerName, customerEmail });
    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// 5. Get booking details by Booking ID
app.get('/api/bookings/:id', (req, res) => {
  try {
    const booking = db.getBookingById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Fallback for SPA routing if needed
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`=============================================`);
  console.log(` BookMyShow App running on http://localhost:${PORT}`);
  console.log(` REST API Base: http://localhost:${PORT}/api`);
  console.log(`=============================================`);
});
