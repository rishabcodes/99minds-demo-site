import { applyStoreToPage } from './domBridge.js';
import { initAdmin } from './admin.js';
import { initDemoGuide } from './demoGuide.js';
import { withStore } from './stores.js';

// ---- Shared layout injector ----
// Each page has placeholder divs. This injects the nav, cart, checkout overlay,
// footer, and demo bar HTML — then applyStoreToPage() fills the dynamic text.

export function initSharedLayout() {
  const navRoot      = document.getElementById('nav-root');
  const cartRoot     = document.getElementById('cart-root');
  const checkoutRoot = document.getElementById('checkout-root');
  const footerRoot   = document.getElementById('footer-root');
  const barRoot      = document.getElementById('demo-bar-root');

  if (navRoot)      navRoot.innerHTML      = buildNav();
  if (cartRoot)     cartRoot.innerHTML     = buildCart();
  if (checkoutRoot) checkoutRoot.innerHTML = buildCheckoutOverlay();
  if (footerRoot)   footerRoot.innerHTML   = buildFooter();
  if (barRoot)      barRoot.innerHTML      = buildDemoBar();

  // Apply store data to all the IDs we just injected
  applyStoreToPage();

  // Admin overlay (after demo bar is in DOM so #admin-open-btn exists)
  initAdmin();

  // Demo guide (after bar is in DOM so #demo-guide exists)
  initDemoGuide();

  // Nav scroll frosted-glass
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 60);
    }, { passive: true });
  }
}

// ---- Nav ----
function buildNav() {
  return `
    <nav class="nav" id="nav" role="navigation" aria-label="Main navigation">
      <div class="nav__inner">
        <a href="${withStore('index.html')}" class="nav__wordmark" id="store-wordmark" aria-label="Store home"></a>
        <ul class="nav__links" role="list">
          <li><a href="${withStore('collection.html')}">Shop</a></li>
          <li><a href="${withStore('loyalty.html')}">My Rewards</a></li>
          <li><a href="${withStore('promotion.html')}">Our Promotion</a></li>
        </ul>
        <div class="nav__right">
          <div class="nav__city-pill" id="nav-city-pill" aria-label="">
            <span class="status-dot" aria-hidden="true"></span>
            <span id="nav-city-text"></span>
          </div>
          <span class="nav__credit" id="nav-credit" aria-live="polite">$0.00 credit</span>
          <button class="nav__cart-btn" id="cart-btn" aria-label="Open shopping cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <span class="nav__cart-count" id="cart-count" aria-label="Items in cart">0</span>
          </button>
        </div>
      </div>
    </nav>
  `;
}

// ---- Cart sidebar ----
function buildCart() {
  return `
    <div class="cart-overlay" id="cart-overlay" aria-hidden="true"></div>
    <aside class="cart" id="cart" role="complementary" aria-label="Shopping cart" aria-hidden="true">
      <div class="cart__header">
        <div>
          <span class="cart__title">Your Bag</span>
          <span class="cart__count-label" id="cart-item-count">0 items</span>
        </div>
        <button class="cart__close" id="cart-close" aria-label="Close cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="cart__body">
        <div class="cart__items" id="cart-items">
          <div class="cart__empty" id="cart-empty">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.3" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <div>
              <p style="font-size:15px;font-weight:500;color:var(--color-text);margin-bottom:6px">Your bag is empty</p>
              <p style="font-size:13px;color:var(--color-muted);line-height:1.5">Add something you love<br>to get started.</p>
            </div>
            <a href="${withStore('collection.html')}" class="btn btn--gold btn--sm" style="text-decoration:none">Shop the Edit →</a>
          </div>
        </div>
        <div id="cart-promo" style="display:none" aria-live="polite"></div>
        <div id="cart-summary" style="display:none"></div>
      </div>
      <div class="cart__footer" id="cart-footer" style="display:none">
        <button class="btn btn--primary btn--full" id="checkout-btn">
          Continue to checkout →
        </button>
        <p class="cart__demo-note">No payment details required in this demo.</p>
        <div class="cart__powered">
          <span class="cart__powered-label">Incentives powered by</span>
          <img src="99minds-logo.svg" alt="99minds" class="cart__powered-logo">
        </div>
      </div>
    </aside>
  `;
}

// ---- Checkout modal overlay ----
function buildCheckoutOverlay() {
  return `
    <div class="modal-overlay" id="checkout-overlay"
      style="display:none" role="dialog" aria-modal="true" aria-label="Checkout">
      <div class="checkout-modal" id="checkout-modal">
        <!-- Populated by checkout.js -->
      </div>
    </div>
  `;
}

// ---- Footer ----
function buildFooter() {
  return `
    <footer class="footer" id="footer" role="contentinfo">
      <div class="footer__main">
        <div class="footer__left">
          <span class="footer__wordmark" id="footer-wordmark"></span>
          <p class="footer__tagline" id="footer-tagline">
            A fictional storefront built to demonstrate 99minds Promotions.
          </p>
        </div>
        <div class="footer__right">
          <span class="footer__powered-label">Promotions powered by</span>
          <img src="99minds-logo.svg" alt="99minds" class="footer__logo">
        </div>
      </div>
      <div class="footer__bottom">
        <span id="footer-copyright"></span>
        <span>Built with 99minds</span>
      </div>
    </footer>
  `;
}

// ---- Demo bar — navigation dock ----
function buildDemoBar() {
  const steps = [
    { step: 1, href: withStore('index.html'),      label: 'Detect City', icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>' },
    { step: 2, href: withStore('collection.html'), label: 'Browse',       icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' },
    { step: 3, href: withStore('cart.html'),       label: 'Cart',         icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>' },
    { step: 4, href: withStore('checkout.html'),   label: 'Checkout',     icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>' },
    { step: 5, href: withStore('loyalty.html'),    label: 'Loyalty',      icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' },
    { step: 6, href: withStore('referral.html'),   label: 'Referral',     icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>' },
  ];

  const stepHtml = steps.map((s, i) => `
    ${i > 0 ? '<span class="demo-bar__arrow" aria-hidden="true">→</span>' : ''}
    <a class="demo-bar__step" href="${s.href}" data-step="${s.step}" title="${s.label}">
      ${s.icon}
      ${s.label}
    </a>
  `).join('');

  return `
    <div class="demo-guide" id="demo-guide" role="complementary" aria-label="Demo walkthrough"></div>
    <nav class="demo-bar" id="demo-bar" role="navigation" aria-label="Demo navigation">
      <span class="demo-bar__label">Demo Journey</span>
      <div class="demo-bar__steps">${stepHtml}</div>
      <button class="demo-bar__admin-btn" id="admin-open-btn" aria-label="Open merchant admin">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
        Merchant Controls
      </button>
      <div class="demo-bar__brand">
        <span class="demo-bar__powered">Powered by</span>
        <img src="99minds-logo.svg" alt="99minds" class="demo-bar__logo">
      </div>
    </nav>
  `;
}
