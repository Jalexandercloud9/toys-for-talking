function renderHome() {
  return `
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge">Little Lamps Speech Camp 2026 — Now Open</div>
        <h1>Every Child Deserves to Be Heard</h1>
        <p>
          Jasmine Alexander, Speech-Language Pathologist, uses play-based therapy
          and evidence-driven techniques to help children unlock their full
          communication potential.
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
          A personalized, joyful approach to speech therapy that children love
          — and parents trust.
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
            <h3>Family-Centered Care</h3>
            <p>We partner with families every step of the way, providing coaching and strategies you can use at home every day.</p>
          </div>
          <div class="card feature-card">
            <div class="card-icon"><i class="bi bi-award"></i></div>
            <h3>Licensed &amp; Certified SLP</h3>
            <p>Jasmine holds full ASHA certification and state licensure, with specialized training in early childhood language development.</p>
          </div>
          <div class="card feature-card">
            <div class="card-icon"><i class="bi bi-laptop"></i></div>
            <h3>In-Person &amp; Virtual</h3>
            <p>Flexible service delivery — meet us at our center or connect online. Same quality, your schedule.</p>
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
            <div class="card-icon"><i class="bi bi-clipboard-pulse"></i></div>
            <h3>Speech &amp; Language Evaluations</h3>
            <p style="font-size:0.9rem;color:var(--text-muted);font-weight:600;margin-bottom:0.75rem;text-transform:uppercase;letter-spacing:0.05em;">Texas Residents Only</p>
            <p style="margin-bottom:1rem;">A professional, clinical assessment to determine whether your child has a speech or language delay or disorder, and what support they need.</p>
            <ul style="list-style:none;padding:0;margin-bottom:1.5rem;display:flex;flex-direction:column;gap:0.5rem;">
              <li style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;"><i class="bi bi-check2-circle" style="color:var(--success);flex-shrink:0;"></i> Comprehensive diagnostic evaluation</li>
              <li style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;"><i class="bi bi-check2-circle" style="color:var(--success);flex-shrink:0;"></i> Written report with findings &amp; recommendations</li>
              <li style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;"><i class="bi bi-check2-circle" style="color:var(--success);flex-shrink:0;"></i> Initial consultation is complimentary</li>
              <li style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;"><i class="bi bi-check2-circle" style="color:var(--success);flex-shrink:0;"></i> In-person in the Dallas, TX area</li>
            </ul>
            <a href="#/book-evaluation" class="btn btn-blue">Schedule an Evaluation</a>
          </div>

          <!-- Camp Card -->
          <div class="card" style="border-top:4px solid var(--primary);">
            <div class="card-icon"><i class="bi bi-tent"></i></div>
            <h3>Little Lamps Speech Camp</h3>
            <p style="font-size:0.9rem;color:var(--text-muted);font-weight:600;margin-bottom:0.75rem;text-transform:uppercase;letter-spacing:0.05em;">Dallas In-Person &amp; Virtual</p>
            <p style="margin-bottom:1rem;">A guided, play-based experience where parents and children learn practical communication strategies together — available to families anywhere.</p>
            <ul style="list-style:none;padding:0;margin-bottom:1.5rem;display:flex;flex-direction:column;gap:0.5rem;">
              <li style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;"><i class="bi bi-check2-circle" style="color:var(--success);flex-shrink:0;"></i> Play-based strategies you can use at home</li>
              <li style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;"><i class="bi bi-check2-circle" style="color:var(--success);flex-shrink:0;"></i> Small groups (max 8–12 children)</li>
              <li style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;"><i class="bi bi-check2-circle" style="color:var(--success);flex-shrink:0;"></i> In-person (Dallas) or virtual for any family</li>
              <li style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;"><i class="bi bi-check2-circle" style="color:var(--success);flex-shrink:0;"></i> No prior diagnosis required</li>
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
            If you want a <strong>professional speech evaluation</strong> for your child and live in Texas, start with an evaluation.
            If you want <strong>practical strategies and guided support</strong> to encourage communication through play,
            Little Lamps Speech Camp may be the best fit — and it's open to families everywhere.
          </p>
        </div>
      </div>
    </section>

    <!-- Summer Camps Preview -->
    <section class="section" style="background:var(--bg);">
      <div class="container">
        <h2 class="section-title">Little Lamps Speech Camp 2026</h2>
        <p class="section-subtitle">Small-group, immersive speech and language camps designed for lasting results.</p>
        <div class="grid-3">
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
      <p>Take the first step toward helping your child communicate with confidence. Book a free evaluation today.</p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
        <a href="#/book-evaluation" class="btn btn-primary btn-lg">Book a Free Evaluation</a>
        <a href="#/about" class="btn btn-outline btn-lg">Meet Jasmine</a>
      </div>
    </section>
  `;
}
