import { initSharedLayout } from '../partials.js';
import { initCart, openCart, closeCart, addItem } from '../cart.js';
import { initDemoBar } from '../demoBar.js';
import { renderProducts } from '../products.js';
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

// Category tabs — built from active store
const tabsRoot = document.getElementById('category-tabs');
if (tabsRoot) {
  const store = getActiveStore();
  const tabs  = store.categoryTabs || [{ id: 'all', label: 'All' }];
  tabsRoot.innerHTML = tabs.map((t, i) => `
    <button class="tab${i === 0 ? ' tab--active' : ''}" role="tab"
      aria-selected="${i === 0}" data-category="${t.id}">${t.label}</button>
  `).join('');

  tabsRoot.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      tabsRoot.querySelectorAll('.tab').forEach(t => {
        t.classList.remove('tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('tab--active');
      tab.setAttribute('aria-selected', 'true');
      renderProducts(tab.dataset.category);
    });
  });
}

initCart();
initDemoBar();
renderProducts('all');
initCashbackWidget('cashback-widget-root');

// Refresh widget when cart changes
document.addEventListener('cartUpdated', () => refreshCashbackWidget('cashback-widget-root'));
