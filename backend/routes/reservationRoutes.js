// routes/reservationRoutes.js
const express = require("express");
const Table = require("../models/Table");
const Reservation = require("../models/Reservation");

const router = express.Router();

// ✅ 1. Seed tables (ONE-TIME helper route – remove after use)
router.post("/seed-tables", async (req, res) => {
  try {
    const tables = [
      { name: "T1", capacity: 2, area: "indoor" },
      { name: "T2", capacity: 4, area: "indoor" },
      { name: "T3", capacity: 4, area: "outdoor" },
      { name: "T4", capacity: 6, area: "private" }
    ];

    await Table.deleteMany({});
    const created = await Table.insertMany(tables);
    res.json({ message: "Tables seeded", tables: created });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 2. Get AVAILABLE tables for a date + slot + guests + seating
router.get("/availability", async (req, res) => {
  try {
    const { date, slot, guests, seating } = req.query;

    if (!date || !slot || !guests) {
      return res.status(400).json({ message: "date, slot, guests are required" });
    }

    // Find all reservations for that date + slot which are active
    const reservedTableIds = await Reservation.find({
      reservationDate: date,
      slot,
      status: { $in: ["booked", "seated"] }
    }).distinct("table");

    // Find tables that are NOT reserved, and match seating & capacity
    const query = {
      _id: { $nin: reservedTableIds },
      capacity: { $gte: Number(guests) }
    };
    if (seating) {
      query.area = seating;
    }

    const availableTables = await Table.find(query);

    res.json({ availableTables });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 3. Create a reservation
router.post("/", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      guests,
      seating,
      reservationDate,
      slot,
      tableId
    } = req.body;

    if (!name || !phone || !guests || !reservationDate || !slot || !tableId || !seating) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Double-check table is still free
    const existing = await Reservation.findOne({
      reservationDate,
      slot,
      table: tableId,
      status: { $in: ["booked", "seated"] }
    });

    if (existing) {
      return res.status(400).json({ message: "Table already booked for that slot" });
    }

    const reservation = await Reservation.create({
      name,
      phone,
      email,
      guests,
      seating,
      reservationDate,
      slot,
      table: tableId
    });

    res.status(201).json({ message: "Reservation created", reservation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 4. Admin – see all reservations for a date
router.get("/admin/list", async (req, res) => {
  try {
    const { date } = req.query;

    const filter = date ? { reservationDate: date } : {};
    const reservations = await Reservation.find(filter).populate("table");

    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 5. Admin – update reservation status (booked → seated → completed/cancelled)
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const valid = ["booked", "seated", "completed", "cancelled"];
    if (!valid.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ message: "Status updated", reservation: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
