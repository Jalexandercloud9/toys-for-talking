// =====================================================
// TOYS FOR TALKING — Notifications & Tracking
// =====================================================
// EmailJS (customer confirmation): https://www.emailjs.com
// Zapier (Google Sheets booking log): webhook below
// =====================================================

// --- EmailJS — customer confirmation email ---
const EMAILJS_PUBLIC_KEY = 'muew2ffrIQXKrYByd';
const EMAILJS_SERVICE_ID = 'service_8c48a0k';
const TEMPLATE_CUSTOMER  = 'template_a0azha7';

// --- Zapier — booking log to Google Sheets ---
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/26882497/up5tq8t/';

// --- Zapier — parent resource signup log (separate Google Sheet) ---
const ZAPIER_RESOURCES_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/26882497/u7ksr13/';

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
    next_steps: isCamp && camp && camp.id.includes('virtual')
      ? 'Jasmine will reach out to gather your availability. Weekly live sessions will be scheduled at times that work best for the majority of families in your cohort. You will also receive access to the weekly instructional content prior to the start of the program.'
      : isCamp
      ? 'Jasmine will contact you shortly to confirm your child\'s assigned session time. Each Sunday includes two sessions, and your child will attend one session from 4:00–4:35 PM or 4:45–5:20 PM.'
      : `Jasmine will contact you shortly at ${guardian.phone || 'the number you provided'} to confirm the location and time for your child\'s evaluation in the DFW area. Please bring any notes or relevant information about your child\'s speech and language history to your appointment.`
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

  // One readable line per child — includes concerns for both camp and eval
  const childrenSummary = children.map((c, i) => {
    let line = `Child ${i + 1}: ${c.firstName || '—'}, age ${c.age || '—'}`;
    if (c.reason) line += ` | Concerns: ${c.reason}`;
    if (!isCamp) {
      line += ` | Language: ${c.language || 'english'}`;
      line += ` | Prior therapy: ${c.priorTherapy || '—'}`;
      if (c.notes) line += ` | Notes: ${c.notes}`;
    }
    return line;
  }).join('\n');

  const childConcerns = children.map((c, i) =>
    `Child ${i + 1} (${c.firstName || '—'}): ${c.reason || '—'}`
  ).join('\n');

  const childDiagnoses = children.map((c, i) =>
    `Child ${i + 1} (${c.firstName || '—'}): ${c.notes || '—'}`
  ).join('\n');

  const childLanguages = children.map((c, i) => {
    const lang = c.language === 'spanish' ? 'Spanish'
               : c.language === 'both'    ? 'English & Spanish'
               : 'English';
    return `Child ${i + 1} (${c.firstName || '—'}): ${lang}`;
  }).join('\n');

  const childPriorTherapy = children.map((c, i) => {
    const pt = c.priorTherapy === 'no'          ? 'No prior therapy'
             : c.priorTherapy === 'yes-current' ? 'Currently in therapy'
             : c.priorTherapy === 'yes-past'    ? 'Previously received therapy'
             : '—';
    return `Child ${i + 1} (${c.firstName || '—'}): ${pt}`;
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
    guardian_address: [guardian.address, guardian.city, guardian.state, guardian.zip].filter(Boolean).join(', ') || '—',
    num_children:     children.length,
    children_summary: childrenSummary,
    child_concerns:   childConcerns,
    child_languages:    childLanguages,
    child_prior_therapy: childPriorTherapy,
    child_diagnoses:    childDiagnoses,
    total_paid:       `$${totalAmount.toLocaleString()}.00`
  };

  fetch(ZAPIER_WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: new URLSearchParams(payload)
  })
    .then(() => console.info('[TFT] Booking logged to Zapier.'))
    .catch(err => console.warn('[TFT] Zapier log error:', err));

  _zapierSent = true;
}

// -----------------------------------------------
// Parent Resource Email (via EmailJS)
// -----------------------------------------------
// EmailJS template: template_resources
// Required template variables:
//   {{parent_name}}    — parent's name
//   {{parent_email}}   — parent's email (set as "To" field)
//   {{resources}}      — comma-separated list of selected resources
//   {{guide_url}}      — PDF download URL (empty string if not selected)
//   {{video_url}}      — YouTube video URL (empty string if not selected)
//   {{resource_links}} — formatted list of URLs (for plain-text fallback)
// -----------------------------------------------
function sendResourceEmail(name, email, wantsGuide, wantsCourse) {
  if (!EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    console.info('[TFT] EmailJS not configured — skipping resource email.');
    return;
  }

  const GUIDE_FULL_URL          = 'https://toysfortalkingslp.com/assets/docs/talking-steps-guide.pdf';
  const SPEECH_BOOST_VIDEO_URL  = 'https://www.youtube.com/watch?v=SfW9xy4Fal8';

  const resourceList = [
    wantsGuide  ? 'Talking Steps Guide (PDF)'        : null,
    wantsCourse ? 'FREE 5-Minute Speech Boost Course' : null,
  ].filter(Boolean).join(', ');

  const resourceLinks = [
    wantsGuide  ? 'Talking Steps Guide (PDF): '        + GUIDE_FULL_URL         : null,
    wantsCourse ? 'FREE 5-Minute Speech Boost Session: ' + SPEECH_BOOST_VIDEO_URL : null,
  ].filter(Boolean).join('\n\n');

  emailjs.init(EMAILJS_PUBLIC_KEY);

  emailjs.send(EMAILJS_SERVICE_ID, 'template_resources', {
    parent_name:    name,
    parent_email:   email,
    resources:      resourceList,
    resource_links: resourceLinks,
    guide_url:      wantsGuide  ? GUIDE_FULL_URL         : '',
    video_url:      wantsCourse ? SPEECH_BOOST_VIDEO_URL : '',
    reply_to:       email,
  })
    .then(() => console.info('[TFT] Resource email sent.'))
    .catch(err => console.warn('[TFT] Resource email error:', err));
}

// -----------------------------------------------
// Resource Signup Log to Google Sheets (via Zapier)
// -----------------------------------------------
// Uses the same Zapier webhook as bookings.
// In Zapier, filter by "type = parent_resource_signup"
// to route these rows to a separate Google Sheet tab.
// -----------------------------------------------
function logResourceSignupToZapier(name, email, resources) {
  if (!ZAPIER_RESOURCES_WEBHOOK_URL) return;

  const payload = {
    type:      'parent_resource_signup',
    date:      new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    time:      new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    name,
    email,
    resources,
  };

  fetch(ZAPIER_RESOURCES_WEBHOOK_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  })
    .then(() => console.info('[TFT] Resource signup logged to Zapier.'))
    .catch(err => console.warn('[TFT] Zapier resource log error:', err));
}

window.sendBookingEmails          = sendBookingEmails;
window.logBookingToZapier         = logBookingToZapier;
window.sendResourceEmail          = sendResourceEmail;
window.logResourceSignupToZapier  = logResourceSignupToZapier;
