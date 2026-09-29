const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'data', 'db.json');

// Initial seed data
const initialData = {
  movies: [
    {
      id: 1,
      title: "The Batman",
      rating: "8.3",
      poster: "b.jpg",
      genre: "Action, Crime, Drama",
      duration: "2h 56m",
      synopsis: "Batman ventures into Gotham’s underworld when a sadistic killer leaves behind a trail of cryptic clues.",
      ticketPrice: 200,
      showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"]
    },
    {
      id: 2,
      title: "Doctor Strange",
      rating: "7.5",
      poster: "d.jpg",
      genre: "Action, Adventure, Fantasy",
      duration: "2h 06m",
      synopsis: "A former neurosurgeon embarks on a journey of healing and discovers the mystical arts.",
      ticketPrice: 180,
      showtimes: ["11:00 AM", "2:00 PM", "5:00 PM", "8:00 PM"]
    },
    {
      id: 3,
      title: "Spider-Man",
      rating: "8.1",
      poster: "ss.jpg",
      genre: "Action, Sci-Fi",
      duration: "2h 28m",
      synopsis: "Peter Parker balances his life as a high school student and a superhero fighting crime.",
      ticketPrice: 190,
      showtimes: ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"]
    },
    {
      id: 4,
      title: "Avatar: The Way of Water",
      rating: "7.8",
      poster: "a.jpeg",
      genre: "Sci-Fi, Action, Adventure",
      duration: "3h 12m",
      synopsis: "Jake Sully and Neytiri lead their family to explore new regions of Pandora.",
      ticketPrice: 250,
      showtimes: ["10:30 AM", "1:30 PM", "4:30 PM", "7:30 PM"]
    },
    {
      id: 5,
      title: "Top Gun: Maverick",
      rating: "8.4",
      poster: "m.jpg",
      genre: "Action, Drama",
      duration: "2h 10m",
      synopsis: "Captain Pete Mitchell returns to train a group of elite fighter pilots.",
      ticketPrice: 210,
      showtimes: ["11:30 AM", "2:30 PM", "5:30 PM", "8:30 PM"]
    }
  ],
  bookedSeats: {
    "1_10:00 AM": ["A3", "B5", "C7"],
    "2_11:00 AM": ["B2", "B3"],
    "3_9:00 AM": ["C4", "C5", "D1"]
  },
  bookings: []
};

// Ensure data folder and file exist
function initDB() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf8');
  }
}

function readDB() {
  initDB();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading DB file:", err);
    return initialData;
  }
}

function writeDB(data) {
  initDB();
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error("Error writing DB file:", err);
  }
}

module.exports = {
  getMovies: () => {
    const db = readDB();
    return db.movies;
  },

  getMovieById: (id) => {
    const db = readDB();
    return db.movies.find(m => m.id === Number(id)) || null;
  },

  getBookedSeats: (movieId, showtime) => {
    const db = readDB();
    const key = `${movieId}_${showtime}`;
    return db.bookedSeats[key] || [];
  },

  createBooking: ({ movieId, showtime, seats, customerName, customerEmail }) => {
    const db = readDB();
    const movie = db.movies.find(m => m.id === Number(movieId));
    if (!movie) {
      throw new Error("Movie not found");
    }

    const key = `${movieId}_${showtime}`;
    const currentlyBooked = db.bookedSeats[key] || [];

    // Check if any seat is already booked
    const overlap = seats.filter(s => currentlyBooked.includes(s));
    if (overlap.length > 0) {
      throw new Error(`Seats already booked: ${overlap.join(', ')}`);
    }

    // Reserve seats
    db.bookedSeats[key] = [...currentlyBooked, ...seats];

    // Generate unique booking reference ID
    const bookingId = 'BMS-' + Math.floor(100000 + Math.random() * 900000);
    const totalAmount = seats.length * movie.ticketPrice;
    const createdAt = new Date().toISOString();

    const newBooking = {
      bookingId,
      movieId: Number(movieId),
      movieTitle: movie.title,
      poster: movie.poster,
      showtime,
      seats,
      seatPrice: movie.ticketPrice,
      totalAmount,
      customerName: customerName || "Guest User",
      customerEmail: customerEmail || "guest@example.com",
      createdAt
    };

    db.bookings.push(newBooking);
    writeDB(db);

    return newBooking;
  },

  getBookingById: (bookingId) => {
    const db = readDB();
    return db.bookings.find(b => b.bookingId === bookingId) || null;
  }
};
