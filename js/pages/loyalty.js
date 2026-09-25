import { initSharedLayout } from '../partials.js';
import { initCart, openCart, closeCart } from '../cart.js';
import { initDemoBar } from '../demoBar.js';
import { getActiveStore } from '../stores.js';

initSharedLayout();

document.getElementById('cart-btn')?.addEventListener('click', openCart);
document.getElementById('cart-close')?.addEventListener('click', closeCart);
document.getElementById('cart-overlay')?.addEventListener('click', closeCart);

initCart();
initDemoBar();

renderRewardCards();

function renderRewardCards() {
  const store = getActiveStore();
  const grid  = document.getElementById('rewards-grid');
  if (!grid) return;

  const ICONS = {
    credit: `<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>`,
    coupon: `<path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>`,
    points: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
    giftcard: `<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>`,
  };

  const BODIES = {
    credit:   'Cashback that lands in your account the moment your order ships. Applied automatically at your next checkout — nothing to enter, nothing to remember.',
    coupon:   'A unique discount code delivered to your inbox after your order ships. Use it at checkout on any future qualifying order — no expiry pressure.',
    points:   'Points that stack with every qualifying order and convert to credit at checkout. Multipliers apply during active city campaigns — earn faster when your city is live.',
    giftcard: 'A prepaid gift card value added to your 99minds wallet. Spend it on any future order — or share it with someone else. Balances never expire.',
  };

  const TAGS = {
    credit:   'Most popular',
    coupon:   'Delivered by email',
    points:   '1 point = $0.01 credit',
    giftcard: 'Shareable &amp; transferable',
  };

  grid.innerHTML = store.rewardTypes.map(r => {
    const icon = ICONS[r.id] ?? '';
    const body = BODIES[r.id] ?? '';
    const tag  = TAGS[r.id]  ?? '';
    const hex  = r.color;
    const rgba = hexToRgba(hex, 0.1);
    const border = hexToRgba(hex, 0.3);
    return `
      <div class="reward-type-card">
        <div class="reward-type-card__icon" style="background:${rgba};color:${hex}">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            ${icon}
          </svg>
        </div>
        <h3 class="reward-type-card__title">${r.label}</h3>
        <p class="reward-type-card__body">${body}</p>
        <div class="reward-type-card__tag" style="color:${hex};border-color:${border}">${tag}</div>
      </div>
    `;
  }).join('');
}

function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
