function renderHome() {
  return `
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge">Little Lamps Speech Camp 2026 — Now Open</div>
        <h1>Every Child Deserves to Be Heard</h1>
        <p>
          Jasmine Alexander, Speech-Language Pathologist, coaches parents with
          the play-based strategies and professional guidance they need to
          support their child's speech and language development at home.
        </p>
        <div class="hero-buttons">
          <a href="#/book-camp" class="btn btn-primary btn-lg">
            <i class="bi bi-tent"></i> Book Speech Camp
          </a>
          <a href="#/book-evaluation" class="btn btn-outline btn-lg">
            <i class="bi bi-clipboard-check"></i> Schedule an Evaluation
          </a>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="section features">
      <div class="container">
        <h2 class="section-title">Why Families Choose Toys for Talking</h2>
        <p class="section-subtitle">
          Jasmine doesn't just work with your child — she equips you with the
          strategies and confidence to support your child's communication every day.
        </p>
        <div class="grid-3">
          <div class="card feature-card">
            <div class="card-icon"><i class="bi bi-patch-check"></i></div>
            <h3>Evidence-Based Practice</h3>
            <p>Every session is grounded in the latest speech-language pathology research and tailored to your child's unique needs.</p>
          </div>
          <div class="card feature-card">
            <div class="card-icon"><i class="bi bi-joystick"></i></div>
            <h3>Play-Based Learning</h3>
            <p>Children learn best when they're having fun. Our toy-driven approach makes therapy feel like playtime — not work.</p>
          </div>
          <div class="card feature-card">
            <div class="card-icon"><i class="bi bi-people"></i></div>
            <h3>Parent Coaching at the Core</h3>
            <p>You are your child's best teacher. Jasmine coaches parents directly on the strategies, language models, and play routines that make the biggest difference at home.</p>
          </div>
          <div class="card feature-card">
            <div class="card-icon"><i class="bi bi-clipboard-pulse"></i></div>
            <h3>Evaluations That Guide Next Steps</h3>
            <p>Not sure where your child stands? A professional speech evaluation pinpoints their specific needs and gives you a clear, practical roadmap for what to do next.</p>
          </div>
          <div class="card feature-card">
            <div class="card-icon"><i class="bi bi-award"></i></div>
            <h3>Licensed &amp; Certified SLP</h3>
            <p>Jasmine holds full ASHA certification and state licensure, with specialized training in early childhood language development.</p>
          </div>
          <div class="card feature-card">
            <div class="card-icon"><i class="bi bi-laptop"></i></div>
            <h3>In-Person &amp; Virtual</h3>
            <p>Flexible service delivery — meet in the DFW area or join virtually from anywhere. Same expert guidance, your schedule.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How We Can Support Your Family -->
    <section class="section" style="background:var(--bg-card);">
      <div class="container">
        <h2 class="section-title">How We Can Support Your Family</h2>
        <p class="section-subtitle">I offer two different ways to support your child's communication, depending on your needs.</p>

        <div class="grid-2" style="margin-top:2rem;gap:1.5rem;">
          <!-- Evaluation Card -->
          <div class="card" style="border-top:4px solid var(--primary);">
            <h3>Speech &amp; Language Evaluations</h3>
            <p style="font-size:0.9rem;color:var(--text-muted);font-weight:600;margin-bottom:0.75rem;text-transform:uppercase;letter-spacing:0.05em;">DFW Area · Under 18 · English &amp; Spanish</p>
            <p style="margin-bottom:1rem;">A professional, 1-hour clinical assessment to determine whether your child has a speech or language delay or disorder, and what support they need. $149.</p>
            <ul style="list-style:none;padding:0;margin-bottom:1.5rem;display:flex;flex-direction:column;gap:0.5rem;">
              <li style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;"><i class="bi bi-check2-circle" style="color:var(--success);flex-shrink:0;"></i> Comprehensive diagnostic evaluation</li>
              <li style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;"><i class="bi bi-check2-circle" style="color:var(--success);flex-shrink:0;"></i> Available in English and Spanish</li>
              <li style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;"><i class="bi bi-check2-circle" style="color:var(--success);flex-shrink:0;"></i> Only 1 hour of your time</li>
              <li style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;"><i class="bi bi-check2-circle" style="color:var(--success);flex-shrink:0;"></i> In-person in the DFW metroplex</li>
            </ul>
            <a href="#/book-evaluation" class="btn btn-blue">Schedule an Evaluation</a>
          </div>

          <!-- Camp Card -->
          <div class="card" style="border-top:4px solid var(--primary);">
            <h3>Little Lamps Speech Camp</h3>
            <p style="font-size:0.9rem;color:var(--text-muted);font-weight:600;margin-bottom:0.75rem;text-transform:uppercase;letter-spacing:0.05em;">Dallas In-Person &amp; Virtual</p>
            <p style="margin-bottom:1rem;">A parent coaching camp — Jasmine teaches you the play-based language strategies you can use at home every day. You leave each session with real tools, not just observations.</p>
            <ul style="list-style:none;padding:0;margin-bottom:1.5rem;display:flex;flex-direction:column;gap:0.5rem;">
              <li style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;"><i class="bi bi-check2-circle" style="color:var(--success);flex-shrink:0;"></i> Parents learn strategies they can use immediately</li>
              <li style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;"><i class="bi bi-check2-circle" style="color:var(--success);flex-shrink:0;"></i> Ages 0–4 · No prior diagnosis required</li>
              <li style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;"><i class="bi bi-check2-circle" style="color:var(--success);flex-shrink:0;"></i> In-person (Dallas) or virtual for any family</li>
              <li style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;"><i class="bi bi-check2-circle" style="color:var(--success);flex-shrink:0;"></i> Small groups · Sundays · $99–$199</li>
            </ul>
            <a href="#/book-camp" class="btn btn-blue">Book Speech Camp</a>
          </div>
        </div>

        <!-- Decision Box -->
        <div style="margin-top:2rem;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);padding:1.75rem;border-left:4px solid var(--primary);">
          <h4 style="margin-bottom:0.75rem;display:flex;align-items:center;gap:0.5rem;">
            <i class="bi bi-lightbulb" style="color:var(--primary);"></i> Not sure which option is right for you?
          </h4>
          <p style="margin-bottom:0;">
            If you want to know <strong>exactly where your child stands</strong> and live in the DFW area, start with a professional evaluation — you'll leave with a clear picture and practical next steps.
            If you're ready to <strong>learn hands-on strategies</strong> you can use today to support your child's communication through play,
            Little Lamps Speech Camp is for you — open to families everywhere.
          </p>
        </div>
      </div>
    </section>

    <!-- Summer Camps Preview -->
    <section class="section" style="background:var(--bg);">
      <div class="container">
        <h2 class="section-title">Little Lamps Speech Camp 2026</h2>
        <p class="section-subtitle">Play-based Sunday camps for children ages 0–4. In-person (Dallas) and virtual options available.</p>
        <div class="grid-2">
          ${window.CAMPS.map(camp => `
            <div class="card camp-card" style="cursor:default;" onclick="navigate('#/book-camp')">
              <div class="card-icon"><i class="bi ${camp.icon}"></i></div>
              <h3>${camp.name}</h3>
              <p style="font-size:0.8rem;color:var(--primary);font-weight:600;margin-bottom:0.5rem;">${camp.subtitle}</p>
              <p style="font-size:0.875rem;margin-bottom:1rem;">${camp.description.substring(0, 100)}…</p>
              <span class="camp-dates"><i class="bi bi-calendar3"></i> ${camp.dates}</span>
              <div class="divider"></div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span class="camp-price">$${camp.price}</span>
                <span style="font-size:0.8rem;color:var(--text-muted);">${camp.spotsLeft} spots left</span>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="text-center mt-4">
          <a href="#/book-camp" class="btn btn-blue btn-lg">View All Camps &amp; Register</a>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section" style="background:var(--bg-card);">
      <div class="container">
        <h2 class="section-title">What Families Are Saying</h2>
        <div class="grid-3">
          <div class="testimonial">
            <p>"After just two months with Jasmine, our son went from barely stringing words together to telling us full stories. The difference is incredible."</p>
            <div class="testimonial-author">— Marcus T., Parent</div>
          </div>
          <div class="testimonial">
            <p>"The summer camp was the best decision we made for our daughter. She made friends, built confidence, and her speech improved dramatically."</p>
            <div class="testimonial-author">— Danielle R., Parent</div>
          </div>
          <div class="testimonial">
            <p>"Jasmine has a gift for connecting with kids. My shy son was relaxed and engaged from day one. We can't recommend her enough."</p>
            <div class="testimonial-author">— Kevin &amp; Tanya M., Parents</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <h2>Ready to Get Started?</h2>
      <p>Take the first step toward helping your child communicate with confidence.</p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
        <a href="#/book-evaluation" class="btn btn-primary btn-lg">Book an Evaluation</a>
        <a href="#/about" class="btn btn-outline btn-lg">Meet Jasmine</a>
      </div>
    </section>
  `;
}
