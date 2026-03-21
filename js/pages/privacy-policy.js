function renderPrivacyPolicy() {
  return `
    <div class="page-header">
      <h1>Privacy Policy</h1>
      <p>Last updated: March 2026</p>
    </div>
    <div class="booking-container" style="max-width:760px;">
      <div class="card" style="margin-bottom:1.5rem;">

        <p style="font-size:0.9rem;color:var(--text-light);line-height:1.7;margin-bottom:1.5rem;">
          Toys for Talking / J.Alexander Communication &amp; Education PLC ("we," "us," or "our") is committed to protecting your privacy. This policy explains what information we collect when you use our website, how we use it, and how it is protected.
        </p>

        <div class="divider"></div>

        <div style="display:flex;flex-direction:column;gap:1.5rem;margin-top:1.5rem;">

          <div>
            <h4 style="margin-bottom:0.4rem;">Information We Collect</h4>
            <p style="font-size:0.9rem;color:var(--text-light);line-height:1.7;margin-bottom:0.5rem;">When you register for a camp or book an evaluation, we collect:</p>
            <ul style="font-size:0.9rem;color:var(--text-light);line-height:1.8;margin:0;padding-left:1.25rem;">
              <li>Parent / guardian name, email address, phone number, and mailing address</li>
              <li>Child's first name, age, and reason for seeking services</li>
              <li>For evaluations: preferred language, prior therapy history, and any relevant notes or diagnoses provided by you</li>
              <li>Payment information — processed securely by Stripe; we never see or store your card details</li>
            </ul>
          </div>

          <div>
            <h4 style="margin-bottom:0.4rem;">How We Use Your Information</h4>
            <ul style="font-size:0.9rem;color:var(--text-light);line-height:1.8;margin:0;padding-left:1.25rem;">
              <li>To confirm and manage your registration or evaluation appointment</li>
              <li>To send you a booking confirmation email</li>
              <li>To contact you regarding your booking (session times, location, follow-up)</li>
              <li>To maintain an internal record of bookings for program management</li>
            </ul>
          </div>

          <div>
            <h4 style="margin-bottom:0.4rem;">Third-Party Services</h4>
            <p style="font-size:0.9rem;color:var(--text-light);line-height:1.7;margin-bottom:0.5rem;">We use the following trusted third-party services to operate our booking system:</p>
            <ul style="font-size:0.9rem;color:var(--text-light);line-height:1.8;margin:0;padding-left:1.25rem;">
              <li><strong>Stripe</strong> — secure payment processing. Your payment data is handled entirely by Stripe and subject to <a href="https://stripe.com/privacy" target="_blank" rel="noopener" style="color:var(--primary);">Stripe's Privacy Policy</a>.</li>
              <li><strong>EmailJS</strong> — sends your booking confirmation email directly from the browser.</li>
              <li><strong>Zapier &amp; Google Sheets</strong> — booking details are logged to a private, secured spreadsheet accessible only to Jasmine Alexander for program management purposes.</li>
            </ul>
          </div>

          <div>
            <h4 style="margin-bottom:0.4rem;">Data Storage &amp; Security</h4>
            <p style="font-size:0.9rem;color:var(--text-light);line-height:1.7;margin:0;">
              Your information is stored in a private Google Sheet accessible only to the business owner. We do not operate a database or server that stores your data beyond this. Booking state is temporarily stored in your browser's local storage during checkout and is cleared after the transaction completes.
            </p>
          </div>

          <div>
            <h4 style="margin-bottom:0.4rem;">We Do Not Sell Your Data</h4>
            <p style="font-size:0.9rem;color:var(--text-light);line-height:1.7;margin:0;">
              We do not sell, rent, share, or trade your personal information with any third party for marketing or commercial purposes.
            </p>
          </div>

          <div>
            <h4 style="margin-bottom:0.4rem;">Cookies &amp; Tracking</h4>
            <p style="font-size:0.9rem;color:var(--text-light);line-height:1.7;margin:0;">
              This site does not use advertising or analytics cookies. Stripe may set functional cookies necessary to process your payment securely. We do not use Google Analytics, Facebook Pixel, or any other third-party tracking tools.
            </p>
          </div>

          <div>
            <h4 style="margin-bottom:0.4rem;">Children's Privacy</h4>
            <p style="font-size:0.9rem;color:var(--text-light);line-height:1.7;margin:0;">
              All services on this site are booked by a parent or legal guardian on behalf of a child. We do not knowingly collect personal information directly from children. Information about a child (name, age, concerns) is provided by their guardian solely for the purpose of delivering the booked service.
            </p>
          </div>

          <div>
            <h4 style="margin-bottom:0.4rem;">Your Rights</h4>
            <p style="font-size:0.9rem;color:var(--text-light);line-height:1.7;margin:0;">
              You may request to view, update, or delete your personal information at any time by contacting us at <a href="mailto:toysfortalking@gmail.com" style="color:var(--primary);">toysfortalking@gmail.com</a>.
            </p>
          </div>

          <div>
            <h4 style="margin-bottom:0.4rem;">Contact</h4>
            <p style="font-size:0.9rem;color:var(--text-light);line-height:1.7;margin:0;">
              If you have any questions about this Privacy Policy, please contact us:<br>
              <strong>Jasmine Alexander, CCC-SLP</strong><br>
              J.Alexander Communication &amp; Education PLC<br>
              <a href="mailto:toysfortalking@gmail.com" style="color:var(--primary);">toysfortalking@gmail.com</a> &nbsp;·&nbsp;
              <a href="tel:+12143950109" style="color:var(--primary);">(214) 395-0109</a>
            </p>
          </div>

        </div>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-top:0.5rem;">
        <button class="btn btn-ghost" onclick="history.back()">
          <i class="bi bi-arrow-left"></i> Go Back
        </button>
        <a href="#/refund-policy" class="btn btn-ghost">
          <i class="bi bi-file-earmark-text"></i> Payment &amp; Refund Policy
        </a>
      </div>
    </div>
  `;
}
