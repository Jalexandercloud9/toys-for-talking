// =====================================================
// TOYS FOR TALKING — Notifications & Tracking
// =====================================================
// EmailJS (customer confirmation): https://www.emailjs.com
// Zapier (Google Sheets booking log): webhook below
// =====================================================

// --- EmailJS — customer confirmation email ---
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';        // EmailJS > Account > General > Public Key
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';        // EmailJS > Email Services > Service ID
const TEMPLATE_CUSTOMER  = 'YOUR_CUSTOMER_TEMPLATE'; // EmailJS > Email Templates > Template ID

// --- Zapier — booking log to Google Sheets ---
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/26882497/up5tq8t/';

let _emailSent   = false;
let _zapierSent  = false;

// -----------------------------------------------
// Customer Confirmation Email (via EmailJS)
// -----------------------------------------------
function sendBookingEmails(state) {
  if (_emailSent) return;

  if (!EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    console.info('[TFT] EmailJS not configured — skipping customer email.');
    return;
  }

  const isCamp   = state.bookingType === 'camp';
  const guardian = state.guardian   || {};
  const children = state.children   || [];
  const camp     = state.selectedCamp;

  const childrenList = children.map((c, i) =>
    `Child ${i + 1}: ${c.firstName || '—'}, age ${c.age || '—'}`
  ).join('\n');

  const totalPaid = isCamp
    ? `$${(camp.price * children.length).toLocaleString()}`
    : `$${(149 * children.length).toLocaleString()}.00`;

  const customerParams = {
    to_email:        guardian.email || '',
    to_name:         guardian.firstName || 'there',
    confirmation_id: state.confirmationId || '',
    booking_type:    isCamp ? 'Camp Registration' : 'Speech & Language Evaluation',
    booking_details: isCamp
      ? `Camp: ${camp.name}\nDates: ${camp.dates}\nTime: ${camp.time}\nLocation: ${camp.location}`
      : 'Service: Speech & Language Evaluation\nArea: DFW (location confirmed by Jasmine)',
    children_list:   childrenList,
    total_paid:      totalPaid,
    next_steps: isCamp
      ? 'Jasmine will send a welcome packet and preparation guide within 2 business days.'
      : `Jasmine will call you at ${guardian.phone || 'the number you provided'} to confirm your meet-up spot and time in the DFW area. Please bring any notes about your child\'s speech and language history to the evaluation.`
  };

  emailjs.init(EMAILJS_PUBLIC_KEY);

  if (guardian.email) {
    emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_CUSTOMER, customerParams)
      .then(() => console.info('[TFT] Customer confirmation email sent.'))
      .catch(err => console.warn('[TFT] Customer email error:', err));
  }

  _emailSent = true;
}

// -----------------------------------------------
// Booking Log to Google Sheets (via Zapier)
// -----------------------------------------------
function logBookingToZapier(state) {
  if (_zapierSent) return;

  const isCamp   = state.bookingType === 'camp';
  const guardian = state.guardian   || {};
  const children = state.children   || [];
  const camp     = state.selectedCamp;

  const totalAmount = isCamp
    ? (camp.price * children.length)
    : (149 * children.length);

  // One readable line per child — eval gets full detail, camp gets name + age
  const childrenSummary = children.map((c, i) => {
    let line = `Child ${i + 1}: ${c.firstName || '—'}, age ${c.age || '—'}`;
    if (!isCamp) {
      line += ` | Language: ${c.language || 'english'}`;
      line += ` | Concerns: ${c.reason || '—'}`;
      line += ` | Prior therapy: ${c.priorTherapy || 'no'}`;
      if (c.notes) line += ` | Notes: ${c.notes}`;
    }
    return line;
  }).join('\n');

  const payload = {
    confirmation_id:  state.confirmationId || '',
    booking_date:     new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    booking_type:     isCamp ? 'Camp' : 'Evaluation',
    product:          isCamp ? (camp ? camp.name : '—') : 'Speech & Language Evaluation',
    camp_dates:       isCamp && camp ? camp.dates    : '',
    camp_time:        isCamp && camp ? camp.time     : '',
    camp_location:    isCamp && camp ? camp.location : '',
    guardian_name:    `${guardian.firstName || ''} ${guardian.lastName || ''}`.trim() || '—',
    guardian_email:   guardian.email || '—',
    guardian_phone:   guardian.phone || '—',
    num_children:     children.length,
    children_summary: childrenSummary,
    total_paid:       `$${totalAmount.toLocaleString()}.00`
  };

  fetch(ZAPIER_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(() => console.info('[TFT] Booking logged to Zapier.'))
    .catch(err => console.warn('[TFT] Zapier log error:', err));

  _zapierSent = true;
}

window.sendBookingEmails   = sendBookingEmails;
window.logBookingToZapier  = logBookingToZapier;
