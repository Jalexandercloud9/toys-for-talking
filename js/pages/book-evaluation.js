// Book an Evaluation — 2-step form
// No calendar scheduling — Jasmine contacts the family after registration
let evalStep = 1;
const TOTAL_EVAL_STEPS = 2;

function renderBookEvaluation() {
  return `
    <div class="page-header">
      <h1>Book a Speech Evaluation</h1>
      <p>Professional speech &amp; language evaluations for children under 18 — available in English and Spanish. DFW area only.</p>
    </div>
    <div class="booking-container" id="eval-booking-root">
      ${renderEvalStep(evalStep)}
    </div>
  `;
}

function renderEvalStep(step) {
  const stepLabels = ['Your Info', 'Child &amp; Concerns'];
  return `
    ${renderStepIndicator(step, TOTAL_EVAL_STEPS, stepLabels)}
    <div id="eval-step-content">
      ${step === 1 ? renderGuardianForm('eval') : ''}
      ${step === 2 ? renderEvalChildForm() : ''}
    </div>
  `;
}

function renderEvalChildForm() {
  const child = (window.AppState.children && window.AppState.children[0]) || {};
  const evalReason = window.AppState.evalReason || {};

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
            placeholder="e.g. 4" min="0" max="17" value="${child.age || ''}">
        </div>
      </div>

      <div class="form-group">
        <label>Preferred language for the evaluation</label>
        <select class="form-control" id="eval-language">
          <option value="english" ${(typeof evalReason === 'object' && evalReason.language === 'english') ? 'selected' : ''}>English</option>
          <option value="spanish" ${(typeof evalReason === 'object' && evalReason.language === 'spanish') ? 'selected' : ''}>Spanish</option>
          <option value="both" ${(typeof evalReason === 'object' && evalReason.language === 'both') ? 'selected' : ''}>Both English &amp; Spanish</option>
        </select>
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
          <option value="no" ${(typeof evalReason === 'object' && evalReason.priorTherapy === 'no') ? 'selected' : ''}>No, this is our first evaluation</option>
          <option value="yes-current" ${(typeof evalReason === 'object' && evalReason.priorTherapy === 'yes-current') ? 'selected' : ''}>Yes, currently receiving therapy</option>
          <option value="yes-past" ${(typeof evalReason === 'object' && evalReason.priorTherapy === 'yes-past') ? 'selected' : ''}>Yes, previously received therapy</option>
        </select>
      </div>

      <div class="form-group">
        <label>Is there anything else you'd like Jasmine to know before the evaluation?</label>
        <textarea class="form-control" id="eval-notes" rows="3"
          placeholder="Any diagnoses, medical history, school observations, or other context that may be helpful…">${(typeof evalReason === 'object' ? (evalReason.notes || '') : '')}</textarea>
      </div>

      <div class="alert alert-info" style="font-size:0.875rem;">
        <i class="bi bi-telephone"></i>
        <span>After you register, Jasmine will call you at <strong>${window.AppState.guardian && window.AppState.guardian.phone ? window.AppState.guardian.phone : 'the number you provided'}</strong> to confirm your meet-up spot and time in the DFW area.</span>
      </div>

      <div id="eval-child-error" class="alert alert-error" style="display:none;"></div>

      <div style="display:flex;justify-content:space-between;margin-top:1.5rem;">
        <button class="btn btn-ghost" onclick="evalGoBack()">
          <i class="bi bi-arrow-left"></i> Back
        </button>
        <button class="btn btn-blue" onclick="saveEvalChild()">
          Review &amp; Pay <i class="bi bi-arrow-right"></i>
        </button>
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
  const lang   = document.getElementById('eval-language')?.value;

  const errorEl = document.getElementById('eval-child-error');
  if (!name || !age || !reason) {
    errorEl.style.display = 'flex';
    errorEl.textContent = "Please fill in your child's name, age, and primary concerns.";
    return;
  }
  errorEl.style.display = 'none';

  window.AppState.children = [{ firstName: name, age, reason }];
  window.AppState.evalReason = { notes, priorTherapy: prior, language: lang };
  window.AppState.bookingType = 'evaluation';
  window.location.hash = '#/payment';
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
