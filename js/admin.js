import { getActiveStore, STORES } from './stores.js';
import { getCartItems, setCartItems, clearCart } from './cart.js';

// Admin overlay — merchant control surface
// All changes auto-save to sessionStorage and broadcast admin:update immediately.

export function initAdmin() {
  const root = document.createElement('div');
  root.id = 'admin-root';
  document.body.appendChild(root);
  root.innerHTML = buildAdminHTML();
  wireEvents();
}

export function openAdmin() {
  populateTabs();
  document.getElementById('admin-scrim')?.classList.add('is-open');
  document.getElementById('admin-panel')?.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeAdmin() {
  document.getElementById('admin-scrim')?.classList.remove('is-open');
  document.getElementById('admin-panel')?.classList.remove('is-open');
  document.body.style.overflow = '';
}

function wireEvents() {
  document.getElementById('admin-scrim')?.addEventListener('click', closeAdmin);
  document.getElementById('admin-close')?.addEventListener('click', closeAdmin);
  document.getElementById('admin-open-btn')?.addEventListener('click', openAdmin);

  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  document.getElementById('admin-econ-order')?.addEventListener('input', updateEconPreview);
  document.getElementById('admin-cart-fill')?.addEventListener('click', onCartFill);
  document.getElementById('admin-cart-clear')?.addEventListener('click', onCartClear);
  document.getElementById('admin-reset')?.addEventListener('click', onReset);
}

function switchTab(tabId) {
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.admin-tab-panel').forEach(panel => {
    panel.classList.toggle('is-active', panel.dataset.panel === tabId);
  });
}

function populateTabs() {
  const store = getActiveStore();
  document.getElementById('admin-store-label').textContent = store.name;
  populateCampaigns(store);
  populateRewards(store);
  populateDemo(store);
}

// ---- Tab 1: Campaigns ----

function populateCampaigns(store) {
  const tbody = document.getElementById('admin-campaigns-tbody');
  if (!tbody) return;

  const { pct, minOrder } = store.activeCampaign;

  tbody.innerHTML = store.campaigns.map(c => `
    <tr class="admin-tr ${c.isUserCity ? 'admin-tr--city' : ''}">
      <td>
        <span class="admin-tr__city">${c.city}</span>
        ${c.isUserCity ? '<span class="admin-badge">Your City</span>' : ''}
      </td>
      <td class="admin-td--muted">${c.name}</td>
      <td>
        ${c.isUserCity
          ? `<div class="admin-input-wrap"><input type="number" class="admin-input" id="admin-pct" value="${Math.round(pct * 100)}" min="1" max="100" aria-label="Offer percent"><span class="admin-input-suffix">%</span></div>`
          : `<span class="admin-td--muted">${c.offer}</span>`
        }
      </td>
      <td>
        ${c.isUserCity
          ? `<div class="admin-input-wrap"><span class="admin-input-prefix">$</span><input type="number" class="admin-input" id="admin-minorder" value="${minOrder}" min="0" aria-label="Minimum order"></div>`
          : `<span class="admin-td--muted">${c.minOrder}</span>`
        }
      </td>
      <td>
        <label class="admin-toggle">
          <input type="checkbox" class="admin-toggle__input" data-city="${c.city}" ${c.status === 'active' ? 'checked' : ''}>
          <span class="admin-toggle__track" aria-hidden="true"></span>
        </label>
      </td>
      <td class="admin-td--muted">${c.validThrough}</td>
    </tr>
  `).join('');

  document.getElementById('admin-pct')?.addEventListener('input', () => {
    updateEconPreview();
    autoSave();
  });
  document.getElementById('admin-minorder')?.addEventListener('input', autoSave);
  document.querySelectorAll('#admin-campaigns-tbody .admin-toggle__input').forEach(t => {
    t.addEventListener('change', autoSave);
  });
}

// ---- Tab 2: Rewards & Economics ----

function populateRewards(store) {
  const ov  = loadOverrides();
  const rc  = ov?.rewardConfig ?? {};
  const enabledIds      = ov?.enabledRewardIds ?? store.rewardTypes.map(r => r.id);
  const deliveryTrigger = ov?.deliveryTrigger ?? 'ship';
  const emailNotif      = ov?.emailNotification ?? true;
  const pct             = Math.round(store.activeCampaign.pct * 100);

  const couponValue  = rc.coupon?.value  ?? 15;
  const couponExpiry = rc.coupon?.expiry ?? 30;
  const earnRate     = rc.points?.earnRate  ?? 1;
  const pointsMult   = rc.points?.multiplier ?? false;
  const denomination = rc.giftcard?.denomination ?? 25;
  const shareable    = rc.giftcard?.shareable ?? true;
  const autoApply    = rc.credit?.autoApply ?? true;

  const tiles = document.getElementById('admin-reward-tiles');
  if (!tiles) return;

  tiles.innerHTML = `
    <div class="admin-reward-tile ${enabledIds.includes('credit') ? '' : 'is-disabled'}" data-reward="credit">
      <div class="admin-reward-tile__hdr">
        <div class="admin-reward-tile__icon" style="background:rgba(201,169,110,0.14);color:#c9a96e">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
        </div>
        <span class="admin-reward-tile__name">Store Credit</span>
        <label class="admin-toggle admin-toggle--sm">
          <input type="checkbox" class="admin-toggle__input admin-reward-toggle" data-reward="credit" ${enabledIds.includes('credit') ? 'checked' : ''} aria-label="Enable store credit">
          <span class="admin-toggle__track" aria-hidden="true"></span>
        </label>
      </div>
      <div class="admin-reward-tile__cfg">
        <div class="admin-cfg-row">
          <span class="admin-cfg-label">Campaign rate</span>
          <span class="admin-cfg-locked">${pct}%<em>from campaign</em></span>
        </div>
        <div class="admin-cfg-row">
          <span class="admin-cfg-label">Auto-apply at checkout</span>
          <label class="admin-toggle admin-toggle--sm">
            <input type="checkbox" class="admin-toggle__input" id="credit-autoapply" ${autoApply ? 'checked' : ''}>
            <span class="admin-toggle__track" aria-hidden="true"></span>
          </label>
        </div>
        <div class="admin-cfg-row">
          <span class="admin-cfg-label">Expiry</span>
          <span class="admin-cfg-badge">Never</span>
        </div>
      </div>
    </div>

    <div class="admin-reward-tile ${enabledIds.includes('coupon') ? '' : 'is-disabled'}" data-reward="coupon">
      <div class="admin-reward-tile__hdr">
        <div class="admin-reward-tile__icon" style="background:rgba(126,184,164,0.14);color:#7eb8a4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
        </div>
        <span class="admin-reward-tile__name">Coupons</span>
        <label class="admin-toggle admin-toggle--sm">
          <input type="checkbox" class="admin-toggle__input admin-reward-toggle" data-reward="coupon" ${enabledIds.includes('coupon') ? 'checked' : ''} aria-label="Enable coupons">
          <span class="admin-toggle__track" aria-hidden="true"></span>
        </label>
      </div>
      <div class="admin-reward-tile__cfg">
        <div class="admin-cfg-row">
          <span class="admin-cfg-label">Discount value</span>
          <div class="admin-input-wrap">
            <span class="admin-input-prefix">$</span>
            <input type="number" class="admin-input" id="coupon-value" value="${couponValue}" min="5" max="50" style="width:52px" aria-label="Coupon value">
          </div>
        </div>
        <div class="admin-cfg-row">
          <span class="admin-cfg-label">Expiry</span>
          <div class="admin-pill-group" id="coupon-expiry-group">
            <button class="admin-pill ${couponExpiry === 30 ? 'is-active' : ''}" data-days="30">30d</button>
            <button class="admin-pill ${couponExpiry === 60 ? 'is-active' : ''}" data-days="60">60d</button>
            <button class="admin-pill ${couponExpiry === 90 ? 'is-active' : ''}" data-days="90">90d</button>
          </div>
        </div>
        <div class="admin-cfg-row">
          <span class="admin-cfg-label">Valid on</span>
          <span class="admin-cfg-badge">All orders</span>
        </div>
      </div>
    </div>

    <div class="admin-reward-tile ${enabledIds.includes('points') ? '' : 'is-disabled'}" data-reward="points">
      <div class="admin-reward-tile__hdr">
        <div class="admin-reward-tile__icon" style="background:rgba(155,142,196,0.14);color:#9b8ec4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
        <span class="admin-reward-tile__name">Loyalty Points</span>
        <label class="admin-toggle admin-toggle--sm">
          <input type="checkbox" class="admin-toggle__input admin-reward-toggle" data-reward="points" ${enabledIds.includes('points') ? 'checked' : ''} aria-label="Enable loyalty points">
          <span class="admin-toggle__track" aria-hidden="true"></span>
        </label>
      </div>
      <div class="admin-reward-tile__cfg">
        <div class="admin-cfg-row">
          <span class="admin-cfg-label">Earn rate</span>
          <div class="admin-pill-group" id="points-earn-group">
            <button class="admin-pill ${earnRate === 1 ? 'is-active' : ''}" data-rate="1">1×</button>
            <button class="admin-pill ${earnRate === 2 ? 'is-active' : ''}" data-rate="2">2×</button>
            <button class="admin-pill ${earnRate === 3 ? 'is-active' : ''}" data-rate="3">3×</button>
            <button class="admin-pill ${earnRate === 5 ? 'is-active' : ''}" data-rate="5">5×</button>
          </div>
        </div>
        <div class="admin-cfg-row">
          <span class="admin-cfg-label">Redemption rate</span>
          <span class="admin-cfg-locked">100 pts = $1<em>fixed</em></span>
        </div>
        <div class="admin-cfg-row">
          <span class="admin-cfg-label">Campaign 2× boost</span>
          <label class="admin-toggle admin-toggle--sm">
            <input type="checkbox" class="admin-toggle__input" id="points-multiplier" ${pointsMult ? 'checked' : ''}>
            <span class="admin-toggle__track" aria-hidden="true"></span>
          </label>
        </div>
      </div>
    </div>

    <div class="admin-reward-tile ${enabledIds.includes('giftcard') ? '' : 'is-disabled'}" data-reward="giftcard">
      <div class="admin-reward-tile__hdr">
        <div class="admin-reward-tile__icon" style="background:rgba(196,132,110,0.14);color:#c4846e">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>
        </div>
        <span class="admin-reward-tile__name">Gift Cards</span>
        <label class="admin-toggle admin-toggle--sm">
          <input type="checkbox" class="admin-toggle__input admin-reward-toggle" data-reward="giftcard" ${enabledIds.includes('giftcard') ? 'checked' : ''} aria-label="Enable gift cards">
          <span class="admin-toggle__track" aria-hidden="true"></span>
        </label>
      </div>
      <div class="admin-reward-tile__cfg">
        <div class="admin-cfg-row">
          <span class="admin-cfg-label">Denomination</span>
          <div class="admin-pill-group" id="giftcard-denom-group">
            <button class="admin-pill ${denomination === 10 ? 'is-active' : ''}" data-amount="10">$10</button>
            <button class="admin-pill ${denomination === 25 ? 'is-active' : ''}" data-amount="25">$25</button>
            <button class="admin-pill ${denomination === 50 ? 'is-active' : ''}" data-amount="50">$50</button>
          </div>
        </div>
        <div class="admin-cfg-row">
          <span class="admin-cfg-label">Shareable &amp; transferable</span>
          <label class="admin-toggle admin-toggle--sm">
            <input type="checkbox" class="admin-toggle__input" id="giftcard-shareable" ${shareable ? 'checked' : ''}>
            <span class="admin-toggle__track" aria-hidden="true"></span>
          </label>
        </div>
        <div class="admin-cfg-row">
          <span class="admin-cfg-label">Expiry</span>
          <span class="admin-cfg-badge">Never</span>
        </div>
      </div>
    </div>
  `;

  // Wire pill groups
  wirePillGroup('coupon-expiry-group', autoSave);
  wirePillGroup('giftcard-denom-group', autoSave);
  wirePillGroup('points-earn-group', () => { autoSave(); updateEconPreview(); });

  // Wire reward enable/disable toggles
  document.querySelectorAll('.admin-reward-toggle').forEach(t => {
    t.addEventListener('change', () => {
      t.closest('.admin-reward-tile')?.classList.toggle('is-disabled', !t.checked);
      updateRewardsStatus();
      autoSave();
    });
  });

  // Wire per-type config inputs
  document.getElementById('credit-autoapply')?.addEventListener('change', autoSave);
  document.getElementById('points-multiplier')?.addEventListener('change', autoSave);
  document.getElementById('giftcard-shareable')?.addEventListener('change', autoSave);
  document.getElementById('coupon-value')?.addEventListener('input', autoSave);

  // Wire delivery trigger pills
  document.querySelectorAll('.admin-delivery-btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.trigger === deliveryTrigger);
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-delivery-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      autoSave();
    });
  });

  // Wire email notification
  const emailEl = document.getElementById('admin-email-notif');
  if (emailEl) {
    emailEl.checked = emailNotif;
    emailEl.addEventListener('change', autoSave);
  }

  updateRewardsStatus();
  updateEconPreview();
}

function wirePillGroup(groupId, callback) {
  document.getElementById(groupId)?.querySelectorAll('.admin-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById(groupId)?.querySelectorAll('.admin-pill').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      callback();
    });
  });
}

function updateRewardsStatus() {
  const count = document.querySelectorAll('.admin-reward-toggle:checked').length;
  const el = document.getElementById('admin-rewards-status');
  if (el) el.textContent = `${count} of 4 active`;
}

function updateEconPreview() {
  const preview = document.getElementById('admin-econ-preview');
  if (!preview) return;

  const store    = getActiveStore();
  const pctEl    = document.getElementById('admin-pct');
  const orderEl  = document.getElementById('admin-econ-order');
  const pct      = pctEl  ? parseInt(pctEl.value, 10) / 100  : store.activeCampaign.pct;
  const order    = orderEl ? parseFloat(orderEl.value) || 150 : 150;
  const credit   = order * pct;
  const minOrder = store.activeCampaign.minOrder;

  const earnRateBtn  = document.querySelector('#points-earn-group .admin-pill.is-active');
  const earnRate     = earnRateBtn ? parseInt(earnRateBtn.dataset.rate, 10) : 1;
  const pointsEarned = Math.round(order * earnRate);

  const couponVal   = document.getElementById('coupon-value');
  const couponAmount = couponVal ? parseInt(couponVal.value, 10) || 15 : 15;

  const denomBtn    = document.querySelector('#giftcard-denom-group .admin-pill.is-active');
  const denomination = denomBtn ? parseInt(denomBtn.dataset.amount, 10) : 25;

  preview.innerHTML = `
    <div class="econ-row">
      <span class="econ-key">Customer order</span>
      <span class="econ-val">$${order.toFixed(2)}</span>
    </div>
    <div class="econ-row">
      <span class="econ-key">Campaign rate</span>
      <span class="econ-val">${Math.round(pct * 100)}% store credit</span>
    </div>
    <div class="econ-row">
      <span class="econ-key">Min order threshold</span>
      <span class="econ-val">$${minOrder}+</span>
    </div>
    <div class="econ-row econ-row--hero">
      <span class="econ-key">Store credit earned</span>
      <span class="econ-val econ-val--gold">$${credit.toFixed(2)}</span>
    </div>
    <div class="econ-row econ-row--hero">
      <span class="econ-key">Points equivalent</span>
      <span class="econ-val econ-val--purple">${pointsEarned.toLocaleString()} pts</span>
    </div>
    <div class="econ-row">
      <span class="econ-key">Coupon value</span>
      <span class="econ-val">$${couponAmount.toFixed(2)} off</span>
    </div>
    <div class="econ-row">
      <span class="econ-key">Gift card denomination</span>
      <span class="econ-val">$${denomination.toFixed(2)}</span>
    </div>
    <div class="econ-row">
      <span class="econ-key">Funded by</span>
      <span class="econ-val">Merchant</span>
    </div>
    <div class="econ-row">
      <span class="econ-key">Repeat purchase driver</span>
      <span class="econ-val">Customer returns to spend</span>
    </div>
  `;
}

// ---- Tab 3: Demo Controls ----

function populateDemo(store) {
  const storeCards = document.getElementById('admin-store-cards');
  if (!storeCards) return;

  storeCards.innerHTML = Object.values(STORES).map(s => `
    <button class="admin-store-card ${s.id === store.id ? 'is-active' : ''}" data-store="${s.id}">
      ${s.id === store.id ? '<span class="admin-store-card__active-dot"></span>' : ''}
      <span class="admin-store-card__name">${s.name}</span>
      <span class="admin-store-card__city">${s.activeCampaign.city}</span>
      ${s.id === store.id ? '<span class="admin-store-card__badge">Active</span>' : ''}
    </button>
  `).join('');

  storeCards.querySelectorAll('.admin-store-card').forEach(card => {
    card.addEventListener('click', () => {
      if (card.dataset.store === store.id) return;
      sessionStorage.removeItem('admin-overrides');
      sessionStorage.removeItem('cart');
      sessionStorage.removeItem('demo-step');
      sessionStorage.removeItem('guide-step');
      sessionStorage.removeItem('last-reward');
      sessionStorage.removeItem('active-store');
      window.location.href = `index.html?store=${card.dataset.store}`;
    });
  });
}

// ---- Auto Save ----

function autoSave() {
  const store = getActiveStore();
  const ov    = loadOverrides() || {};
  ov.storeId  = store.id;

  // Campaign pct & minOrder
  const pctEl = document.getElementById('admin-pct');
  const minEl = document.getElementById('admin-minorder');
  if (pctEl) { ov.activeCampaign = ov.activeCampaign || {}; ov.activeCampaign.pct      = parseInt(pctEl.value, 10) / 100; }
  if (minEl) { ov.activeCampaign = ov.activeCampaign || {}; ov.activeCampaign.minOrder = parseInt(minEl.value, 10); }

  // Campaign status toggles
  const toggles = document.querySelectorAll('#admin-campaigns-tbody .admin-toggle__input');
  if (toggles.length) {
    ov.campaigns = store.campaigns.map(c => {
      const t = document.querySelector(`#admin-campaigns-tbody .admin-toggle__input[data-city="${c.city}"]`);
      return { ...c, status: t?.checked ? 'active' : 'inactive' };
    });
  }

  // Enabled reward IDs
  const rewardToggles = document.querySelectorAll('.admin-reward-toggle');
  if (rewardToggles.length) {
    ov.enabledRewardIds = Array.from(rewardToggles).filter(cb => cb.checked).map(cb => cb.dataset.reward);
  }

  // Per-type reward config
  ov.rewardConfig = ov.rewardConfig || {};

  const autoApply = document.getElementById('credit-autoapply');
  if (autoApply) ov.rewardConfig.credit = { autoApply: autoApply.checked };

  const couponVal        = document.getElementById('coupon-value');
  const couponExpiryBtn  = document.querySelector('#coupon-expiry-group .admin-pill.is-active');
  ov.rewardConfig.coupon = {
    value:  couponVal       ? (parseInt(couponVal.value, 10) || 15) : (ov.rewardConfig.coupon?.value  ?? 15),
    expiry: couponExpiryBtn ? parseInt(couponExpiryBtn.dataset.days, 10)  : (ov.rewardConfig.coupon?.expiry ?? 30),
  };

  const earnRateBtn      = document.querySelector('#points-earn-group .admin-pill.is-active');
  const multiplier       = document.getElementById('points-multiplier');
  ov.rewardConfig.points = {
    earnRate:   earnRateBtn ? parseInt(earnRateBtn.dataset.rate, 10)   : (ov.rewardConfig.points?.earnRate   ?? 1),
    multiplier: multiplier  ? multiplier.checked                        : (ov.rewardConfig.points?.multiplier ?? false),
  };

  const denomBtn           = document.querySelector('#giftcard-denom-group .admin-pill.is-active');
  const shareable          = document.getElementById('giftcard-shareable');
  ov.rewardConfig.giftcard = {
    denomination: denomBtn  ? parseInt(denomBtn.dataset.amount, 10) : (ov.rewardConfig.giftcard?.denomination ?? 25),
    shareable:    shareable ? shareable.checked                      : (ov.rewardConfig.giftcard?.shareable    ?? true),
  };

  // Delivery
  const deliveryBtn = document.querySelector('.admin-delivery-btn.is-active');
  if (deliveryBtn) ov.deliveryTrigger = deliveryBtn.dataset.trigger;

  const emailNotif = document.getElementById('admin-email-notif');
  if (emailNotif) ov.emailNotification = emailNotif.checked;

  sessionStorage.setItem('admin-overrides', JSON.stringify(ov));
  document.dispatchEvent(new CustomEvent('admin:update'));
}

// ---- Demo Controls actions ----

function onCartFill() {
  const store    = getActiveStore();
  const minOrder = store.activeCampaign.minOrder;
  const items    = [...getCartItems()];
  let subtotal   = items.reduce((s, i) => s + i.price * i.qty, 0);

  if (subtotal >= minOrder) {
    showMsg(`Cart is already at $${subtotal.toFixed(2)} — threshold met.`);
    return;
  }

  for (const p of store.products) {
    if (subtotal >= minOrder) break;
    const existing = items.find(i => i.id === p.id);
    if (existing) { existing.qty++; } else { items.push({ ...p, qty: 1 }); }
    subtotal += p.price;
  }

  setCartItems(items);
  showMsg(`Cart filled to $${subtotal.toFixed(2)}.`);
}

function onCartClear() {
  clearCart();
  showMsg('Cart cleared.');
}

function onReset() {
  sessionStorage.clear();
  document.dispatchEvent(new CustomEvent('admin:update'));
  showMsg('Demo state reset. Reloading…');
  setTimeout(() => window.location.reload(), 900);
}

function showMsg(text) {
  const el = document.getElementById('admin-msg');
  if (!el) return;
  el.textContent = text;
  el.classList.add('is-visible');
  setTimeout(() => el.classList.remove('is-visible'), 3200);
}

function loadOverrides() {
  try { return JSON.parse(sessionStorage.getItem('admin-overrides') || 'null'); }
  catch { return null; }
}

// ---- HTML shell ----

function buildAdminHTML() {
  return `
    <div class="admin-scrim" id="admin-scrim"></div>

    <div class="admin-panel" id="admin-panel" role="dialog" aria-modal="true" aria-label="Merchant admin panel">

      <div class="admin-header">
        <div class="admin-header__left">
          <span class="admin-header__store" id="admin-store-label">STORE</span>
          <span class="admin-header__tag">
            <span class="admin-header__tag-dot"></span>
            BROWSER ADMIN &middot; SESSION ONLY
          </span>
        </div>
        <button class="admin-close-btn" id="admin-close" aria-label="Close admin">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div class="admin-tabs-row">
        <button class="admin-tab-btn is-active" data-tab="campaigns">Campaigns</button>
        <button class="admin-tab-btn" data-tab="rewards">Rewards &amp; Economics</button>
        <button class="admin-tab-btn" data-tab="demo">Demo Controls</button>
      </div>

      <div class="admin-body">

        <!-- Tab: Campaigns -->
        <div class="admin-tab-panel is-active" data-panel="campaigns">
          <p class="admin-hint">Your city campaign row is highlighted. Edit the offer % and minimum order — changes apply automatically.</p>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>City</th><th>Campaign</th><th>Offer %</th><th>Min order</th><th>Active</th><th>Valid through</th>
                </tr>
              </thead>
              <tbody id="admin-campaigns-tbody"></tbody>
            </table>
          </div>
        </div>

        <!-- Tab: Rewards & Economics -->
        <div class="admin-tab-panel" data-panel="rewards">

          <div class="admin-section">
            <div class="admin-section-hdr">
              <div class="admin-section-hdr__left">
                <span class="admin-section-num">01</span>
                <div>
                  <h3 class="admin-section-title">Reward types</h3>
                  <p class="admin-section-sub">Enable or disable each type and configure its settings. Changes apply instantly to the customer view.</p>
                </div>
              </div>
              <span class="admin-section-badge" id="admin-rewards-status">4 of 4 active</span>
            </div>
            <div class="admin-reward-tiles" id="admin-reward-tiles"></div>
          </div>

          <div class="admin-section">
            <div class="admin-section-hdr">
              <div class="admin-section-hdr__left">
                <span class="admin-section-num">02</span>
                <div>
                  <h3 class="admin-section-title">Payout economics</h3>
                  <p class="admin-section-sub">Model any order amount to see the credit and points math for your active campaign.</p>
                </div>
              </div>
              <div class="admin-econ-input-row">
                <label class="admin-econ-lbl" for="admin-econ-order">Order $</label>
                <div class="admin-input-wrap">
                  <span class="admin-input-prefix">$</span>
                  <input type="number" class="admin-input" id="admin-econ-order" value="150" min="0" style="width:72px" aria-label="Order amount">
                </div>
              </div>
            </div>
            <div id="admin-econ-preview" class="admin-econ-preview"></div>
          </div>

          <div class="admin-section admin-section--last">
            <div class="admin-section-hdr">
              <div class="admin-section-hdr__left">
                <span class="admin-section-num">03</span>
                <div>
                  <h3 class="admin-section-title">Delivery rules</h3>
                  <p class="admin-section-sub">When rewards land in the customer's account and how they are notified.</p>
                </div>
              </div>
            </div>
            <div class="admin-delivery-grid">
              <div class="admin-delivery-field">
                <span class="admin-cfg-label">Delivery trigger</span>
                <div class="admin-pill-group">
                  <button class="admin-delivery-btn admin-pill" data-trigger="ship">On ship</button>
                  <button class="admin-delivery-btn admin-pill" data-trigger="delivery">On delivery</button>
                  <button class="admin-delivery-btn admin-pill" data-trigger="instant">Instantly</button>
                </div>
              </div>
              <div class="admin-delivery-field">
                <span class="admin-cfg-label">Email notification</span>
                <label class="admin-toggle admin-toggle--sm">
                  <input type="checkbox" class="admin-toggle__input" id="admin-email-notif" checked>
                  <span class="admin-toggle__track" aria-hidden="true"></span>
                </label>
              </div>
            </div>
          </div>

        </div>

        <!-- Tab: Demo Controls -->
        <div class="admin-tab-panel" data-panel="demo">
          <div class="admin-demo-grid">

            <div class="admin-demo-card admin-demo-card--wide">
              <p class="admin-demo-card__title">Switch store</p>
              <p class="admin-demo-card__sub">Click a store to switch. Resets cart and overrides — navigates to that store's home page.</p>
              <div class="admin-store-cards" id="admin-store-cards"></div>
            </div>

            <div class="admin-demo-card">
              <p class="admin-demo-card__title">Cart state</p>
              <p class="admin-demo-card__sub">Set cart contents without navigating to the store.</p>
              <div class="admin-demo-card__btns">
                <button class="admin-action-btn" id="admin-cart-fill">Fill to campaign threshold</button>
                <button class="admin-action-btn admin-action-btn--danger" id="admin-cart-clear">Clear cart</button>
              </div>
            </div>

            <div class="admin-demo-card">
              <p class="admin-demo-card__title">Reset demo</p>
              <p class="admin-demo-card__sub">Clears cart, reward history, and all admin overrides. Page reloads automatically.</p>
              <button class="admin-action-btn admin-action-btn--danger" id="admin-reset">Reset all demo state</button>
            </div>

          </div>
          <div class="admin-msg" id="admin-msg"></div>
        </div>

      </div>
    </div>
  `;
}
