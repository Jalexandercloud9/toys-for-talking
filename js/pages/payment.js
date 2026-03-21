const EVAL_PRICE = 149;

function renderPayment() {
  const state   = window.AppState;
  const isCamp  = state.bookingType === 'camp';
  const isEval  = state.bookingType === 'evaluation';

  if (!isCamp && !isEval) {
    return `
      <div class="page-header"><h1>Payment</h1></div>
      <div class="booking-container">
        <div class="alert alert-error">
          No booking found. Please <a href="#/book-camp">book a camp</a> or
          <a href="#/book-evaluation">book an evaluation</a> first.
        </div>
      </div>
    `;
  }

  const numKids   = state.children.length;
  const campPrice = isCamp && state.selectedCamp ? state.selectedCamp.price * numKids : 0;
  const evalPrice = EVAL_PRICE * numKids;
  const totalPrice = isCamp ? campPrice : evalPrice;
  const guardian  = state.guardian || {};

  // Pre-build the Stripe URL and save state NOW so the Pay button
  // can be a plain <a href> — most reliable cross-browser navigation
  if (!state.confirmationId) {
    state.confirmationId = 'TFT-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  }
  state.paymentConfirmed = false; // true only after Stripe returns
  let stripeUrl = isCamp && state.selectedCamp && state.selectedCamp.stripeLink
    ? state.selectedCamp.stripeLink
    : window.EVAL_STRIPE_LINK;
  if (numKids > 1) stripeUrl += '?prefilled_quantity=' + numKids;
  try { localStorage.setItem('tft_booking', JSON.stringify(state)); } catch(e) {}

  const priorTherapyLabel = v =>
    v === 'no'          ? 'No prior therapy'           :
    v === 'yes-current' ? 'Currently in therapy'       :
    v === 'yes-past'    ? 'Previously received therapy' : '—';

  const languageLabel = v =>
    v === 'spanish' ? 'Spanish' :
    v === 'both'    ? 'English & Spanish' : 'English';

  return `
    <div class="page-header">
      <h1><i class="bi bi-card-checklist"></i> Review &amp; Pay</h1>
      <p>Please review your details before completing payment.</p>
    </div>

    <div style="max-width:1000px;margin:0 auto;padding:2.5rem 1.5rem;">
      <div class="payment-grid">

        <!-- Left: Full booking review -->
        <div>

          <!-- Guardian -->
          <div class="card" style="margin-bottom:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
              <h4 style="margin:0;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.5px;color:var(--primary);">Guardian Information</h4>
              <button class="btn btn-ghost" style="font-size:0.8rem;padding:0.3rem 0.75rem;" onclick="editGuardian()">
                <i class="bi bi-pencil"></i> Edit
              </button>
            </div>
            <div class="summary-row"><span class="summary-label">Name</span><span class="summary-value">${guardian.firstName || ''} ${guardian.lastName || ''}</span></div>
            <div class="summary-row"><span class="summary-label">Email</span><span class="summary-value">${guardian.email || '—'}</span></div>
            <div class="summary-row"><span class="summary-label">Phone</span><span class="summary-value">${guardian.phone || '—'}</span></div>
          </div>

          <!-- Children -->
          <div class="card" style="margin-bottom:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
              <h4 style="margin:0;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.5px;color:var(--primary);">${numKids > 1 ? 'Children' : 'Child'}</h4>
              <button class="btn btn-ghost" style="font-size:0.8rem;padding:0.3rem 0.75rem;" onclick="editChildren()">
                <i class="bi bi-pencil"></i> Edit
              </button>
            </div>
            ${state.children.map((c, i) => `
              <div style="${i > 0 ? 'border-top:1px solid var(--border);padding-top:1rem;margin-top:1rem;' : ''}">
                ${numKids > 1 ? `<div style="font-weight:700;font-size:0.85rem;margin-bottom:0.6rem;color:var(--text);">Child ${i + 1}</div>` : ''}
                <div class="summary-row"><span class="summary-label">Name</span><span class="summary-value">${c.firstName || '—'}</span></div>
                <div class="summary-row"><span class="summary-label">Age</span><span class="summary-value">${c.age || '—'}</span></div>
                ${isEval ? `<div class="summary-row"><span class="summary-label">Language</span><span class="summary-value">${languageLabel(c.language)}</span></div>` : ''}
                ${c.reason ? `
                  <div class="summary-row" style="align-items:flex-start;">
                    <span class="summary-label">Concerns</span>
                    <span class="summary-value">${c.reason}</span>
                  </div>` : ''}
                ${isEval && c.priorTherapy ? `<div class="summary-row"><span class="summary-label">Prior therapy</span><span class="summary-value">${priorTherapyLabel(c.priorTherapy)}</span></div>` : ''}
                ${isEval && c.notes ? `
                  <div class="summary-row" style="align-items:flex-start;">
                    <span class="summary-label">Notes</span>
                    <span class="summary-value">${c.notes}</span>
                  </div>` : ''}
              </div>
            `).join('')}
          </div>

          ${isCamp && state.selectedCamp ? `
          <!-- Camp selection -->
          <div class="card" style="margin-bottom:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
              <h4 style="margin:0;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.5px;color:var(--primary);">Camp Selected</h4>
              <button class="btn btn-ghost" style="font-size:0.8rem;padding:0.3rem 0.75rem;" onclick="editCamp()">
                <i class="bi bi-pencil"></i> Edit
              </button>
            </div>
            <div class="summary-row"><span class="summary-label">Camp</span><span class="summary-value">${state.selectedCamp.name}</span></div>
            <div class="summary-row"><span class="summary-label">Dates</span><span class="summary-value">${state.selectedCamp.dates}</span></div>
            <div class="summary-row"><span class="summary-label">Time</span><span class="summary-value">${state.selectedCamp.time}</span></div>
            ${!state.selectedCamp.id.includes('virtual') ? '' : `<div class="summary-row"><span class="summary-label">Location</span><span class="summary-value">${state.selectedCamp.location}</span></div>`}
          </div>
          ` : ''}

        </div>

        <!-- Right: Price summary + Pay -->
        <div class="card order-summary-card">
          <h4 style="margin-bottom:1rem;">Order Summary</h4>

          ${isCamp && state.selectedCamp ? `
            <div style="display:flex;gap:0.75rem;align-items:center;padding-bottom:1rem;border-bottom:1px solid var(--border);margin-bottom:1rem;">
              <span style="font-size:1.5rem;"><i class="bi ${state.selectedCamp.icon}"></i></span>
              <div>
                <div style="font-weight:700;font-size:0.9rem;">${state.selectedCamp.name}</div>
                <div style="font-size:0.8rem;color:var(--text-muted);">${state.selectedCamp.dates}</div>
              </div>
            </div>
            ${state.children.map((c, i) => `
              <div class="order-row">
                <span><i class="bi bi-person"></i> ${c.firstName || 'Child ' + (i + 1)}, age ${c.age}</span>
                <span>$${state.selectedCamp.price}</span>
              </div>
            `).join('')}
            <div class="order-row order-total">
              <span>Total</span>
              <span>$${campPrice.toLocaleString()}</span>
            </div>
          ` : `
            <div style="padding-bottom:1rem;border-bottom:1px solid var(--border);margin-bottom:1rem;">
              <div style="font-weight:700;font-size:0.9rem;"><i class="bi bi-clipboard-check"></i> Speech &amp; Language Evaluation</div>
              <div style="font-size:0.8rem;color:var(--text-muted);margin-top:0.25rem;">DFW area · Jasmine will call to schedule</div>
            </div>
            ${state.children.map((c, i) => `
              <div class="order-row">
                <span><i class="bi bi-person"></i> ${c.firstName || 'Child ' + (i + 1)}, age ${c.age}</span>
                <span>$${EVAL_PRICE}</span>
              </div>
            `).join('')}
            <div class="order-row order-total">
              <span>Total Today</span>
              <span>$${evalPrice.toLocaleString()}</span>
            </div>
          `}

          <div class="divider"></div>

          <p style="font-size:0.875rem;color:var(--text-muted);margin-bottom:1.25rem;">
            ${isCamp
              ? 'You\'ll be taken to Stripe\'s secure checkout. <a href="#/refund-policy" style="color:var(--primary);">View refund policy.</a>'
              : 'After payment, Jasmine will call you to confirm your evaluation time and location in the DFW area. <a href="#/refund-policy" style="color:var(--primary);">View refund policy.</a>'}
          </p>

          <a href="${stripeUrl}" class="btn btn-blue btn-lg" style="width:100%;justify-content:center;text-decoration:none;">
            <i class="bi bi-lock"></i> Pay $${totalPrice.toLocaleString()} with Stripe
          </a>

          <div class="secure-badge" style="margin-top:1rem;">
            <i class="bi bi-shield-check"></i> Secured by <strong style="margin-left:4px;">Stripe</strong>
          </div>

          <div class="divider"></div>

          <div style="display:flex;flex-direction:column;gap:0.6rem;">
            <div style="font-size:0.8rem;color:var(--text-muted);display:flex;gap:0.5rem;align-items:flex-start;">
              <i class="bi bi-check2" style="color:var(--success);flex-shrink:0;"></i> Confirmation email sent immediately
            </div>
            ${isCamp ? `
              <div style="font-size:0.8rem;color:var(--text-muted);display:flex;gap:0.5rem;align-items:flex-start;">
                <i class="bi bi-check2" style="color:var(--success);flex-shrink:0;"></i> <a href="#/refund-policy" style="color:var(--text-muted);text-decoration:underline;">Full refund if cancelled 7+ days before camp</a>
              </div>
            ` : `
              <div style="font-size:0.8rem;color:var(--text-muted);display:flex;gap:0.5rem;align-items:flex-start;">
                <i class="bi bi-check2" style="color:var(--success);flex-shrink:0;"></i> Jasmine will call you to confirm details
              </div>
            `}
          </div>

          <div class="divider"></div>

          <div class="alert alert-info" style="font-size:0.8rem;padding:0.75rem;overflow-wrap:break-word;word-break:break-word;">
            <div style="display:flex;gap:0.5rem;align-items:flex-start;flex-wrap:wrap;">
              <i class="bi bi-telephone" style="flex-shrink:0;"></i>
              <span>Questions? Call <strong>(214) 395-0109</strong> or email <strong>toysfortalking@gmail.com</strong></span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Mobile sticky shelf -->
    <div class="pay-shelf">
      <div class="pay-shelf-total">
        <span class="shelf-label">Total</span>
        <span class="shelf-amount">$${totalPrice.toLocaleString()}</span>
      </div>
      <a href="${stripeUrl}" class="btn btn-blue btn-lg" style="text-decoration:none;">
        <i class="bi bi-lock"></i> Pay with Stripe
      </a>
    </div>
  `;
}

// -----------------------------------------------
// Edit navigation — go back without losing state
// -----------------------------------------------
function editGuardian() {
  if (window.AppState.bookingType === 'camp') {
    campStep = 1;
    navigate('#/book-camp');
  } else {
    evalStep = 1;
    navigate('#/book-evaluation');
  }
}

function editChildren() {
  if (window.AppState.bookingType === 'camp') {
    campStep = 2;
    navigate('#/book-camp');
  } else {
    evalStep = 2;
    navigate('#/book-evaluation');
  }
}

function editCamp() {
  campStep = 3;
  navigate('#/book-camp');
}

// Legacy stubs (navigation now handled by <a href> in renderPayment)
function proceedToStripe() {}
function initStripe() {}
