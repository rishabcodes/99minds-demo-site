import { initSharedLayout } from '../partials.js';
import { initCart, openCart, closeCart, addItem } from '../cart.js';
import { initDemoBar, advanceDemoBar } from '../demoBar.js';
import { getActiveStore } from '../stores.js';
import { initCashbackWidget, refreshCashbackWidget } from '../widgets/cashbackWidget.js';

initSharedLayout();

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

const params     = new URLSearchParams(window.location.search);
const id         = parseInt(params.get('id') || '1', 10);
const storeQuery = params.get('store') ? `?store=${params.get('store')}` : '';
const store      = getActiveStore();
const product    = store.products.find(p => p.id === id) || store.products[0];
const content    = document.getElementById('pdp-content');

if (!content || !product) return;

const isOut = product.stock === 'out';
const isLow = product.stock === 'low';
let qty = 1;

function fmtPrice() { return `$${(product.price * qty).toFixed(2)}`; }

content.innerHTML = `
  <div class="pdp">

    <div class="pdp__image" style="position:relative">
      <img src="${product.image}" alt="${product.brand} — ${product.name}" loading="eager">
      ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ''}
      ${isLow ? `<span class="product-card__badge product-card__badge--stock" style="left:auto;right:14px">Low Stock</span>` : ''}
      ${isOut ? `<span class="product-card__badge product-card__badge--out"   style="left:auto;right:14px">Sold Out</span>`   : ''}
    </div>

    <div class="pdp__info">
      <p class="pdp__breadcrumb">
        <a href="collection.html${storeQuery}" class="pdp__back" style="margin:0">← Shop</a>
        <span class="pdp__breadcrumb-sep"> / </span>
        <span style="text-transform:capitalize">${product.category}</span>
      </p>

      <span class="pdp__brand">${product.brand}</span>
      <h1 class="pdp__name">${product.name}</h1>
      <p class="pdp__descriptor">${product.descriptor}</p>
      <span class="pdp__price">$${product.price}</span>

      <p class="pdp__description">${getProductDetails(product)}</p>

      <div class="pdp__divider"></div>

      <div id="cashback-widget-root"></div>

      <div class="pdp__divider"></div>

      ${isOut ? `
        <button class="btn btn--full pdp__add-btn" disabled style="opacity:0.4;cursor:not-allowed;background:var(--color-surface-2);color:var(--color-muted)">
          Currently out of stock
        </button>
      ` : `
        <div class="pdp__qty-row">
          <button class="pdp__qty-btn" id="pdp-qty-dec" aria-label="Decrease quantity">−</button>
          <span class="pdp__qty-num" id="pdp-qty-num">1</span>
          <button class="pdp__qty-btn" id="pdp-qty-inc" aria-label="Increase quantity">+</button>
          <span class="pdp__qty-label">qty</span>
        </div>
        <button class="btn btn--gold btn--full pdp__add-btn" id="pdp-add-btn">
          Add to Bag — $${product.price.toFixed(2)}
        </button>
      `}

      <a href="collection.html${storeQuery}" class="pdp__back">← Back to collection</a>
    </div>

  </div>
`;

initCashbackWidget('cashback-widget-root');

if (!isOut) {
  const decBtn  = document.getElementById('pdp-qty-dec');
  const incBtn  = document.getElementById('pdp-qty-inc');
  const qtyNum  = document.getElementById('pdp-qty-num');
  const addBtn  = document.getElementById('pdp-add-btn');

  function updateQtyUI() {
    qtyNum.textContent = qty;
    addBtn.textContent = `Add to Bag — $${(product.price * qty).toFixed(2)}`;
  }

  decBtn.addEventListener('click', () => { qty = Math.max(1, qty - 1); updateQtyUI(); });
  incBtn.addEventListener('click', () => { qty += 1; updateQtyUI(); });

  addBtn.addEventListener('click', () => {
    for (let i = 0; i < qty; i++) addItem(product);
    advanceDemoBar(3);
    refreshCashbackWidget('cashback-widget-root');
  });
}

function getProductDetails(p) {
  const lines = {
    skincare:  'Dermatologist-tested and suitable for all skin types. Results visible within 4 weeks of consistent use.',
    makeup:    'Buildable coverage that photographs beautifully and lasts through long evenings.',
    treatment: 'Apply to cleansed skin morning or evening for best results. Suitable for all skin types.',
    sets:      'Designed to work as a complete system or layered with existing favorites.',
    robes:     'Cut for ease and elegance — whether at home or while travelling. Drapes naturally for all body types.',
    bodywear:  'Stretch-recovery fabric that moves with you. Fully adjustable for a precise fit.',
    lounge:    'Soft enough for sleeping, refined enough for a morning coffee. Machine washable with care.',
    clothing:  'Certified safe for sensitive newborn skin. Easy-access snap closures for quick changes.',
    nursery:   'Built to withstand daily use. Easy to clean and free of harsh chemicals.',
    play:      'Developed with child development specialists. Safe from birth, no small parts.',
    feeding:   'BPA, PVC, and phthalate-free. Dishwasher safe on the top rack.',
  };
  return `${p.descriptor}. ${lines[p.category] ?? 'Crafted to the highest standards of quality.'}`;
}
