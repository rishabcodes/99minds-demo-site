import { initSharedLayout } from '../partials.js';
import { initCart, openCart, closeCart } from '../cart.js';
import { initDemoBar } from '../demoBar.js';
import { getActiveStore } from '../stores.js';

initSharedLayout();

document.getElementById('cart-btn')?.addEventListener('click', openCart);
document.getElementById('cart-close')?.addEventListener('click', closeCart);
document.getElementById('cart-overlay')?.addEventListener('click', closeCart);

initCart();
initDemoBar();

const store    = getActiveStore();
const c        = store.activeCampaign;
const refCode  = `${store.name.toUpperCase()}-REF-${Math.floor(1000 + Math.random() * 9000)}`;
const refUrl   = `${store.name.toLowerCase()}.com/?ref=${refCode}`;
const content  = document.getElementById('referral-content');

if (content) {
  content.innerHTML = `
    <p class="eyebrow" style="margin-bottom:16px">Invite a friend</p>
    <h1 class="page-title" style="margin-bottom:12px">Share the offer.</h1>
    <p style="font-size:16px;color:var(--color-muted);line-height:1.65;margin-bottom:40px;max-width:480px">
      Invite a friend to ${store.name} and they automatically get the ${c.name} too —
      ${Math.round(c.pct * 100)}% store credit on their first qualifying order. No codes, no friction.
    </p>

    <p style="font-size:13px;color:var(--color-muted);margin-bottom:8px">Your referral link</p>
    <div class="referral-link-box">
      <span class="referral-link-box__url" id="ref-url">${refUrl}</span>
      <button class="btn btn--ghost btn--sm" id="copy-link-btn">Copy</button>
    </div>

    <p style="font-size:13px;color:var(--color-muted);margin-bottom:8px">Your referral code</p>
    <div class="referral-code">${refCode}</div>

    <div style="margin-top:32px;padding:24px;background:var(--color-surface);border:1px solid var(--color-border);border-radius:12px">
      <p class="eyebrow" style="margin-bottom:12px">How it works</p>
      <div style="display:flex;flex-direction:column;gap:16px">
        <div style="display:flex;gap:16px;align-items:flex-start">
          <span style="font-size:20px;font-weight:700;color:var(--color-gold);width:28px;flex-shrink:0">01</span>
          <p style="font-size:14px;color:var(--color-muted);line-height:1.5">Share your link or code with a friend.</p>
        </div>
        <div style="display:flex;gap:16px;align-items:flex-start">
          <span style="font-size:20px;font-weight:700;color:var(--color-gold);width:28px;flex-shrink:0">02</span>
          <p style="font-size:14px;color:var(--color-muted);line-height:1.5">They visit ${store.name} and their ${c.name} activates automatically.</p>
        </div>
        <div style="display:flex;gap:16px;align-items:flex-start">
          <span style="font-size:20px;font-weight:700;color:var(--color-gold);width:28px;flex-shrink:0">03</span>
          <p style="font-size:14px;color:var(--color-muted);line-height:1.5">When they complete a qualifying order, you both earn store credit.</p>
        </div>
      </div>
    </div>

    <p style="font-size:12px;color:rgba(255,255,255,0.2);margin-top:24px;text-align:center">
      This is a fictional demo. No referral program is actually active.
    </p>
  `;

  document.getElementById('copy-link-btn').addEventListener('click', () => {
    navigator.clipboard?.writeText(refUrl).catch(() => {});
    const btn = document.getElementById('copy-link-btn');
    btn.textContent = 'Copied!';
    btn.style.color = 'var(--color-success)';
    setTimeout(() => { btn.textContent = 'Copy'; btn.style.color = ''; }, 2000);
  });
}
