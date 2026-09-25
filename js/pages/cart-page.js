import { initSharedLayout } from '../partials.js';
import { initCart, openCart, closeCart, getCartItems, getSubtotal } from '../cart.js';
import { initDemoBar } from '../demoBar.js';
import { calcCredit, getPromo } from '../cityPromo.js';
import { initCashbackWidget, refreshCashbackWidget } from '../widgets/cashbackWidget.js';

initSharedLayout();

document.getElementById('cart-btn')?.addEventListener('click', openCart);
document.getElementById('cart-close')?.addEventListener('click', closeCart);
document.getElementById('cart-overlay')?.addEventListener('click', closeCart);

initCart();
initDemoBar();
initCashbackWidget('cashback-widget-root');

renderCartPage();

function renderCartPage() {
  const items    = getCartItems();
  const subtotal = getSubtotal();
  const credit   = calcCredit(subtotal);
  const promo    = getPromo();
  const content  = document.getElementById('cart-page-content');
  if (!content) return;

  if (items.length === 0) {
    content.innerHTML = `
      <div class="cart-page__empty">
        <p>Your bag is empty.</p>
        <a href="collection.html" class="btn btn--gold">Shop the Edit →</a>
      </div>
    `;
    return;
  }

  const unlocked  = subtotal >= promo.minOrder;
  const remaining = Math.max(0, promo.minOrder - subtotal);

  content.innerHTML = `
    <div class="cart-page__grid">
      <div class="cart-page__items">
        ${items.map(item => `
          <div class="cart-page__item">
            <img class="cart-page__item-img" src="${thumbUrl(item.image)}" alt="${item.name}" loading="lazy">
            <div class="cart-page__item-info">
              <span class="cart-page__item-brand">${item.brand}</span>
              <span class="cart-page__item-name">${item.name}</span>
              <span style="font-size:13px;color:var(--color-muted)">Qty: ${item.qty}</span>
            </div>
            <span class="cart-page__item-price">$${(item.price * item.qty).toFixed(2)}</span>
          </div>
        `).join('')}
      </div>

      <div class="cart-page__sidebar">
        <div id="cart-promo-page" class="cart-promo ${unlocked ? '' : 'cart-promo--locked'}" style="display:flex;margin-bottom:16px">
          ${unlocked ? `
            <div class="cart-promo__header">
              <div class="cart-promo__check" aria-hidden="true">✓</div>
              <span class="cart-promo__name">${promo.name} applied</span>
            </div>
            <p class="cart-promo__description">${Math.round(promo.pct * 100)}% store credit on this order</p>
            <div class="cart-promo__credit-row">
              <span class="cart-promo__credit-label">You'll earn</span>
              <span class="cart-promo__credit-amount">$${credit.toFixed(2)} store credit</span>
            </div>
            <p class="cart-promo__fine">No code needed · Powered by 99minds</p>
          ` : `
            <div class="cart-promo__header">
              <span class="cart-promo__name" style="color:var(--color-muted)">${promo.name}</span>
            </div>
            <div class="cart-promo__progress-row">
              <p class="cart-promo__progress-label">
                Add <strong>$${remaining.toFixed(2)}</strong> more to unlock ${Math.round(promo.pct * 100)}% store credit
              </p>
              <div class="cart-promo__progress-bar">
                <div class="cart-promo__progress-fill" style="width:${Math.min(100, (subtotal / promo.minOrder) * 100)}%"></div>
              </div>
            </div>
            <p class="cart-promo__fine">Min. order $${promo.minOrder} · Powered by 99minds</p>
          `}
        </div>

        <div class="cart-summary">
          <div class="cart-summary__row">
            <span class="cart-summary__row--label">Subtotal</span>
            <span class="cart-summary__row--value">$${subtotal.toFixed(2)}</span>
          </div>
          <div class="cart-summary__row">
            <span class="cart-summary__row--label">Shipping</span>
            <span class="cart-summary__row--value">Complimentary</span>
          </div>
          <div class="cart-summary__divider"></div>
          <div class="cart-summary__row cart-summary__row--total">
            <span class="cart-summary__row--label">Total</span>
            <span class="cart-summary__row--value">$${subtotal.toFixed(2)}</span>
          </div>
          ${credit > 0 ? `
          <div class="cart-summary__row" style="margin-top:4px">
            <span class="cart-summary__row--label" style="color:var(--color-gold);font-weight:500">Store credit earned</span>
            <span class="cart-summary__row--value" style="color:var(--color-gold)">+$${credit.toFixed(2)}</span>
          </div>` : ''}
        </div>

        <a href="checkout.html" class="btn btn--gold btn--full" style="margin-top:20px;display:block;text-align:center;text-decoration:none">
          Continue to checkout →
        </a>
        <p style="text-align:center;font-size:12px;color:var(--color-muted);margin-top:10px">
          No payment details required in this demo.
        </p>
      </div>
    </div>
  `;
}

function thumbUrl(url) {
  return url.includes('unsplash.com')
    ? url.replace(/w=\d+&h=\d+/, 'w=160&h=160').replace(/q=\d+/, 'q=75')
    : url;
}
