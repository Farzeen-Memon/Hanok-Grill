const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Create a new order
router.post("/", async (req, res) => {
    try {
        const {
            customerName,
            customerEmail,
            customerPhone,
            items,
            totalAmount,
            paymentId,
            deliveryType,
            specialInstructions
        } = req.body;

        if (!customerName || !customerPhone || !items || items.length === 0 || !totalAmount) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const order = await Order.create({
            customerName,
            customerEmail,
            customerPhone,
            items,
            totalAmount,
            paymentId,
            paymentStatus: paymentId ? "completed" : "pending",
            deliveryType: deliveryType || "dine-in",
            specialInstructions
        });

        res.status(201).json({
            message: "Order created successfully",
            order,
            orderId: order._id
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all orders (admin)
router.get("/admin/list", async (req, res) => {
    try {
        const { status, date } = req.query;

        const filter = {};
        if (status) filter.orderStatus = status;
        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);
            filter.createdAt = { $gte: startDate, $lt: endDate };
        }

        const orders = await Order.find(filter).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get order by ID
router.get("/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update order status (admin)
router.patch("/:id/status", async (req, res) => {
    try {
        const { orderStatus } = req.body;

        const validStatuses = ["received", "preparing", "ready", "delivered", "cancelled"];
        if (!validStatuses.includes(orderStatus)) {
            return res.status(400).json({ message: "Invalid order status" });
        }

        const updated = await Order.findByIdAndUpdate(
            req.params.id,
            { orderStatus },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order status updated", order: updated });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update payment status
router.patch("/:id/payment", async (req, res) => {
    try {
        const { paymentStatus, paymentId } = req.body;

        const validStatuses = ["pending", "completed", "failed"];
        if (!validStatuses.includes(paymentStatus)) {
            return res.status(400).json({ message: "Invalid payment status" });
        }

        const updateData = { paymentStatus };
        if (paymentId) updateData.paymentId = paymentId;

        const updated = await Order.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Payment status updated", order: updated });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
