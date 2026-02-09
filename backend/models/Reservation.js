
const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  guests: { type: Number, required: true },

  seating: { type: String, enum: ["indoor", "outdoor", "private"], required: true },

  reservationDate: { type: String, required: true },  // "2025-11-27" (YYYY-MM-DD)
  slot: { type: String, required: true },             // e.g. "19:00-20:00"

  table: { type: mongoose.Schema.Types.ObjectId, ref: "Table", required: true },

  status: {
    type: String,
    enum: ["booked", "seated", "completed", "cancelled"],
    default: "booked"
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Reservation", reservationSchema);
