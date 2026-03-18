const EVAL_PRICE = 149;

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
  const evalPrice = EVAL_PRICE * numKids;
  const totalPrice = isCamp ? campPrice : evalPrice;

  return `
    <div class="page-header">
      <h1><i class="bi bi-lock"></i> Secure Checkout</h1>
      <p>${isCamp ? 'Complete your camp registration' : 'Complete your evaluation registration'}</p>
    </div>

    <div style="max-width:1000px;margin:0 auto;padding:2.5rem 1.5rem;">
      <div class="payment-grid">

        <!-- Left: Review & Pay -->
        <div>
          <div class="card">
            <h3 style="margin-bottom:1rem;">Review Your Order</h3>

            ${isCamp && state.selectedCamp ? `
              <div style="display:flex;gap:0.75rem;align-items:center;padding-bottom:1rem;border-bottom:1px solid var(--border);margin-bottom:1rem;">
                <span style="font-size:1.5rem;"><i class="bi ${state.selectedCamp.icon}"></i></span>
                <div>
                  <div style="font-weight:700;font-size:0.9rem;">${state.selectedCamp.name}</div>
                  <div style="font-size:0.8rem;color:var(--text-muted);">${state.selectedCamp.subtitle}</div>
                  <div style="font-size:0.8rem;color:var(--text-muted);">${state.selectedCamp.dates}</div>
                </div>
              </div>
              ${state.children.map((c, i) => `
                <div class="order-row">
                  <span><i class="bi bi-person"></i> ${c.firstName || 'Child ' + (i + 1)}, age ${c.age}</span>
                  <span>$${state.selectedCamp.price}</span>
                </div>
              `).join('')}
              <div class="order-row order-total" style="margin-top:0.5rem;">
                <span>Total</span>
                <span>$${campPrice.toLocaleString()}</span>
              </div>
            ` : `
              <div style="padding-bottom:1rem;border-bottom:1px solid var(--border);margin-bottom:1rem;">
                <div style="font-weight:700;font-size:0.9rem;"><i class="bi bi-clipboard-check"></i> Speech &amp; Language Evaluation</div>
                <div style="font-size:0.8rem;color:var(--text-muted);margin-top:0.25rem;">English &amp; Spanish available · DFW area</div>
              </div>
              ${state.children.map((c, i) => `
                <div class="order-row">
                  <span><i class="bi bi-person"></i> ${c.firstName || 'Child ' + (i + 1)}, age ${c.age}</span>
                  <span>$${EVAL_PRICE}</span>
                </div>
              `).join('')}
              <div class="order-row order-total" style="margin-top:0.5rem;">
                <span>Total</span>
                <span>$${evalPrice.toLocaleString()}</span>
              </div>
            `}

            <div class="divider"></div>

            <!-- Stripe redirect button -->
            <div style="text-align:center;">
              <p style="font-size:0.875rem;color:var(--text-muted);margin-bottom:1.25rem;">
                You'll be taken to Stripe's secure checkout to complete your payment.
                ${isCamp
                  ? 'Full refunds available up to 7 days before camp starts.'
                  : 'After payment, Jasmine will call you to confirm your evaluation time and location.'}
              </p>
              <button class="btn btn-blue btn-lg" style="width:100%;justify-content:center;" onclick="proceedToStripe()">
                <i class="bi bi-lock"></i> Pay $${totalPrice.toLocaleString()} with Stripe
              </button>
              <div class="secure-badge" style="margin-top:1rem;">
                <i class="bi bi-shield-check"></i> Secured by <strong style="margin-left:4px;">Stripe</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Order Summary -->
        <div class="card order-summary-card">
          <h4 style="margin-bottom:1rem;">Order Summary</h4>

          ${isCamp && state.selectedCamp ? `
            <div style="display:flex;gap:0.75rem;align-items:center;padding-bottom:1rem;border-bottom:1px solid var(--border);margin-bottom:1rem;">
              <span style="font-size:1.5rem;"><i class="bi ${state.selectedCamp.icon}"></i></span>
              <div>
                <div style="font-weight:700;font-size:0.9rem;">${state.selectedCamp.name}</div>
                <div style="font-size:0.8rem;color:var(--text-muted);">${state.selectedCamp.subtitle}</div>
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
              <div style="font-size:0.8rem;color:var(--text-muted);margin-top:0.25rem;">English &amp; Spanish available · DFW area</div>
              <div style="font-size:0.8rem;color:var(--text-muted);margin-top:0.15rem;">Jasmine will call you to schedule time &amp; location</div>
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

          <div style="display:flex;flex-direction:column;gap:0.6rem;">
            <div style="font-size:0.8rem;color:var(--text-muted);display:flex;gap:0.5rem;align-items:flex-start;">
              <i class="bi bi-check2" style="color:var(--success);flex-shrink:0;"></i> Confirmation email sent immediately
            </div>
            ${isCamp ? `
              <div style="font-size:0.8rem;color:var(--text-muted);display:flex;gap:0.5rem;align-items:flex-start;">
                <i class="bi bi-check2" style="color:var(--success);flex-shrink:0;"></i> Full refund if cancelled 7+ days before camp
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
  `;
}

function proceedToStripe() {
  const state = window.AppState;
  const isCamp = state.bookingType === 'camp';
  const numKids = state.children.length;

  // Generate confirmation ID now so it's ready when we return
  state.confirmationId = 'TFT-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  state.paymentConfirmed = true;

  // Persist booking state to localStorage before leaving the page
  localStorage.setItem('tft_booking', JSON.stringify(state));

  // Build the Stripe Payment Link URL
  let stripeUrl;
  if (isCamp && state.selectedCamp && state.selectedCamp.stripeLink) {
    stripeUrl = state.selectedCamp.stripeLink;
  } else {
    stripeUrl = window.EVAL_STRIPE_LINK;
  }

  // Pre-fill quantity if registering multiple children
  if (numKids > 1) {
    stripeUrl += '?prefilled_quantity=' + numKids;
  }

  window.location.href = stripeUrl;
}

// Legacy — kept so old references don't break
function initStripe() {}
