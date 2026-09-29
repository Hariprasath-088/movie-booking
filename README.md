# 🎬 BookMyShow - Full-Stack Movie Ticket Booking Web App

A modern, responsive full-stack movie booking web application built with **Node.js, Express, and Vanilla JavaScript**. Includes interactive movie listings, detailed showtimes, dynamic seat selection, e-ticket generation, REST API persistence, and Docker support.

---

## 🌟 Key Features

- 🍿 **Now Showing Movies**: Browse movies with ratings, genre, and duration.
- 🕒 **Showtime Selection**: View movie synopsis, price, and select available showtimes.
- 💺 **Interactive Seat Matrix**: Real-time seat grid (A1–E8) locking booked seats dynamically.
- 🎟️ **Instant E-Ticket**: Generates printable confirmation ticket with a unique booking reference code (`BMS-XXXXXX`) & barcode badge.
- ⚡ **REST API Backend**: Express server handling movie catalog, seat availability, and booking persistence.
- 🐳 **Docker Support**: Containerized setup for zero-installation execution using Docker Compose.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Custom Dark Cinema Palette & Glassmorphism), JavaScript (Fetch API)
- **Backend**: Node.js, Express.js, CORS
- **Database**: File-backed JSON store (`data/db.json`)
- **Containerization**: Docker, Docker Compose

---

## 🚀 Quick Start Guide

### Option 1: Run with Node.js

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm start
   ```

3. **Open browser**:
   👉 `http://localhost:3000`

---

### Option 2: Run with Docker (Recommended for instant setup)

1. **Build and start container**:
   ```bash
   docker compose up --build
   ```

2. **Open browser**:
   👉 `http://localhost:3000`

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/movies` | Fetch all now-showing movies |
| `GET` | `/api/movies/:id` | Get movie details & showtimes |
| `GET` | `/api/seats?movieId=1&showtime=10:00%20AM` | Fetch booked seats for a showtime |
| `POST` | `/api/bookings` | Create a new seat booking |
| `GET` | `/api/bookings/:id` | Fetch booking confirmation details |

---

## 📁 Repository Structure

```
book-my-show-main/
├── data/
│   └── db.json          # Persistent JSON Database
├── index.html           # Movie Catalog Grid
├── movie.html           # Movie Detail & Showtime Picker
├── seats.html           # Seat Selection & Checkout
├── confirmation.html    # E-Ticket Confirmation View
├── style.css            # Dark Cinema Design Token System
├── server.js            # Express Backend API Server
├── db.js                # Database Access Layer
├── Dockerfile           # Docker Container Definition
├── docker-compose.yml   # Docker Compose Orchestration
└── package.json         # Dependencies & Scripts
```
