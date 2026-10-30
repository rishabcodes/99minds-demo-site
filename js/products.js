import { addItem } from './cart.js';
import { getActiveStore, withStore } from './stores.js';

let activeCategory = 'all';

export function renderProducts(category = activeCategory, limit) {
  activeCategory = category;
  const store = getActiveStore();
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  let filtered = category === 'all'
    ? store.products
    : store.products.filter(p => p.category === category);
  if (limit) filtered = filtered.slice(0, limit);

  grid.style.opacity = '0';
  grid.style.transform = 'translateY(6px)';
  grid.style.transition = 'opacity 180ms ease, transform 180ms ease';

  setTimeout(() => {
    grid.innerHTML = filtered.map(p => buildProductCard(p)).join('');
    wireAddButtons(grid, store.products);
    wireImageFallbacks(grid);

    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';
  }, 180);
}

function buildProductCard(p) {
  const isOut = p.stock === 'out';
  const isLow = p.stock === 'low';
  return `
    <div class="product-card${isOut ? ' product-card--out' : ''}" role="listitem" data-id="${p.id}" data-category="${p.category}">
      <div class="product-card__image-wrap">
        <img
          src="${p.image}"
          alt="${p.brand} — ${p.name}"
          loading="lazy"
          data-fallback-gradient="true"
        >
        ${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ''}
        ${isLow  ? `<span class="product-card__badge product-card__badge--stock">Low Stock</span>` : ''}
        ${isOut  ? `<span class="product-card__badge product-card__badge--out">Sold Out</span>`   : ''}
        ${!isOut ? `<button class="product-card__add" data-id="${p.id}" aria-label="Add ${p.name} to bag">Add to Bag +</button>` : ''}
      </div>
      <div class="product-card__info">
        <span class="product-card__brand">${p.brand}</span>
        <span class="product-card__name">${p.name}</span>
        <span class="product-card__descriptor">${p.descriptor}</span>
        <span class="product-card__price">$${p.price}</span>
      </div>
    </div>
  `;
}

function wireAddButtons(grid, products) {
  grid.querySelectorAll('.product-card').forEach(card => {
    if (card.classList.contains('product-card--out')) return;
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      window.location.href = withStore(`product.html?id=${card.dataset.id}`);
    });
  });

  grid.querySelectorAll('.product-card__add').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const product = products.find(p => p.id === parseInt(btn.dataset.id, 10));
      if (product) {
        addItem(product);
        btn.textContent = 'Added ✓';
        btn.style.background = 'var(--color-success)';
        setTimeout(() => {
          btn.textContent = 'Add to Bag +';
          btn.style.background = '';
        }, 1200);
      }
    });
  });
}

function wireImageFallbacks(grid) {
  const FALLBACKS = [
    'linear-gradient(135deg, #e8e0d4 0%, #d4c9b8 100%)',
    'linear-gradient(135deg, #e0d8ce 0%, #c8bfb2 100%)',
    'linear-gradient(135deg, #ddd5c8 0%, #ccc3b4 100%)',
  ];
  grid.querySelectorAll('img[data-fallback-gradient]').forEach((img, i) => {
    img.addEventListener('error', function () {
      this.style.display = 'none';
      this.parentElement.style.background = FALLBACKS[i % FALLBACKS.length];
    });
  });
}

export function renderCampaigns() {
  const store = getActiveStore();
  const grid = document.getElementById('campaigns-grid');
  if (!grid) return;

  const visible = store.campaigns.filter(c => c.status !== 'inactive');

  // Group by segment, preserve display order from store.segmentOrder
  const bySegment = new Map();
  for (const c of visible) {
    const key = c.segment;
    if (!key) continue;
    if (!bySegment.has(key)) bySegment.set(key, []);
    bySegment.get(key).push(c);
  }

  const order = (store.segmentOrder || []).filter(s => bySegment.has(s));
  for (const key of bySegment.keys()) {
    if (!order.includes(key)) order.push(key);
  }

  const total = order.length;
  let tileIndex = 0;
  grid.innerHTML = order.map((segmentKey, idx) => {
    const tiles = bySegment.get(segmentKey);
    const tilesHtml = tiles.map(c => buildCampaignTile(c, tileIndex++)).join('');
    const context = store.segmentContext?.[segmentKey] || '';
    const indexLabel = `${String(idx + 1).padStart(2, '0')} · Segment ${idx + 1} of ${String(total).padStart(2, '0')}`;
    const activeCount = tiles.length;

    return `
      <section class="campaign-segment-group" aria-label="${segmentKey}">
        <div class="campaign-segment-group__context">
          <span class="campaign-segment-group__index">${indexLabel}</span>
          <h3 class="campaign-segment-group__title">${segmentKey}</h3>
          ${context ? `<p class="campaign-segment-group__sub">${context}</p>` : ''}
          <span class="campaign-segment-group__count">${activeCount} running</span>
        </div>
        <div class="campaign-segment-group__tiles" role="list">
          ${tilesHtml}
        </div>
      </section>
    `;
  }).join('');

  wireImageFallbacks(grid);
}

function buildCampaignTile(c, index) {
  const toneClass = c.segmentTone ? `tone-${c.segmentTone}` : '';
  const statusClass = `campaign-tile__status--${c.status || 'live'}`;
  const eyebrowUrgent = (c.status === 'ending-soon' || c.status === 'upcoming')
    ? 'campaign-tile__eyebrow--urgent' : '';

  const discountNumber = c.discountLabel
    ? `<span class="campaign-tile__discount campaign-tile__discount--label">${c.discountLabel}</span>`
    : `<span class="campaign-tile__discount">${c.discountPct}<span class="campaign-tile__discount-percent">%</span></span>`;

  const image = c.image || '';
  const name = c.name || '';
  const descriptor = c.descriptor || '';
  const minOrder = c.minOrder || '';
  const validThrough = c.validThrough || '';
  const statusLabel = c.status === 'upcoming' ? validThrough
    : c.status === 'ending-soon' ? validThrough
    : validThrough;

  const kellyByline = [
    'Picked by Kelly',
    c.startedOn,
    c.customersReached,
  ].filter(Boolean).join(' · ');

  return `
    <article class="campaign-tile ${toneClass}" role="listitem"
             data-reveal-fade style="transition-delay:${(index % 6) * 60}ms">
      <div class="campaign-tile__image">
        <img src="${image}" alt="${name}" loading="lazy" data-fallback-gradient="true">
        ${c.statusEyebrow ? `<span class="campaign-tile__eyebrow ${eyebrowUrgent}">${c.statusEyebrow}</span>` : ''}
      </div>
      <div class="campaign-tile__body">
        <h4 class="campaign-tile__name">${name}</h4>
        <p class="campaign-tile__descriptor">${descriptor}</p>
        <div class="campaign-tile__discount-row">
          ${discountNumber}
          <span class="campaign-tile__discount-suffix">${c.discountSuffix || ''}</span>
        </div>
        <div class="campaign-tile__meta">
          <span class="campaign-tile__min">${minOrder}</span>
          <span class="campaign-tile__status ${statusClass}">
            <span class="campaign-tile__status-dot"></span>${statusLabel}
          </span>
        </div>
      </div>
      <div class="campaign-tile__footer">${kellyByline}</div>
    </article>
  `;
}
