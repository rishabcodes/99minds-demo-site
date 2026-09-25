import { getActiveStore } from './stores.js';

export function applyTheme(store) {
  const t = store.theme;
  const r = document.documentElement;

  r.style.setProperty('--color-bg',           t.bg);
  r.style.setProperty('--color-surface',       t.surface);
  r.style.setProperty('--color-surface-2',     t.surface2  ?? t.surface);
  r.style.setProperty('--color-border',        t.border    ?? 'rgba(255,255,255,0.08)');
  r.style.setProperty('--color-gold',          t.primary);
  r.style.setProperty('--color-gold-light',    t.primaryLight ?? t.primary);
  r.style.setProperty('--color-gold-dim',      t.primaryDim   ?? 'rgba(201,169,110,0.08)');
  r.style.setProperty('--color-text',          t.text  ?? '#ffffff');
  r.style.setProperty('--color-muted',         t.muted ?? '#888888');
  r.style.setProperty('--nav-scrolled-bg',      t.navScrolledBg      ?? 'rgba(14,14,14,0.92)');
  r.style.setProperty('--nav-link-color',       t.navLinkColor       ?? 'rgba(255,255,255,0.68)');
  r.style.setProperty('--nav-link-hover-color', t.navLinkHoverColor  ?? '#ffffff');
  r.style.setProperty('--color-body-text',      t.bodyText           ?? 'rgba(255,255,255,0.78)');
  r.style.setProperty('--font-display',         t.fontDisplay);
  r.style.setProperty('--font-ui',              t.fontUi);
}

export function applyThemeFromStore() {
  applyTheme(getActiveStore());
}
