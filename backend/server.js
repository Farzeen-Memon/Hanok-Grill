const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // MUST come BEFORE mongoose

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const reservationRoutes = require("./routes/reservationRoutes");
const orderRoutes = require("./routes/orderRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err.message));

app.get("/", (req, res) => {
  res.send("Hanok Backend Running!");
});

// API routes
app.use("/api/reservations", reservationRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/recommendations", recommendationRoutes);

app.listen(process.env.PORT || 4000, () =>
  console.log("Server running on port", process.env.PORT || 4000)
);
