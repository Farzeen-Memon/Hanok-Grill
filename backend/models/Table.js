// models/Table.js
const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  name: { type: String, required: true },         // e.g. "T1", "T2"
  capacity: { type: Number, required: true },     // e.g. 2, 4, 6
  area: { type: String, enum: ["indoor", "outdoor", "private"], required: true }
});

module.exports = mongoose.model("Table", tableSchema);
