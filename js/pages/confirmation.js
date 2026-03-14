function renderConfirmation() {
  const state = window.AppState;
  const isCamp = state.bookingType === 'camp';
  const isEval = state.bookingType === 'evaluation';

  if (!state.paymentConfirmed && !state.confirmationId) {
    return `
      <div class="booking-container">
        <div class="alert alert-error">
          No confirmed booking found. Please complete the booking process first.
        </div>
        <div class="text-center mt-3">
          <a href="#/" class="btn btn-blue">Return Home</a>
        </div>
      </div>
    `;
  }

  const camp = state.selectedCamp;
  const children = state.children || [];
  const guardian = state.guardian || {};

  // Build event details for calendar
  let eventTitle, eventDescription, eventStartDate, eventEndDate, eventLocation;

  if (isCamp && camp) {
    eventTitle = `Toys for Talking: ${camp.name}`;
    eventDescription = `${camp.name} camp registration for ${children.map(c => c.firstName).join(', ')}.\\n\\nLocation: ${camp.location}\\nTime: ${camp.time}\\n\\nQuestions? Contact info@toysfortalking.com or (555) 555-5555`;
    eventStartDate = camp.startDate;
    eventEndDate = camp.endDate;
    eventLocation = camp.location + ', Speech Therapy Center';
  } else {
    eventTitle = `Toys for Talking: Speech Evaluation — ${children[0]?.firstName || 'Your Child'}`;
    eventDescription = `Speech & Language Evaluation with Jasmine Alexander, SLP.\\n\\nArrival: Please arrive 5 minutes early.\\nDuration: 60–90 minutes\\n\\nQuestions? Contact info@toysfortalking.com or (555) 555-5555`;
    eventStartDate = state.selectedDate;
    eventLocation = 'Toys for Talking Center';

    // Set end time (90 minutes after start)
    if (state.selectedDate && state.selectedTime) {
      const [timePart, ampm] = state.selectedTime.split(' ');
      let [hours, minutes] = timePart.split(':').map(Number);
      if (ampm === 'PM' && hours !== 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
      const start = new Date(state.selectedDate + 'T00:00:00');
      start.setHours(hours, minutes, 0, 0);
      const end = new Date(start.getTime() + 90 * 60 * 1000);
      eventStartDate = formatIcsDate(start);
      eventEndDate = formatIcsDate(end);
    }
  }

  return `
    <div class="confirmation-center">
      <div class="check-circle"><i class="bi bi-check2"></i></div>

      <h1 style="color:var(--success);font-size:1.75rem;margin-bottom:0.5rem;">
        You're All Set!
      </h1>
      <p style="font-size:1.05rem;margin-bottom:0.25rem;">
        ${isCamp
          ? `Your child${children.length > 1 ? 'ren are' : ' is'} registered for camp!`
          : 'Your evaluation has been booked!'}
      </p>
      <p class="text-muted text-sm" style="margin-bottom:0.5rem;">
        Confirmation #: <strong style="color:var(--primary);">${state.confirmationId}</strong>
      </p>
      <p class="text-muted text-sm">
        A confirmation email has been sent to <strong>${guardian.email || 'your email'}</strong>
      </p>

      <!-- Summary -->
      <div class="confirmation-summary">
        ${isCamp && camp ? `
          <div class="summary-row">
            <span class="summary-label">Camp</span>
            <span class="summary-value">${camp.name}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Dates</span>
            <span class="summary-value">${camp.dates}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Time</span>
            <span class="summary-value">${camp.time}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Location</span>
            <span class="summary-value">${camp.location}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Child${children.length > 1 ? 'ren' : ''}</span>
            <span class="summary-value">${children.map(c => `${c.firstName} (age ${c.age})`).join(', ')}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Guardian</span>
            <span class="summary-value">${guardian.firstName} ${guardian.lastName}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Total Paid</span>
            <span class="summary-value" style="font-weight:700;color:var(--primary);">
              $${(camp.price * children.length).toLocaleString()}
            </span>
          </div>
        ` : `
          <div class="summary-row">
            <span class="summary-label">Service</span>
            <span class="summary-value">Speech &amp; Language Evaluation</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Date</span>
            <span class="summary-value">${state.selectedDate ? formatDisplayDate(state.selectedDate) : '—'}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Time</span>
            <span class="summary-value">${state.selectedTime || '—'}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Child</span>
            <span class="summary-value">${children[0]?.firstName || '—'} (age ${children[0]?.age || '—'})</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Guardian</span>
            <span class="summary-value">${guardian.firstName} ${guardian.lastName}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Amount Due</span>
            <span class="summary-value" style="font-weight:700;color:var(--success);">$0.00 — Complimentary</span>
          </div>
        `}
      </div>

      <!-- Calendar Buttons -->
      <h3 style="margin-top:2rem;margin-bottom:0.5rem;"><i class="bi bi-calendar3"></i> Add to Your Calendar</h3>
      <p class="text-muted text-sm" style="margin-bottom:1rem;">Don't miss it — add this event to your calendar now.</p>

      <div class="calendar-buttons">
        <a class="cal-btn google" href="${buildGoogleCalendarUrl(eventTitle, eventDescription, eventStartDate, eventEndDate, eventLocation, isCamp)}" target="_blank" rel="noopener">
          <span class="cal-icon">
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M34 10H14C11.8 10 10 11.8 10 14V34C10 36.2 11.8 38 14 38H34C36.2 38 38 36.2 38 34V14C38 11.8 36.2 10 34 10Z" fill="#4285F4"/>
              <path d="M24 34C21.8 34 20 32.2 20 30V24H16L24 14L32 24H28V30C28 32.2 26.2 34 24 34Z" fill="white"/>
            </svg>
          </span>
          Add to Google Calendar
        </a>

        <button class="cal-btn apple" onclick="downloadIcs(${JSON.stringify(eventTitle).replace(/'/g,"\'")}, ${JSON.stringify(eventDescription).replace(/'/g,"\'")}, '${typeof eventStartDate === 'string' && eventStartDate.includes('T') ? eventStartDate : eventStartDate}', '${typeof eventEndDate === 'string' ? eventEndDate : eventStartDate}', '${eventLocation}', ${isCamp})">
          <span class="cal-icon"><i class="bi bi-apple"></i></span>
          Add to Apple Calendar (iCal)
        </button>

        <button class="cal-btn outlook" onclick="downloadIcs(${JSON.stringify(eventTitle).replace(/'/g,"\'")}, ${JSON.stringify(eventDescription).replace(/'/g,"\'")}, '${typeof eventStartDate === 'string' && eventStartDate.includes('T') ? eventStartDate : eventStartDate}', '${typeof eventEndDate === 'string' ? eventEndDate : eventStartDate}', '${eventLocation}', ${isCamp})">
          <span class="cal-icon"><i class="bi bi-envelope"></i></span>
          Add to Outlook Calendar
        </button>
      </div>

      <div class="divider"></div>

      <div class="alert alert-info" style="text-align:left;margin-bottom:1.5rem;">
        <div>
          <strong>What happens next?</strong><br>
          ${isCamp
            ? 'Jasmine will send a welcome packet and preparation guide within 2 business days. Feel free to reach out with any questions!'
            : 'Jasmine will confirm your appointment within 1 business day. Please bring any prior evaluations or school reports if available.'}
        </div>
      </div>

      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
        <a href="#/" class="btn btn-blue" onclick="resetBooking()">Return to Home</a>
        <a href="${isCamp ? '#/book-camp' : '#/book-evaluation'}" class="btn btn-ghost" onclick="resetBooking()">Book Another</a>
      </div>
    </div>
  `;
}

/* ===== CALENDAR HELPERS ===== */

function buildGoogleCalendarUrl(title, description, startDate, endDate, location, isMultiDay) {
  let startStr, endStr;

  if (isMultiDay) {
    // All-day event format: YYYYMMDD
    startStr = startDate.replace(/-/g, '');
    const endD = new Date(endDate + 'T00:00:00');
    endD.setDate(endD.getDate() + 1); // Google uses exclusive end date
    endStr = endD.toISOString().split('T')[0].replace(/-/g, '');
  } else if (startDate && startDate.includes('T')) {
    // DateTime event
    startStr = startDate.replace(/[-:]/g, '').replace('.000', '');
    const endD = new Date(endDate);
    endStr = endD.toISOString().replace(/[-:]/g, '').replace('.000', '');
  } else {
    startStr = (startDate || '').replace(/-/g, '');
    endStr = startStr;
  }

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: description.replace(/\\n/g, '\n'),
    location: location,
    dates: `${startStr}/${endStr}`
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function formatIcsDate(date) {
  return date.toISOString().replace(/[-:]/g, '').replace('.000', '');
}

function downloadIcs(title, description, startDate, endDate, location, isMultiDay) {
  let dtStart, dtEnd;

  if (isMultiDay) {
    dtStart = `DTSTART;VALUE=DATE:${startDate.replace(/-/g, '')}`;
    const endD = new Date(endDate + 'T00:00:00');
    endD.setDate(endD.getDate() + 1);
    dtEnd = `DTEND;VALUE=DATE:${endD.toISOString().split('T')[0].replace(/-/g, '')}`;
  } else if (startDate && startDate.includes('T')) {
    const cleanStart = startDate.replace(/[-:.]/g, '').replace('000Z', 'Z').substring(0, 15) + 'Z';
    const cleanEnd = endDate.replace(/[-:.]/g, '').replace('000Z', 'Z').substring(0, 15) + 'Z';
    dtStart = `DTSTART:${cleanStart}`;
    dtEnd = `DTEND:${cleanEnd}`;
  } else {
    dtStart = `DTSTART;VALUE=DATE:${(startDate || '').replace(/-/g, '')}`;
    dtEnd = `DTEND;VALUE=DATE:${(startDate || '').replace(/-/g, '')}`;
  }

  const uid = `${Date.now()}@toysfortalking.com`;
  const now = new Date().toISOString().replace(/[-:.]/g, '').substring(0, 15) + 'Z';
  const cleanDesc = (description || '').replace(/\\n/g, '\\n');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Toys for Talking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    dtStart,
    dtEnd,
    `SUMMARY:${title}`,
    `DESCRIPTION:${cleanDesc}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'toys-for-talking-booking.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function resetBooking() {
  campStep = 1;
  evalStep = 1;
  window.AppState = {
    bookingType: null,
    guardian: {},
    children: [],
    selectedCamp: null,
    selectedDate: null,
    selectedTime: null,
    evalReason: '',
    paymentConfirmed: false,
    confirmationId: null
  };
}
