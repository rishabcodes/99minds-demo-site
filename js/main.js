import { initCart, openCart, closeCart } from './cart.js';
import { initDemoBar } from './demoBar.js';
import { renderProducts, renderCampaigns } from './products.js';
import { initCityDetection } from './cityPromo.js';
import { initDemoGuide } from './demoGuide.js';
import { applyStoreToPage } from './domBridge.js';

// ---- Nav scroll behavior ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 60);
}, { passive: true });

// ---- Cart triggers ----
document.getElementById('cart-btn').addEventListener('click', openCart);
document.getElementById('cart-close').addEventListener('click', closeCart);
document.getElementById('cart-overlay').addEventListener('click', closeCart);

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  closeCart();
  const overlay = document.getElementById('checkout-overlay');
  if (overlay.classList.contains('is-open')) {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => { overlay.style.display = 'none'; }, 260);
  }
});

// ---- Category tab filter ----
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => {
      t.classList.remove('tab--active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('tab--active');
    tab.setAttribute('aria-selected', 'true');
    renderProducts(tab.dataset.category);
  });
});

// ---- Init ----
applyStoreToPage();
initCart();
initDemoBar();
initCityDetection();
initDemoGuide();
renderProducts('all');
renderCampaigns();

// ---- Scroll reveals ----
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('[data-reveal], [data-reveal-fade]').forEach(el => revealObserver.observe(el));
