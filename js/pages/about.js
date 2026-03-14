function renderAbout() {
  return `
    <div class="page-header about-header-logo">
      <img src="assets/images/logo.png" alt="Toys for Talking — Jasmine Alexander, M.A., CCC-SLP" class="site-logo-hero" />
    </div>

    <section class="section" style="padding-top:2rem;">
      <div class="container">
        <div class="about-bio-section">
          <!-- Photo floated left -->
          <div class="about-photo-float">
            <div class="about-photo-placeholder" id="about-photo-container">
              <div class="photo-icon"><i class="bi bi-person-circle"></i></div>
              <span>Photo coming soon</span>
            </div>
          </div>

          <p style="margin-bottom:1rem;font-size:1.05rem;line-height:1.8;">
            Jasmine Alexander is a passionate Pediatric Speech-Language Pathologist and encourager
            of parents, committed to helping families and little ones grow communication skills
            through joyful, intentional play.
          </p>
          <p style="margin-bottom:1rem;line-height:1.8;">
            She understands the challenges parents face when they realize their child may be
            struggling to communicate. Parents want to help their child express their wants, share
            their thoughts, and connect with the world around them. They try their best to talk,
            read, and play — yet may still wonder if they are doing enough. The uncertainty can
            lead to worry, frustration, and the feeling that something important is being missed.
          </p>
          <p style="margin-bottom:1rem;line-height:1.8;">
            Jasmine understands because she has walked alongside many families on this journey.
            She has worked closely with children and their caregivers to support language
            development in ways that are practical and meaningful. She has seen how powerful
            everyday interactions can be when parents are given the right tools, guidance,
            and encouragement.
          </p>
          <p style="margin-bottom:1.5rem;line-height:1.8;clear:left;">
            Her work has led her to create resources and learning experiences — including
            <strong>Toys for Talking</strong> and <strong>Little Lamps Speech Camp</strong> —
            where families learn simple strategies they can apply immediately with their children.
          </p>

          <!-- Credentials -->
          <div style="margin-bottom:1.5rem;">
            <h4 style="margin-bottom:0.75rem;color:var(--text);">Credentials &amp; Training</h4>
            <div class="tag-strip">
              <span class="credential-tag">M.A., CCC-SLP · Pediatric Speech-Language Pathologist</span>
              <span class="credential-tag">ASHA Certified (CCC-SLP)</span>
              <span class="credential-tag">State Licensed SLP</span>
              <span class="credential-tag">Pediatric Specialist</span>
              <span class="credential-tag">Play-Based Therapy</span>
              <span class="credential-tag">Parent Coaching</span>
            </div>
          </div>

          <div style="display:flex;gap:1rem;flex-wrap:wrap;">
            <a href="#/book-evaluation" class="btn btn-blue">Book an Evaluation</a>
            <a href="#/book-camp" class="btn btn-ghost">View Summer Camps</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission -->
    <section class="section-sm" style="background:var(--bg-card);">
      <div class="container">
        <div class="mission-box">
          <h2>Our Mission</h2>
          <p>
            Jasmine's intention is to help parents move from feeling unsure or overwhelmed to
            feeling confident and equipped to support their child's communication development.
            Every child deserves the opportunity to be heard — and every parent deserves the
            support and tools to help their child's voice shine.
          </p>
        </div>
      </div>
    </section>

    <!-- Ways to Get Started -->
    <section class="section-sm" style="background:var(--bg-card);">
      <div class="container">
        <h2 class="section-title">Ways to Get Started</h2>
        <p class="section-subtitle">Join Jasmine in creating everyday moments that help children grow, connect, and communicate.</p>
        <div class="grid-3" style="margin-top:2rem;">
          <div class="card" style="text-align:center;">
            <div class="card-icon" style="justify-content:center;"><i class="bi bi-play-circle"></i></div>
            <h4>YouTube Channel</h4>
            <p style="font-size:0.9rem;">Subscribe for practical speech and language strategies you can try right away with your child.</p>
          </div>
          <div class="card" style="text-align:center;">
            <div class="card-icon" style="justify-content:center;"><i class="bi bi-journal-bookmark"></i></div>
            <h4>Parent Resources</h4>
            <p style="font-size:0.9rem;">Explore resources designed to help parents turn everyday play into communication opportunities.</p>
          </div>
          <div class="card" style="text-align:center;">
            <div class="card-icon" style="justify-content:center;"><i class="bi bi-tent"></i></div>
            <h4>Little Lamps Speech Camp</h4>
            <p style="font-size:0.9rem;">Available in person in the Dallas area and virtually for families who want guided support.</p>
            <a href="#/book-camp" class="btn btn-blue" style="margin-top:0.75rem;font-size:0.85rem;">View Camps</a>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <h2>Let's Talk About Your Child</h2>
      <p>Every child's journey is different. Let's start yours with a personalized evaluation.</p>
      <a href="#/book-evaluation" class="btn btn-primary btn-lg">Schedule a Free Evaluation</a>
    </section>
  `;
}
