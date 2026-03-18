// =====================================================
// TOYS FOR TALKING — EmailJS Integration
// =====================================================
// Free setup at: https://www.emailjs.com
//
// After creating your EmailJS account, replace the
// four placeholder values below with your real IDs.
// =====================================================

const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';        // EmailJS > Account > General > Public Key
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';        // EmailJS > Email Services > (your service) > Service ID
const TEMPLATE_CUSTOMER  = 'YOUR_CUSTOMER_TEMPLATE'; // EmailJS > Email Templates > template_customer_confirm > Template ID
const TEMPLATE_NOTIFY    = 'YOUR_NOTIFY_TEMPLATE';   // EmailJS > Email Templates > template_jasmine_notify > Template ID

let _emailSent = false; // Prevents duplicate emails if page re-renders in same session

function sendBookingEmails(state) {
  if (_emailSent) return;

  // Skip silently if EmailJS hasn't been configured yet
  if (!EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    console.info('[TFT] EmailJS not configured — skipping email send.');
    return;
  }

  const isCamp   = state.bookingType === 'camp';
  const guardian = state.guardian   || {};
  const children = state.children   || [];
  const camp     = state.selectedCamp;

  // --- Shared content builders ---
  const childrenList = children.map((c, i) =>
    `Child ${i + 1}: ${c.firstName || '—'}, age ${c.age || '—'}`
  ).join('\n');

  const totalPaid = isCamp
    ? `$${(camp.price * children.length).toLocaleString()}`
    : `$${(149 * children.length).toLocaleString()}.00`;

  // -----------------------------------------------
  // 1. Customer Confirmation Email
  // -----------------------------------------------
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

  // -----------------------------------------------
  // 2. Jasmine's Booking Notification Email
  // -----------------------------------------------
  const evalDetails = !isCamp
    ? children.map((c, i) =>
        `Child ${i + 1}: ${c.firstName || '—'}, age ${c.age || '—'}\n` +
        `  Language: ${c.language || 'english'}\n` +
        `  Concerns: ${c.reason || '—'}\n` +
        `  Prior therapy: ${c.priorTherapy || '—'}\n` +
        `  Notes: ${c.notes || '—'}`
      ).join('\n\n')
    : `Camp: ${camp ? camp.name : '—'}\nDates: ${camp ? camp.dates : '—'}\nTime: ${camp ? camp.time : '—'}`;

  const notifyParams = {
    booking_type:    isCamp ? `Camp — ${camp ? camp.name : ''}` : 'Speech Evaluation',
    guardian_name:   `${guardian.firstName || ''} ${guardian.lastName || ''}`.trim() || '—',
    guardian_email:  guardian.email || '—',
    guardian_phone:  guardian.phone || '—',
    children_list:   childrenList,
    booking_details: evalDetails,
    total_paid:      totalPaid,
    confirmation_id: state.confirmationId || '—'
  };

  // --- Fire emails via EmailJS ---
  emailjs.init(EMAILJS_PUBLIC_KEY);

  // Send customer confirmation (only if we have their email)
  if (guardian.email) {
    emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_CUSTOMER, customerParams)
      .then(() => console.info('[TFT] Customer confirmation email sent.'))
      .catch(err => console.warn('[TFT] Customer email error:', err));
  }

  // Always send Jasmine's notification
  emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_NOTIFY, notifyParams)
    .then(() => console.info('[TFT] Jasmine notification email sent.'))
    .catch(err => console.warn('[TFT] Notify email error:', err));

  _emailSent = true;
}

window.sendBookingEmails = sendBookingEmails;
