function renderNavbar() {
  const currentHash = window.location.hash || '#/';
  const links = [
    { href: '#/', label: 'Home' },
    { href: '#/about', label: 'About Jasmine' },
    { href: '#/book-evaluation', label: 'Book Evaluation' },
  ];

  return `
    <nav class="navbar">
      <div class="navbar-inner">
        <a href="#/" class="navbar-brand">
          <div class="navbar-logo" id="navbar-logo-img">T</div>
          <div class="navbar-brand-text">
            <span class="navbar-brand-name">Toys for Talking</span>
            <span class="navbar-brand-tagline">Speech Therapy Services</span>
          </div>
        </a>
        <button class="navbar-toggle" onclick="toggleMobileNav()" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
        <ul class="navbar-links" id="navbar-links">
          ${links.map(l => `
            <li>
              <a href="${l.href}" class="${currentHash === l.href ? 'active' : ''}"
                 onclick="closeMobileNav()">${l.label}</a>
            </li>
          `).join('')}
          <li>
            <a href="#/book-camp" class="navbar-cta ${currentHash === '#/book-camp' ? 'active' : ''}"
               onclick="closeMobileNav()">Book a Camp</a>
          </li>
        </ul>
      </div>
    </nav>
  `;
}

function toggleMobileNav() {
  document.getElementById('navbar-links').classList.toggle('open');
}

function closeMobileNav() {
  const links = document.getElementById('navbar-links');
  if (links) links.classList.remove('open');
}
