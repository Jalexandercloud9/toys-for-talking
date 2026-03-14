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
            <span style="font-size:0.75rem;color:rgba(255,255,255,0.5);display:flex;align-items:center;gap:0.35rem;"><i class="bi bi-geo-alt"></i> Available in-person &amp; virtually</span>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#/">Home</a></li>
            <li><a href="#/about">About Jasmine</a></li>
            <li><a href="#/book-camp">Summer Camps</a></li>
            <li><a href="#/book-evaluation">Book Evaluation</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:info@toysfortalking.com">info@toysfortalking.com</a></li>
            <li><a href="tel:+1-555-555-5555">(555) 555-5555</a></li>
          </ul>
          <div style="margin-top:1.25rem;">
            <h4 style="margin-bottom:0.5rem;">Hours</h4>
            <p style="font-size:0.8rem;color:rgba(255,255,255,0.6);line-height:1.8;">
              Mon – Fri: 8:00 AM – 6:00 PM<br>
              Sat: 9:00 AM – 2:00 PM<br>
              Sun: Closed
            </p>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2025 Toys for Talking · Jasmine Alexander, SLP</span>
        <span>All rights reserved</span>
      </div>
    </footer>
  `;
}
