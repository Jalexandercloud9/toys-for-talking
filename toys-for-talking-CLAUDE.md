# Toys for Talking — Claude Context

## What this is
Play-based speech therapy website for Jasmine Alexander, CCC-SLP.
Deployed on Netlify. Live at https://www.toys-for-talking.com

## Stack
- Vanilla HTML/CSS/JS — no frameworks
- Multi-page SPA: JS renders each page into `#page-content`
- Netlify serverless functions (Stripe payments, EmailJS confirmations)
- Google Fonts: Playfair Display (700,800) + Lora (400–600) + Inter (400–800)
- Bootstrap Icons CDN
- Primary color: #D96B55 (coral)

## File structure
```
index.html                  — Shell only. Do not add content here.
css/styles.css              — All styles. Versioned with ?v=N on <link> tag.
js/app.js                   — Router. Handles all page navigation.
js/data.js                  — Site content/config. Check here before hardcoding strings.
js/components/navbar.js     — Renders nav into #navbar
js/components/footer.js     — Renders footer into #footer-root
js/pages/home.js            — Home page
js/pages/about.js           — About page
js/pages/book-camp.js       — Speech camp booking
js/pages/book-evaluation.js — Evaluation booking
js/pages/payment.js         — Stripe payment flow
js/pages/confirmation.js    — Post-payment confirmation
js/pages/parent-resources.js
js/pages/refund-policy.js
js/pages/privacy-policy.js
js/utils/email.js           — EmailJS helper
netlify/functions/          — Serverless functions (Stripe, etc.)
assets/                     — Images
```

## Key rules
- Always increment the `?v=N` query string when editing CSS or any JS file
- Never edit index.html for content — content lives in js/pages/ and js/data.js
- Check js/data.js before adding hardcoded strings anywhere
- Stripe and EmailJS keys are environment variables — never hardcode them
- Do not introduce npm packages or build tools — this is intentionally no-build

## When I ask about a page
Go directly to the relevant file in js/pages/. Don't scan the whole codebase.

## When I ask about styles
Edit css/styles.css only. Increment the version number on the link tag in index.html.

## Do not
- Add React, Vue, or any framework
- Add Bootstrap CSS (Bootstrap Icons are fine)
- Rename or reorganize the file structure without asking first
- Touch netlify/functions/ without being explicitly asked
