import { addItem } from './cart.js';
import { advanceDemoBar } from './demoBar.js';
import { getActiveStore, withStore } from './stores.js';

let guideStep = parseInt(sessionStorage.getItem('guide-step') || '1', 10);

const BAR_TO_GUIDE = { 1: 1, 2: 2, 3: 3, 4: 3, 5: 4 };

function buildSteps(store) {
  const c = store.activeCampaign;
  const pctLabel = `${Math.round(c.pct * 100)}%`;

  return [
    {
      step: 1,
      title: 'City detected',
      body: `${c.city} identified automatically. The ${c.name} is now active on your session — no opt-in needed.`,
      action: 'Browse products →',
      onAction: () => {
        advanceDemoBar(2);
        const page = window.location.pathname.split('/').pop() || '';
        if (page === 'index.html' || page === '') {
          document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.href = withStore('collection.html');
        }
      },
    },
    {
      step: 2,
      title: 'Add to bag',
      body: `Hit $${c.minOrder} to unlock ${pctLabel} store credit. Add products yourself or let us load a sample order.`,
      action: 'Add for me →',
      onAction: () => {
        store.demo.autoAddProductIds.forEach(id => {
          const product = store.products.find(p => p.id === id);
          if (product) addItem(product);
        });
      },
    },
    {
      step: 3,
      title: 'Promo applied',
      body: `${c.name} is live in your cart. Your reward is calculated and attached automatically.`,
      action: 'Proceed to checkout →',
      onAction: () => {
        document.getElementById('checkout-btn')?.click();
      },
    },
    {
      step: 4,
      title: 'Choose your reward',
      body: 'Store credit, coupon, points, gift card — pick the format. 99minds delivers whichever you choose.',
      action: null,
    },
    {
      step: 5,
      title: 'Reward delivered',
      body: 'Done. The full loop — city detected to reward delivered. All guaranteed, all instant.',
      action: 'Restart demo ↺',
      onAction: () => {
        sessionStorage.removeItem('guide-step');
        sessionStorage.removeItem('demo-step');
        sessionStorage.removeItem('last-reward');
        window.location.href = withStore('index.html');
      },
    },
  ];
}

export function initDemoGuide() {
  const store = getActiveStore();
  const steps = buildSteps(store);

  render(steps);

  document.addEventListener('demobar:advance', e => {
    const target = BAR_TO_GUIDE[e.detail.step] ?? e.detail.step;
    if (target > guideStep) {
      guideStep = target;
      sessionStorage.setItem('guide-step', guideStep);
      render(steps);
    }
  });

  document.addEventListener('checkout:reward-delivered', () => {
    guideStep = 5;
    sessionStorage.setItem('guide-step', guideStep);
    render(steps);
  });
}

function render(steps) {
  const guide = document.getElementById('demo-guide');
  if (!guide) return;

  guide.style.display = '';

  const current = steps.find(s => s.step === guideStep) || steps[steps.length - 1];

  guide.innerHTML = `
    <div class="demo-guide__header">
      <div class="demo-guide__header-left">
        <span class="demo-guide__badge">Demo Guide</span>
        <span class="demo-guide__step-count">${guideStep} / ${steps.length}</span>
      </div>
      <div class="demo-guide__header-actions">
        <button class="demo-guide__restart" id="guide-restart" title="Restart demo">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
          Restart
        </button>
        <button class="demo-guide__close" id="guide-close" aria-label="Dismiss guide">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>

    <div class="demo-guide__progress">
      ${steps.map(s => `
        <div class="demo-guide__pip ${s.step < guideStep ? 'is-done' : ''} ${s.step === guideStep ? 'is-active' : ''}"></div>
      `).join('')}
    </div>

    <div class="demo-guide__body">
      <p class="demo-guide__title">${current.title}</p>
      <p class="demo-guide__text">${current.body}</p>
    </div>

    ${current.action ? `
      <button class="demo-guide__action" id="guide-action">${current.action}</button>
    ` : `
      <div class="demo-guide__waiting">
        <span class="demo-guide__waiting-dot"></span>
        Waiting for your selection…
      </div>
    `}
  `;

  document.getElementById('guide-restart')?.addEventListener('click', () => {
    sessionStorage.removeItem('guide-step');
    sessionStorage.removeItem('demo-step');
    sessionStorage.removeItem('last-reward');
    window.location.href = withStore('index.html');
  });
  document.getElementById('guide-close')?.addEventListener('click', () => {
    guide.style.display = 'none';
  });
  document.getElementById('guide-action')?.addEventListener('click', () => current.onAction?.());
}
