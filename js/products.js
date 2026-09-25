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
  const visible = store.campaigns.filter(c => c.status !== 'inactive');
  grid.innerHTML = visible.map((c, i) => buildCampaignTile(c, i)).join('');
}

function buildCampaignTile(c, index) {
  const statusLabel = c.status === 'active' ? 'Active' : 'Launching soon';
  const statusClass = c.status === 'active' ? 'active' : 'upcoming';

  return `
    <div class="campaign-tile ${c.isUserCity ? 'campaign-tile--active-city' : ''}" role="listitem"
         data-reveal-fade style="transition-delay:${index * 70}ms">
      ${c.isUserCity ? '<span class="campaign-tile__your-city">Your City</span>' : ''}
      <div>
        <div class="campaign-tile__city">${c.city}</div>
        <div class="campaign-tile__name">${c.name}</div>
      </div>
      <div class="campaign-tile__offer">${c.offer}</div>
      <div class="campaign-tile__min">${c.minOrder} minimum</div>
      <div class="campaign-tile__footer">
        <div class="campaign-tile__status ${statusClass}">
          <span class="campaign-tile__status-dot"></span>
          ${statusLabel}
        </div>
        <div class="campaign-tile__valid">
          ${c.status === 'active' ? `Valid through ${c.validThrough}` : c.validThrough}
        </div>
      </div>
    </div>
  `;
}
