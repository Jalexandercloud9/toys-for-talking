function renderFooter() {
  return `
    <footer class="footer">
      <div class="footer-grid">
        <div>
          <div class="footer-brand-name">Toys for Talking</div>
          <p style="font-size:0.875rem;color:rgba(255,255,255,0.65);margin-top:0.5rem;max-width:280px;line-height:1.6;">
            Helping children find their voice through play-based, evidence-driven speech and language therapy.
          </p>
          <div style="margin-top:1rem;display:flex;gap:0.5rem;flex-wrap:wrap;">
            <span style="font-size:0.75rem;color:rgba(255,255,255,0.5);display:flex;align-items:center;gap:0.35rem;"><i class="bi bi-geo-alt"></i> In-person (DFW) &amp; virtual</span>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#/">Home</a></li>
            <li><a href="#/about">About Jasmine</a></li>
            <li><a href="#/book-camp">Little Lamps Speech Camp</a></li>
            <li><a href="#/book-evaluation">Book Evaluation</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:toysfortalking@gmail.com">toysfortalking@gmail.com</a></li>
            <li><a href="tel:+12143950109">(214) 395-0109</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>J.Alexander Communication &amp; Education PLC · Jasmine Alexander, CCC-SLP</span>
        <span>All rights reserved</span>
      </div>
    </footer>
  `;
}
