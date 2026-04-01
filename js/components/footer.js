function renderFooter() {
  return `
    <footer class="footer">
      <div class="footer-grid">
        <div>
          <div class="footer-brand-name">Toys for Talking</div>
          <p style="font-size:0.875rem;color:rgba(255,255,255,0.65);margin-top:0.5rem;max-width:280px;line-height:1.6;">
            Coaching parents with the play-based strategies they need to help their children grow in speech and language — at home, every day.
          </p>
          <div style="margin-top:1rem;display:flex;gap:0.5rem;flex-wrap:wrap;">
            <span style="font-size:0.75rem;color:rgba(255,255,255,0.5);display:flex;align-items:center;gap:0.35rem;"><i class="bi bi-geo-alt"></i> In-person (DFW) &amp; virtual</span>
          </div>
          <div style="margin-top:1.25rem;">
            <p style="font-size:0.75rem;color:rgba(255,255,255,0.5);margin-bottom:0.6rem;text-transform:uppercase;letter-spacing:0.05em;">Follow Us</p>
            <div style="display:flex;gap:0.75rem;align-items:center;">
              <a href="https://www.instagram.com/toysfortalking/" target="_blank" rel="noopener"
                style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.8);font-size:1.1rem;text-decoration:none;transition:background 0.2s;"
                onmouseover="this.style.background='rgba(255,255,255,0.22)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'"
                title="Instagram">
                <i class="bi bi-instagram"></i>
              </a>
              <a href="https://www.youtube.com/@ToysforTalking" target="_blank" rel="noopener"
                style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.8);font-size:1.1rem;text-decoration:none;transition:background 0.2s;"
                onmouseover="this.style.background='rgba(255,255,255,0.22)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'"
                title="YouTube">
                <i class="bi bi-youtube"></i>
              </a>
              <a href="https://www.tiktok.com/@toysfortalking" target="_blank" rel="noopener"
                style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.8);font-size:1.1rem;text-decoration:none;transition:background 0.2s;"
                onmouseover="this.style.background='rgba(255,255,255,0.22)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'"
                title="TikTok">
                <i class="bi bi-tiktok"></i>
              </a>
            </div>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#/">Home</a></li>
            <li><a href="#/about">About Jasmine</a></li>
            <li><a href="#/book-camp">Little Lamps Speech Camp</a></li>
            <li><a href="#/book-evaluation">Book Evaluation</a></li>
            <li><a href="#/refund-policy">Payment &amp; Refund Policy</a></li>
            <li><a href="#/privacy-policy">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:info@toysfortalkingslp.com">info@toysfortalkingslp.com</a></li>
            <li><a href="tel:+12143950109">(214) 395-0109</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>J.Alexander Communication &amp; Education PLLC · Jasmine Alexander, CCC-SLP</span>
        <span style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap;justify-content:flex-end;">
          <a href="#/privacy-policy" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.8rem;" onmouseover="this.style.color='rgba(255,255,255,0.85)'" onmouseout="this.style.color='rgba(255,255,255,0.5)'">Privacy Policy</a>
          <a href="#/refund-policy" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.8rem;" onmouseover="this.style.color='rgba(255,255,255,0.85)'" onmouseout="this.style.color='rgba(255,255,255,0.5)'">Refund Policy</a>
          <span>All rights reserved</span>
        </span>
      </div>
    </footer>
  `;
}
