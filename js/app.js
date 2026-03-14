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
      campStep = 1; // reset to step 1 on fresh visit
      if (window._lastRoute !== '#/book-camp') {
        window.AppState.selectedCamp = null;
        window.AppState.children = [];
      }
      contentEl.innerHTML = renderBookCamp();
      break;

    case '#/book-evaluation':
      evalStep = 1;
      if (window._lastRoute !== '#/book-evaluation') {
        window.AppState.selectedDate = null;
        window.AppState.selectedTime = null;
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
window.addEventListener('load', renderPage);

// Also handle direct link clicks via navigate()
window.navigate = navigate;
