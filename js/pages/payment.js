let stripeInstance = null;
let stripeCardElement = null;
let paymentProcessing = false;

function renderPayment() {
  const state = window.AppState;
  const isCamp = state.bookingType === 'camp';
  const isEval = state.bookingType === 'evaluation';

  if (!isCamp && !isEval) {
    return `
      <div class="page-header">
        <h1>Payment</h1>
      </div>
      <div class="booking-container">
        <div class="alert alert-error">
          No booking found. Please <a href="#/book-camp">book a camp</a> or
          <a href="#/book-evaluation">book an evaluation</a> first.
        </div>
      </div>
    `;
  }

  const numKids = state.children.length;
  const campPrice = isCamp && state.selectedCamp ? state.selectedCamp.price * numKids : 0;
  const evalPrice = 0; // First eval is complimentary

  return `
    <div class="page-header">
      <h1><i class="bi bi-credit-card"></i> Secure Payment</h1>
      <p>${isCamp ? 'Complete your camp registration' : 'Confirm your evaluation booking'}</p>
    </div>

    <div style="max-width:1000px;margin:0 auto;padding:2.5rem 1.5rem;">
      <div class="payment-grid">

        <!-- Payment Form -->
        <div>
          <div class="card" style="margin-bottom:1.5rem;">
            <h3 style="margin-bottom:1rem;">Billing Information</h3>

            <div class="form-row">
              <div class="form-group">
                <label>First Name</label>
                <input class="form-control" id="pay-first" type="text"
                  value="${state.guardian.firstName || ''}" placeholder="First name">
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input class="form-control" id="pay-last" type="text"
                  value="${state.guardian.lastName || ''}" placeholder="Last name">
              </div>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input class="form-control" id="pay-email" type="email"
                value="${state.guardian.email || ''}" placeholder="your@email.com">
            </div>
          </div>

          <div class="card">
            <h3 style="margin-bottom:1rem;">
              ${isCamp && campPrice > 0 ? 'Card Details' : 'Confirm Your Booking'}
            </h3>

            ${isCamp && campPrice > 0 ? `
              <!-- Stripe Card Element mount point -->
              <div class="form-group">
                <label>Card Information</label>
                <div id="stripe-card-element"></div>
                <div id="stripe-card-error" class="form-error" style="display:none;"></div>
              </div>

              <div class="secure-badge">
                <i class="bi bi-lock"></i> Payments secured by <strong style="margin-left:4px;">Stripe</strong>
              </div>
            ` : `
              <div class="alert alert-success">
                <i class="bi bi-gift"></i> <strong>Your initial evaluation is complimentary!</strong><br>
                No payment is required today. Jasmine will meet with you and your child,
                then discuss any recommended next steps and associated fees.
              </div>
            `}

            <div id="payment-error" class="alert alert-error" style="display:none;margin-top:1rem;"></div>

            <button class="btn btn-blue btn-lg" style="width:100%;justify-content:center;margin-top:1.5rem;"
              id="pay-btn" onclick="submitPayment()">
              ${isCamp && campPrice > 0
                ? `<i class="bi bi-lock"></i> Pay $${campPrice.toLocaleString()} Securely`
                : '<i class="bi bi-check-circle"></i> Confirm My Evaluation'}
            </button>

            <p class="text-center text-muted text-sm mt-2">
              ${isCamp
                ? 'By clicking Pay, you agree to our cancellation policy. Full refunds available up to 7 days before camp.'
                : 'We\'ll send a confirmation email with all the details. You can reschedule up to 48 hours in advance.'}
            </p>
          </div>
        </div>

        <!-- Order Summary -->
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
                <span><i class="bi bi-person"></i> ${c.firstName || `Child ${i+1}`}, age ${c.age}</span>
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
              <div style="font-size:0.8rem;color:var(--text-muted);margin-top:0.25rem;">
                ${state.selectedDate ? formatDisplayDate(state.selectedDate) : '—'} at ${state.selectedTime || '—'}
              </div>
            </div>
            ${state.children.map(c => `
              <div class="order-row">
                <span><i class="bi bi-person"></i> ${c.firstName || 'Child'}, age ${c.age}</span>
                <span style="color:var(--success);font-weight:600;">Complimentary</span>
              </div>
            `).join('')}
            <div class="order-row order-total">
              <span>Total Today</span>
              <span style="color:var(--success);">$0.00</span>
            </div>
          `}

          <div class="divider"></div>

          <div style="display:flex;flex-direction:column;gap:0.6rem;">
            <div style="font-size:0.8rem;color:var(--text-muted);display:flex;gap:0.5rem;align-items:flex-start;">
              <i class="bi bi-check2" style="color:var(--success);flex-shrink:0;"></i> Confirmation email sent immediately
            </div>
            <div style="font-size:0.8rem;color:var(--text-muted);display:flex;gap:0.5rem;align-items:flex-start;">
              <i class="bi bi-check2" style="color:var(--success);flex-shrink:0;"></i> Add to calendar on next screen
            </div>
            ${isCamp ? `
              <div style="font-size:0.8rem;color:var(--text-muted);display:flex;gap:0.5rem;align-items:flex-start;">
                <i class="bi bi-check2" style="color:var(--success);flex-shrink:0;"></i> Full refund if cancelled 7+ days before
              </div>
            ` : `
              <div style="font-size:0.8rem;color:var(--text-muted);display:flex;gap:0.5rem;align-items:flex-start;">
                <i class="bi bi-check2" style="color:var(--success);flex-shrink:0;"></i> Reschedule up to 48 hours before
              </div>
            `}
          </div>

          <div class="divider"></div>

          <div class="alert alert-info" style="font-size:0.8rem;padding:0.75rem;">
            <i class="bi bi-telephone"></i> Questions? Call us at <strong>(555) 555-5555</strong> or email
            <strong>info@toysfortalking.com</strong>
          </div>
        </div>
      </div>
    </div>
  `;
}

function initStripe() {
  // Check if Stripe is available (loaded via CDN)
  if (typeof Stripe === 'undefined') {
    const cardEl = document.getElementById('stripe-card-element');
    if (cardEl) {
      cardEl.innerHTML = `
        <div class="stripe-placeholder">
          <div class="stripe-logo"><i class="bi bi-credit-card" style="font-size:1.75rem;color:var(--primary);"></i></div>
          <p style="font-size:0.875rem;color:var(--text-muted);margin:0;">
            Stripe payment form will appear here.<br>
            <small>Add your Stripe publishable key to enable live payments.</small>
          </p>
        </div>
      `;
    }
    return;
  }

  // Use env-injected key or a placeholder
  const pubKey = window.STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder';
  try {
    stripeInstance = Stripe(pubKey);
    const elements = stripeInstance.elements({
      fonts: [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap' }]
    });
    stripeCardElement = elements.create('card', {
      style: {
        base: {
          fontSize: '16px',
          fontFamily: '"Inter", sans-serif',
          color: '#2C3E50',
          '::placeholder': { color: '#8FA3B1' }
        }
      }
    });
    const mountEl = document.getElementById('stripe-card-element');
    if (mountEl) stripeCardElement.mount('#stripe-card-element');
  } catch (e) {
    console.warn('Stripe init error:', e);
  }
}

async function submitPayment() {
  if (paymentProcessing) return;
  const state = window.AppState;
  const isCamp = state.bookingType === 'camp';
  const errorEl = document.getElementById('payment-error');
  const payBtn = document.getElementById('pay-btn');

  errorEl.style.display = 'none';

  // Validate billing fields
  const firstName = document.getElementById('pay-first')?.value.trim();
  const lastName  = document.getElementById('pay-last')?.value.trim();
  const email     = document.getElementById('pay-email')?.value.trim();

  if (!firstName || !lastName || !email) {
    errorEl.style.display = 'flex';
    errorEl.textContent = 'Please fill in your billing information.';
    return;
  }

  // If eval (no charge), skip Stripe
  if (!isCamp || (isCamp && state.selectedCamp && state.selectedCamp.price === 0)) {
    confirmBooking();
    return;
  }

  // Attempt Stripe payment
  paymentProcessing = true;
  payBtn.disabled = true;
  payBtn.innerHTML = '<span class="spinner"></span> Processing…';

  if (!stripeInstance || !stripeCardElement) {
    // Demo mode — simulate payment
    await new Promise(r => setTimeout(r, 1800));
    paymentProcessing = false;
    confirmBooking();
    return;
  }

  try {
    // In production, you'd create a PaymentIntent on your server first
    // and use the client_secret here. For now we simulate.
    const { error } = await stripeInstance.createPaymentMethod({
      type: 'card',
      card: stripeCardElement,
      billing_details: { name: `${firstName} ${lastName}`, email }
    });

    if (error) {
      const cardErrorEl = document.getElementById('stripe-card-error');
      if (cardErrorEl) { cardErrorEl.textContent = error.message; cardErrorEl.style.display = 'block'; }
      payBtn.disabled = false;
      payBtn.innerHTML = `<i class="bi bi-lock"></i> Pay $${(state.selectedCamp.price * state.children.length).toLocaleString()} Securely`;
      paymentProcessing = false;
      return;
    }

    confirmBooking();
  } catch (e) {
    errorEl.style.display = 'flex';
    errorEl.textContent = 'An error occurred. Please try again or contact us.';
    payBtn.disabled = false;
    payBtn.innerHTML = '<i class="bi bi-lock"></i> Pay Securely';
    paymentProcessing = false;
  }
}

function confirmBooking() {
  paymentProcessing = false;
  window.AppState.paymentConfirmed = true;
  window.AppState.confirmationId = 'TFT-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  window.location.hash = '#/confirmation';
}
