function renderAbout() {
  return `
    <div class="page-header">
      <h1>About Jasmine Alexander</h1>
      <p>Speech-Language Pathologist & Founder of Toys for Talking</p>
    </div>

    <section class="section">
      <div class="container">
        <div class="about-hero">
          <!-- Photo -->
          <div class="about-photo-wrapper">
            <div class="about-photo-placeholder" id="about-photo-container">
              <div class="photo-icon">👩🏽‍⚕️</div>
              <span>Jasmine Alexander, M.S., CCC-SLP</span>
              <span style="font-size:0.75rem;margin-top:0.25rem;opacity:0.6;">(Photo coming soon)</span>
            </div>
          </div>

          <!-- Bio -->
          <div>
            <span class="badge badge-blue mb-2" style="display:inline-block;">M.S., CCC-SLP · Licensed Speech-Language Pathologist</span>
            <h2 style="margin-bottom:1rem;">Hi, I'm Jasmine!</h2>

            <!-- TODO: Replace this placeholder bio with Jasmine's real bio -->
            <p style="margin-bottom:1rem;font-size:1.05rem;line-height:1.8;">
              [<em>Jasmine's bio will go here. Share your story — how you got into speech-language pathology,
              what drives your passion for working with children, and what makes your approach unique.
              This is your chance to connect with families personally.</em>]
            </p>
            <p style="margin-bottom:1rem;line-height:1.8;">
              [<em>Tell families about your education, clinical training, and any specializations — such as
              early language delays, articulation disorders, fluency, AAC, or autism spectrum. What age
              groups do you work with most? What does a typical session look like?</em>]
            </p>
            <p style="margin-bottom:1.5rem;line-height:1.8;">
              [<em>End with something personal — what you love about your work, a moment that inspired you,
              or a simple statement of your mission. Let families know you genuinely care about their child's success.</em>]
            </p>

            <!-- Credentials -->
            <div style="margin-bottom:1.5rem;">
              <h4 style="margin-bottom:0.75rem;color:var(--text);">Credentials & Training</h4>
              <div class="tag-strip">
                <span class="credential-tag">🎓 M.S. Speech-Language Pathology</span>
                <span class="credential-tag">✅ ASHA Certified (CCC-SLP)</span>
                <span class="credential-tag">📜 State Licensed SLP</span>
                <span class="credential-tag">🧠 Early Childhood Specialist</span>
                <span class="credential-tag">🗣️ Articulation & Phonology</span>
                <span class="credential-tag">👶 0–8 Years Focus</span>
              </div>
            </div>

            <div style="display:flex;gap:1rem;flex-wrap:wrap;">
              <a href="#/book-evaluation" class="btn btn-blue">Book an Evaluation</a>
              <a href="#/book-camp" class="btn btn-ghost">View Summer Camps</a>
            </div>
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
            <!-- TODO: Replace with Jasmine's mission statement -->
            [<em>Your mission statement goes here. Example: "At Toys for Talking, we believe every child
            has a voice waiting to be heard. Through joy, play, and evidence-based practice, we help
            children communicate with confidence — one word at a time."</em>]
          </p>
        </div>
      </div>
    </section>

    <!-- Approach -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">The Toys for Talking Approach</h2>
        <p class="section-subtitle">Three pillars that guide every session, every child, every day.</p>
        <div class="grid-3">
          <div class="card">
            <div class="card-icon">🔬</div>
            <h3>Evidence-Based</h3>
            <p>Every technique I use is backed by current research in speech-language pathology. I continuously study and train to bring you the best available methods.</p>
          </div>
          <div class="card">
            <div class="card-icon">🎮</div>
            <h3>Play-Powered</h3>
            <p>Children don't know they're in "therapy" — they think they're playing. That's the magic. Toys, games, and imaginative activities are our primary tools.</p>
          </div>
          <div class="card">
            <div class="card-icon">🤝</div>
            <h3>Family-Partnered</h3>
            <p>Parents are the most important people in a child's language environment. I coach caregivers with real strategies to support development every single day.</p>
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
