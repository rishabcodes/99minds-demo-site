export const STORES = {
  'velour-nyc': {
    id: 'velour-nyc',
    name: 'VELOUR',
    industry: 'luxury-cosmetics',
    tagline: 'A fictional luxury storefront built to demonstrate 99minds Promotions.',
    brandmark: '<svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:middle;margin-right:6px;flex-shrink:0"><path d="M6.5 0L7.9 5.1L13 6.5L7.9 7.9L6.5 13L5.1 7.9L0 6.5L5.1 5.1Z"/></svg>',

    meta: {
      title: 'VELOUR — New York City Luxury Cosmetics',
      description: "VELOUR — New York City's luxury cosmetics store. Powered by 99minds city-based promotions. Shop and earn 20% store credit with the NYC Glow Campaign.",
    },

    theme: {
      primary:        '#c9a96e',
      accent:         '#c9a96e',
      bg:             '#0a0a0a',
      surface:        '#141414',
      surface2:       '#1c1c1c',
      border:         '#2a2a2a',
      primaryLight:   '#e8d5b0',
      primaryDim:     'rgba(201, 169, 110, 0.08)',
      text:           '#ffffff',
      muted:          '#888888',
      navScrolledBg:  'rgba(14, 14, 14, 0.92)',
      fontDisplay:    "'Fraunces', Georgia, serif",
      fontUi:         "'Inter', system-ui, sans-serif",
    },

    hero: {
      eyebrow:  'New York City · Exclusive Offer',
      body:     "Shop luxury cosmetics and earn 20% back in 99minds store credit on every qualifying order. No codes. No catches. Just your city's offer, applied automatically.",
      image:    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80&fit=crop',
      imageAlt: 'Luxury cosmetics — golden serum bottle on warm stone',
    },

    activeCampaign: {
      city:            'New York City',
      cityShort:       'New York, NY',
      name:            'NYC Glow Campaign',
      pct:             0.20,
      minOrder:        75,
      validThrough:    'October 31, 2026',
      featureEyebrow:  "This Season's Offer",
      featureHeadline: 'Manhattan runs on good skin and better offers.',
      featureBody:     'The NYC Glow Campaign gives you 20% back in 99minds store credit on every qualifying order. Credit hits your account when your order ships — spend it next time, or let it build.',
    },

    copy: {
      productsEyebrow:   'The New York Edit',
      productsSubhead:   'Luxury cosmetics at retail prices. Add anything to your bag to see the NYC Glow Campaign in action.',
      campaignsHeadline: "What's running at VELOUR<br>this week.",
      campaignsSubhead:  "Kelly runs 12 promotions in parallel, each targeted to a different customer type. Here's everything live right now at the New York store.",
      collectionSubtitle: 'Luxury cosmetics — add anything to your bag to see the campaign in action.',
      heroHeadline:       'Your city has<br>a standing offer.',
      brandHeadline:      'Loyalty that works the way customers actually shop.',
      brandBody:          '99minds powers location-based promotions, store credit, loyalty points, gift cards, and referral programs — all wired directly into checkout. Your customers get rewarded automatically. You get the data.',
      loyalty: {
        heroEyebrow:   '99minds · Rewards Program',
        heroTitle:     'What you earn,<br>automatically.',
        heroSubtitle:  'Every qualifying order earns you something back. Pick your reward type at checkout — 99minds delivers it the moment your order ships. No codes. No waiting.',
        stepsHeadline: 'Three steps.<br>Zero effort.',
        stepsBody:     '99minds handles the entire reward loop — from detecting your city\'s active campaign to delivering your reward — automatically.',
      },
    },

    checkoutCopy: {
      orderPrefix: 'NYC-2026-',
    },

    categoryTabs: [
      { id: 'all',       label: 'All'       },
      { id: 'skincare',  label: 'Skincare'  },
      { id: 'makeup',    label: 'Makeup'    },
      { id: 'treatment', label: 'Treatment' },
    ],

    demo: {
      autoAddProductIds: [1, 5],
    },

    products: [
      // Row 1–2 on homepage (strong images)
      { id: 3,  brand: 'Tatcha',            name: 'The Water Cream',            descriptor: 'Oil-free pore-refining hydration',       category: 'skincare',  price: 68,  badge: null,         image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 5,  brand: "Kiehl's",           name: 'Ultra Facial Cream',         descriptor: '24-hour barrier hydration',              category: 'skincare',  price: 42,  badge: 'NYC Pick',   image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 6,  brand: 'Sunday Riley',      name: 'Good Genes',                 descriptor: 'Lactic acid brightening treatment',      category: 'treatment', price: 85,  badge: null,         image: 'https://images.unsplash.com/photo-1765726951362-df46f5a74cdf?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 7,  brand: 'Fenty Beauty',      name: 'Gloss Bomb Universal Lip',   descriptor: 'Universal lip luminizer',                category: 'makeup',    price: 21,  badge: null,         image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 8,  brand: 'Augustinus Bader',  name: 'The Cream',                  descriptor: 'TFC8® cellular renewal moisturizer',    category: 'skincare',  price: 185, badge: 'Bestseller', stock: 'low', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 9,  brand: 'Pat McGrath Labs',  name: 'Skin Fetish: Sublime',       descriptor: 'Skin-perfecting luminous foundation',    category: 'makeup',    price: 68,  badge: null,         image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 10, brand: 'Estée Lauder',      name: 'Advanced Night Repair',      descriptor: 'Multi-repair overnight serum',           category: 'treatment', price: 115, badge: 'NYC Pick',   image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 4,  brand: 'Drunk Elephant',    name: 'B-Hydra™ Serum',            descriptor: 'Lightweight moisture surge',              category: 'skincare',  price: 52,  badge: null,         stock: 'out', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&h=600&q=85' },
      // Row 3 — collection page only (plain/placeholder images)
      { id: 1,  brand: 'Charlotte Tilbury', name: 'Pillow Talk Lip Kit',       descriptor: 'Iconic nude-rose lip duo',                category: 'makeup',    price: 62,  badge: 'NYC Pick',   image: 'https://images.unsplash.com/photo-1602558618194-3037081afe0d?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 2,  brand: 'NARS',              name: 'Orgasm Blush',               descriptor: 'Peachy gold shimmer',                    category: 'makeup',    price: 34,  badge: 'Bestseller', image: 'https://images.unsplash.com/photo-1575686717697-f43bd36e74c2?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 11, brand: 'La Mer',            name: 'Crème de la Mer',            descriptor: 'Miracle Broth™ restorative moisturizer', category: 'skincare',  price: 95,  badge: null,         image: 'https://images.unsplash.com/photo-1622428051717-dcd8412959de?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 12, brand: 'Glossier',          name: 'Cloud Paint',                descriptor: 'Soft-focus gel-cream blush',             category: 'makeup',    price: 22,  badge: null,         image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&h=600&q=85' },
    ],

    segmentOrder: ['Prestige shoppers', 'Routine customers', 'Casual browsers', 'Gifters', 'Deal hunters', 'Winback'],

    segmentContext: {
      'Prestige shoppers':  'Loyal spenders at the top of the ladder. Early access and exclusivity convert better than discounts.',
      'Routine customers':  'Repeat buyers restocking on cadence. Bundles and routine extensions outperform flat sales.',
      'Casual browsers':    'Low-frequency mid-ticket shoppers. Seasonal kits and essentials move them from browse to buy.',
      'Gifters':            'Buying for someone else, not themselves. Gift sets and bonus-with-purchase outperform price cuts.',
      'Deal hunters':       'Price-driven. Flash windows and tiered bundles are what gets them in the door.',
      'Winback':            'Haven\'t ordered in 90+ days. Credits and no-strings offers reactivate better than discounts.',
    },

    campaigns: [
      // ---- Prestige shoppers ----
      {
        segment:          'Prestige shoppers',
        segmentTone:      'gold',
        name:             'New Launch Preview',
        descriptor:       'Be the first to try new products',
        discountPct:      15,
        discountSuffix:   'OFF LAUNCH ITEMS',
        image:            'public/campaign-images/cosmetics-new-launch-preview.png',
        minOrder:         '$85+ minimum',
        status:           'live',
        statusEyebrow:    null,
        validThrough:     'Live through Nov 12',
        startedOn:        'live since Oct 20',
        customersReached: '412 customers reached',
      },
      {
        segment:          'Prestige shoppers',
        segmentTone:      'gold',
        name:             'VIP Early Access Sale',
        descriptor:       'Shop exclusive sale 24 hours early',
        discountPct:      25,
        discountSuffix:   'OFF SELECT ITEMS',
        image:            'public/campaign-images/cosmetics-vip-early-access.png',
        minOrder:         '$75+ minimum',
        status:           'ending-soon',
        statusEyebrow:    'LAST 3 DAYS',
        validThrough:     'Ends Nov 2',
        startedOn:        'live since Oct 28',
        customersReached: '318 customers reached',
      },

      // ---- Routine customers ----
      {
        segment:          'Routine customers',
        segmentTone:      'pearl',
        name:             'Premium Serum Sale',
        descriptor:       'All premium serums and treatments',
        discountPct:      20,
        discountSuffix:   'OFF ALL SERUMS',
        image:            'public/campaign-images/cosmetics-premium-serum.png',
        minOrder:         '$65+ minimum',
        status:           'live',
        statusEyebrow:    null,
        validThrough:     'Live through Nov 15',
        startedOn:        'live since Oct 18',
        customersReached: '847 customers reached',
      },
      {
        segment:          'Routine customers',
        segmentTone:      'pearl',
        name:             'Skincare Set Bundle',
        descriptor:       'Complete routine, biggest savings of the season',
        discountPct:      30,
        discountSuffix:   'OFF FULL BUNDLE',
        image:            'public/campaign-images/cosmetics-skincare-bundle.png',
        minOrder:         '$120+ minimum',
        status:           'upcoming',
        statusEyebrow:    'LAUNCHES NOV 5',
        validThrough:     'Launches Nov 5',
        startedOn:        'launches Nov 5',
        customersReached: '0 customers reached',
      },

      // ---- Casual browsers ----
      {
        segment:          'Casual browsers',
        segmentTone:      'warm-beige',
        name:             'Beauty Basics Restock',
        descriptor:       'Everyday essentials, back in stock',
        discountPct:      20,
        discountSuffix:   'OFF ESSENTIALS',
        image:            'public/campaign-images/cosmetics-beauty-basics-restock.png',
        minOrder:         '$50+ minimum',
        status:           'live',
        statusEyebrow:    null,
        validThrough:     'Live through Nov 20',
        startedOn:        'live since Oct 23',
        customersReached: '1,164 customers reached',
      },
      {
        segment:          'Casual browsers',
        segmentTone:      'warm-beige',
        name:             'Summer Essentials Kit',
        descriptor:       'Curated summer beauty kit at a special price',
        discountPct:      25,
        discountSuffix:   'OFF THE KIT',
        image:            'public/campaign-images/cosmetics-summer-essentials.png',
        minOrder:         '$60+ minimum',
        status:           'ending-soon',
        statusEyebrow:    'LAST 4 DAYS',
        validThrough:     'Ends Nov 3',
        startedOn:        'live since Oct 24',
        customersReached: '592 customers reached',
      },

      // ---- Gifters ----
      {
        segment:          'Gifters',
        segmentTone:      'soft-rose',
        name:             'Gift Set Collection',
        descriptor:       'Pre-packaged gift sets for any occasion',
        discountPct:      20,
        discountSuffix:   'OFF GIFT SETS',
        image:            'public/campaign-images/cosmetics-gift-set.png',
        minOrder:         '$65+ minimum',
        status:           'live',
        statusEyebrow:    null,
        validThrough:     'Live through Nov 28',
        startedOn:        'live since Oct 15',
        customersReached: '726 customers reached',
      },
      {
        segment:          'Gifters',
        segmentTone:      'soft-rose',
        name:             'Gift with Purchase',
        descriptor:       'Free deluxe sample set on orders over $60',
        discountLabel:    'FREE',
        discountSuffix:   'DELUXE SAMPLE SET',
        image:            'public/campaign-images/cosmetics-gift-with-purchase.png',
        minOrder:         '$60+ to unlock',
        status:           'live',
        statusEyebrow:    null,
        validThrough:     'Live through Nov 14',
        startedOn:        'live since Oct 21',
        customersReached: '483 customers reached',
      },

      // ---- Deal hunters ----
      {
        segment:          'Deal hunters',
        segmentTone:      'rust',
        name:             'Flash 40% Off Weekend',
        descriptor:       'This weekend only, select items',
        discountPct:      40,
        discountSuffix:   'OFF SELECT ITEMS',
        image:            'public/campaign-images/cosmetics-flash-40-off.png',
        minOrder:         'No minimum',
        status:           'ending-soon',
        statusEyebrow:    '72 HOURS LEFT',
        validThrough:     'Ends Nov 1',
        startedOn:        'live since Oct 29',
        customersReached: '1,429 customers reached',
      },
      {
        segment:          'Deal hunters',
        segmentTone:      'rust',
        name:             'Buy 2 Get 1 Free',
        descriptor:       'Buy 2 lipsticks, get 1 free',
        discountLabel:    'B2G1',
        discountSuffix:   'ALL LIPSTICK',
        image:            'public/campaign-images/cosmetics-buy2-get1.png',
        minOrder:         'All lipstick',
        status:           'live',
        statusEyebrow:    null,
        validThrough:     'Live through Nov 10',
        startedOn:        'live since Oct 27',
        customersReached: '938 customers reached',
      },

      // ---- Winback ----
      {
        segment:          'Winback',
        segmentTone:      'slate',
        name:             'We Miss You — 50% Off',
        descriptor:       'Come back with 50% off your next order',
        discountPct:      50,
        discountSuffix:   'OFF NEXT ORDER',
        image:            'public/campaign-images/cosmetics-we-miss-you.png',
        minOrder:         'No minimum',
        status:           'live',
        statusEyebrow:    null,
        validThrough:     'Live through Nov 30',
        startedOn:        'live since Oct 16',
        customersReached: '246 customers reached',
      },
      {
        segment:          'Winback',
        segmentTone:      'slate',
        name:             '$25 Beauty Credit',
        descriptor:       '$25 credit on the house, no strings attached',
        discountLabel:    '$25',
        discountSuffix:   'STORE CREDIT',
        image:            'public/campaign-images/cosmetics-25-beauty-credit.png',
        minOrder:         'No minimum',
        status:           'upcoming',
        statusEyebrow:    'LAUNCHES NOV 7',
        validThrough:     'Launches Nov 7',
        startedOn:        'launches Nov 7',
        customersReached: '0 customers reached',
      },
    ],

    rewardTypes: [
      {
        id:           'credit',
        label:        'Store Credit',
        tagline:      null, // computed from activeCampaign.pct at runtime
        color:        '#c9a96e',
        kind:         'pct',
        deliveryBody: 'Live in your 99minds wallet. Use it on any future order — it never expires.',
      },
      {
        id:           'coupon',
        label:        'Coupon',
        tagline:      '$15 off your next order',
        color:        '#7eb8a4',
        kind:         'fixed',
        amount:       15,
        code:         'VELOUR15',
        deliveryBody: 'Code VELOUR15 is ready. Apply at checkout on your next order — no minimum.',
      },
      {
        id:           'points',
        label:        'Loyalty Points',
        tagline:      '1.5× points on this order',
        color:        '#9b8ec4',
        kind:         'points',
        multiplier:   1.5,
        deliveryBody: '1.5× bonus applied. Points convert to store credit at your next checkout.',
      },
      {
        id:           'giftcard',
        label:        'Gift Card',
        tagline:      '$20 virtual gift card',
        color:        '#c4846e',
        kind:         'fixed',
        amount:       20,
        code:         'VELOUR-GIFT-2026',
        deliveryBody: 'Code VELOUR-GIFT-2026 is in your 99minds account. Share it or keep it.',
      },
    ],
  },

  // ---- Store 2: SOIE — Miami Luxury Lingerie ----
  'soie-miami': {
    id: 'soie-miami',
    name: 'SOIE',
    industry: 'luxury-lingerie',
    tagline: 'A fictional luxury lingerie storefront built to demonstrate 99minds Promotions.',
    brandmark: '<svg width="9" height="14" viewBox="0 0 9 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true" style="display:inline-block;vertical-align:middle;margin-right:6px;flex-shrink:0"><path d="M7.5 2.5C7.5 1.5 6.2 1 4.5 1.5 2.8 2 1.5 1.5 1.5 3c0 1.5 1.3 2 3 2s3 .5 3 2-1.3 2-3 2-3 .5-3 2c0 1.5 1.3 2 3 2.5"/></svg>',

    meta: {
      title: 'SOIE — Miami Luxury Lingerie',
      description: "SOIE — Miami's luxury lingerie boutique. Earn 15% store credit with the Miami Glow Campaign. Powered by 99minds.",
    },

    theme: {
      primary:        '#c4707a',
      accent:         '#c4707a',
      bg:             '#0c0809',
      surface:        '#180d10',
      surface2:       '#1f1115',
      border:         '#2e1820',
      primaryLight:   '#e8b0b8',
      primaryDim:     'rgba(196, 112, 122, 0.08)',
      text:           '#ffffff',
      muted:          '#9a8587',
      navScrolledBg:  'rgba(12, 8, 9, 0.92)',
      fontDisplay:    "'Fraunces', Georgia, serif",
      fontUi:         "'Inter', system-ui, sans-serif",
    },

    hero: {
      eyebrow:  'Miami · Exclusive Offer',
      body:     "Shop luxury lingerie and earn 15% back in 99minds store credit on every qualifying order. No codes. No catches. Just your city's offer, applied automatically.",
      image:    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80&fit=crop',
      imageAlt: 'Luxury silk fabric draped on a warm surface',
    },

    activeCampaign: {
      city:            'Miami',
      cityShort:       'Miami, FL',
      name:            'Miami Glow Campaign',
      pct:             0.15,
      minOrder:        60,
      validThrough:    'December 31, 2026',
      featureEyebrow:  "This Season's Offer",
      featureHeadline: 'Miami runs on warm nights and softer rewards.',
      featureBody:     'The Miami Glow Campaign gives you 15% back in 99minds store credit on every qualifying order. Credit hits your account when your order ships — spend it next time, or let it build.',
    },

    copy: {
      productsEyebrow:   'The Miami Edit',
      productsSubhead:   'Luxury lingerie and intimates. Add anything to your bag to see the Miami Glow Campaign in action.',
      campaignsHeadline: "What's running at SOIE<br>this week.",
      campaignsSubhead:  "Kelly runs 12 promotions in parallel, each targeted to a different customer type. Here's everything live right now at the Miami store.",
      collectionSubtitle: 'Luxury lingerie — add anything to your bag to see the campaign in action.',
      heroHeadline:       'Miami has something<br>worth coming back for.',
      brandHeadline:      'Loyalty designed for how customers actually spend.',
      brandBody:          '99minds powers location-based promotions, store credit, loyalty points, gift cards, and referral programs — all wired directly into checkout. Your customers keep coming back. You keep the data.',
      loyalty: {
        heroEyebrow:   '99minds · Rewards Program',
        heroTitle:     'Wear it. Earn it.<br>Automatically.',
        heroSubtitle:  'Every qualifying order earns you something back. Choose your reward at checkout — 99minds delivers the moment your order ships. Nothing to code. Nothing to wait for.',
        stepsHeadline: 'Three steps.<br>Zero friction.',
        stepsBody:     'The full reward loop — from detecting Miami\'s active campaign to delivering your credit — runs without you lifting a finger.',
      },
    },

    checkoutCopy: {
      orderPrefix: 'MIA-2026-',
    },

    categoryTabs: [
      { id: 'all',      label: 'All'      },
      { id: 'sets',     label: 'Sets'     },
      { id: 'robes',    label: 'Robes'    },
      { id: 'lounge',   label: 'Lounge'   },
      { id: 'bodywear', label: 'Bodywear' },
    ],

    demo: {
      autoAddProductIds: [1, 7],
    },

    products: [
      // Row 1–2 on homepage (strong images)
      { id: 1,  brand: 'Cou Cou Intimates', name: 'The Silk Slip',        descriptor: 'Bias-cut mulberry silk charmeuse',       category: 'robes',    price: 148, badge: 'Miami Pick',  image: 'https://images.unsplash.com/photo-1562873465-6ba5c1967c07?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 3,  brand: 'Maison Lejaby',      name: 'Gaby Silk Robe',       descriptor: 'Crêpe de Chine with tie belt',           category: 'robes',    price: 185, badge: null,         stock: 'low', image: 'https://images.unsplash.com/photo-1561052876-045f5a7121be?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 5,  brand: 'Hanky Panky',        name: 'Signature Lace Set',   descriptor: 'Original-rise stretch lace duo',         category: 'sets',     price: 44,  badge: 'Miami Pick',  image: 'https://images.unsplash.com/photo-1617253122768-0ed84fa6cc8e?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 6,  brand: 'Negative',           name: 'Sieve Bralette',       descriptor: 'Zero-hardware seamless bralette',        category: 'sets',     price: 68,  badge: null,         image: 'https://images.unsplash.com/photo-1599839770015-53df36f312a8?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 7,  brand: 'Lunya',              name: 'Washable Silk Set',    descriptor: 'Washable silk sleep and lounge set',     category: 'lounge',   price: 178, badge: 'Bestseller', image: 'https://images.unsplash.com/photo-1766056278825-55168658f120?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 8,  brand: 'Agent Provocateur',  name: 'Lorna Longline Bra',   descriptor: 'Satin and stretch lace support',         category: 'sets',     price: 225, badge: null,         image: 'https://images.unsplash.com/photo-1598814996644-388a29362dc7?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 10, brand: 'NATORI',             name: 'Bliss Lace Chemise',   descriptor: 'Feathers-and-lace trim nightgown',       category: 'lounge',   price: 98,  badge: 'Miami Pick',  image: 'https://images.unsplash.com/photo-1492175881389-e5553ef372e0?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 4,  brand: 'Fleur du Mal',       name: 'Lace Bodysuit',        descriptor: 'Stretch lace with deep V-front',         category: 'bodywear', price: 145, badge: null,         image: 'https://images.unsplash.com/photo-1778436196655-eb8507c86a26?auto=format&fit=crop&w=600&h=600&q=85' },
      // Row 3 — collection page only (plain/placeholder images)
      { id: 2,  brand: 'Journelle',          name: 'Florence Bra Set',     descriptor: 'French lace on Italian tulle',           category: 'sets',     price: 89,  badge: 'Bestseller', image: 'https://images.unsplash.com/photo-1620228681518-5f0e3e29940d?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 9,  brand: 'Savage X Fenty',     name: 'Floral Lace Teddy',    descriptor: 'All-over floral lace bodysuit',          category: 'bodywear', price: 79,  badge: null,         stock: 'out', image: 'https://images.unsplash.com/photo-1634393654264-10f278c18bcd?auto=format&fit=crop&w=600&h=600&q=85' },
    ],

    segmentOrder: ['Premium shoppers', 'Essentials', 'Seasonal picks', 'Gifters', 'Deal hunters', 'Winback'],

    segmentContext: {
      'Premium shoppers': 'Luxury-first buyers. Access and private events convert them better than markdowns.',
      'Essentials':       'High-cadence restockers. Small discounts on everyday pieces beat deep cuts on new drops.',
      'Seasonal picks':   'Timing-driven buyers. The right collection in the right week outperforms the lowest price.',
      'Gifters':          'Shopping for someone else. Gift sets and free-with-purchase convert better than percent-off codes.',
      'Deal hunters':     'Chasing the markdown. Short flash windows and bundles do most of the work.',
      'Winback':          'Dormant 90+ days. Credits and welcome-back offers reactivate better than price cuts.',
    },

    campaigns: [
      // ---- Premium shoppers ----
      {
        segment:          'Premium shoppers',
        segmentTone:      'rose',
        name:             'VIP New Collection Preview',
        descriptor:       'Shop new arrivals 48 hours early',
        discountPct:      15,
        discountSuffix:   'OFF NEW ARRIVALS',
        image:            'public/campaign-images/lingerie-vip-preview.png',
        minOrder:         '$95+ minimum',
        status:           'live',
        statusEyebrow:    null,
        validThrough:     'Live through Nov 11',
        startedOn:        'live since Oct 24',
        customersReached: '283 customers reached',
      },
      {
        segment:          'Premium shoppers',
        segmentTone:      'rose',
        name:             'Private Shopping Event',
        descriptor:       'Exclusive evening event with hosted styling',
        discountPct:      15,
        discountSuffix:   'OFF THE EVENT EDIT',
        image:            'public/campaign-images/lingerie 1.jpg',
        minOrder:         'By invitation',
        status:           'ending-soon',
        statusEyebrow:    'INVITES CLOSE NOV 2',
        validThrough:     'Event Nov 8, invites close Nov 2',
        startedOn:        'live since Oct 25',
        customersReached: '142 invites sent',
      },

      // ---- Essentials ----
      {
        segment:          'Essentials',
        segmentTone:      'pearl',
        name:             'Essentials Restock',
        descriptor:       'Everyday basics with free shipping',
        discountPct:      10,
        discountSuffix:   'OFF BASICS',
        image:            'public/campaign-images/lingerie-essentials-restock.png',
        minOrder:         '$45+ minimum',
        status:           'live',
        statusEyebrow:    null,
        validThrough:     'Live through Nov 14',
        startedOn:        'live since Oct 22',
        customersReached: '1,064 customers reached',
      },
      {
        segment:          'Essentials',
        segmentTone:      'pearl',
        name:             'Wardrobe Staples 20% Off',
        descriptor:       'Stock up on wardrobe essentials',
        discountPct:      15,
        discountSuffix:   'OFF STAPLES',
        image:            'public/campaign-images/lingerie-wardrobe-staples.png',
        minOrder:         '$55+ minimum',
        status:           'live',
        statusEyebrow:    null,
        validThrough:     'Live through Nov 18',
        startedOn:        'live since Oct 23',
        customersReached: '812 customers reached',
      },

      // ---- Seasonal picks ----
      {
        segment:          'Seasonal picks',
        segmentTone:      'gold',
        name:             'Summer Sleepwear Sale',
        descriptor:       'Light and luxe for warm Miami nights',
        discountLabel:    'FREE',
        discountSuffix:   'GIFT WRAP INCLUDED',
        image:            'public/campaign-images/lingerie-summer-sleepwear.png',
        minOrder:         '$70+ to unlock',
        status:           'upcoming',
        statusEyebrow:    'LAUNCHES NOV 6',
        validThrough:     'Launches Nov 6',
        startedOn:        'launches Nov 6',
        customersReached: '0 customers reached',
      },
      {
        segment:          'Seasonal picks',
        segmentTone:      'gold',
        name:             'Bridal Collection Sale',
        descriptor:       '20% off bridal and honeymoon styles',
        discountPct:      20,
        discountSuffix:   'OFF BRIDAL',
        image:            'public/campaign-images/lingerie-bridal-collection.png',
        minOrder:         '$120+ minimum',
        status:           'live',
        statusEyebrow:    null,
        validThrough:     'Live through Nov 30',
        startedOn:        'live since Oct 18',
        customersReached: '397 customers reached',
      },

      // ---- Gifters ----
      {
        segment:          'Gifters',
        segmentTone:      'soft-rose',
        name:             'Gift Set Collection',
        descriptor:       'Curated gift sets for every occasion',
        discountPct:      15,
        discountSuffix:   'OFF GIFT SETS',
        image:            'public/campaign-images/lingerie-gift-set.png',
        minOrder:         '$75+ minimum',
        status:           'live',
        statusEyebrow:    null,
        validThrough:     'Live through Nov 26',
        startedOn:        'live since Oct 15',
        customersReached: '611 customers reached',
      },
      {
        segment:          'Gifters',
        segmentTone:      'soft-rose',
        name:             'Gift with Purchase',
        descriptor:       'Free silk accessory on orders over $75',
        discountLabel:    'FREE',
        discountSuffix:   'ACCESSORY ON $75+',
        image:            'public/campaign-images/lingerie-gift-with-purchase.png',
        minOrder:         '$75+ to unlock',
        status:           'ending-soon',
        statusEyebrow:    'LAST 5 DAYS',
        validThrough:     'Ends Nov 4',
        startedOn:        'live since Oct 21',
        customersReached: '438 customers reached',
      },

      // ---- Deal hunters ----
      {
        segment:          'Deal hunters',
        segmentTone:      'rust',
        name:             'Flash 40% Off Weekend',
        descriptor:       'This weekend only, select styles',
        discountPct:      25,
        discountSuffix:   'OFF SELECT STYLES',
        image:            'public/campaign-images/lingerie-flash-40-off.png',
        minOrder:         'No minimum',
        status:           'ending-soon',
        statusEyebrow:    '72 HOURS LEFT',
        validThrough:     'Ends Nov 1',
        startedOn:        'live since Oct 29',
        customersReached: '1,547 customers reached',
      },
      {
        segment:          'Deal hunters',
        segmentTone:      'rust',
        name:             'Buy 3 Get 1 Free',
        descriptor:       'Buy 3 panties, get 1 free',
        discountLabel:    'B3G1',
        discountSuffix:   'ALL PANTIES',
        image:            'public/campaign-images/lingerie-buy3-get1.png',
        minOrder:         'All panties',
        status:           'live',
        statusEyebrow:    null,
        validThrough:     'Live through Nov 12',
        startedOn:        'live since Oct 26',
        customersReached: '876 customers reached',
      },

      // ---- Winback ----
      {
        segment:          'Winback',
        segmentTone:      'slate',
        name:             'We Miss You — 50% Off',
        descriptor:       'Come back with 30% off your next order',
        discountPct:      30,
        discountSuffix:   'OFF NEXT ORDER',
        image:            'public/campaign-images/lingerie-we-miss-you.png',
        minOrder:         'No minimum',
        status:           'live',
        statusEyebrow:    null,
        validThrough:     'Live through Nov 28',
        startedOn:        'live since Oct 16',
        customersReached: '218 customers reached',
      },
      {
        segment:          'Winback',
        segmentTone:      'slate',
        name:             '$25 Store Credit',
        descriptor:       '$15 credit on the house, no strings attached',
        discountLabel:    '$15',
        discountSuffix:   'STORE CREDIT',
        image:            'public/campaign-images/lingerie-25-store-credit.png',
        minOrder:         'No minimum',
        status:           'upcoming',
        statusEyebrow:    'LAUNCHES NOV 8',
        validThrough:     'Launches Nov 8',
        startedOn:        'launches Nov 8',
        customersReached: '0 customers reached',
      },
    ],

    rewardTypes: [
      {
        id:           'credit',
        label:        'Store Credit',
        tagline:      null,
        color:        '#c4707a',
        kind:         'pct',
        deliveryBody: 'Live in your 99minds wallet. Use it on any future order — it never expires.',
      },
      {
        id:           'coupon',
        label:        'Coupon',
        tagline:      '$10 off your next order',
        color:        '#7eb8a4',
        kind:         'fixed',
        amount:       10,
        code:         'SOIE10',
        deliveryBody: 'Code SOIE10 is ready. Apply at checkout on your next order — no minimum.',
      },
      {
        id:           'points',
        label:        'Loyalty Points',
        tagline:      '2× points on this order',
        color:        '#9b8ec4',
        kind:         'points',
        multiplier:   2,
        deliveryBody: '2× bonus applied. Points convert to store credit at your next checkout.',
      },
      {
        id:           'giftcard',
        label:        'Gift Card',
        tagline:      '$15 virtual gift card',
        color:        '#c4846e',
        kind:         'fixed',
        amount:       15,
        code:         'SOIE-GIFT-2026',
        deliveryBody: 'Code SOIE-GIFT-2026 is in your 99minds account. Share it or keep it.',
      },
    ],
  },

  // ---- Store 3: BLOOM — Amsterdam Baby & Kids ----
  'bloom-amsterdam': {
    id: 'bloom-amsterdam',
    name: 'BLOOM',
    industry: 'baby-kids',
    tagline: 'A fictional baby & kids storefront built to demonstrate 99minds Promotions.',
    brandmark: '<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true" style="display:inline-block;vertical-align:middle;margin-right:6px;flex-shrink:0"><circle cx="7" cy="3.8" r="2"/><circle cx="10.1" cy="6" r="2"/><circle cx="8.9" cy="9.6" r="2"/><circle cx="5.1" cy="9.6" r="2"/><circle cx="3.9" cy="6" r="2"/><circle cx="7" cy="7" r="1.5"/></svg>',

    meta: {
      title: 'BLOOM — Amsterdam Baby & Kids',
      description: "BLOOM — Amsterdam's curated baby & kids boutique. Earn 10% store credit with the Amsterdam Spring Campaign. Powered by 99minds.",
    },

    theme: {
      primary:        '#7aad8e',
      accent:         '#7aad8e',
      bg:             '#f9f7f4',
      surface:        '#f0ece6',
      surface2:       '#e6e0d8',
      border:         '#d4cdc5',
      primaryLight:   '#b0d4bc',
      primaryDim:     'rgba(122, 173, 142, 0.10)',
      text:           '#1a1a1a',
      muted:          '#6b6560',
      navScrolledBg:    'rgba(249, 247, 244, 0.94)',
      navLinkColor:     'rgba(26, 26, 26, 0.65)',
      navLinkHoverColor: '#1a1a1a',
      bodyText:         'rgba(26, 26, 26, 0.75)',
      fontDisplay:    "'Fraunces', Georgia, serif",
      fontUi:         "'Inter', system-ui, sans-serif",
    },

    hero: {
      eyebrow:  'Amsterdam · Exclusive Offer',
      body:     "Shop baby clothing and earn 10% back in 99minds store credit on every qualifying order. No codes. No catches. Just your city's offer, applied automatically.",
      image:    'https://images.unsplash.com/photo-1766918780914-e19d9de76d85?w=1200&q=80&fit=crop',
      imageAlt: 'Baby clothes hanging on a boutique rack',
    },

    activeCampaign: {
      city:            'Amsterdam',
      cityShort:       'Amsterdam, NL',
      name:            'Amsterdam Spring Campaign',
      pct:             0.10,
      minOrder:        40,
      validThrough:    'March 31, 2027',
      featureEyebrow:  "This Season's Offer",
      featureHeadline: 'Amsterdam grows the best things slowly.',
      featureBody:     'The Amsterdam Spring Campaign gives you 10% back in 99minds store credit on every qualifying order. Credit hits your account when your order ships — spend it next time, or let it build.',
    },

    copy: {
      productsEyebrow:   'The Amsterdam Edit',
      productsSubhead:   'Curated baby & kids essentials. Add anything to your bag to see the Amsterdam Spring Campaign in action.',
      campaignsHeadline: "What's running at BLOOM<br>this week.",
      campaignsSubhead:  "Kelly runs 12 promotions in parallel, each targeted to a different customer type. Here's everything live right now at the Amsterdam store.",
      collectionSubtitle: 'Baby & kids essentials — add anything to your bag to see the campaign in action.',
      heroHeadline:       'Amsterdam rewards<br>every thoughtful choice.',
      brandHeadline:      'Loyalty that fits into how families actually shop.',
      brandBody:          '99minds powers location-based promotions, store credit, loyalty points, gift cards, and referral programs — all wired directly into checkout. Build loyalty from the first order. Keep it growing.',
      loyalty: {
        heroEyebrow:   '99minds · Rewards Program',
        heroTitle:     'Shop for them.<br>Earn for you.',
        heroSubtitle:  'Every qualifying order earns credit back into your account. Pick your reward format at checkout — 99minds delivers it when your order ships. Simple as it should be.',
        stepsHeadline: 'Three steps.<br>Completely automatic.',
        stepsBody:     '99minds runs the complete reward loop — from detecting Amsterdam\'s active campaign to delivering your reward — so you can focus on what matters.',
      },
    },

    checkoutCopy: {
      orderPrefix: 'AMS-2026-',
    },

    categoryTabs: [
      { id: 'all',       label: 'All'       },
      { id: 'essentials', label: 'Essentials' },
      { id: 'knitwear',  label: 'Knitwear'  },
      { id: 'outerwear', label: 'Outerwear' },
      { id: 'shoes',     label: 'Shoes'     },
      { id: 'dresses',   label: 'Dresses'   },
    ],

    demo: {
      autoAddProductIds: [1, 2],
    },

    products: [
      // Row 1–2 on homepage (strong images)
      { id: 1,  brand: 'Petit Bateau',      name: 'Organic Onesie Set',      descriptor: 'GOTS-certified organic cotton, 3-pack',   category: 'essentials', price: 48,  badge: 'Amsterdam Pick', image: 'https://images.unsplash.com/photo-1569974641446-22542de88536?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 2,  brand: 'Liewood',           name: 'Knit Romper',             descriptor: 'Organic cotton knit one-piece, 0–18m',    category: 'knitwear',   price: 72,  badge: 'Bestseller',     image: 'https://images.unsplash.com/photo-1617331140180-e8262094733a?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 3,  brand: 'Konges Sløjd',     name: 'Cotton Bodysuit Set',     descriptor: '2-pack ribbed cotton bodysuits',          category: 'essentials', price: 38,  badge: 'Amsterdam Pick', image: 'https://images.unsplash.com/photo-1622290319146-7b63df48a635?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 4,  brand: 'Noppies',          name: 'Soft Sole Baby Shoes',    descriptor: 'Genuine leather moccasins, 0–12 months',  category: 'shoes',      price: 38,  badge: null,             image: 'https://images.unsplash.com/photo-1513091250092-b06c2b7981bc?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 6,  brand: 'Mini Rodini',      name: 'Print Sweatshirt',        descriptor: 'Organic GOTS cotton fleece, 3m–2y',       category: 'outerwear',  price: 65,  badge: 'Bestseller',     stock: 'low', image: 'https://images.unsplash.com/photo-1766918780914-5df4a5a98c44?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 7,  brand: 'Molo',             name: 'Quilted Jacket',          descriptor: 'Lightweight fill, snap closure, 6m–4y',   category: 'outerwear',  price: 88,  badge: null,             image: 'https://images.unsplash.com/photo-1546193229-e200b04daf4e?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 8,  brand: 'Joha',             name: 'Merino Wool Bodysuit',    descriptor: '100% merino, temperature-regulating',     category: 'knitwear',   price: 54,  badge: 'Amsterdam Pick', image: 'https://images.unsplash.com/photo-1760727772969-cb5cd59c6f30?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 9,  brand: 'Wheat',            name: 'Ribbed Leggings Set',     descriptor: '2-pack stretch organic cotton, 0–3y',     category: 'knitwear',   price: 32,  badge: null,             image: 'https://images.unsplash.com/photo-1766918780916-228d10b071be?auto=format&fit=crop&w=600&h=600&q=85' },
      // Row 3 — collection page only
      { id: 5,  brand: "Burt's Bees Baby", name: 'Sleep & Play Set',        descriptor: 'Buttery-soft organic cotton zip-up',      category: 'essentials', price: 29,  badge: null,             image: 'https://images.unsplash.com/photo-1582212742235-a2500f31cb39?auto=format&fit=crop&w=600&h=600&q=85' },
      { id: 10, brand: 'Bobo Choses',      name: 'Smocked Baby Dress',      descriptor: 'Broderie anglaise with smocking detail',  category: 'dresses',    price: 85,  badge: null,             stock: 'out', image: 'https://images.unsplash.com/photo-1578178107900-e8ef3855b9cf?auto=format&fit=crop&w=600&h=600&q=85' },
    ],

    segmentOrder: ['New arrivals', 'Growing families', 'Everyday shoppers', 'Gift givers', 'Budget parents', 'Winback families'],

    segmentContext: {
      'New arrivals':      'First-time parents in their first 6 months. Starter kits and exclusive access convert better than discounts.',
      'Growing families':  'Returning parents sizing up. Next-stage edits and bundles outperform percent-off codes.',
      'Everyday shoppers': 'Casual basics buyers. Restocks and seasonal capsules keep the cadence going.',
      'Gift givers':       'Baby showers, grandparents, friends. Pre-wrapped sets and bonus-with-purchase beat raw discounts.',
      'Budget parents':    'Price-driven families. Flash windows and bundle mechanics do most of the work.',
      'Winback families':  'Baby outgrew the shop. Credits and no-strings offers bring them back for the next sibling or size.',
    },

    campaigns: [
      // ---- New arrivals ----
      {
        segment:          'New arrivals',
        segmentTone:      'gold',
        name:             'First Steps Starter Kit',
        descriptor:       'Curated essentials for your first weeks home',
        discountPct:      15,
        discountSuffix:   'OFF THE STARTER KIT',
        image:            'https://images.unsplash.com/photo-1569974641446-22542de88536?auto=format&fit=crop&w=1200&h=900&q=80',
        minOrder:         '€85+ minimum',
        status:           'live',
        statusEyebrow:    null,
        validThrough:     'Live through Nov 15',
        startedOn:        'live since Oct 20',
        customersReached: '184 customers reached',
      },
      {
        segment:          'New arrivals',
        segmentTone:      'gold',
        name:             'VIP Early Access · New Season Capsule',
        descriptor:       'Shop the new drop 24 hours before anyone else',
        discountPct:      20,
        discountSuffix:   'OFF THE CAPSULE',
        image:            'https://images.unsplash.com/photo-1617331140180-e8262094733a?auto=format&fit=crop&w=1200&h=900&q=80',
        minOrder:         '€95+ minimum',
        status:           'ending-soon',
        statusEyebrow:    'LAST 3 DAYS',
        validThrough:     'Ends Nov 2',
        startedOn:        'live since Oct 27',
        customersReached: '127 customers reached',
      },

      // ---- Growing families ----
      {
        segment:          'Growing families',
        segmentTone:      'pearl',
        name:             'Size Up Reminder · Next Stage Edit',
        descriptor:       'Hand-picked for the size they just outgrew',
        discountPct:      15,
        discountSuffix:   'OFF THE NEXT STAGE',
        image:            'https://images.unsplash.com/photo-1622290319146-7b63df48a635?auto=format&fit=crop&w=1200&h=900&q=80',
        minOrder:         '€50+ minimum',
        status:           'live',
        statusEyebrow:    null,
        validThrough:     'Live through Nov 20',
        startedOn:        'live since Oct 18',
        customersReached: '726 customers reached',
      },
      {
        segment:          'Growing families',
        segmentTone:      'pearl',
        name:             'Nursery Refresh Bundle',
        descriptor:       'Three-piece refresh for the next phase',
        discountPct:      25,
        discountSuffix:   'OFF THE BUNDLE',
        image:            'https://images.unsplash.com/photo-1546193229-e200b04daf4e?auto=format&fit=crop&w=1200&h=900&q=80',
        minOrder:         '€150+ minimum',
        status:           'upcoming',
        statusEyebrow:    'LAUNCHES NOV 6',
        validThrough:     'Launches Nov 6',
        startedOn:        'launches Nov 6',
        customersReached: '0 customers reached',
      },

      // ---- Everyday shoppers ----
      {
        segment:          'Everyday shoppers',
        segmentTone:      'warm-beige',
        name:             'Everyday Essentials Restock',
        descriptor:       'Core basics, always in rotation',
        discountPct:      20,
        discountSuffix:   'OFF ESSENTIALS',
        image:            'https://images.unsplash.com/photo-1582212742235-a2500f31cb39?auto=format&fit=crop&w=1200&h=900&q=80',
        minOrder:         '€45+ minimum',
        status:           'live',
        statusEyebrow:    null,
        validThrough:     'Live through Nov 22',
        startedOn:        'live since Oct 22',
        customersReached: '1,218 customers reached',
      },
      {
        segment:          'Everyday shoppers',
        segmentTone:      'warm-beige',
        name:             'Seasonal Capsule',
        descriptor:       'Weather-appropriate picks for this month',
        discountPct:      15,
        discountSuffix:   'OFF SEASONAL PICKS',
        image:            'https://images.unsplash.com/photo-1766918780914-5df4a5a98c44?auto=format&fit=crop&w=1200&h=900&q=80',
        minOrder:         '€65+ minimum',
        status:           'live',
        statusEyebrow:    null,
        validThrough:     'Live through Nov 18',
        startedOn:        'live since Oct 24',
        customersReached: '543 customers reached',
      },

      // ---- Gift givers ----
      {
        segment:          'Gift givers',
        segmentTone:      'soft-rose',
        name:             'Baby Shower Gift Set',
        descriptor:       'Pre-wrapped and ready to gift',
        discountPct:      20,
        discountSuffix:   'OFF + FREE WRAP',
        image:            'https://images.unsplash.com/photo-1766918780914-e19d9de76d85?auto=format&fit=crop&w=1200&h=900&q=80',
        minOrder:         '€65+ minimum',
        status:           'live',
        statusEyebrow:    null,
        validThrough:     'Live through Nov 28',
        startedOn:        'live since Oct 15',
        customersReached: '482 customers reached',
      },
      {
        segment:          'Gift givers',
        segmentTone:      'soft-rose',
        name:             'Gift Card Bonus',
        descriptor:       'Give something they\'ll actually use',
        discountLabel:    '€20',
        discountSuffix:   'BONUS ON €100 GIFT CARDS',
        image:            'https://plus.unsplash.com/premium_photo-1661698807037-1539b9d5498a?auto=format&fit=crop&w=1200&h=900&q=80',
        minOrder:         '€100+ to unlock',
        status:           'ending-soon',
        statusEyebrow:    'LAST 6 DAYS',
        validThrough:     'Ends Nov 5',
        startedOn:        'live since Oct 20',
        customersReached: '294 customers reached',
      },

      // ---- Budget parents ----
      {
        segment:          'Budget parents',
        segmentTone:      'rust',
        name:             'Flash 40% Off Weekend',
        descriptor:       '72 hours, select styles only',
        discountPct:      40,
        discountSuffix:   'OFF SELECT STYLES',
        image:            'https://images.unsplash.com/photo-1766918780916-228d10b071be?auto=format&fit=crop&w=1200&h=900&q=80',
        minOrder:         'No minimum',
        status:           'ending-soon',
        statusEyebrow:    '72 HOURS LEFT',
        validThrough:     'Ends Nov 1',
        startedOn:        'live since Oct 29',
        customersReached: '1,681 customers reached',
      },
      {
        segment:          'Budget parents',
        segmentTone:      'rust',
        name:             'Buy 3 Get 1 Free',
        descriptor:       'Mix and match socks, onesies, basics',
        discountLabel:    'B3G1',
        discountSuffix:   'ALL BASICS',
        image:            'https://images.unsplash.com/photo-1513091250092-b06c2b7981bc?auto=format&fit=crop&w=1200&h=900&q=80',
        minOrder:         'All basics',
        status:           'live',
        statusEyebrow:    null,
        validThrough:     'Live through Nov 14',
        startedOn:        'live since Oct 26',
        customersReached: '917 customers reached',
      },

      // ---- Winback families ----
      {
        segment:          'Winback families',
        segmentTone:      'slate',
        name:             'We Miss You · 50% Off',
        descriptor:       'Come back for the next size up',
        discountPct:      50,
        discountSuffix:   'OFF NEXT ORDER',
        image:            'https://images.unsplash.com/photo-1760727772969-cb5cd59c6f30?auto=format&fit=crop&w=1200&h=900&q=80',
        minOrder:         'No minimum',
        status:           'live',
        statusEyebrow:    null,
        validThrough:     'Live through Nov 30',
        startedOn:        'live since Oct 16',
        customersReached: '258 customers reached',
      },
      {
        segment:          'Winback families',
        segmentTone:      'slate',
        name:             '€25 Store Credit',
        descriptor:       'On the house. No minimum. No code',
        discountLabel:    '€25',
        discountSuffix:   'STORE CREDIT',
        image:            'https://images.unsplash.com/photo-1578178107900-e8ef3855b9cf?auto=format&fit=crop&w=1200&h=900&q=80',
        minOrder:         'No minimum',
        status:           'upcoming',
        statusEyebrow:    'LAUNCHES NOV 8',
        validThrough:     'Launches Nov 8',
        startedOn:        'launches Nov 8',
        customersReached: '0 customers reached',
      },
    ],

    rewardTypes: [
      {
        id:           'credit',
        label:        'Store Credit',
        tagline:      null,
        color:        '#7aad8e',
        kind:         'pct',
        deliveryBody: 'Live in your 99minds wallet. Use it on any future order — it never expires.',
      },
      {
        id:           'coupon',
        label:        'Coupon',
        tagline:      '€8 off your next order',
        color:        '#7eb8a4',
        kind:         'fixed',
        amount:       8,
        code:         'BLOOM8',
        deliveryBody: 'Code BLOOM8 is ready. Apply at checkout on your next order — no minimum.',
      },
      {
        id:           'points',
        label:        'Loyalty Points',
        tagline:      '1.5× points on this order',
        color:        '#9b8ec4',
        kind:         'points',
        multiplier:   1.5,
        deliveryBody: '1.5× bonus applied. Points convert to store credit at your next checkout.',
      },
      {
        id:           'giftcard',
        label:        'Gift Card',
        tagline:      '€15 virtual gift card',
        color:        '#c4846e',
        kind:         'fixed',
        amount:       15,
        code:         'BLOOM-GIFT-2026',
        deliveryBody: 'Code BLOOM-GIFT-2026 is in your 99minds account. Share it or keep it.',
      },
    ],
  },
};

export function withStore(path) {
  const params = new URLSearchParams(window.location.search);
  const store = params.get('store');
  if (!store) return path;
  const sep = path.includes('?') ? '&' : '?';
  return `${path}${sep}store=${store}`;
}

export function getActiveStore() {
  const params = new URLSearchParams(window.location.search);
  let id = params.get('store');

  if (!id) {
    id = sessionStorage.getItem('active-store') || 'velour-nyc';
  } else {
    sessionStorage.setItem('active-store', id);
  }

  const base = STORES[id] || STORES['velour-nyc'];

  try {
    const raw = sessionStorage.getItem('admin-overrides');
    if (!raw) return base;
    const ov = JSON.parse(raw);
    if (ov.storeId !== base.id) return base;
    return applyOverrides(base, ov);
  } catch {
    return base;
  }
}

function applyOverrides(base, ov) {
  const out = { ...base };
  if (ov.activeCampaign) {
    out.activeCampaign = { ...base.activeCampaign, ...ov.activeCampaign };
  }
  if (Array.isArray(ov.campaigns)) {
    out.campaigns = ov.campaigns;
  }
  if (Array.isArray(ov.enabledRewardIds)) {
    out.rewardTypes = base.rewardTypes.filter(r => ov.enabledRewardIds.includes(r.id));
  }
  return out;
}
