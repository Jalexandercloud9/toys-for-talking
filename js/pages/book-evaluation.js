// Book an Evaluation — 3-step form
let evalStep = 1;
const TOTAL_EVAL_STEPS = 3;

function renderBookEvaluation() {
  return `
    <div class="page-header">
      <h1>📋 Book a Speech Evaluation</h1>
      <p>Understand exactly where your child is in their speech development — and what to do next.</p>
    </div>
    <div class="booking-container" id="eval-booking-root">
      ${renderEvalStep(evalStep)}
    </div>
  `;
}

function renderEvalStep(step) {
  const stepLabels = ['Your Info', 'Child & Concerns', 'Pick a Time'];
  return `
    ${renderStepIndicator(step, TOTAL_EVAL_STEPS, stepLabels)}
    <div id="eval-step-content">
      ${step === 1 ? renderGuardianForm('eval') : ''}
      ${step === 2 ? renderEvalChildForm() : ''}
      ${step === 3 ? renderSchedulePicker() : ''}
    </div>
  `;
}

function renderEvalChildForm() {
  const child = (window.AppState.children && window.AppState.children[0]) || {};
  const evalReason = window.AppState.evalReason || '';

  return `
    <div class="card">
      <h3 style="margin-bottom:0.25rem;">About Your Child</h3>
      <p style="font-size:0.875rem;margin-bottom:1.5rem;">
        This information helps Jasmine prepare a personalized evaluation tailored to your child's needs.
      </p>

      <div class="form-row">
        <div class="form-group">
          <label>Child's First Name <span class="required">*</span></label>
          <input class="form-control" id="eval-child-name" type="text"
            placeholder="First name" value="${child.firstName || ''}">
        </div>
        <div class="form-group">
          <label>Child's Age <span class="required">*</span></label>
          <input class="form-control" id="eval-child-age" type="number"
            placeholder="e.g. 4" min="1" max="18" value="${child.age || ''}">
        </div>
      </div>

      <div class="form-group">
        <label>What are your primary concerns about your child's speech or language? <span class="required">*</span></label>
        <textarea class="form-control" id="eval-child-reason" rows="4"
          placeholder="Describe any observations you've noticed — e.g. limited vocabulary, unclear speech, difficulty following directions, stuttering, late talker, etc.">${child.reason || ''}</textarea>
      </div>

      <div class="form-group">
        <label>Has your child received speech therapy before?</label>
        <select class="form-control" id="eval-prior-therapy">
          <option value="">Select…</option>
          <option value="no" ${evalReason.priorTherapy === 'no' ? 'selected' : ''}>No, this is our first evaluation</option>
          <option value="yes-current" ${evalReason.priorTherapy === 'yes-current' ? 'selected' : ''}>Yes, currently receiving therapy</option>
          <option value="yes-past" ${evalReason.priorTherapy === 'yes-past' ? 'selected' : ''}>Yes, previously received therapy</option>
        </select>
      </div>

      <div class="form-group">
        <label>Is there anything else you'd like Jasmine to know before the evaluation?</label>
        <textarea class="form-control" id="eval-notes" rows="3"
          placeholder="Any diagnoses, medical history, school observations, or other context that may be helpful…">${typeof evalReason === 'object' ? (evalReason.notes || '') : ''}</textarea>
      </div>

      <div id="eval-child-error" class="alert alert-error" style="display:none;"></div>

      <div style="display:flex;justify-content:space-between;margin-top:1.5rem;">
        <button class="btn btn-ghost" onclick="evalGoBack()">← Back</button>
        <button class="btn btn-blue" onclick="saveEvalChild()">Next: Schedule →</button>
      </div>
    </div>
  `;
}

function renderSchedulePicker() {
  const slots = window.EVALUATION_SLOTS;
  const dates = Object.keys(slots).sort().slice(0, 14);
  const selectedDate = window.AppState.selectedDate;
  const selectedTime = window.AppState.selectedTime;

  const availableTimes = selectedDate && slots[selectedDate]
    ? slots[selectedDate]
    : null;

  return `
    <div class="card">
      <h3 style="margin-bottom:0.25rem;">Choose a Date & Time</h3>
      <p style="font-size:0.875rem;margin-bottom:1.5rem;">
        Evaluations are approximately 60–90 minutes. All times are in your local time zone.
      </p>

      <div class="form-group">
        <label>Select a Date</label>
        <div class="date-picker">
          ${dates.map(dateStr => {
            const d = new Date(dateStr + 'T00:00:00');
            const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
            const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            return `
              <div class="date-btn ${selectedDate === dateStr ? 'selected' : ''}"
                   onclick="selectEvalDate('${dateStr}')">
                <span class="day-name">${dayNames[d.getDay()]}</span>
                <span class="day-num">${d.getDate()}</span>
                <span class="month">${monthNames[d.getMonth()]}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      ${selectedDate ? `
        <div class="form-group">
          <label>Available Times for ${formatDisplayDate(selectedDate)}</label>
          <div class="slot-grid">
            ${availableTimes.map(slot => `
              <div class="time-slot ${!slot.available ? 'unavailable' : selectedTime === slot.time ? 'selected' : ''}"
                   onclick="${slot.available ? `selectEvalTime('${slot.time}')` : ''}">
                ${slot.time}
                ${!slot.available ? '<br><span style="font-size:0.7rem;">Booked</span>' : ''}
              </div>
            `).join('')}
          </div>
        </div>
      ` : `
        <div class="alert alert-info">📅 Please select a date above to see available times.</div>
      `}

      <div class="divider"></div>

      <div class="alert alert-info" style="font-size:0.85rem;">
        🎉 <strong>Your first evaluation is complimentary!</strong> No payment required until after
        Jasmine meets with your child and recommends next steps.
      </div>

      <div id="schedule-error" class="alert alert-error" style="display:none;margin-top:0.5rem;"></div>

      <div style="display:flex;justify-content:space-between;margin-top:1.5rem;">
        <button class="btn btn-ghost" onclick="evalGoBack()">← Back</button>
        <button class="btn btn-blue" onclick="proceedFromEval()">Review & Confirm →</button>
      </div>
    </div>
  `;
}

/* ===== EVAL FORM ACTIONS ===== */

function saveEvalChild() {
  const name   = document.getElementById('eval-child-name')?.value.trim();
  const age    = document.getElementById('eval-child-age')?.value;
  const reason = document.getElementById('eval-child-reason')?.value.trim();
  const prior  = document.getElementById('eval-prior-therapy')?.value;
  const notes  = document.getElementById('eval-notes')?.value.trim();

  const errorEl = document.getElementById('eval-child-error');
  if (!name || !age || !reason) {
    errorEl.style.display = 'flex';
    errorEl.textContent = '⚠️ Please fill in your child\'s name, age, and primary concerns.';
    return;
  }
  errorEl.style.display = 'none';

  window.AppState.children = [{ firstName: name, age, reason }];
  window.AppState.evalReason = { notes, priorTherapy: prior };

  evalStep = 3;
  refreshEvalRoot();
}

function selectEvalDate(dateStr) {
  window.AppState.selectedDate = dateStr;
  window.AppState.selectedTime = null;
  document.getElementById('eval-step-content').innerHTML = renderSchedulePicker();
}

function selectEvalTime(time) {
  window.AppState.selectedTime = time;
  document.getElementById('eval-step-content').innerHTML = renderSchedulePicker();
}

function evalGoBack() {
  if (evalStep > 1) {
    evalStep--;
    refreshEvalRoot();
  }
}

function refreshEvalRoot() {
  document.getElementById('eval-booking-root').innerHTML = renderEvalStep(evalStep);
}

function proceedFromEval() {
  const errorEl = document.getElementById('schedule-error');
  if (!window.AppState.selectedDate || !window.AppState.selectedTime) {
    errorEl.style.display = 'flex';
    errorEl.textContent = '⚠️ Please select a date and time for your evaluation.';
    return;
  }
  errorEl.style.display = 'none';
  window.AppState.bookingType = 'evaluation';
  window.location.hash = '#/payment';
}

function formatDisplayDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}
