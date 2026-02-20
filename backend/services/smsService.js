// services/smsService.js
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER; // e.g. "+19876543210"

/**
 * Sends an SMS confirmation to the customer after a successful table booking.
 * @param {Object} details - Reservation details
 * @param {string} details.name
 * @param {string} details.phone        - Customer phone number (must include country code, e.g. "+919876543210")
 * @param {string} details.tableNumber  - e.g. "T2"
 * @param {string} details.slot         - e.g. "19:30 - 21:00"
 * @param {string} details.date         - e.g. "2026-02-22"
 * @param {number} details.guests
 * @param {string} details.seating      - e.g. "indoor"
 */
async function sendReservationSMS(details) {
    // Guard: skip silently if Twilio credentials are not configured
    if (!accountSid || !authToken || !fromNumber) {
        console.warn('[SMS] Twilio credentials not configured — skipping SMS.');
        return;
    }

    const client = twilio(accountSid, authToken);

    // Format date nicely  e.g. "22 Feb 2026"
    const dateObj = new Date(details.date);
    const formattedDate = dateObj.toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric'
    });

    const seatingLabel = {
        indoor: 'Indoor Dining',
        outdoor: 'Terrace Garden',
        private: 'Private Suite'
    }[details.seating] || details.seating;

    const message =
        `🍽️ Hanok Grill — Reservation Confirmed!

Hi ${details.name},

Your table has been secured. Here are your details:

📅 Date    : ${formattedDate}
⏰ Time    : ${details.slot}
🪑 Table   : ${details.tableNumber}
👥 Guests  : ${details.guests}
🏮 Area    : ${seatingLabel}

Please arrive 10 minutes early. Show this SMS at the entrance.

📍 Seoul Cyberpunk District, Block 7
📞 For queries: +91-XXXX-XXXXXX

— Hanok Grill Team`;

    // Ensure the phone number has a leading + (add India code if bare 10-digit)
    let toNumber = details.phone.trim();
    if (/^\d{10}$/.test(toNumber)) {
        toNumber = '+91' + toNumber;
    } else if (!toNumber.startsWith('+')) {
        toNumber = '+' + toNumber;
    }

    try {
        const result = await client.messages.create({
            body: message,
            from: fromNumber,
            to: toNumber
        });
        console.log(`[SMS] Sent to ${toNumber} — SID: ${result.sid}`);
    } catch (err) {
        // Log but don't fail the reservation — SMS is a best-effort notification
        console.error('[SMS] Failed to send:', err.message);
    }
}

module.exports = { sendReservationSMS };
