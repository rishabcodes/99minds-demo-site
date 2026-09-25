import { initSharedLayout } from '../partials.js';
import { initCart, openCart, closeCart } from '../cart.js';
import { initDemoBar } from '../demoBar.js';
import { renderCampaigns } from '../products.js';

initSharedLayout();

const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 60);
  }, { passive: true });
}

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

initCart();
initDemoBar();
renderCampaigns();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('[data-reveal], [data-reveal-fade]').forEach(el => revealObserver.observe(el));
