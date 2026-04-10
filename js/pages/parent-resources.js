const SPEECH_BOOST_VIDEO = 'SfW9xy4Fal8';
const GUIDE_URL = 'assets/docs/talking-steps-guide.pdf';
const GUIDE_FULL_URL = 'https://toysfortalkingslp.com/assets/docs/talking-steps-guide.pdf';
const SPEECH_BOOST_VIDEO_URL = 'https://www.youtube.com/watch?v=' + SPEECH_BOOST_VIDEO;

function renderParentResources() {
  return `
    <div class="page-header">
      <h1><i class="bi bi-gift"></i> Free Parent Resources</h1>
      <p>Tools and strategies to help your child find their voice — delivered straight to your inbox.</p>
    </div>

    <div class="booking-container">

      <p style="text-align:center;color:var(--text-light);font-size:0.95rem;margin-bottom:1.25rem;">
        Fill out the form below to unlock your free resources instantly.
      </p>

      <!-- Resource Cards -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:2.5rem;">

        <div class="card" style="border-top:4px solid var(--primary);opacity:0.85;">
          <div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--primary);margin-bottom:0.5rem;">What you'll receive</div>
          <h3 style="font-size:1.1rem;margin-bottom:0.5rem;color:var(--text);">Talking Steps Guide</h3>
          <p style="font-size:0.875rem;color:var(--text-light);line-height:1.6;">
            Every child reaches communication milestones at their own pace — but how do you know if your child is on track? This free guide walks you through the key early talking stages and gives you simple, everyday techniques to gently encourage each next step. Plus, learn which common habits may be slowing things down — and what to do instead.
          </p>
        </div>

        <div class="card" style="border-top:4px solid var(--accent,#6C9E8E);opacity:0.85;">
          <div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--accent,#6C9E8E);margin-bottom:0.5rem;">What you'll receive</div>
          <h3 style="font-size:1.1rem;margin-bottom:0.5rem;color:var(--text);">FREE 5-Minute Speech Boost</h3>
          <p style="font-size:0.875rem;color:var(--text-light);line-height:1.6;">
            You don't need hours of practice to make a difference. This free mini-course reveals 3 simple strategies you can use during everyday moments — meals, playtime, bath time — to boost your child's communication in just 5 minutes a day. No special equipment, no therapy degree required.
          </p>
        </div>

      </div>

      <!-- Sign-up Form -->
      <div class="card" id="resources-form-card">
        <h3 style="margin-bottom:0.25rem;font-size:1.15rem;">Get Your Free Resources</h3>
        <p style="color:var(--text-light);font-size:0.875rem;margin-bottom:1.5rem;">
          Select what you'd like below. Everything will be available instantly on this page and also emailed to you so you can save it for later.
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
              <span><strong style="color:var(--text);">FREE 5-Minute Speech Boost Course</strong> — watch the session instantly</span>
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
          Get My Free Resources <i class="bi bi-arrow-right"></i>
        </button>
      </div>

      <!-- Success State -->
      <div id="resources-success" style="display:none;">

        <!-- Confirmation banner -->
        <div class="alert alert-success" style="margin-bottom:1.5rem;display:flex;gap:0.75rem;align-items:flex-start;">
          <i class="bi bi-check-circle" style="font-size:1.25rem;flex-shrink:0;margin-top:1px;"></i>
          <div>
            <strong>You're all set!</strong> Your resources are also on their way to your inbox.
            If you don't see the email, check your spam folder and mark it as "Not Spam."
          </div>
        </div>

        <!-- PDF Download -->
        <div id="guide-download-section" style="display:none;margin-bottom:1.5rem;">
          <div class="card">
            <h3 style="font-size:1.05rem;margin-bottom:0.5rem;">Talking Steps Guide</h3>
            <p style="font-size:0.875rem;color:var(--text-light);margin-bottom:1.25rem;">
              Your guide is ready. Click below to download your PDF.
            </p>
            <a href="${GUIDE_URL}" download="Talking-Steps-Guide.pdf" class="btn btn-blue">
              <i class="bi bi-download"></i> Download Talking Steps Guide
            </a>
          </div>
        </div>

        <!-- Video -->
        <div id="video-section" style="display:none;margin-bottom:1.5rem;">
          <div class="card">
            <h3 style="font-size:1.05rem;margin-bottom:0.5rem;">FREE 5-Minute Speech Boost</h3>
            <p style="font-size:0.875rem;color:var(--text-light);margin-bottom:1.25rem;">
              Watch Jasmine's free session below and start using these strategies today.
            </p>
            <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:var(--radius);">
              <iframe
                src="https://www.youtube.com/embed/${SPEECH_BOOST_VIDEO}?rel=0"
                title="FREE 5-Minute Speech Boost Session"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:var(--radius);">
              </iframe>
            </div>
          </div>
        </div>

        <div style="text-align:center;margin-top:1rem;">
          <a href="#/" class="btn btn-ghost">Back to Home</a>
        </div>

      </div>

    </div>
  `;
}

function validateResourcesForm() {
  const name     = document.getElementById('res-name')?.value.trim();
  const email    = document.getElementById('res-email')?.value.trim();
  const guide    = document.getElementById('res-guide')?.checked;
  const course   = document.getElementById('res-course')?.checked;
  const btn      = document.getElementById('res-submit-btn');
  const checkErr = document.getElementById('res-check-error');

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const atLeastOne = guide || course;

  if (checkErr) checkErr.style.display = atLeastOne ? 'none' : '';
  if (btn) btn.disabled = !(name && emailValid && atLeastOne);
}

async function submitResourcesForm() {
  const btn         = document.getElementById('res-submit-btn');
  const errEl       = document.getElementById('res-error');
  const name        = document.getElementById('res-name').value.trim();
  const email       = document.getElementById('res-email').value.trim();
  const wantsGuide  = document.getElementById('res-guide').checked;
  const wantsCourse = document.getElementById('res-course').checked;

  btn.disabled = true;
  btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending…';
  errEl.style.display = 'none';

  const resourceList = [
    wantsGuide  ? 'Talking Steps Guide (PDF)'        : null,
    wantsCourse ? 'FREE 5-Minute Speech Boost Course' : null,
  ].filter(Boolean).join(', ');

  // Build email content listing what they're receiving
  const emailLines = [];
  if (wantsGuide)  emailLines.push('Talking Steps Guide (PDF): ' + GUIDE_FULL_URL);
  if (wantsCourse) emailLines.push('FREE 5-Minute Speech Boost Session: ' + SPEECH_BOOST_VIDEO_URL);

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, 'template_resources', {
      parent_name:    name,
      parent_email:   email,
      resources:      resourceList,
      resource_links: emailLines.join('\n\n'),
      guide_url:      wantsGuide  ? GUIDE_FULL_URL          : '',
      video_url:      wantsCourse ? SPEECH_BOOST_VIDEO_URL  : '',
      reply_to:       email,
    }, EMAILJS_PUBLIC_KEY);
  } catch (e) {
    console.warn('[TFT] EmailJS resources send failed:', e);
  }

  // Log to Zapier
  try {
    if (ZAPIER_WEBHOOK_URL) {
      fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'parent_resource_signup',
          name, email,
          resources: resourceList,
          timestamp: new Date().toISOString(),
        }),
      });
    }
  } catch(e) {}

  // Hide form, show success
  document.getElementById('resources-form-card').style.display = 'none';
  document.getElementById('resources-success').style.display = 'block';
  if (wantsGuide)  document.getElementById('guide-download-section').style.display = 'block';
  if (wantsCourse) document.getElementById('video-section').style.display = 'block';

  window.scrollToTop();
}
