import { getPromo, calcCredit } from './cityPromo.js';
import { openCheckout } from './checkout.js';
import { advanceDemoBar } from './demoBar.js';

// ---- SessionStorage-backed state ----
const STORAGE_KEY = 'cart';

function getItems() {
  try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function setItems(arr) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

// ---- DOM refs — lazy, set in initCart() after partials injects HTML ----
let cartEl, cartOverlay, itemsEl, emptyEl, promoEl, summaryEl, footerEl, countBadge, creditLabel;

// ---- Public API ----

export function initCart() {
  cartEl      = document.getElementById('cart');
  cartOverlay = document.getElementById('cart-overlay');
  itemsEl     = document.getElementById('cart-items');
  emptyEl     = document.getElementById('cart-empty');
  promoEl     = document.getElementById('cart-promo');
  summaryEl   = document.getElementById('cart-summary');
  footerEl    = document.getElementById('cart-footer');
  countBadge  = document.getElementById('cart-count');
  creditLabel = document.getElementById('nav-credit');

  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      closeCart();
      setTimeout(() => openCheckout(getItems(), getSubtotal(), calcCredit(getSubtotal())), 180);
    });
  }
  document.addEventListener('admin:update', render);
  render();
}

export function openCart() {
  if (!cartEl) return;
  cartEl.classList.add('is-open');
  if (cartOverlay) cartOverlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  if (getItems().length > 0) advanceDemoBar(4);
}

export function closeCart() {
  if (!cartEl) return;
  cartEl.classList.remove('is-open');
  if (cartOverlay) cartOverlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

export function addItem(product) {
  const items = getItems();
  const existing = items.find(i => i.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    items.push({ ...product, qty: 1 });
  }
  setItems(items);
  render();
  openCart();
  advanceDemoBar(3);
}

export function getSubtotal() {
  return getItems().reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function getCartItems() {
  return getItems();
}

export function clearCart() {
  setItems([]);
  render();
}

export function setCartItems(items) {
  setItems(items);
  render();
}

// ---- Internal ----

function getTotalQty() {
  return getItems().reduce((sum, i) => sum + i.qty, 0);
}

function removeItem(id) {
  setItems(getItems().filter(i => i.id !== id));
  render();
}

function changeQty(id, delta) {
  const items = getItems();
  const item = items.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  setItems(items);
  render();
}

function render() {
  if (!countBadge) return;

  const items    = getItems();
  const qty      = getTotalQty();
  const subtotal = getSubtotal();
  const credit   = calcCredit(subtotal);
  const promo    = getPromo();
  const hasItems = items.length > 0;

  countBadge.textContent = qty;
  countBadge.classList.toggle('visible', qty > 0);

  if (creditLabel) {
    creditLabel.textContent = credit > 0 ? `$${credit.toFixed(2)} credit` : '$0.00 credit';
  }

  const cartItemCount = document.getElementById('cart-item-count');
  if (cartItemCount) {
    cartItemCount.textContent = qty === 0 ? '0 items' : `${qty} item${qty !== 1 ? 's' : ''}`;
  }

  if (!emptyEl) return;
  emptyEl.style.display = hasItems ? 'none' : 'flex';

  if (itemsEl) {
    itemsEl.querySelectorAll('.cart-item').forEach(el => el.remove());
    items.forEach(item => itemsEl.appendChild(buildCartItem(item)));
  }

  if (promoEl) {
    promoEl.style.display = hasItems ? 'flex' : 'none';
    if (hasItems) renderPromo(subtotal, credit, promo);
  }

  if (summaryEl) summaryEl.style.display = hasItems ? 'block' : 'none';
  if (footerEl)  footerEl.style.display  = hasItems ? 'flex'  : 'none';
  if (hasItems && summaryEl) summaryEl.innerHTML = buildSummaryHTML(subtotal, credit);

  document.dispatchEvent(new CustomEvent('cartUpdated'));
}

function buildCartItem(item) {
  const thumb = item.image.includes('unsplash.com')
    ? item.image.replace(/w=\d+&h=\d+/, 'w=136&h=136').replace(/q=\d+/, 'q=75')
    : item.image;

  const div = document.createElement('div');
  div.className = 'cart-item';
  div.dataset.id = item.id;
  div.innerHTML = `
    <img class="cart-item__image" src="${thumb}" alt="${item.name}" loading="lazy">
    <div class="cart-item__info">
      <span class="cart-item__brand">${item.brand}</span>
      <span class="cart-item__name">${item.name}</span>
      <div class="cart-item__qty">
        <button class="cart-item__qty-btn" data-action="dec" aria-label="Decrease quantity">−</button>
        <span class="cart-item__qty-num">${item.qty}</span>
        <button class="cart-item__qty-btn" data-action="inc" aria-label="Increase quantity">+</button>
      </div>
    </div>
    <div class="cart-item__right">
      <span class="cart-item__price">$${(item.price * item.qty).toFixed(2)}</span>
      <button class="cart-item__remove">Remove</button>
    </div>
  `;

  div.querySelector('img').addEventListener('error', function () {
    this.style.display = 'none';
    if (this.parentElement?.style) this.parentElement.style.background = '#2a2a2a';
  });

  div.querySelector('[data-action="dec"]').addEventListener('click', () => changeQty(item.id, -1));
  div.querySelector('[data-action="inc"]').addEventListener('click', () => changeQty(item.id, +1));
  div.querySelector('.cart-item__remove').addEventListener('click', () => removeItem(item.id));

  return div;
}

function renderPromo(subtotal, credit, promo) {
  const MIN       = promo.minOrder;
  const remaining = Math.max(0, MIN - subtotal);
  const unlocked  = subtotal >= MIN;
  const wasLocked = promoEl.classList.contains('cart-promo--locked');

  promoEl.className = 'cart-promo' + (unlocked ? '' : ' cart-promo--locked');

  if (unlocked) {
    if (wasLocked) promoEl.style.transition = 'background-color 0.4s ease, border-color 0.4s ease';
    promoEl.innerHTML = `
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
    `;
  } else {
    const pct = subtotal > 0 ? Math.min(100, (subtotal / MIN) * 100) : 0;
    promoEl.innerHTML = `
      <div class="cart-promo__header">
        <span class="cart-promo__name" style="color:var(--color-muted)">${promo.name}</span>
      </div>
      <div class="cart-promo__progress-row">
        <p class="cart-promo__progress-label">
          Add <strong>$${remaining.toFixed(2)}</strong> more to unlock ${Math.round(promo.pct * 100)}% store credit
        </p>
        <div class="cart-promo__progress-bar">
          <div class="cart-promo__progress-fill" style="width:${pct}%"></div>
        </div>
      </div>
      <p class="cart-promo__fine">Min. order $${MIN} · Powered by 99minds</p>
    `;
  }
}

function buildSummaryHTML(subtotal, credit) {
  return `
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
  `;
}
