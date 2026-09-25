import { getActiveStore } from './stores.js';

export function getPromo() {
  return getActiveStore().activeCampaign;
}

export function calcCredit(subtotal) {
  const { pct, minOrder } = getActiveStore().activeCampaign;
  if (subtotal < minOrder) return 0;
  return parseFloat((subtotal * pct).toFixed(2));
}

export function initCityDetection() {
  const pill = document.getElementById('city-pill');
  if (!pill) return;

  const { city, name, pct } = getActiveStore().activeCampaign;
  const pctLabel = `${Math.round(pct * 100)}%`;

  pill.style.cssText = 'opacity:0;transform:translateY(6px);transition:opacity 400ms ease,transform 400ms ease,border-color 400ms ease;';

  // State 1 — Detecting
  setTimeout(() => {
    pill.innerHTML = `
      <div class="city-pill__detecting">
        <div class="city-pill__spinner" aria-hidden="true"></div>
        <span class="city-pill__detect-text">Detecting your location...</span>
      </div>
    `;
    pill.style.borderColor = 'var(--color-border)';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      pill.style.opacity = '1';
      pill.style.transform = 'translateY(0)';
    }));
  }, 900);

  // State 2 — City confirmed
  setTimeout(() => {
    pill.style.opacity = '0';
    setTimeout(() => {
      pill.innerHTML = `
        <span class="city-pill__dot" aria-hidden="true"></span>
        <div class="city-pill__text-group">
          <span class="city-pill__location">📍 ${city}</span>
        </div>
      `;
      pill.style.borderColor = 'rgba(201, 169, 110, 0.4)';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        pill.style.opacity = '1';
      }));
    }, 350);
  }, 2100);

  // State 3 — Offer line expands
  setTimeout(() => {
    const textGroup = pill.querySelector('.city-pill__text-group');
    if (!textGroup) return;
    const offerEl = document.createElement('span');
    offerEl.className = 'city-pill__offer';
    offerEl.style.cssText = 'display:block;opacity:0;max-height:0;overflow:hidden;transition:opacity 500ms ease,max-height 400ms ease;';
    offerEl.textContent = `${name} — ${pctLabel} store credit · Active`;
    textGroup.appendChild(offerEl);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      offerEl.style.opacity = '1';
      offerEl.style.maxHeight = '40px';
    }));
  }, 3000);
}
