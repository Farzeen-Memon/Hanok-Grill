const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String },
  customerPhone: { type: String, required: true },
  
  items: [{
    dishId: { type: Number, required: true },
    dishName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  
  totalAmount: { type: Number, required: true },
  
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending"
  },
  
  paymentId: { type: String },  // Razorpay payment ID
  
  orderStatus: {
    type: String,
    enum: ["received", "preparing", "ready", "delivered", "cancelled"],
    default: "received"
  },
  
  deliveryType: {
    type: String,
    enum: ["dine-in", "takeaway", "delivery"],
    default: "dine-in"
  },
  
  specialInstructions: { type: String },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
