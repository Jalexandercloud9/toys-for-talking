function renderRefundPolicy() {
  return `
    <div class="page-header">
      <h1>Payment &amp; Refund Policy</h1>
      <p>Please read carefully before completing your registration or booking.</p>
    </div>
    <div class="booking-container" style="max-width:760px;">

      <!-- ── CAMP POLICY ── -->
      <div class="card" style="margin-bottom:1.5rem;">
        <h2 style="margin-bottom:0.25rem;font-size:1.25rem;">
          <i class="bi bi-sun" style="color:var(--primary);margin-right:0.5rem;"></i>
          Little Lamps Camp — Payment &amp; Refund Policy
        </h2>
        <p style="font-size:0.875rem;color:var(--text-muted);margin-bottom:1.5rem;">Applies to all in-person and virtual Little Lamps Speech Camp cohorts.</p>

        <div class="divider"></div>

        <div style="display:flex;flex-direction:column;gap:1.25rem;margin-top:1.25rem;">

          <div>
            <h4 style="margin-bottom:0.3rem;">Program Fee</h4>
            <p style="font-size:0.9rem;color:var(--text-light);margin:0;">The total fee for the 4-week Little Lamps Camp cohort is <strong>$199 per child</strong>. Full payment is required at the time of registration to reserve a spot.</p>
          </div>

          <div>
            <h4 style="margin-bottom:0.3rem;">Spot Reservation</h4>
            <p style="font-size:0.9rem;color:var(--text-light);margin:0;">Enrollment is limited; therefore, a child's spot is not secured until payment is received in full.</p>
          </div>

          <div>
            <h4 style="margin-bottom:0.3rem;">Refund Policy</h4>
            <ul style="font-size:0.9rem;color:var(--text-light);margin:0;padding-left:1.25rem;display:flex;flex-direction:column;gap:0.4rem;">
              <li>Cancellations made <strong>at least 7 days prior</strong> to the first session are eligible for a refund minus a <strong>$25 administrative fee</strong>.</li>
              <li>Cancellations made <strong>within 7 days</strong> of the first session are <strong>non-refundable</strong>.</li>
            </ul>
          </div>

          <div>
            <h4 style="margin-bottom:0.3rem;">After Program Begins</h4>
            <p style="font-size:0.9rem;color:var(--text-light);margin:0;">Once the cohort has started, no refunds or credits will be issued for missed sessions.</p>
          </div>

          <div>
            <h4 style="margin-bottom:0.3rem;">Missed Sessions</h4>
            <p style="font-size:0.9rem;color:var(--text-light);margin:0;">Due to the small group format and limited capacity, make-up sessions are not available.</p>
          </div>

          <div>
            <h4 style="margin-bottom:0.3rem;">Program Cancellation by Provider</h4>
            <p style="font-size:0.9rem;color:var(--text-light);margin:0;">If a session is canceled by Little Lamps Camp due to unforeseen circumstances, a make-up date or prorated refund will be provided.</p>
          </div>

          <div>
            <h4 style="margin-bottom:0.3rem;">Payment Method</h4>
            <p style="font-size:0.9rem;color:var(--text-light);margin:0;">Payment must be completed through the designated registration system. Spots are secured on a first-come, first-served basis.</p>
          </div>

          <div style="background:var(--bg);border-radius:0.5rem;padding:1rem;">
            <h4 style="margin-bottom:0.3rem;">Participation Policy</h4>
            <p style="font-size:0.9rem;color:var(--text-light);margin:0;">A caregiver must remain present and actively participate with their child for the full duration of each session.</p>
          </div>

        </div>
      </div>

      <!-- ── EVALUATION POLICY ── -->
      <div class="card" style="margin-bottom:1.5rem;">
        <h2 style="margin-bottom:0.25rem;font-size:1.25rem;">
          <i class="bi bi-clipboard2-pulse" style="color:var(--primary);margin-right:0.5rem;"></i>
          Speech Evaluation — Payment &amp; Refund Policy
        </h2>
        <p style="font-size:0.875rem;color:var(--text-muted);margin-bottom:1.5rem;">Applies to all speech &amp; language evaluation appointments.</p>

        <div class="divider"></div>

        <div style="display:flex;flex-direction:column;gap:1.25rem;margin-top:1.25rem;">

          <div>
            <h4 style="margin-bottom:0.3rem;">Payment</h4>
            <p style="font-size:0.9rem;color:var(--text-light);margin:0;">Full payment is required at the time of booking to reserve your child's evaluation appointment.</p>
          </div>

          <div>
            <h4 style="margin-bottom:0.3rem;">Rescheduling</h4>
            <p style="font-size:0.9rem;color:var(--text-light);margin:0;">Appointments may be rescheduled with at least <strong>24 hours' notice</strong>, based on availability.</p>
          </div>

          <div>
            <h4 style="margin-bottom:0.3rem;">Cancellations &amp; Refunds</h4>
            <ul style="font-size:0.9rem;color:var(--text-light);margin:0;padding-left:1.25rem;display:flex;flex-direction:column;gap:0.4rem;">
              <li>Cancellations made <strong>at least 24 hours in advance</strong> are eligible for a refund minus a <strong>$25 administrative fee</strong>.</li>
              <li>Cancellations made <strong>less than 24 hours</strong> before the scheduled appointment are <strong>non-refundable</strong>.</li>
            </ul>
          </div>

          <div>
            <h4 style="margin-bottom:0.3rem;">Missed Appointments</h4>
            <p style="font-size:0.9rem;color:var(--text-light);margin:0;">Missed appointments or no-shows are <strong>non-refundable</strong>.</p>
          </div>

          <div>
            <h4 style="margin-bottom:0.3rem;">Late Arrivals</h4>
            <p style="font-size:0.9rem;color:var(--text-light);margin:0;">If you arrive late, the session may be shortened to respect scheduled appointments. The full evaluation fee will still apply.</p>
          </div>

          <div>
            <h4 style="margin-bottom:0.3rem;">Provider Cancellation</h4>
            <p style="font-size:0.9rem;color:var(--text-light);margin:0;">If the evaluation must be canceled by the provider, you will be offered the option to reschedule or receive a <strong>full refund</strong>.</p>
          </div>

        </div>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-top:0.5rem;">
        <button class="btn btn-ghost" onclick="history.back()">
          <i class="bi bi-arrow-left"></i> Go Back
        </button>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
          <a href="#/book-camp" class="btn btn-ghost">
            <i class="bi bi-sun"></i> Book Speech Camp
          </a>
          <a href="#/book-evaluation" class="btn btn-blue">
            <i class="bi bi-clipboard2-pulse"></i> Book Evaluation
          </a>
        </div>
      </div>

    </div>
  `;
}
