// services/emailService.js
const nodemailer = require('nodemailer');

/**
 * Sends a reservation confirmation email via Gmail (free).
 * @param {Object} details
 */
async function sendReservationEmail(details) {
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
        console.warn('[Email] Gmail credentials not configured — skipping email.');
        return;
    }

    if (!details.email) {
        console.warn('[Email] No customer email provided — skipping.');
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmailUser,
            pass: gmailPass   // Gmail App Password (not your regular password)
        }
    });

    // Format date nicely e.g. "22 February 2026"
    const dateObj = new Date(details.date);
    const formattedDate = dateObj.toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    const seatingLabel = {
        indoor: 'Indoor Dining',
        outdoor: 'Terrace Garden',
        private: 'Private Suite'
    }[details.seating] || details.seating;

    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reservation Confirmed — Hanok Grill</title>
</head>
<body style="margin:0;padding:0;background:#0a0906;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0906;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#111009;border:1px solid rgba(238,189,43,0.2);border-radius:16px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td align="center" style="background:linear-gradient(135deg,#0a0906,#1a1408);padding:48px 40px 32px;border-bottom:1px solid rgba(238,189,43,0.15);">
              <p style="margin:0 0 8px;font-size:10px;letter-spacing:6px;color:#eebd2b;text-transform:uppercase;font-weight:700;">Seoul · Established 1826</p>
              <h1 style="margin:0;font-size:42px;font-weight:800;color:#eebd2b;letter-spacing:6px;text-transform:uppercase;">HANOK</h1>
              <p style="margin:4px 0 0;font-size:14px;letter-spacing:10px;color:rgba(238,189,43,0.5);text-transform:uppercase;">GRILL</p>
            </td>
          </tr>

          <!-- Confirmation Banner -->
          <tr>
            <td align="center" style="padding:32px 40px 24px;">
              <div style="display:inline-block;background:rgba(238,189,43,0.08);border:1px solid rgba(238,189,43,0.3);border-radius:50px;padding:10px 28px;">
                <p style="margin:0;font-size:11px;letter-spacing:4px;color:#eebd2b;text-transform:uppercase;font-weight:700;">✦ &nbsp;Reservation Confirmed&nbsp; ✦</p>
              </div>
              <h2 style="margin:20px 0 8px;font-size:28px;color:#ffffff;font-weight:700;">Your Table is Secured</h2>
              <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.5);line-height:1.6;">Hello <strong style="color:rgba(255,255,255,0.85);">${details.name}</strong>, we look forward to welcoming you.</p>
            </td>
          </tr>

          <!-- Booking Details Card -->
          <tr>
            <td style="padding:8px 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(238,189,43,0.04);border:1px solid rgba(238,189,43,0.12);border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:28px 32px;">
                    <p style="margin:0 0 20px;font-size:10px;letter-spacing:4px;color:#eebd2b;text-transform:uppercase;font-weight:700;">Booking Details</p>

                    ${row('📅', 'Date', formattedDate)}
                    ${row('⏰', 'Time Slot', details.slot)}
                    ${row('🪑', 'Table', details.tableNumber)}
                    ${row('👥', 'Guests', details.guests + ' Guest' + (details.guests > 1 ? 's' : ''))}
                    ${row('🏮', 'Seating Area', seatingLabel)}
                    ${row('📞', 'Contact', details.phone)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Info Note -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table width="100%" cellpadding="20" cellspacing="0" style="background:rgba(255,255,255,0.03);border-left:3px solid #eebd2b;border-radius:0 8px 8px 0;">
                <tr>
                  <td>
                    <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.6);line-height:1.7;">
                      Please <strong style="color:#eebd2b;">arrive 10 minutes early</strong> and show this email at the entrance.<br/>
                      Use code <strong style="color:#eebd2b;">HANOK20</strong> on your next order for 20% off!
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:28px 40px;border-top:1px solid rgba(255,255,255,0.05);">
              <p style="margin:0 0 6px;font-size:12px;color:rgba(255,255,255,0.4);">📍 Seoul Cyberpunk District, Block 7 &nbsp;|&nbsp; Open 18:00 – 04:00</p>
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.2);letter-spacing:2px;text-transform:uppercase;">&copy; 2026 Hanok Grill · All Rights Reserved</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    // Plain-text fallback
    const textBody =
        `Hanok Grill — Reservation Confirmed!

Hi ${details.name},

Your table is secured. Details:
  Date       : ${formattedDate}
  Time Slot  : ${details.slot}
  Table      : ${details.tableNumber}
  Guests     : ${details.guests}
  Area       : ${seatingLabel}

Please arrive 10 minutes early and show this email at the entrance.

📍 Seoul Cyberpunk District, Block 7 | Open 18:00 – 04:00
— Hanok Grill Team`;

    try {
        const info = await transporter.sendMail({
            from: `"Hanok Grill" <${gmailUser}>`,
            to: details.email,
            subject: `✦ Your Table is Confirmed — Hanok Grill (${formattedDate}, ${details.slot})`,
            text: textBody,
            html: htmlBody
        });
        console.log(`[Email] Sent to ${details.email} — Message ID: ${info.messageId}`);
    } catch (err) {
        console.error('[Email] Failed to send:', err.message);
    }
}

// Helper to render a detail row in the email
function row(icon, label, value) {
    return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
      <tr>
        <td width="28" style="font-size:16px;vertical-align:middle;">${icon}</td>
        <td style="font-size:11px;letter-spacing:2px;color:rgba(255,255,255,0.4);text-transform:uppercase;vertical-align:middle;width:110px;">${label}</td>
        <td style="font-size:14px;color:#ffffff;font-weight:600;vertical-align:middle;">${value}</td>
      </tr>
    </table>`;
}

module.exports = { sendReservationEmail };
