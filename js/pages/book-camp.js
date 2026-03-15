// Book a Camp — 3-step form
let campStep = 1;
const TOTAL_CAMP_STEPS = 3;

function renderBookCamp() {
  return `
    <div class="page-header">
      <h1>Book a Summer Camp</h1>
      <p>Register your child for one of our small-group speech and language camps.</p>
    </div>
    <div class="booking-container" id="camp-booking-root">
      ${renderCampStep(campStep)}
    </div>
  `;
}

function renderCampStep(step) {
  const stepLabels = ['Your Info', 'Child Info', 'Select Camp'];
  return `
    ${renderStepIndicator(step, TOTAL_CAMP_STEPS, stepLabels)}
    <div id="camp-step-content">
      ${step === 1 ? renderGuardianForm('camp') : ''}
      ${step === 2 ? renderChildrenForm() : ''}
      ${step === 3 ? renderCampSelector() : ''}
    </div>
  `;
}

function renderStepIndicator(current, total, labels) {
  let html = '<div class="step-indicator">';
  for (let i = 1; i <= total; i++) {
    const isDone = i < current;
    const isActive = i === current;
    html += `
      <div class="step-item">
        <div class="step-wrapper">
          <div class="step-circle ${isDone ? 'done' : isActive ? 'active' : ''}">
            ${isDone ? '<i class="bi bi-check2"></i>' : i}
          </div>
          <div class="step-label ${isDone ? 'done' : isActive ? 'active' : ''}">${labels[i-1]}</div>
        </div>
        ${i < total ? `<div class="step-line ${isDone ? 'done' : ''}"></div>` : ''}
      </div>
    `;
  }
  html += '</div>';
  return html;
}

function renderGuardianForm(context) {
  const g = window.AppState.guardian;
  return `
    <div class="card">
      <h3 style="margin-bottom:0.25rem;">Parent / Guardian Information</h3>
      <p style="font-size:0.875rem;margin-bottom:1.5rem;">Please provide the contact information for the primary guardian.</p>

      <div class="form-row">
        <div class="form-group">
          <label>First Name <span class="required">*</span></label>
          <input class="form-control" id="g-first" type="text" placeholder="First name"
            value="${g.firstName || ''}" required>
        </div>
        <div class="form-group">
          <label>Last Name <span class="required">*</span></label>
          <input class="form-control" id="g-last" type="text" placeholder="Last name"
            value="${g.lastName || ''}">
        </div>
      </div>

      <div class="form-group">
        <label>Email Address <span class="required">*</span></label>
        <input class="form-control" id="g-email" type="email" placeholder="your@email.com"
          value="${g.email || ''}">
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Phone Number <span class="required">*</span></label>
          <input class="form-control" id="g-phone" type="tel" placeholder="(555) 000-0000"
            value="${g.phone || ''}">
        </div>
        <div class="form-group">
          <label>Relationship to Child <span class="required">*</span></label>
          <select class="form-control" id="g-relationship">
            <option value="">Select…</option>
            ${['Parent', 'Legal Guardian', 'Grandparent', 'Other Caregiver'].map(r =>
              `<option value="${r}" ${g.relationship === r ? 'selected' : ''}>${r}</option>`
            ).join('')}
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>Street Address</label>
        <input class="form-control" id="g-address" type="text" placeholder="123 Main St"
          value="${g.address || ''}">
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>City</label>
          <input class="form-control" id="g-city" type="text" placeholder="City"
            value="${g.city || ''}">
        </div>
        <div class="form-group">
          <label>State / ZIP</label>
          <div style="display:flex;gap:0.5rem;">
            <input class="form-control" id="g-state" type="text" placeholder="TX" maxlength="2" style="width:80px;flex-shrink:0;"
              value="${g.state || ''}">
            <input class="form-control" id="g-zip" type="text" placeholder="ZIP"
              value="${g.zip || ''}">
          </div>
        </div>
      </div>

      <div id="guardian-error" class="alert alert-error" style="display:none;"></div>

      <div style="display:flex;justify-content:flex-end;margin-top:1.5rem;">
        <button class="btn btn-blue" onclick="saveGuardianAndNext('camp')">
          Next: Child Information <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  `;
}

function renderChildrenForm() {
  const children = window.AppState.children.length > 0
    ? window.AppState.children
    : [{ firstName: '', age: '', reason: '' }];
  if (window.AppState.children.length === 0) window.AppState.children = children;

  return `
    <div>
      <div id="children-list">
        ${children.map((c, i) => renderChildBlock(c, i)).join('')}
      </div>

      <button class="btn btn-ghost" style="width:100%;justify-content:center;margin-top:0.5rem;"
        onclick="addChild()">
        <i class="bi bi-plus-circle"></i> Add Another Child
      </button>

      <div id="children-error" class="alert alert-error" style="display:none;margin-top:1rem;"></div>

      <div style="display:flex;justify-content:space-between;margin-top:1.5rem;">
        <button class="btn btn-ghost" onclick="campGoBack()">
          <i class="bi bi-arrow-left"></i> Back
        </button>
        <button class="btn btn-blue" onclick="saveChildrenAndNext()">
          Next: Select Camp <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  `;
}

function renderChildBlock(child, index) {
  return `
    <div class="child-block" id="child-block-${index}">
      <div class="child-block-header">
        <div class="child-block-title">Child ${index + 1}</div>
        ${index > 0 ? `<button class="btn-remove-child" onclick="removeChild(${index})"><i class="bi bi-x-lg"></i> Remove</button>` : ''}
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Child's First Name <span class="required">*</span></label>
          <input class="form-control" id="child-${index}-name" type="text"
            placeholder="First name" value="${child.firstName || ''}">
        </div>
        <div class="form-group">
          <label>Age <span class="required">*</span></label>
          <input class="form-control" id="child-${index}-age" type="number"
            placeholder="e.g. 5" min="2" max="18" value="${child.age || ''}">
        </div>
      </div>
      <div class="form-group">
        <label>Why do you believe your child may benefit from speech therapy? <span class="required">*</span></label>
        <textarea class="form-control" id="child-${index}-reason"
          placeholder="Please share any concerns, observations, or background about your child's speech and language development. This helps us prepare the best experience for them."
          rows="4">${child.reason || ''}</textarea>
      </div>
    </div>
  `;
}

function renderCampSelector() {
  const selected = window.AppState.selectedCamp;
  const children = window.AppState.children;
  const numKids = children.length;

  return `
    <div>
      <div class="alert alert-info" style="margin-bottom:1.5rem;">
        <i class="bi bi-info-circle"></i>
        Registering <strong>${numKids} child${numKids > 1 ? 'ren' : ''}</strong>:
        ${children.map(c => `<strong>${c.firstName}</strong>`).join(', ')}
      </div>

      <div style="display:flex;flex-direction:column;gap:1.25rem;margin-bottom:1.5rem;">
        ${window.CAMPS.map(camp => `
          <div class="card camp-card ${selected && selected.id === camp.id ? 'selected' : ''}"
               onclick="selectCamp('${camp.id}')">
            <div class="selected-badge"><i class="bi bi-check2"></i> Selected</div>
            <div style="display:flex;align-items:flex-start;gap:1.25rem;">
              <div class="card-icon" style="flex-shrink:0;margin-bottom:0;"><i class="bi ${camp.icon}"></i></div>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.5rem;">
                  <div>
                    <h3 style="margin-bottom:0.2rem;">${camp.name}</h3>
                    <p style="font-size:0.8rem;color:var(--primary);font-weight:600;">${camp.subtitle}</p>
                  </div>
                  <div style="text-align:right;flex-shrink:0;">
                    <div class="camp-price">$${camp.price}</div>
                    <div style="font-size:0.75rem;color:var(--text-muted);">per child</div>
                  </div>
                </div>
                <span class="camp-dates"><i class="bi bi-calendar3"></i> ${camp.dates}</span>
                <span style="font-size:0.8rem;color:var(--text-muted);margin-left:0.5rem;">
                  <i class="bi bi-clock"></i> ${camp.time}
                </span>
                <p style="font-size:0.875rem;margin:0.75rem 0;">${camp.description}</p>
                <div class="tag-strip" style="margin-bottom:0.75rem;">
                  ${camp.tags.map(t => `<span class="badge badge-blue">${t}</span>`).join('')}
                </div>
                <ul style="list-style:none;display:flex;flex-direction:column;gap:0.3rem;">
                  ${camp.highlights.map(h => `
                    <li style="font-size:0.8rem;color:var(--text-light);display:flex;gap:0.4rem;align-items:flex-start;">
                      <i class="bi bi-check2" style="color:var(--success);flex-shrink:0;margin-top:2px;"></i> ${h}
                    </li>
                  `).join('')}
                </ul>
                <div style="margin-top:0.75rem;font-size:0.8rem;color:var(--text-muted);">
                  <i class="bi bi-geo-alt"></i> ${camp.location} &nbsp;&middot;&nbsp;
                  <span style="color:${camp.spotsLeft <= 3 ? 'var(--error)' : 'var(--text-muted)'};">
                    ${camp.spotsLeft} spots remaining
                  </span>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      ${selected ? `
        <div class="card" style="background:rgba(30,77,140,0.04);border-color:var(--primary);">
          <h4 style="margin-bottom:0.75rem;">Order Summary</h4>
          <div class="order-row">
            <span>${selected.name}</span>
            <span>$${selected.price} &times; ${numKids} = <strong>$${selected.price * numKids}</strong></span>
          </div>
          <div class="order-row order-total">
            <span>Total Due</span>
            <span>$${selected.price * numKids}</span>
          </div>
        </div>
      ` : `
        <div class="alert alert-info">
          <i class="bi bi-hand-index-thumb"></i> Please select a camp above to continue.
        </div>
      `}

      <div id="camp-select-error" class="alert alert-error" style="display:none;margin-top:1rem;"></div>

      <div style="display:flex;justify-content:space-between;margin-top:1.5rem;">
        <button class="btn btn-ghost" onclick="campGoBack()">
          <i class="bi bi-arrow-left"></i> Back
        </button>
        <button class="btn btn-blue" onclick="proceedToPayment('camp')" ${!selected ? 'disabled' : ''}>
          Proceed to Payment <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  `;
}

/* ===== CAMP FORM ACTIONS ===== */

function saveGuardianAndNext(context) {
  const fields = {
    firstName: document.getElementById('g-first')?.value.trim(),
    lastName:  document.getElementById('g-last')?.value.trim(),
    email:     document.getElementById('g-email')?.value.trim(),
    phone:     document.getElementById('g-phone')?.value.trim(),
    relationship: document.getElementById('g-relationship')?.value,
    address:   document.getElementById('g-address')?.value.trim(),
    city:      document.getElementById('g-city')?.value.trim(),
    state:     document.getElementById('g-state')?.value.trim(),
    zip:       document.getElementById('g-zip')?.value.trim(),
  };

  const errorEl = document.getElementById('guardian-error');
  if (!fields.firstName || !fields.lastName || !fields.email || !fields.phone || !fields.relationship) {
    errorEl.style.display = 'flex';
    errorEl.textContent = 'Please fill in all required fields (marked with *).';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errorEl.style.display = 'flex';
    errorEl.textContent = 'Please enter a valid email address.';
    return;
  }
  errorEl.style.display = 'none';
  window.AppState.guardian = fields;

  if (context === 'camp') {
    campStep = 2;
    refreshCampRoot();
  } else {
    evalStep = 2;
    refreshEvalRoot();
  }
}

function addChild() {
  saveCurrentChildren();
  window.AppState.children.push({ firstName: '', age: '', reason: '' });
  document.getElementById('children-list').innerHTML =
    window.AppState.children.map((c, i) => renderChildBlock(c, i)).join('');
}

function removeChild(index) {
  saveCurrentChildren();
  window.AppState.children.splice(index, 1);
  document.getElementById('children-list').innerHTML =
    window.AppState.children.map((c, i) => renderChildBlock(c, i)).join('');
}

function saveCurrentChildren() {
  window.AppState.children = window.AppState.children.map((_, i) => ({
    firstName: document.getElementById(`child-${i}-name`)?.value.trim() || '',
    age:       document.getElementById(`child-${i}-age`)?.value || '',
    reason:    document.getElementById(`child-${i}-reason`)?.value.trim() || '',
  }));
}

function saveChildrenAndNext() {
  saveCurrentChildren();
  const errorEl = document.getElementById('children-error');
  for (let i = 0; i < window.AppState.children.length; i++) {
    const c = window.AppState.children[i];
    if (!c.firstName || !c.age || !c.reason) {
      errorEl.style.display = 'flex';
      errorEl.textContent = `Please complete all fields for Child ${i + 1}.`;
      return;
    }
  }
  errorEl.style.display = 'none';
  campStep = 3;
  refreshCampRoot();
}

function selectCamp(campId) {
  window.AppState.selectedCamp = window.CAMPS.find(c => c.id === campId);
  refreshCampStep3();
}

function refreshCampStep3() {
  document.getElementById('camp-step-content').innerHTML = renderCampSelector();
}

function campGoBack() {
  if (campStep > 1) {
    campStep--;
    refreshCampRoot();
  }
}

function refreshCampRoot() {
  document.getElementById('camp-booking-root').innerHTML = renderCampStep(campStep);
}

function proceedToPayment(bookingType) {
  window.AppState.bookingType = bookingType;
  window.location.hash = '#/payment';
}
