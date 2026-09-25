import { initSharedLayout } from '../partials.js';
import { initCart, openCart, closeCart } from '../cart.js';
import { initDemoBar } from '../demoBar.js';
import { renderProducts } from '../products.js';
import { initCityDetection } from '../cityPromo.js';
// Inject shared layout first so all DOM elements exist before init
initSharedLayout();

// Nav scroll
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 60);
  }, { passive: true });
}

// Cart triggers
document.getElementById('cart-btn')?.addEventListener('click', openCart);
document.getElementById('cart-close')?.addEventListener('click', closeCart);
document.getElementById('cart-overlay')?.addEventListener('click', closeCart);

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  closeCart();
  const overlay = document.getElementById('checkout-overlay');
  if (overlay?.classList.contains('is-open')) {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => { overlay.style.display = 'none'; }, 260);
  }
});

// Init
initCart();
initDemoBar();
initCityDetection();
renderProducts('all', 8);

// Scroll reveals
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('[data-reveal], [data-reveal-fade]').forEach(el => revealObserver.observe(el));
