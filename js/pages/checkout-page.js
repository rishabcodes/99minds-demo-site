import { initSharedLayout } from '../partials.js';
import { initCart, openCart, closeCart, getCartItems, getSubtotal } from '../cart.js';
import { initDemoBar } from '../demoBar.js';
import { calcCredit } from '../cityPromo.js';
import { getActiveStore, withStore } from '../stores.js';
import { buildRewardTypes, spawnConfetti } from '../checkoutShared.js';

initSharedLayout();

document.getElementById('cart-btn')?.addEventListener('click', openCart);
document.getElementById('cart-close')?.addEventListener('click', closeCart);
document.getElementById('cart-overlay')?.addEventListener('click', closeCart);

initCart();
initDemoBar();

const store       = getActiveStore();
const items       = getCartItems();
const subtotal    = getSubtotal();
const credit      = calcCredit(subtotal);
const rewardTypes = buildRewardTypes(store);
let selectedId    = null;

// If cart is empty, redirect to collection
if (items.length === 0) {
  window.location.href = withStore('collection.html');
} else {
  renderPicker();
}

function getContent() { return document.getElementById('checkout-page-content'); }

function renderPicker() {
  const el = getContent();
  if (!el) return;

  el.innerHTML = `
    <p class="eyebrow" style="margin-bottom:16px">${store.activeCampaign.name}</p>
    <h1 style="font-family:var(--font-display);font-size:clamp(28px,4vw,40px);font-weight:600;color:var(--color-text);line-height:1.1;margin-bottom:12px">
      Choose how you want to be rewarded.
    </h1>
    <p style="font-size:14px;color:var(--color-muted);line-height:1.65;margin-bottom:32px">
      Your order qualifies for the ${store.activeCampaign.name}. Pick the reward format that works best for you.
    </p>

    <div class="reward-picker__grid" id="reward-picker-grid">
      ${rewardTypes.map(r => `
        <div class="reward-type-card" data-reward="${r.id}" tabindex="0" role="radio" aria-checked="false">
          <div class="reward-type-card__icon" style="color:${r.color}">${r.icon}</div>
          <div class="reward-type-card__body">
            <div class="reward-type-card__label">${r.label}</div>
            <div class="reward-type-card__tagline">${r.tagline}</div>
          </div>
          <div class="reward-type-card__value" style="color:${r.color}">${r.getValue(subtotal)}</div>
        </div>
      `).join('')}
    </div>

    <button class="btn btn--gold btn--full" id="claim-btn" disabled style="margin-top:28px;opacity:0.4;cursor:not-allowed">
      Claim reward →
    </button>
    <p style="text-align:center;font-size:11px;color:var(--color-muted);margin-top:12px">
      No payment required · Demo only · Powered by 99minds
    </p>
  `;

  el.querySelectorAll('.reward-type-card').forEach(card => {
    card.addEventListener('click', () => {
      el.querySelectorAll('.reward-type-card').forEach(c => {
        c.classList.remove('reward-type-card--selected');
        c.setAttribute('aria-checked', 'false');
      });
      card.classList.add('reward-type-card--selected');
      card.setAttribute('aria-checked', 'true');
      selectedId = card.dataset.reward;
      const btn = document.getElementById('claim-btn');
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
    });
  });

  document.getElementById('claim-btn').addEventListener('click', () => {
    if (!selectedId) return;
    // Save reward to sessionStorage for loyalty page
    const chosen = rewardTypes.find(r => r.id === selectedId);
    sessionStorage.setItem('last-reward', JSON.stringify({
      id:     chosen.id,
      label:  chosen.label,
      value:  chosen.getValue(subtotal),
      headline: chosen.deliveryHeadline(subtotal),
      body:   chosen.deliveryBody,
      code:   chosen.code || null,
      color:  chosen.color,
      orderId: store.checkoutCopy.orderPrefix + Math.floor(1000 + Math.random() * 9000),
      subtotal,
      campaign: store.activeCampaign.name,
      storeId: store.id,
    }));
    fadeTo(renderConfirmed);
  });
}

function fadeTo(fn) {
  const el = getContent();
  if (!el) return;
  el.style.transition = 'opacity 200ms ease';
  el.style.opacity = '0';
  setTimeout(() => { fn(); el.style.opacity = '1'; }, 200);
}

function renderConfirmed() {
  const el = getContent();
  if (!el) return;
  const reward  = rewardTypes.find(r => r.id === selectedId);
  const raw     = sessionStorage.getItem('last-reward');
  const saved   = raw ? (() => { const r = JSON.parse(raw); return r.storeId === store.id ? r : {}; })() : {};
  const today   = new Date();
  const ship    = new Date(today); ship.setDate(today.getDate() + 3);
  const fmt     = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  el.innerHTML = `
    <div class="checkout-modal__hero" style="text-align:center;margin-bottom:32px">
      <div class="checkout-modal__check">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M6 14l6 6 10-12" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
            stroke-dasharray="40" stroke-dashoffset="40"
            style="animation:checkDraw 0.5s cubic-bezier(0.4,0,0.2,1) 0.2s forwards"/>
        </svg>
      </div>
      <h2 class="checkout-modal__headline">You're all set.</h2>
      <p class="checkout-modal__order-id">Demo Order #${saved.orderId}</p>
      <p class="checkout-modal__note">
        No charge was made. Your ${store.activeCampaign.name}<br>is now attached to this fictional order.
      </p>
    </div>

    <div class="checkout-modal__divider"></div>

    <p class="checkout-modal__section-label">Your chosen reward</p>
    <div class="checkout-modal__offer-block">
      <div class="checkout-modal__offer-icon" style="color:${reward.color}">${reward.icon}</div>
      <div>
        <div class="checkout-modal__offer-name">${reward.label} — ${reward.getValue(subtotal)}</div>
        <div class="checkout-modal__offer-detail">${reward.tagline} · Delivers when your order ships</div>
      </div>
    </div>

    <div class="checkout-modal__divider"></div>

    <p class="checkout-modal__section-label">Timeline</p>
    <div class="checkout-modal__timeline">
      <div class="timeline-step">
        <div class="timeline-step__dot"></div>
        <div><div class="timeline-step__title">Order placed</div><div class="timeline-step__date">${fmt(today)}</div></div>
      </div>
      <div class="timeline-step timeline-step--pending">
        <div class="timeline-step__dot"></div>
        <div><div class="timeline-step__title">Order ships</div><div class="timeline-step__date">Est. ${fmt(ship)}</div></div>
      </div>
      <div class="timeline-step timeline-step--pending">
        <div class="timeline-step__dot"></div>
        <div><div class="timeline-step__title">Reward delivered</div><div class="timeline-step__date">Est. ${fmt(ship)}</div></div>
      </div>
    </div>

    <div style="margin-top:32px">
      <button class="btn btn--gold btn--full" id="fast-forward-btn">Fast-forward to reward →</button>
    </div>
  `;

  document.getElementById('fast-forward-btn').addEventListener('click', () => fadeTo(renderReward));
}

function renderReward() {
  const el = getContent();
  if (!el) return;
  const _raw  = sessionStorage.getItem('last-reward');
  const saved = _raw ? (() => { const r = JSON.parse(_raw); return r.storeId === store.id ? r : {}; })() : {};
  const chosen = rewardTypes.find(r => r.id === selectedId);
  const others = rewardTypes.filter(r => r.id !== selectedId);

  el.innerHTML = `
    <div class="reward-screen" style="position:relative">
      <p class="eyebrow reward-screen__eyebrow">Reward Delivered</p>
      <div class="reward-screen__chosen-icon" style="color:${chosen.color}">${chosen.icon}</div>
      <div class="reward-screen__amount" style="color:${chosen.color}">${chosen.deliveryHeadline(subtotal)}</div>
      <div class="reward-screen__ready">is ready.</div>
      <img src="99minds-logo.svg" alt="99minds" class="reward-screen__logo">
      <p class="reward-screen__body">${chosen.deliveryBody}</p>
      ${chosen.code ? `<div class="reward-screen__code">${chosen.code}</div>` : ''}
      <div class="reward-screen__actions">
        <a href="${withStore('loyalty.html')}" class="btn btn--gold btn--full" style="display:block;text-align:center;text-decoration:none">
          View your rewards dashboard →
        </a>
        <a href="${withStore('collection.html')}" class="btn btn--ghost btn--full" style="display:block;text-align:center;text-decoration:none;margin-top:8px">
          Shop again
        </a>
      </div>
      <div class="reward-screen__also">
        <p class="reward-screen__also-label">99minds also supports</p>
        <div class="reward-screen__also-grid">
          ${others.map(r => `
            <div class="also-reward">
              <div class="also-reward__icon" style="color:${r.color}">${r.icon}</div>
              <div class="also-reward__label">${r.label}</div>
              <div class="also-reward__value">${r.getValue(subtotal)}</div>
            </div>
          `).join('')}
        </div>
        <p class="reward-screen__also-note">Not selected this time — all configurable per campaign</p>
      </div>
      <div class="reward-screen__fine">Powered by 99minds Promotions · A fictional demo · Not a real transaction</div>
    </div>
  `;

  spawnConfetti(el.querySelector('.reward-screen'));
  sessionStorage.removeItem('cart');
}
