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
  const stepLabels = ['Your Info', 'Children &amp; Concerns'];
  return `
    ${renderStepIndicator(step, TOTAL_EVAL_STEPS, stepLabels)}
    <div id="eval-step-content">
      ${step === 1 ? renderGuardianForm('eval') : ''}
      ${step === 2 ? renderEvalChildrenForm() : ''}
    </div>
  `;
}

function renderEvalChildrenForm() {
  const children = window.AppState.children.length > 0
    ? window.AppState.children
    : [{ firstName: '', age: '', language: 'english', reason: '', twoWords: '', priorTherapy: '', notes: '' }];
  if (window.AppState.children.length === 0) window.AppState.children = children;

  const phone = window.AppState.guardian && window.AppState.guardian.phone
    ? window.AppState.guardian.phone
    : 'the number you provided';

  return `
    <div>
      <div id="eval-children-list">
        ${children.map((c, i) => renderEvalChildBlock(c, i)).join('')}
      </div>

      <button class="btn btn-ghost" style="width:100%;justify-content:center;margin-top:0.5rem;"
        onclick="addEvalChild()">
        <i class="bi bi-plus-circle"></i> Add Another Child
      </button>

      <div class="alert alert-info" style="font-size:0.875rem;margin-top:1.25rem;">
        <i class="bi bi-telephone"></i>
        <span>After you register, Jasmine will give you a call at <strong>${phone}</strong> to confirm the details for your child's evaluation in the DFW area.</span>
      </div>

      <div id="eval-child-error" class="alert alert-error" style="display:none;margin-top:1rem;"></div>

      <div style="display:flex;justify-content:space-between;margin-top:1.5rem;">
        <button class="btn btn-ghost" onclick="evalGoBack()">
          <i class="bi bi-arrow-left"></i> Back
        </button>
        <button id="eval-children-next-btn" class="btn btn-blue" onclick="saveEvalChildren()" disabled>
          Review &amp; Pay <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  `;
}

function renderEvalChildBlock(child, index) {
  return `
    <div class="child-block" id="eval-child-block-${index}">
      <div class="child-block-header">
        <div class="child-block-title">Child ${index + 1}</div>
        ${index > 0 ? `<button class="btn-remove-child" onclick="removeEvalChild(${index})"><i class="bi bi-x-lg"></i> Remove</button>` : ''}
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Child's First Name <span class="required">*</span></label>
          <input class="form-control" id="eval-child-${index}-name" type="text"
            placeholder="First name" value="${child.firstName || ''}" oninput="validateEvalChildrenForm()">
        </div>
        <div class="form-group">
          <label>Child's Age <span class="required">*</span></label>
          <input class="form-control" id="eval-child-${index}-age" type="text"
            inputmode="numeric" pattern="[0-9]*"
            placeholder="e.g. 4" value="${child.age || ''}"
            oninput="this.value=this.value.replace(/[^0-9]/g,'');validateEvalChildrenForm();"
            onkeypress="return /[0-9]/.test(event.key)">
          <div class="field-error" id="eval-child-${index}-age-error" style="display:none;color:var(--error);font-size:0.8rem;margin-top:0.25rem;"></div>
        </div>
      </div>

      <div class="form-group">
        <label>Preferred language for the evaluation</label>
        <select class="form-control" id="eval-child-${index}-language">
          <option value="english" ${(!child.language || child.language === 'english') ? 'selected' : ''}>English</option>
          <option value="spanish" ${child.language === 'spanish' ? 'selected' : ''}>Spanish</option>
          <option value="both" ${child.language === 'both' ? 'selected' : ''}>Both English &amp; Spanish</option>
        </select>
      </div>

      <div class="form-group">
        <label>How many words does your child use consistently? <span class="required">*</span></label>
        <input class="form-control" id="eval-child-${index}-reason" type="text"
          inputmode="numeric" pattern="[0-9]*"
          placeholder="e.g. 10"
          value="${child.reason || ''}"
          oninput="this.value=this.value.replace(/[^0-9]/g,'');validateEvalChildrenForm();"
          onkeypress="return /[0-9]/.test(event.key)">
      </div>

      <div class="form-group">
        <label>Does your child put 2–3 words together, such as "want cookie" or "I want that"?</label>
        <select class="form-control" id="eval-child-${index}-two-words">
          <option value="">Select…</option>
          <option value="yes" ${child.twoWords === 'yes' ? 'selected' : ''}>Yes</option>
          <option value="no" ${child.twoWords === 'no' ? 'selected' : ''}>No</option>
          <option value="sometimes" ${child.twoWords === 'sometimes' ? 'selected' : ''}>Sometimes</option>
        </select>
      </div>

      <div class="form-group">
        <label>Has this child received speech therapy before?</label>
        <select class="form-control" id="eval-child-${index}-prior">
          <option value="">Select…</option>
          <option value="no" ${child.priorTherapy === 'no' ? 'selected' : ''}>No, this is our first evaluation</option>
          <option value="yes-current" ${child.priorTherapy === 'yes-current' ? 'selected' : ''}>Yes, currently receiving therapy</option>
          <option value="yes-past" ${child.priorTherapy === 'yes-past' ? 'selected' : ''}>Yes, previously received therapy</option>
        </select>
      </div>

      <div class="form-group">
        <label>Is there anything else you'd like Jasmine to know?</label>
        <textarea class="form-control" id="eval-child-${index}-notes" rows="3"
          placeholder="Any diagnoses, medical history, school observations, or other context…">${child.notes || ''}</textarea>
      </div>
    </div>
  `;
}

/* ===== EVAL FORM ACTIONS ===== */

function validateEvalChildrenForm() {
  const blocks = document.querySelectorAll('#eval-children-list .child-block');
  let ok = blocks.length > 0;
  blocks.forEach((_, i) => {
    if (!document.getElementById(`eval-child-${i}-name`)?.value.trim() ||
        !document.getElementById(`eval-child-${i}-age`)?.value ||
        !document.getElementById(`eval-child-${i}-reason`)?.value.trim()) ok = false;
  });
  const btn = document.getElementById('eval-children-next-btn');
  if (btn) btn.disabled = !ok;
}

function saveCurrentEvalChildren() {
  window.AppState.children = window.AppState.children.map((_, i) => ({
    firstName:    document.getElementById(`eval-child-${i}-name`)?.value.trim() || '',
    age:          document.getElementById(`eval-child-${i}-age`)?.value || '',
    language:     document.getElementById(`eval-child-${i}-language`)?.value || 'english',
    reason:       document.getElementById(`eval-child-${i}-reason`)?.value.trim() || '',
    twoWords:     document.getElementById(`eval-child-${i}-two-words`)?.value || '',
    priorTherapy: document.getElementById(`eval-child-${i}-prior`)?.value || '',
    notes:        document.getElementById(`eval-child-${i}-notes`)?.value.trim() || '',
  }));
}

function addEvalChild() {
  saveCurrentEvalChildren();
  window.AppState.children.push({ firstName: '', age: '', language: 'english', reason: '', twoWords: '', priorTherapy: '', notes: '' });
  document.getElementById('eval-children-list').innerHTML =
    window.AppState.children.map((c, i) => renderEvalChildBlock(c, i)).join('');
  validateEvalChildrenForm();
}

function removeEvalChild(index) {
  saveCurrentEvalChildren();
  window.AppState.children.splice(index, 1);
  document.getElementById('eval-children-list').innerHTML =
    window.AppState.children.map((c, i) => renderEvalChildBlock(c, i)).join('');
  validateEvalChildrenForm();
}

function saveEvalChildren() {
  saveCurrentEvalChildren();
  const errorEl = document.getElementById('eval-child-error');
  for (let i = 0; i < window.AppState.children.length; i++) {
    const c = window.AppState.children[i];
    const ageErr = document.getElementById(`eval-child-${i}-age-error`);
    if (ageErr) ageErr.style.display = 'none';
    if (!c.firstName || !c.age || !c.reason) {
      errorEl.style.display = 'flex';
      errorEl.textContent = `Please complete all required fields for Child ${i + 1}.`;
      return;
    }
    const age = parseInt(c.age, 10);
    if (isNaN(age) || age < 0 || age > 17) {
      if (ageErr) { ageErr.textContent = 'Age must be between 0 and 17.'; ageErr.style.display = 'block'; }
      errorEl.style.display = 'flex';
      errorEl.textContent = `Child ${i + 1}: age must be between 0 and 17.`;
      return;
    }
  }
  errorEl.style.display = 'none';
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
  window.scrollToTop();
}
