// Book a Camp — 3-step form
let campStep = 1;
const TOTAL_CAMP_STEPS = 3;

function renderBookCamp() {
  return `
    <div class="page-header">
      <h1>Book Little Lamps Speech Camp</h1>
      <p>Register your child (ages 1–4) for an in-person or virtual Sunday speech camp.</p>
    </div>
    <div class="booking-container ${campStep === 3 ? 'booking-wide' : ''}" id="camp-booking-root">
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
            value="${g.firstName || ''}" oninput="validateGuardianForm('${context}')" required>
        </div>
        <div class="form-group">
          <label>Last Name <span class="required">*</span></label>
          <input class="form-control" id="g-last" type="text" placeholder="Last name"
            value="${g.lastName || ''}" oninput="validateGuardianForm('${context}')">
        </div>
      </div>

      <div class="form-group">
        <label>Email Address <span class="required">*</span></label>
        <input class="form-control" id="g-email" type="email" placeholder="your@email.com"
          value="${g.email || ''}" oninput="validateGuardianForm('${context}')">
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Phone Number <span class="required">*</span></label>
          <input class="form-control" id="g-phone" type="tel" placeholder="(555) 000-0000"
            value="${g.phone || ''}" oninput="validateGuardianForm('${context}')">
        </div>
        <div class="form-group">
          <label>Relationship to Child <span class="required">*</span></label>
          <select class="form-control" id="g-relationship" onchange="validateGuardianForm('${context}')">
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

      ${context === 'camp' ? `
      <div class="divider" style="margin:1.5rem 0;"></div>
      <div style="font-weight:700;margin-bottom:0.75rem;">
        Please acknowledge the following <span style="color:var(--error);">*</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1rem;">
        <label style="display:flex;gap:0.75rem;align-items:flex-start;cursor:pointer;font-size:0.875rem;color:var(--text-light);">
          <input type="checkbox" id="ack1" style="margin-top:3px;flex-shrink:0;width:18px;height:18px;cursor:pointer;" onchange="validateGuardianForm('camp')">
          I understand that a caregiver must remain present and actively participate with their child during each session.
        </label>
        <label style="display:flex;gap:0.75rem;align-items:flex-start;cursor:pointer;font-size:0.875rem;color:var(--text-light);">
          <input type="checkbox" id="ack2" style="margin-top:3px;flex-shrink:0;width:18px;height:18px;cursor:pointer;" onchange="validateGuardianForm('camp')">
          I understand that this program provides parent coaching and early communication enrichment and does not replace individualized speech therapy services.
        </label>
        <label style="display:flex;gap:0.75rem;align-items:flex-start;cursor:pointer;font-size:0.875rem;color:var(--text-light);">
          <input type="checkbox" id="ack3" style="margin-top:3px;flex-shrink:0;width:18px;height:18px;cursor:pointer;" onchange="validateGuardianForm('camp')">
          I have read and agree to the <a href="#/refund-policy" target="_blank" style="color:var(--primary);text-decoration:underline;">Payment &amp; Refund Policy</a>.
        </label>
      </div>
      ` : ''}

      <div id="guardian-error" class="alert alert-error" style="display:none;"></div>

      <div style="display:flex;justify-content:flex-end;margin-top:1.5rem;">
        <button id="guardian-next-btn" class="btn btn-blue" onclick="saveGuardianAndNext('${context}')" disabled>
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
        <button id="children-next-btn" class="btn btn-blue" onclick="saveChildrenAndNext()" disabled>
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
        ${index > 0 ? `<button class="btn-remove-child" onclick="removeCampChild(${index})"><i class="bi bi-x-lg"></i> Remove</button>` : ''}
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Child's First Name <span class="required">*</span></label>
          <input class="form-control" id="child-${index}-name" type="text"
            placeholder="First name" value="${child.firstName || ''}" oninput="validateCampChildrenForm()">
        </div>
        <div class="form-group">
          <label>Age <span class="required">*</span></label>
          <input class="form-control" id="child-${index}-age" type="text"
            inputmode="numeric" pattern="[0-9]*"
            placeholder="e.g. 2" value="${child.age || ''}"
            oninput="this.value=this.value.replace(/[^0-9]/g,'');validateCampChildrenForm();"
            onkeypress="return /[0-9]/.test(event.key)">
          <div class="field-error" id="child-${index}-age-error" style="display:none;color:var(--error);font-size:0.8rem;margin-top:0.25rem;"></div>
        </div>
      </div>
      <div class="form-group">
        <label>Why do you believe your child may benefit from speech therapy? <span class="required">*</span></label>
        <textarea class="form-control" id="child-${index}-reason"
          placeholder="Please share any concerns, observations, or background about your child's speech and language development. This helps us prepare the best experience for them."
          rows="4" oninput="validateCampChildrenForm()">${child.reason || ''}</textarea>
      </div>
    </div>
  `;
}

function renderCampSelector() {
  const selected = window.AppState.selectedCamp;
  const children = window.AppState.children;
  const numKids = children.length;
  const total = selected ? selected.price * numKids : 0;

  const campCards = window.CAMPS.map(camp => `
    <div class="card camp-card ${selected && selected.id === camp.id ? 'selected' : ''}"
         onclick="selectCamp('${camp.id}')">
      <div style="display:flex;align-items:flex-start;gap:1.25rem;">
        <div class="card-icon" style="flex-shrink:0;margin-bottom:0;"><i class="bi ${camp.icon}"></i></div>
        <div style="flex:1;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.5rem;">
            <div>
              <h3 style="margin-bottom:0.2rem;">${camp.name}</h3>
              <p style="font-size:0.8rem;color:var(--primary);font-weight:600;">${camp.subtitle}</p>
              <div class="selected-badge"><i class="bi bi-check2"></i> Selected</div>
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
          <div style="font-size:0.8rem;color:var(--text-muted);">
            <i class="bi bi-geo-alt"></i>
            ${camp.id.includes('virtual') ? camp.location : 'Location provided after payment'}
          </div>
        </div>
      </div>
    </div>
  `).join('');

  const sidebarSummary = selected ? `
    ${children.map(c => `
      <div class="order-row">
        <span style="color:var(--text-light);font-size:0.875rem;">${c.firstName}, age ${c.age}</span>
        <span>$${selected.price}</span>
      </div>
    `).join('')}
    <div class="order-row order-total">
      <span>Total Due</span>
      <span>$${total}</span>
    </div>
    <button class="btn btn-blue" style="width:100%;margin-top:1.25rem;justify-content:center;"
      onclick="proceedToPayment('camp')">
      Pay $${total} with Stripe <i class="bi bi-arrow-right"></i>
    </button>
    <div style="margin-top:1rem;font-size:0.78rem;color:var(--text-muted);line-height:1.5;">
      ${selected.id.includes('virtual')
        ? '<i class="bi bi-calendar-check" style="margin-right:0.3rem;"></i>After you register, Jasmine will reach out to gather your availability. Weekly live sessions will be scheduled at times that work best for the majority of families in your selected cohort.'
        : '<i class="bi bi-clock" style="margin-right:0.3rem;"></i>After you register, Jasmine will contact you to confirm your child\'s assigned session time. Each Sunday includes two sessions. Your child will be assigned to attend one session, either 4:00–4:35 PM or 4:45–5:20 PM.'
      }
    </div>
  ` : `
    <p style="color:var(--text-muted);font-size:0.875rem;text-align:center;padding:0.75rem 0;">
      <i class="bi bi-hand-index-thumb" style="display:block;font-size:1.5rem;margin-bottom:0.5rem;"></i>
      Select a camp to see pricing
    </p>
  `;

  return `
    <div class="camp-selector-layout">

      <!-- LEFT: camp list -->
      <div>
        <div class="alert alert-info" style="margin-bottom:1.25rem;">
          <i class="bi bi-info-circle"></i>
          Registering <strong>${numKids} child${numKids > 1 ? 'ren' : ''}</strong>:
          ${children.map(c => `<strong>${c.firstName}</strong>`).join(', ')}
        </div>

        <div style="display:flex;flex-direction:column;gap:1.25rem;">
          ${campCards}
        </div>

        <div style="display:flex;justify-content:space-between;margin-top:1.5rem;">
          <button class="btn btn-ghost" onclick="campGoBack()">
            <i class="bi bi-arrow-left"></i> Back
          </button>
          <button id="camp-proceed-btn" class="btn btn-blue camp-desktop-proceed" onclick="proceedToPayment('camp')" ${selected ? '' : 'disabled'}>
            Proceed to Payment <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>

      <!-- RIGHT: sticky order summary (desktop only) -->
      <div class="camp-summary-sidebar">
        <div class="card order-summary-card" style="border-color:${selected ? 'var(--primary)' : 'var(--border)'};">
          <h4 style="margin-bottom:0.75rem;"><i class="bi bi-receipt" style="margin-right:0.4rem;"></i>Order Summary</h4>
          ${selected ? `<div class="order-row" style="font-weight:600;">
            <span>${selected.name}</span>
          </div>` : ''}
          ${sidebarSummary}
        </div>
      </div>
    </div>

    <!-- MOBILE: sticky bottom shelf -->
    <div class="camp-shelf">
      <div class="pay-shelf-total">
        <span class="shelf-label">${selected ? selected.name : 'No camp selected'}</span>
        <span class="shelf-amount">${selected ? `$${total}` : '—'}</span>
      </div>
      <button id="camp-shelf-btn" class="btn btn-blue" onclick="proceedToPayment('camp')" ${selected ? '' : 'disabled'}>
        ${selected ? `Pay $${total}` : 'Select a camp'} <i class="bi bi-arrow-right"></i>
      </button>
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
  if (context === 'camp') {
    const a1 = document.getElementById('ack1');
    const a2 = document.getElementById('ack2');
    const a3 = document.getElementById('ack3');
    if (!a1?.checked || !a2?.checked || !a3?.checked) {
      errorEl.style.display = 'flex';
      errorEl.textContent = 'Please check all three acknowledgements before continuing.';
      return;
    }
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
  validateCampChildrenForm();
}

function removeCampChild(index) {
  saveCurrentChildren();
  window.AppState.children.splice(index, 1);
  document.getElementById('children-list').innerHTML =
    window.AppState.children.map((c, i) => renderChildBlock(c, i)).join('');
  validateCampChildrenForm();
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
    // Clear individual age error first
    const ageErr = document.getElementById(`child-${i}-age-error`);
    if (ageErr) ageErr.style.display = 'none';
    if (!c.firstName || !c.age || !c.reason) {
      errorEl.style.display = 'flex';
      errorEl.textContent = `Please complete all fields for Child ${i + 1}.`;
      return;
    }
    const age = parseInt(c.age, 10);
    if (isNaN(age) || age < 1 || age > 4) {
      if (ageErr) { ageErr.textContent = 'Age must be between 1 and 4.'; ageErr.style.display = 'block'; }
      errorEl.style.display = 'flex';
      errorEl.textContent = `Child ${i + 1}: age must be between 1 and 4.`;
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
  const root = document.getElementById('camp-booking-root');
  root.classList.toggle('booking-wide', campStep === 3);
  root.innerHTML = renderCampStep(campStep);
  window.scrollToTop();
}

function updateAckState() {} // acks now validated at step 1

function validateGuardianForm(context) {
  const ok = !!(
    document.getElementById('g-first')?.value.trim() &&
    document.getElementById('g-last')?.value.trim() &&
    document.getElementById('g-email')?.value.trim() &&
    document.getElementById('g-phone')?.value.trim() &&
    document.getElementById('g-relationship')?.value &&
    (context !== 'camp' || (
      document.getElementById('ack1')?.checked &&
      document.getElementById('ack2')?.checked &&
      document.getElementById('ack3')?.checked
    ))
  );
  const btn = document.getElementById('guardian-next-btn');
  if (btn) btn.disabled = !ok;
}

function validateCampChildrenForm() {
  const blocks = document.querySelectorAll('#children-list .child-block');
  let ok = blocks.length > 0;
  blocks.forEach((_, i) => {
    if (!document.getElementById(`child-${i}-name`)?.value.trim() ||
        !document.getElementById(`child-${i}-age`)?.value ||
        !document.getElementById(`child-${i}-reason`)?.value.trim()) ok = false;
  });
  const btn = document.getElementById('children-next-btn');
  if (btn) btn.disabled = !ok;
}

function proceedToPayment(bookingType) {
  window.AppState.bookingType = bookingType;
  window.location.hash = '#/payment';
}
