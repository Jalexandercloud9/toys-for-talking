function renderRefundPolicy() {
  return `
    <div class="page-header">
      <h1>Payment &amp; Refund Policy</h1>
      <p>Please read before completing your registration.</p>
    </div>
    <div class="booking-container">
      <div class="card" style="padding:2rem;text-align:center;color:var(--text-muted);">
        <i class="bi bi-file-earmark-text" style="font-size:3rem;display:block;margin-bottom:1rem;"></i>
        <p style="font-size:1rem;">Policy details coming soon.</p>
      </div>
      <div style="text-align:center;margin-top:1.5rem;">
        <button class="btn btn-ghost" onclick="history.back()">
          <i class="bi bi-arrow-left"></i> Go Back
        </button>
      </div>
    </div>
  `;
}
