import { getActiveStore } from '../stores.js';
import { calcCredit, getPromo } from '../cityPromo.js';
import { getSubtotal } from '../cart.js';

export function initCashbackWidget(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;

  render(el);

  // Re-render whenever cart changes (listen to storage events across tabs + direct mutation)
  window.addEventListener('storage', e => {
    if (e.key === 'cart') render(el);
  });

  // Re-render when admin pushes campaign changes
  document.addEventListener('admin:update', () => render(el));
}

// Called externally after cart mutation on same page
export function refreshCashbackWidget(containerId) {
  const el = document.getElementById(containerId);
  if (el) render(el);
}

function render(el) {
  const store    = getActiveStore();
  const promo    = getPromo();
  const subtotal = getSubtotal();
  const credit   = calcCredit(subtotal);
  const unlocked = subtotal >= promo.minOrder;
  const pctLabel = `${Math.round(promo.pct * 100)}%`;

  el.innerHTML = `
    <div class="cashback-widget ${unlocked ? 'cashback-widget--unlocked' : ''}">
      <div class="cashback-widget__left">
        <span class="cashback-widget__dot" aria-hidden="true"></span>
        <div class="cashback-widget__text">
          <span class="cashback-widget__campaign">${promo.name}</span>
          <span class="cashback-widget__detail">
            ${unlocked
              ? `${pctLabel} store credit · You'll earn <strong>$${credit.toFixed(2)}</strong> on this order`
              : `${pctLabel} store credit on orders $${promo.minOrder}+ · Applies automatically`
            }
          </span>
        </div>
      </div>
      <span class="cashback-widget__city">${store.activeCampaign.cityShort}</span>
    </div>
  `;
}
