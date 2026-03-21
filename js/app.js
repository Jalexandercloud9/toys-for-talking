// =====================================================
// TOYS FOR TALKING — SPA Router
// =====================================================

function navigate(hash) {
  window.location.hash = hash;
}

function getRoute() {
  const hash = window.location.hash || '#/';
  return hash.split('?')[0]; // strip query params
}

function renderPage() {
  const route = getRoute();
  const contentEl = document.getElementById('page-content');
  const navbarEl  = document.getElementById('navbar');

  // Re-render navbar (updates active link)
  if (navbarEl) navbarEl.innerHTML = renderNavbar();

  // Scroll to top on navigation
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Route matching
  switch (route) {
    case '#/':
    case '#':
    case '':
      contentEl.innerHTML = renderHome();
      break;

    case '#/about':
      contentEl.innerHTML = renderAbout();
      break;

    case '#/book-camp':
      // Only reset if arriving fresh (not returning from payment to edit)
      if (window._lastRoute !== '#/book-camp' && window._lastRoute !== '#/payment') {
        campStep = 1;
        window.AppState.selectedCamp = null;
        window.AppState.children = [];
      }
      contentEl.innerHTML = renderBookCamp();
      break;

    case '#/book-evaluation':
      // Only reset if arriving fresh (not returning from payment to edit)
      if (window._lastRoute !== '#/book-evaluation' && window._lastRoute !== '#/payment') {
        evalStep = 1;
        window.AppState.children = [];
      }
      contentEl.innerHTML = renderBookEvaluation();
      break;

    case '#/payment':
      contentEl.innerHTML = renderPayment();
      // Initialize Stripe after DOM renders
      setTimeout(initStripe, 100);
      break;

    case '#/confirmation':
      contentEl.innerHTML = renderConfirmation();
      break;

    case '#/refund-policy':
      contentEl.innerHTML = renderRefundPolicy();
      break;

    case '#/privacy-policy':
      contentEl.innerHTML = renderPrivacyPolicy();
      break;

    default:
      contentEl.innerHTML = `
        <div class="booking-container" style="text-align:center;padding:5rem 1.5rem;">
          <div style="font-size:4rem;margin-bottom:1rem;">🔍</div>
          <h2>Page Not Found</h2>
          <p style="margin-bottom:1.5rem;">The page you're looking for doesn't exist.</p>
          <a href="#/" class="btn btn-blue">Go Home</a>
        </div>
      `;
  }

  window._lastRoute = route;
}

// Listen for hash changes (back/forward navigation)
window.addEventListener('hashchange', renderPage);

// On load: check if returning from Stripe payment, then render
window.addEventListener('load', function () {
  if (window.location.search.includes('payment=success')) {
    // Restore booking state saved before redirecting to Stripe
    try {
      const saved = localStorage.getItem('tft_booking');
      if (saved) {
        Object.assign(window.AppState, JSON.parse(saved));
        localStorage.removeItem('tft_booking');
      }
    } catch (e) {}
    // Send customer confirmation email
    if (window.sendBookingEmails) {
      window.sendBookingEmails(window.AppState);
    }
    // Log full booking details to Google Sheets via Zapier
    if (window.logBookingToZapier) {
      window.logBookingToZapier(window.AppState);
    }
    // Swap the URL to the confirmation hash without a full reload
    window.history.replaceState(null, '', window.location.pathname + '#/confirmation');
    renderPage();
    return;
  }
  renderPage();
});

// Also handle direct link clicks via navigate()
window.navigate = navigate;
