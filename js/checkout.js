import { advanceDemoBar } from './demoBar.js';
import { getActiveStore } from './stores.js';
import { buildRewardTypes, spawnConfetti } from './checkoutShared.js';

const getOverlay = () => document.getElementById('checkout-overlay');
const getModal   = () => document.getElementById('checkout-modal');

let selectedRewardId = null;

export function openCheckout(items, subtotal, credit) {
  const overlay = getOverlay();
  selectedRewardId = null;
  renderRewardPicker(subtotal, credit);
  overlay.style.display = 'flex';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => overlay.classList.add('is-open'));
  });
  document.body.style.overflow = 'hidden';
  advanceDemoBar(5);
}

function closeCheckout() {
  const overlay = getOverlay();
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';
  setTimeout(() => { overlay.style.display = 'none'; }, 280);
}

// ---- Step 1: Reward Picker ----

function renderRewardPicker(subtotal, credit) {
  const modal = getModal();
  const store = getActiveStore();
  const rewardTypes = buildRewardTypes(store);
  const campaignName = store.activeCampaign.name;

  modal.innerHTML = `
    <div class="checkout-modal__inner">

      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
        <p class="eyebrow" style="margin:0">${campaignName}</p>
        <button id="close-modal-x" aria-label="Close" style="color:var(--color-muted);padding:4px;cursor:pointer;background:none;border:none;line-height:1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <h2 style="font-family:var(--font-display);font-size:32px;font-weight:600;color:var(--color-text);line-height:1.1;margin-bottom:10px">
        Choose how you want to be rewarded.
      </h2>
      <p style="font-size:14px;color:var(--color-muted);line-height:1.65;margin-bottom:28px">
        Your order qualifies for the ${campaignName}. Pick the reward format that works best for you — 99minds delivers it instantly when your order ships.
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

    </div>
  `;

  document.querySelectorAll('.reward-type-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.reward-type-card').forEach(c => {
        c.classList.remove('reward-type-card--selected');
        c.setAttribute('aria-checked', 'false');
      });
      card.classList.add('reward-type-card--selected');
      card.setAttribute('aria-checked', 'true');
      selectedRewardId = card.dataset.reward;
      const btn = document.getElementById('claim-btn');
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
    });
  });

  document.getElementById('claim-btn').addEventListener('click', () => {
    if (!selectedRewardId) return;
    fadeToConfirmed(subtotal, credit);
  });

  document.getElementById('close-modal-x').addEventListener('click', closeCheckout);
}

// ---- Step 2: Order Confirmed ----

function fadeToConfirmed(subtotal, credit) {
  const modal = getModal();
  modal.style.transition = 'opacity 200ms ease';
  modal.style.opacity = '0';
  setTimeout(() => {
    renderConfirmed(subtotal, credit);
    modal.style.opacity = '1';
  }, 200);
}

function renderConfirmed(subtotal, credit) {
  const modal = getModal();
  const store = getActiveStore();
  const rewardTypes = buildRewardTypes(store);
  const reward  = rewardTypes.find(r => r.id === selectedRewardId);
  const orderId = store.checkoutCopy.orderPrefix + Math.floor(1000 + Math.random() * 9000);
  const today   = new Date();
  const shipDate = new Date(today);
  shipDate.setDate(today.getDate() + 3);
  const fmt = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  modal.innerHTML = `
    <div class="checkout-modal__inner">

      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px">
        <p class="eyebrow" style="margin:0">Order Confirmed</p>
        <button id="close-modal-x" aria-label="Close" style="color:var(--color-muted);padding:4px;cursor:pointer;background:none;border:none;line-height:1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div class="checkout-modal__hero">
        <div class="checkout-modal__check">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M6 14l6 6 10-12"
              stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
              stroke-dasharray="40" stroke-dashoffset="40"
              style="animation:checkDraw 0.5s cubic-bezier(0.4,0,0.2,1) 0.2s forwards"/>
          </svg>
        </div>
        <h2 class="checkout-modal__headline">You're all set.</h2>
        <p class="checkout-modal__order-id">Demo Order #${orderId}</p>
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
          <div class="checkout-modal__offer-detail">
            ${reward.tagline} · Delivers when your order ships
          </div>
        </div>
      </div>

      <div class="checkout-modal__divider"></div>

      <p class="checkout-modal__section-label">Timeline</p>
      <div class="checkout-modal__timeline">
        <div class="timeline-step">
          <div class="timeline-step__dot"></div>
          <div>
            <div class="timeline-step__title">Order placed</div>
            <div class="timeline-step__date">${fmt(today)}</div>
          </div>
        </div>
        <div class="timeline-step timeline-step--pending">
          <div class="timeline-step__dot"></div>
          <div>
            <div class="timeline-step__title">Order ships</div>
            <div class="timeline-step__date">Est. ${fmt(shipDate)}</div>
          </div>
        </div>
        <div class="timeline-step timeline-step--pending">
          <div class="timeline-step__dot"></div>
          <div>
            <div class="timeline-step__title">Reward delivered</div>
            <div class="timeline-step__date">Est. ${fmt(shipDate)}</div>
          </div>
        </div>
      </div>

      <div class="checkout-modal__divider"></div>

      <div class="checkout-modal__demo-shortcut">
        <p class="checkout-modal__shortcut-label">Demo shortcut</p>
        <p class="checkout-modal__shortcut-body">
          In a real order, your reward delivers when your order ships.
          Here, fast-forward to see it.
        </p>
        <button class="btn btn--gold btn--full" id="fast-forward-btn">
          Fast-forward to reward →
        </button>
      </div>

    </div>
  `;

  document.getElementById('fast-forward-btn').addEventListener('click', () => fadeToReward(subtotal));
  document.getElementById('close-modal-x').addEventListener('click', closeCheckout);
}

// ---- Step 3: Reward Delivered ----

function fadeToReward(subtotal) {
  const modal = getModal();
  modal.style.transition = 'opacity 200ms ease';
  modal.style.opacity = '0';
  setTimeout(() => {
    renderReward(subtotal);
    modal.style.opacity = '1';
  }, 200);
}

function renderReward(subtotal) {
  const modal = getModal();
  const store = getActiveStore();
  const rewardTypes = buildRewardTypes(store);
  const chosen = rewardTypes.find(r => r.id === selectedRewardId);
  const others = rewardTypes.filter(r => r.id !== selectedRewardId);

  modal.innerHTML = `
    <div class="reward-screen">

      <button id="close-reward-x" aria-label="Close" style="position:absolute;top:20px;right:20px;color:var(--color-muted);padding:4px;cursor:pointer;background:none;border:none;line-height:1">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      <p class="eyebrow reward-screen__eyebrow">Reward Delivered</p>

      <div class="reward-screen__chosen-icon" style="color:${chosen.color}">${chosen.icon}</div>
      <div class="reward-screen__amount" style="color:${chosen.color}">${chosen.deliveryHeadline(subtotal)}</div>
      <div class="reward-screen__ready">is ready.</div>

      <img src="99minds-logo.svg" alt="99minds" class="reward-screen__logo">

      <p class="reward-screen__body">${chosen.deliveryBody}</p>

      ${chosen.code ? `
        <div class="reward-screen__code">${chosen.code}</div>
      ` : ''}

      <div class="reward-screen__actions">
        <button class="btn btn--gold btn--full" id="shop-again-btn">
          Shop again →
        </button>
        <button class="btn btn--ghost btn--full" id="close-reward-btn">
          Close
        </button>
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

      <div class="reward-screen__fine">
        Powered by 99minds Promotions ·
        A fictional demo · Not a real transaction
      </div>

    </div>
  `;

  document.getElementById('shop-again-btn').addEventListener('click', () => window.location.reload());
  document.getElementById('close-reward-btn').addEventListener('click', closeCheckout);
  document.getElementById('close-reward-x').addEventListener('click', closeCheckout);

  spawnConfetti(getModal().querySelector('.reward-screen'));
  document.dispatchEvent(new CustomEvent('checkout:reward-delivered'));
}
