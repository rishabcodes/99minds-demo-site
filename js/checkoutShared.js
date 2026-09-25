// Shared helpers used by both checkout.js (modal flow) and checkout-page.js (full-page flow)

export const ICONS = {
  credit:   `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`,
  coupon:   `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  points:   `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  giftcard: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>`,
};

export function buildRewardTypes(store) {
  const { pct } = store.activeCampaign;
  return store.rewardTypes.map(rt => {
    const icon = ICONS[rt.id] || '';
    let tagline, getValue, deliveryHeadline;

    switch (rt.kind) {
      case 'pct':
        tagline          = `${Math.round(pct * 100)}% back on your order`;
        getValue         = s => `$${(s * pct).toFixed(2)}`;
        deliveryHeadline = s => `$${(s * pct).toFixed(2)} store credit`;
        break;
      case 'fixed':
        tagline          = rt.tagline;
        getValue         = () => rt.id === 'coupon' ? `$${rt.amount} off` : `$${rt.amount}`;
        deliveryHeadline = () => `$${rt.amount} ${rt.label.toLowerCase()}`;
        break;
      case 'points':
        tagline          = rt.tagline;
        getValue         = s => `${Math.round(s * rt.multiplier)} pts`;
        deliveryHeadline = s => `${Math.round(s * rt.multiplier)} points`;
        break;
    }

    return { ...rt, icon, tagline, getValue, deliveryHeadline };
  });
}

export function spawnConfetti(container) {
  if (!container) return;
  const colors = ['#c9a96e', '#e8d5b0', '#f5f0e8', '#ffffff', '#4caf7d', '#9b8ec4'];

  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-particle';
    const size = 5 + Math.random() * 6;
    el.style.cssText = [
      `left:${Math.random() * 100}%`,
      `top:-${size}px`,
      `width:${size}px`,
      `height:${size}px`,
      `background-color:${colors[Math.floor(Math.random() * colors.length)]}`,
      `animation-delay:${Math.random() * 1.2}s`,
      `animation-duration:${1.6 + Math.random() * 1}s`,
      `border-radius:${Math.random() > 0.4 ? '50%' : '2px'}`,
      `opacity:${0.7 + Math.random() * 0.3}`,
    ].join(';');
    container.appendChild(el);
  }
}
