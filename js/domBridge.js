import { getActiveStore, withStore } from './stores.js';
import { applyTheme } from './theme.js';

export function applyStoreToPage() {
  const store = getActiveStore();
  applyTheme(store);
  const c  = store.activeCampaign;
  const cp = store.copy;

  // Title — per-page name + store name
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const pageNames = {
    'index.html':      null,
    '':                null,
    'collection.html': 'Shop',
    'product.html':    'Product',
    'loyalty.html':    'My Rewards',
    'checkout.html':   'Checkout',
    'promotion.html':  'Our Promotion',
    'referral.html':   'Referral',
    'cart.html':       'Cart',
  };
  const pageName = pageNames[page];
  document.title = pageName ? `${pageName} — ${store.name}` : store.meta.title;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', store.meta.description);

  // Nav
  const mark = store.brandmark || '';
  setHtml('store-wordmark', `${mark}${store.name}`);
  setAttr('store-wordmark', 'aria-label', `${store.name} home`);
  setText('nav-city-text', c.cityShort);
  setAttr('nav-city-pill', 'aria-label', `City: ${c.cityShort} — promotion active`);

  // Hero (index.html)
  setText('hero-eyebrow', store.hero.eyebrow);
  setText('hero-body', store.hero.body);
  setHtml('hero-headline', cp.heroHeadline);
  setAttr('hero-image', 'src', store.hero.image);
  setAttr('hero-image', 'alt', store.hero.imageAlt);
  setAttr('hero-cta-shop', 'href', withStore('collection.html'));
  setAttr('hero-view-collection', 'href', withStore('collection.html'));

  // Campaign feature section
  setText('campaign-card-name', c.name);
  setAttr('campaign-card', 'aria-label', `${c.name} details`);
  setText('campaign-card-pct', Math.round(c.pct * 100));
  setAttr('campaign-card-number', 'aria-label', `${Math.round(c.pct * 100)} percent`);
  setText('campaign-card-min', `On orders $${c.minOrder} and above`);
  setText('campaign-card-valid', `Active through ${c.validThrough}`);
  setText('campaign-feature-eyebrow', c.featureEyebrow);
  setHtml('campaign-headline', c.featureHeadline);
  setText('campaign-feature-body', c.featureBody);

  // Products section
  setText('products-eyebrow', cp.productsEyebrow);
  setText('products-subhead', cp.productsSubhead);

  // Campaigns section
  setHtml('campaigns-headline', cp.campaignsHeadline);
  if (cp.campaignsSubhead) setText('campaigns-subhead', cp.campaignsSubhead);

  // Brand statement (index.html)
  setHtml('brand-headline', cp.brandHeadline);
  setText('brand-body', cp.brandBody);

  // Collection page
  setText('collection-subtitle', cp.collectionSubtitle);

  // Loyalty page
  if (cp.loyalty) {
    setHtml('loyalty-hero-eyebrow', cp.loyalty.heroEyebrow);
    setHtml('loyalty-hero-title', cp.loyalty.heroTitle);
    setText('loyalty-hero-subtitle', cp.loyalty.heroSubtitle);
    setHtml('loyalty-steps-headline', cp.loyalty.stepsHeadline);
    setText('loyalty-steps-body', cp.loyalty.stepsBody);
    setAttr('loyalty-cta-shop', 'href', withStore('collection.html'));
  }

  // Ticker — list unique segments running in parallel
  const ticker = document.getElementById('ticker-inner');
  if (ticker) {
    const unique = [...new Set(store.campaigns.map(cp => cp.segment).filter(Boolean))];
    const segment = `<span>Active campaigns: ${unique.join(' · ')}</span><span class="ticker__dot">·</span>`;
    ticker.innerHTML = segment + segment; // duplicate for seamless CSS loop
  }

  // Footer
  setHtml('footer-wordmark', `${mark}${store.name}`);
  setText('footer-tagline', store.tagline);
  setText('footer-copyright', `© 2026 ${store.name} Demo · This is not a real store · No purchases are processed`);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setHtml(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function setAttr(id, attr, value) {
  const el = document.getElementById(id);
  if (el) el.setAttribute(attr, value);
}
