function renderHome() {
  return `
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge">✨ Summer 2025 Camps Now Open</div>
        <h1>Every Child Deserves to Be Heard</h1>
        <p>
          Jasmine Alexander, Speech-Language Pathologist, uses play-based therapy
          and evidence-driven techniques to help children unlock their full
          communication potential.
        </p>
        <div class="hero-buttons">
          <a href="#/book-camp" class="btn btn-primary btn-lg">🏕️ Book a Summer Camp</a>
          <a href="#/book-evaluation" class="btn btn-outline btn-lg">📋 Schedule an Evaluation</a>
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
            <div class="card-icon">🎯</div>
            <h3>Evidence-Based Practice</h3>
            <p>Every session is grounded in the latest speech-language pathology research and tailored to your child's unique needs.</p>
          </div>
          <div class="card feature-card">
            <div class="card-icon">🧸</div>
            <h3>Play-Based Learning</h3>
            <p>Children learn best when they're having fun. Our toy-driven approach makes therapy feel like playtime — not work.</p>
          </div>
          <div class="card feature-card">
            <div class="card-icon">👨‍👩‍👧</div>
            <h3>Family-Centered Care</h3>
            <p>We partner with families every step of the way, providing coaching and strategies you can use at home every day.</p>
          </div>
          <div class="card feature-card">
            <div class="card-icon">📈</div>
            <h3>Measurable Progress</h3>
            <p>Clear goals, regular updates, and data-driven tracking so you always know exactly how your child is growing.</p>
          </div>
          <div class="card feature-card">
            <div class="card-icon">🏅</div>
            <h3>Licensed & Certified SLP</h3>
            <p>Jasmine holds full ASHA certification and state licensure, with specialized training in early childhood language development.</p>
          </div>
          <div class="card feature-card">
            <div class="card-icon">💻</div>
            <h3>In-Person & Virtual</h3>
            <p>Flexible service delivery — meet us at our center or connect online. Same quality, your schedule.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Summer Camps Preview -->
    <section class="section" style="background:var(--bg);">
      <div class="container">
        <h2 class="section-title">Summer 2025 Camps</h2>
        <p class="section-subtitle">Small-group, immersive speech and language camps designed for lasting results.</p>
        <div class="grid-3">
          ${window.CAMPS.map(camp => `
            <div class="card camp-card" style="cursor:default;" onclick="navigate('#/book-camp')">
              <div style="font-size:2rem;margin-bottom:0.75rem;">${camp.icon}</div>
              <h3>${camp.name}</h3>
              <p style="font-size:0.8rem;color:var(--secondary);font-weight:600;margin-bottom:0.5rem;">${camp.subtitle}</p>
              <p style="font-size:0.875rem;margin-bottom:1rem;">${camp.description.substring(0, 100)}…</p>
              <span class="camp-dates">📅 ${camp.dates}</span>
              <div class="divider"></div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span class="camp-price">$${camp.price}</span>
                <span style="font-size:0.8rem;color:var(--text-muted);">${camp.spotsLeft} spots left</span>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="text-center mt-4">
          <a href="#/book-camp" class="btn btn-blue btn-lg">View All Camps & Register</a>
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
            <div class="testimonial-author">— Kevin & Tanya M., Parents</div>
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
