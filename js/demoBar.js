// Maps page filename → step index (1-based)
const PAGE_TO_STEP = {
  'index.html':    1,
  '':              1, // root path
  'collection.html': 2,
  'product.html':  3,
  'cart.html':     4,
  'checkout.html': 5,
  'loyalty.html':  6,
  'referral.html': 7,
};

function currentPageStep() {
  const filename = window.location.pathname.split('/').pop() || '';
  return PAGE_TO_STEP[filename] ?? 1;
}

// Tracks manual progress for demoGuide (separate from URL-based visual)
let currentStep = parseInt(sessionStorage.getItem('demo-step') || '1', 10);

export function initDemoBar() {
  renderBar();
}

export function advanceDemoBar(step) {
  if (step <= currentStep) return;
  currentStep = step;
  sessionStorage.setItem('demo-step', step);
  document.dispatchEvent(new CustomEvent('demobar:advance', { detail: { step } }));
}

export function getCurrentStep() {
  return currentStep;
}

function renderBar() {
  const active = currentPageStep();
  document.querySelectorAll('.demo-bar__step').forEach(el => {
    const n = parseInt(el.dataset.step, 10);
    el.classList.remove('is-active', 'is-done');
    if (n < active)  el.classList.add('is-done');
    if (n === active) el.classList.add('is-active');
  });
}
