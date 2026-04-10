function renderParentResources() {
  return `
    <div class="page-header">
      <h1><i class="bi bi-gift"></i> Free Parent Resources</h1>
      <p>Tools and strategies to help your child find their voice — delivered straight to your inbox.</p>
    </div>

    <div class="booking-container">

      <!-- Resource Cards -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:2.5rem;">

        <div class="card" style="border-top:4px solid var(--primary);">
          <h3 style="font-size:1.1rem;margin-bottom:0.5rem;color:var(--text);">Talking Steps Guide</h3>
          <p style="font-size:0.875rem;color:var(--text-light);line-height:1.6;">
            Every child reaches communication milestones at their own pace — but how do you know if your child is on track? This free guide walks you through the key early talking stages and gives you simple, everyday techniques to gently encourage each next step. Plus, learn which common habits may be slowing things down — and what to do instead.
          </p>
          <div style="margin-top:1rem;font-size:0.8rem;color:var(--primary);font-weight:600;">
            <i class="bi bi-download"></i> Instant PDF Download
          </div>
        </div>

        <div class="card" style="border-top:4px solid var(--accent,#6C9E8E);">
          <h3 style="font-size:1.1rem;margin-bottom:0.5rem;color:var(--text);">FREE 5-Minute Speech Boost</h3>
          <p style="font-size:0.875rem;color:var(--text-light);line-height:1.6;">
            You don't need hours of practice to make a difference. This free mini-course reveals 3 simple strategies you can use during everyday moments — meals, playtime, bath time — to boost your child's communication in just 5 minutes a day. No special equipment, no therapy degree required.
          </p>
          <div style="margin-top:1rem;font-size:0.8rem;color:var(--accent,#6C9E8E);font-weight:600;">
            <i class="bi bi-envelope"></i> Delivered to Your Inbox
          </div>
        </div>

      </div>

      <!-- Sign-up Form -->
      <div class="card" id="resources-form-card">
        <h3 style="margin-bottom:0.25rem;font-size:1.15rem;">Get Your Free Resources</h3>
        <p style="color:var(--text-light);font-size:0.875rem;margin-bottom:1.5rem;">
          Select what you'd like below and we'll send it right over.
        </p>

        <div class="form-group">
          <label>Your Name <span class="required">*</span></label>
          <input class="form-control" id="res-name" type="text" placeholder="First and last name"
            oninput="validateResourcesForm()">
        </div>

        <div class="form-group">
          <label>Email Address <span class="required">*</span></label>
          <input class="form-control" id="res-email" type="email" placeholder="you@example.com"
            oninput="validateResourcesForm()">
        </div>

        <div class="form-group">
          <label style="margin-bottom:0.75rem;display:block;">I'd like to receive: <span class="required">*</span></label>
          <div style="display:flex;flex-direction:column;gap:0.75rem;">
            <label style="display:flex;align-items:flex-start;gap:0.75rem;cursor:pointer;font-size:0.9rem;color:var(--text-light);">
              <input type="checkbox" id="res-guide" style="margin-top:2px;flex-shrink:0;width:18px;height:18px;cursor:pointer;" onchange="validateResourcesForm()">
              <span><strong style="color:var(--text);">Talking Steps Guide</strong> — free PDF download</span>
            </label>
            <label style="display:flex;align-items:flex-start;gap:0.75rem;cursor:pointer;font-size:0.9rem;color:var(--text-light);">
              <input type="checkbox" id="res-course" style="margin-top:2px;flex-shrink:0;width:18px;height:18px;cursor:pointer;" onchange="validateResourcesForm()">
              <span><strong style="color:var(--text);">FREE 5-Minute Speech Boost Course</strong> — 3 strategies sent to your inbox</span>
            </label>
          </div>
          <div id="res-check-error" style="display:none;color:var(--error);font-size:0.8rem;margin-top:0.5rem;">
            Please select at least one resource.
          </div>
        </div>

        <p style="font-size:0.78rem;color:var(--text-light);margin-bottom:1.25rem;">
          By submitting, you agree to receive occasional tips and resources from Toys for Talking. You can unsubscribe at any time.
        </p>

        <div id="res-error" class="alert alert-error" style="display:none;margin-bottom:1rem;"></div>

        <button id="res-submit-btn" class="btn btn-blue" style="width:100%;" onclick="submitResourcesForm()" disabled>
          Send My Free Resources <i class="bi bi-arrow-right"></i>
        </button>
      </div>

      <!-- Success State -->
      <div id="resources-success" style="display:none;">
        <div class="card" style="text-align:center;padding:3rem 2rem;">
          <div style="width:64px;height:64px;background:var(--success);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;">
            <i class="bi bi-check-lg" style="font-size:2rem;color:white;"></i>
          </div>

          <h2 style="margin-bottom:0.5rem;">You're all set!</h2>
          <p style="color:var(--text-light);margin-bottom:2rem;">
            Check your inbox — your resources are on the way. If you don't see them, check your spam folder and mark us as "Not Spam."
          </p>
          <div id="guide-download-btn" style="display:none;margin-bottom:1rem;">
            <a href="assets/docs/talking-steps-guide.pdf" download="Talking-Steps-Guide.pdf"
              class="btn btn-blue" style="width:100%;max-width:340px;">
              <i class="bi bi-download"></i> Download Your Talking Steps Guide
            </a>
          </div>
          <a href="#/" class="btn btn-ghost">Back to Home</a>
        </div>
      </div>

    </div>
  `;
}

function validateResourcesForm() {
  const name    = document.getElementById('res-name')?.value.trim();
  const email   = document.getElementById('res-email')?.value.trim();
  const guide   = document.getElementById('res-guide')?.checked;
  const course  = document.getElementById('res-course')?.checked;
  const btn     = document.getElementById('res-submit-btn');
  const checkErr = document.getElementById('res-check-error');

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const atLeastOne = guide || course;

  if (checkErr) checkErr.style.display = atLeastOne ? 'none' : '';
  if (btn) btn.disabled = !(name && emailValid && atLeastOne);
}

async function submitResourcesForm() {
  const btn     = document.getElementById('res-submit-btn');
  const errEl   = document.getElementById('res-error');
  const name    = document.getElementById('res-name').value.trim();
  const email   = document.getElementById('res-email').value.trim();
  const wantsGuide  = document.getElementById('res-guide').checked;
  const wantsCourse = document.getElementById('res-course').checked;

  btn.disabled = true;
  btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending…';
  errEl.style.display = 'none';

  const resourceList = [
    wantsGuide  ? 'Talking Steps Guide (PDF)'       : null,
    wantsCourse ? 'FREE 5-Minute Speech Boost Course' : null,
  ].filter(Boolean).join(', ');

  try {
    // Notify Jasmine of new lead via EmailJS
    await emailjs.send(EMAILJS_SERVICE_ID, 'template_resources', {
      parent_name:   name,
      parent_email:  email,
      resources:     resourceList,
      reply_to:      email,
    }, EMAILJS_PUBLIC_KEY);
  } catch (e) {
    console.warn('[TFT] EmailJS resources notification failed:', e);
    // Don't block the user — still show success
  }

  // Log to Zapier if webhook configured
  try {
    if (ZAPIER_WEBHOOK_URL) {
      fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'parent_resource_signup',
          name,
          email,
          resources: resourceList,
          timestamp: new Date().toISOString(),
        }),
      });
    }
  } catch(e) {}

  // Show success
  document.getElementById('resources-form-card').style.display = 'none';
  const successEl = document.getElementById('resources-success');
  successEl.style.display = 'block';

  // Show immediate PDF download if they selected the guide
  if (wantsGuide) {
    document.getElementById('guide-download-btn').style.display = 'block';
  }

  window.scrollToTop();
}
