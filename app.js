(() => {
  'use strict';

  /* =========================================================
     Procedural High-Contrast SVG Artwork Generator
     Ensures 100% offline, crisp, zero-broken-image banners & icons
     ========================================================= */
  function escapeXml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  function svgToDataUri(svg) {
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg.trim());
  }

  function createBannerArt(item) {
    const [c1, c2, c3] = item.colors;
    const safeTitle = escapeXml(item.title);
    const safeTag = escapeXml(item.category.toUpperCase());
    const safeTagline = escapeXml(item.tagline);
    const safeMonogram = escapeXml(item.monogram);
    const pillWidth = Math.max(96, item.category.length * 9 + 30);
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 320" width="640" height="320">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${c1}"/>
            <stop offset="55%" stop-color="${c2}"/>
            <stop offset="100%" stop-color="${c3}"/>
          </linearGradient>
          <radialGradient id="glow" cx="72%" cy="28%" r="60%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.32"/>
            <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
          </radialGradient>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="640" height="320" fill="url(#bg)"/>
        <rect width="640" height="320" fill="url(#grid)"/>
        <rect width="640" height="320" fill="url(#glow)"/>
        <circle cx="520" cy="70" r="130" fill="#FFFFFF" fill-opacity="0.09"/>
        <circle cx="110" cy="260" r="145" fill="#000000" fill-opacity="0.18"/>
        <polygon points="390,320 560,0 640,0 640,320" fill="#000000" fill-opacity="0.16"/>
        <g opacity="0.22" transform="translate(455, 74)">
          <rect x="0" y="0" width="110" height="110" rx="26" fill="#FFFFFF"/>
          <text x="55" y="70" text-anchor="middle" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="900" font-size="44" fill="${c1}">${safeMonogram}</text>
        </g>
        <rect x="66" y="64" width="${pillWidth}" height="28" rx="14" fill="#000000" fill-opacity="0.38"/>
        <text x="80" y="83" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="800" font-size="12" letter-spacing="1.2" fill="#FFFFFF">${safeTag}</text>
        <text x="66" y="146" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="900" font-size="36" fill="#FFFFFF" opacity="0.96">${safeTitle}</text>
        <text x="66" y="176" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="600" font-size="15" fill="#FFFFFF" opacity="0.84">${safeTagline}</text>
      </svg>`;
    return svgToDataUri(svg);
  }

  function createIconArt(item) {
    const [c1, c2, c3] = item.colors;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
        <defs>
          <linearGradient id="ibg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${c1}"/>
            <stop offset="55%" stop-color="${c2}"/>
            <stop offset="100%" stop-color="${c3}"/>
          </linearGradient>
          <radialGradient id="ishine" cx="30%" cy="22%" r="68%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.45"/>
            <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="160" height="160" fill="url(#ibg)"/>
        <rect width="160" height="160" fill="url(#ishine)"/>
        <circle cx="128" cy="134" r="54" fill="#000000" fill-opacity="0.18"/>
        <rect x="18" y="18" width="124" height="124" rx="28" fill="none" stroke="#FFFFFF" stroke-opacity="0.28" stroke-width="3"/>
        <text x="80" y="96" text-anchor="middle" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="900" font-size="52" fill="#FFFFFF">${item.monogram}</text>
      </svg>`;
    return svgToDataUri(svg);
  }

  /* =========================================================
     Catalog Data (Games & Apps)
     ========================================================= */
  const CATALOG = [
    // Featured & New Games
    {
      id: 'fc-mobile',
      title: 'Fc Mobile',
      type: 'games',
      category: 'Sports',
      rating: '4.9',
      size: '164 MB',
      featured: true,
      isNew: false,
      monogram: 'FC',
      tagline: 'Next-Gen Football Season',
      colors: ['#0F172A', '#1D4ED8', '#22D3EE'],
      description: 'Build your Ultimate Team with real-world clubs, stadium atmospheres, and head-to-head online matches.'
    },
    {
      id: 'dls-26',
      title: 'DLS 26',
      type: 'games',
      category: 'Sports',
      rating: '4.9',
      size: '412 MB',
      featured: true,
      isNew: false,
      monogram: '26',
      tagline: 'Dream League Stadium Edition',
      colors: ['#1E1B4B', '#4F46E5', '#EC4899'],
      description: 'Construct your own stadium, sign top players, and climb global divisions with smooth 60 FPS gameplay.'
    },
    {
      id: '8-ball-pool',
      title: '8 Ball Pool',
      type: 'games',
      category: 'Sports',
      rating: '4.8',
      size: '96 MB',
      featured: true,
      isNew: true,
      monogram: '8',
      tagline: 'Precision Cue & 1v1 Tournaments',
      colors: ['#7C2D12', '#EA580C', '#FACC15'],
      description: 'Challenge friends or climb global tournament tiers in the classic multiplayer billiards experience.'
    },
    {
      id: 'archero-2',
      title: 'Archero 2',
      type: 'games',
      category: 'Action',
      rating: '4.8',
      size: '218 MB',
      featured: true,
      isNew: true,
      monogram: 'A2',
      tagline: 'Roguelike Arena Adventure',
      colors: ['#312E81', '#7C3AED', '#F43F5E'],
      description: 'Fast-paced roguelike archery with stackable skill combos, boss rushes, and dynamic dungeon runs.'
    },
    {
      id: 'coin-master',
      title: 'Coin Master',
      type: 'games',
      category: 'Board & Casual',
      rating: '4.7',
      size: '115 MB',
      featured: true,
      isNew: true,
      monogram: 'CM',
      tagline: 'Spin, Raid & Build Villages',
      colors: ['#78350F', '#D97706', '#FDE047'],
      description: 'Spin the fortune wheel, raid rival villages, collect rare cards, and upgrade themed islands.'
    },
    {
      id: 'monopoly-go',
      title: 'Monopoly Go',
      type: 'games',
      category: 'Board & Casual',
      rating: '4.9',
      size: '188 MB',
      featured: true,
      isNew: true,
      monogram: 'MG',
      tagline: 'Classic Board, Modern Events',
      colors: ['#065F46', '#10B981', '#38BDF8'],
      description: 'Roll the dice across iconic boards, complete sticker albums, and team up for seasonal mini-games.'
    },
    {
      id: 'sunday-city',
      title: 'Sunday City',
      type: 'games',
      category: 'RPG',
      rating: '4.7',
      size: '340 MB',
      featured: false,
      isNew: true,
      monogram: 'SC',
      tagline: 'Open-World Coastal Life Sim',
      colors: ['#0E7490', '#0284C7', '#F97316'],
      description: 'Explore a vibrant beachfront metropolis, customize rides, and rise from courier to city tycoon.'
    },
    {
      id: 'weelife',
      title: 'Weelife',
      type: 'games',
      category: 'RPG',
      rating: '4.6',
      size: '154 MB',
      featured: false,
      isNew: true,
      monogram: 'WL',
      tagline: '3D Social Avatar World',
      colors: ['#6D28D9', '#A855F7', '#EC4899'],
      description: 'Create expressive 3D avatars, host voice-chat hangouts, and explore interactive community rooms.'
    },
    {
      id: 'brawl-stars',
      title: 'Brawl Stars',
      type: 'games',
      category: 'Action',
      rating: '4.9',
      size: '286 MB',
      featured: true,
      isNew: false,
      monogram: 'BS',
      tagline: '3v3 Fast-Paced Arena Brawler',
      colors: ['#1E3A8A', '#2563EB', '#FACC15'],
      description: 'Unlock and upgrade dozens of brawlers with super abilities across Gem Grab, Showdown, and Brawl Ball.'
    },
    {
      id: 'roblox',
      title: 'Roblox Studio Play',
      type: 'games',
      category: 'RPG',
      rating: '4.8',
      size: '198 MB',
      featured: true,
      isNew: false,
      monogram: 'RB',
      tagline: 'Millions of User-Built Worlds',
      colors: ['#111827', '#334155', '#38BDF8'],
      description: 'Jump into community-crafted experiences, obbies, simulators, and cross-platform adventures.'
    },
    {
      id: 'clash-royale',
      title: 'Clash Royale',
      type: 'games',
      category: 'Action',
      rating: '4.7',
      size: '214 MB',
      featured: false,
      isNew: false,
      monogram: 'CR',
      tagline: 'Real-Time Card Strategy Arena',
      colors: ['#1E40AF', '#3B82F6', '#F59E0B'],
      description: 'Craft balanced battle decks and outplay opponents in real-time tower defense duels.'
    },
    {
      id: 'subway-surfers',
      title: 'Subway Surfers',
      type: 'games',
      category: 'Board & Casual',
      rating: '4.8',
      size: '149 MB',
      featured: false,
      isNew: false,
      monogram: 'SS',
      tagline: 'World Tour Endless Runner',
      colors: ['#0369A1', '#06B6D4', '#F43F5E'],
      description: 'Dash through colorful railway cities, unlock hoverboards, and chase high scores in weekly tours.'
    },
    {
      id: 'genshin-cloud',
      title: 'Teyvat Explorer',
      type: 'games',
      category: 'RPG',
      rating: '4.9',
      size: '520 MB',
      featured: false,
      isNew: false,
      monogram: 'TE',
      tagline: 'Elemental Open-World Fantasy',
      colors: ['#0F766E', '#14B8A6', '#6366F1'],
      description: 'Master elemental synergies and glide across sweeping fantasy landscapes with co-op boss domains.'
    },
    {
      id: 'car-parking-mp',
      title: 'Car Parking MP',
      type: 'games',
      category: 'Sports',
      rating: '4.7',
      size: '390 MB',
      featured: false,
      isNew: false,
      monogram: 'CP',
      tagline: 'Open-World Tuning & Drift',
      colors: ['#1F2937', '#4B5563', '#EF4444'],
      description: 'Free-roam city driving with deep engine tuning, custom liveries, and multiplayer car meets.'
    },
    {
      id: 'stumble-guys',
      title: 'Stumble Guys',
      type: 'games',
      category: 'Board & Casual',
      rating: '4.6',
      size: '176 MB',
      featured: false,
      isNew: false,
      monogram: 'SG',
      tagline: '32-Player Knockout Party',
      colors: ['#BE185D', '#EC4899', '#FBBF24'],
      description: 'Race, dive, and bounce through chaotic obstacle courses until only one champion remains.'
    },
    {
      id: 'efootball-26',
      title: 'eFootball 26',
      type: 'games',
      category: 'Sports',
      rating: '4.8',
      size: '478 MB',
      featured: false,
      isNew: false,
      monogram: 'eF',
      tagline: 'Authentic Pitch Simulation',
      colors: ['#1D4ED8', '#2563EB', '#FDE047'],
      description: 'Tactical football simulation with realistic ball physics, live weekly forms, and co-op leagues.'
    },

    // Featured & New Apps
    {
      id: 'sugo',
      title: 'Sugo',
      type: 'apps',
      category: 'Social',
      rating: '4.8',
      size: '84 MB',
      featured: true,
      isNew: true,
      monogram: 'SG',
      tagline: 'Live Voice Rooms & Moments',
      colors: ['#4C1D95', '#7C3AED', '#EC4899'],
      description: 'Connect in themed voice lounges, share daily moments, and meet creators from around the world.'
    },
    {
      id: 'blink-drama',
      title: 'Blink Drama',
      type: 'apps',
      category: 'Drama',
      rating: '4.8',
      size: '62 MB',
      featured: true,
      isNew: true,
      monogram: 'BD',
      tagline: 'HD Vertical Mini-Series',
      colors: ['#831843', '#DB2777', '#F97316'],
      description: 'Binge bite-sized 2-minute vertical dramas spanning thriller, romance, and sci-fi originals.'
    },
    {
      id: 'reelshort',
      title: 'ReelShort',
      type: 'apps',
      category: 'Drama',
      rating: '4.9',
      size: '71 MB',
      featured: true,
      isNew: true,
      monogram: 'RS',
      tagline: 'Trending Short-Form Cinema',
      colors: ['#991B1B', '#EF4444', '#F59E0B'],
      description: 'Stream exclusive vertical episodes crafted for mobile viewing with daily new releases.'
    },
    {
      id: 'dramabox',
      title: 'DramaBox',
      type: 'apps',
      category: 'Drama',
      rating: '4.9',
      size: '68 MB',
      featured: true,
      isNew: true,
      monogram: 'DB',
      tagline: 'Unlimited Short Drama Library',
      colors: ['#701A75', '#C026D3', '#FB7185'],
      description: 'Discover curated short drama playlists with multilingual subtitles and instant episode switching.'
    },
    {
      id: 'webnovel',
      title: 'WebNovel',
      type: 'apps',
      category: 'Reading',
      rating: '4.7',
      size: '58 MB',
      featured: false,
      isNew: true,
      monogram: 'WN',
      tagline: 'Serialized Fiction & Comics',
      colors: ['#1E3A8A', '#3B82F6', '#06B6D4'],
      description: 'Read millions of serialized fantasy, sci-fi, and slice-of-life chapters with offline sync.'
    },
    {
      id: 'shortmax',
      title: 'ShortMax',
      type: 'apps',
      category: 'Drama',
      rating: '4.8',
      size: '66 MB',
      featured: false,
      isNew: true,
      monogram: 'SM',
      tagline: 'Originals in 1080p Vertical',
      colors: ['#0F172A', '#6366F1', '#38BDF8'],
      description: 'High-definition mini-dramas with smart recommendations and zero-buffering playback.'
    },
    {
      id: 'goodshort',
      title: 'GoodShort',
      type: 'apps',
      category: 'Drama',
      rating: '4.7',
      size: '64 MB',
      featured: false,
      isNew: false,
      monogram: 'GS',
      tagline: 'Adapted Bestseller Mini-Shows',
      colors: ['#9A3412', '#F97316', '#FACC15'],
      description: 'Watch rapid-fire screen adaptations of popular web novels right from your pocket.'
    },
    {
      id: 'novelflow',
      title: 'NovelFlow',
      type: 'apps',
      category: 'Reading',
      rating: '4.6',
      size: '49 MB',
      featured: false,
      isNew: false,
      monogram: 'NF',
      tagline: 'Distraction-Free E-Reader',
      colors: ['#064E3B', '#059669', '#34D399'],
      description: 'Customizable dark-mode typography, audio narration, and community reading lists.'
    },
    {
      id: 'chime-live',
      title: 'Chime Live',
      type: 'apps',
      category: 'Social',
      rating: '4.7',
      size: '91 MB',
      featured: false,
      isNew: false,
      monogram: 'CL',
      tagline: 'Interactive Creator Streams',
      colors: ['#312E81', '#4F46E5', '#22D3EE'],
      description: 'Join live music sessions, trivia nights, and creator Q&As with low-latency chat.'
    },
    {
      id: 'dreame-read',
      title: 'Dreame Stories',
      type: 'apps',
      category: 'Reading',
      rating: '4.8',
      size: '55 MB',
      featured: false,
      isNew: false,
      monogram: 'DS',
      tagline: 'Curated Indie Fiction Hub',
      colors: ['#881337', '#E11D48', '#FB7185'],
      description: 'Follow independent authors with daily chapter drops and personalized reading shelves.'
    },
    {
      id: 'viberoom',
      title: 'VibeRoom',
      type: 'apps',
      category: 'Social',
      rating: '4.6',
      size: '79 MB',
      featured: false,
      isNew: false,
      monogram: 'VR',
      tagline: 'Spatial Audio Hangouts',
      colors: ['#164E63', '#0891B2', '#818CF8'],
      description: 'Drop into spatial audio study rooms, gaming lobbies, and watch parties.'
    },
    {
      id: 'kalos-tv',
      title: 'Kalos TV',
      type: 'apps',
      category: 'Drama',
      rating: '4.7',
      size: '67 MB',
      featured: false,
      isNew: false,
      monogram: 'KT',
      tagline: 'Global Mini-Drama Premieres',
      colors: ['#3B0764', '#9333EA', '#F472B6'],
      description: 'Discover global short-form series with HD streaming and instant bookmarking.'
    }
  ].map((item) => ({
    ...item,
    bannerUrl: createBannerArt(item),
    iconUrl: createIconArt(item)
  }));

  /* =========================================================
     State & DOM References
     ========================================================= */
  const state = {
    view: 'discover',
    previousView: 'discover',
    gamesFilter: 'All',
    appsFilter: 'All',
    carouselIndex: 1,
    activeItem: null,
    selectedPlatform: 'Android',
    progressTimer: null,
    autoPlayTimer: null
  };

  const els = {
    body: document.body,
    brandHome: document.getElementById('brand-home'),
    themeToggle: document.getElementById('theme-toggle'),
    searchForm: document.getElementById('search-form'),
    searchInput: document.getElementById('search-input'),
    searchClear: document.getElementById('search-clear'),
    resetSearchBtn: document.getElementById('reset-search-btn'),
    navItems: Array.from(document.querySelectorAll('.ar-wa-view-nav-item')),
    views: {
      discover: document.getElementById('view-discover'),
      games: document.getElementById('view-games'),
      apps: document.getElementById('view-apps'),
      search: document.getElementById('view-search')
    },
    coverflowViewport: document.getElementById('coverflow-viewport'),
    coverflowTrack: document.getElementById('coverflow-track'),
    coverflowDots: document.getElementById('coverflow-dots'),
    cfPrev: document.getElementById('cf-prev'),
    cfNext: document.getElementById('cf-next'),
    newGamesList: document.getElementById('new-games-list'),
    newAppsList: document.getElementById('new-apps-list'),
    gamesFilters: document.getElementById('games-filters'),
    gamesGrid: document.getElementById('games-grid'),
    gamesCountLabel: document.getElementById('games-count-label'),
    appsFilters: document.getElementById('apps-filters'),
    appsGrid: document.getElementById('apps-grid'),
    appsCountLabel: document.getElementById('apps-count-label'),
    searchGrid: document.getElementById('search-grid'),
    searchCountLabel: document.getElementById('search-count-label'),
    searchEmpty: document.getElementById('search-empty'),
    // Item Modal
    itemModal: document.getElementById('item-modal'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalAppIcon: document.getElementById('modal-app-icon'),
    modalAppEyebrow: document.getElementById('modal-app-eyebrow'),
    modalAppTitle: document.getElementById('modal-app-title'),
    modalAppRating: document.getElementById('modal-app-rating'),
    modalAppCat: document.getElementById('modal-app-cat'),
    modalAppSize: document.getElementById('modal-app-size'),
    modalAppDesc: document.getElementById('modal-app-desc'),
    modalUsername: document.getElementById('modal-username'),
    platformBtns: Array.from(document.querySelectorAll('.platform-btn')),
    modalStep1: document.getElementById('modal-step-1'),
    modalStep2: document.getElementById('modal-step-2'),
    modalLaunchBtn: document.getElementById('modal-launch-btn'),
    modalProgressFill: document.getElementById('modal-progress-fill'),
    modalProgressStatus: document.getElementById('modal-progress-status'),
    modalReadyCard: document.getElementById('modal-ready-card'),
    modalReadySummary: document.getElementById('modal-ready-summary'),
    modalResetBtn: document.getElementById('modal-reset-btn'),
    // Promo Modal
    headerDownloadBtn: document.getElementById('header-download-btn'),
    promoModal: document.getElementById('promo-modal'),
    promoCloseBtn: document.getElementById('promo-close-btn'),
    promoConfirmBtn: document.getElementById('promo-confirm-btn'),
    promoToast: document.getElementById('promo-toast')
  };

  /* =========================================================
     Theme Toggle (Dark .cm-d / Light .cm-l)
     ========================================================= */
  function applyTheme(mode) {
    const isLight = mode === 'light';
    document.documentElement.classList.toggle('cm-l', isLight);
    document.documentElement.classList.toggle('cm-d', !isLight);
    els.body.classList.toggle('cm-l', isLight);
    els.body.classList.toggle('cm-d', !isLight);
  }

  function initTheme() {
    const saved = localStorage.getItem('injectvip-theme');
    applyTheme(saved === 'light' ? 'light' : 'dark');
    els.themeToggle.addEventListener('click', () => {
      const next = els.body.classList.contains('cm-d') ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('injectvip-theme', next);
    });
  }

  /* =========================================================
     3D Coverflow Carousel
     ========================================================= */
  const featuredItems = CATALOG.filter((i) => i.featured);

  function renderCarousel() {
    els.coverflowTrack.innerHTML = featuredItems
      .map(
        (item, idx) => `
      <article class="cf-slide" data-index="${idx}" data-id="${item.id}" tabindex="0" aria-label="${item.title}">
        <img class="cf-slide-art" src="${item.bannerUrl}" alt="${item.title} artwork" />
        <div class="cf-slide-overlay">
          <div class="cf-slide-icon">
            <img src="${item.iconUrl}" alt="${item.title} icon" />
          </div>
          <div class="cf-slide-info">
            <h3 class="cf-slide-title">${item.title}</h3>
            <span class="cf-rating-pill">☆ ${item.rating}</span>
          </div>
        </div>
      </article>`
      )
      .join('');

    els.coverflowDots.innerHTML = featuredItems
      .map(
        (_, idx) =>
          `<button type="button" class="cf-dot" data-dot="${idx}" aria-label="Go to slide ${idx + 1}"></button>`
      )
      .join('');

    els.coverflowTrack.querySelectorAll('.cf-slide').forEach((slide) => {
      slide.addEventListener('click', () => {
        const idx = Number(slide.dataset.index);
        if (idx === state.carouselIndex) {
          const item = featuredItems[idx];
          if (item) openItemModal(item);
        } else {
          state.carouselIndex = idx;
          updateCarouselPositions();
          restartAutoPlay();
        }
      });
    });

    els.coverflowDots.querySelectorAll('.cf-dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        state.carouselIndex = Number(dot.dataset.dot);
        updateCarouselPositions();
        restartAutoPlay();
      });
    });

    updateCarouselPositions();
  }

  function updateCarouselPositions() {
    const slides = Array.from(els.coverflowTrack.querySelectorAll('.cf-slide'));
    const dots = Array.from(els.coverflowDots.querySelectorAll('.cf-dot'));
    const total = slides.length;
    const isNarrow = window.innerWidth < 680;
    const xStep = isNarrow ? 185 : 275;

    slides.forEach((slide, idx) => {
      let offset = idx - state.carouselIndex;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      const abs = Math.abs(offset);
      const isActive = offset === 0;
      slide.classList.toggle('is-active', isActive);

      if (abs > 2) {
        slide.style.opacity = '0';
        slide.style.pointerEvents = 'none';
        slide.style.transform = `translate(-50%, -50%) translate3d(${offset * xStep}px, 0, -260px) scale(0.72)`;
        slide.style.zIndex = '1';
      } else {
        const tx = offset * xStep;
        const tz = -abs * 120;
        const rotY = offset * -24;
        const scale = isActive ? 1 : abs === 1 ? 0.86 : 0.74;
        slide.style.opacity = isActive ? '1' : abs === 1 ? '0.78' : '0.35';
        slide.style.pointerEvents = 'auto';
        slide.style.transform = `translate(-50%, -50%) translate3d(${tx}px, 0, ${tz}px) rotateY(${rotY}deg) scale(${scale})`;
        slide.style.zIndex = String(10 - abs);
        slide.style.filter = isActive ? 'none' : 'brightness(0.82)';
      }
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === state.carouselIndex);
    });
  }

  function stepCarousel(delta) {
    state.carouselIndex = (state.carouselIndex + delta + featuredItems.length) % featuredItems.length;
    updateCarouselPositions();
  }

  function restartAutoPlay() {
    clearInterval(state.autoPlayTimer);
    state.autoPlayTimer = setInterval(() => {
      if (state.view === 'discover' && els.itemModal.hidden && els.promoModal.hidden) {
        stepCarousel(1);
      }
    }, 4500);
  }

  /* =========================================================
     Card Renderers (Discover Streamline & Full 4-Col Grid)
     ========================================================= */
  function createStreamlineCard(item) {
    return `
      <article class="streamline-card" data-id="${item.id}" tabindex="0">
        <div class="streamline-card-inner">
          <div class="streamline-banner">
            <img src="${item.bannerUrl}" alt="${item.title} banner" loading="lazy" />
          </div>
          <div class="streamline-icon-wrap">
            <img src="${item.iconUrl}" alt="${item.title} icon" loading="lazy" />
          </div>
          <h3 class="streamline-title">${item.title}</h3>
          <div class="streamline-rating">
            <span>☆ Rating:</span>
            <strong>${item.rating}</strong>
          </div>
          <button type="button" class="play-now-btn" data-id="${item.id}">PLAY NOW</button>
        </div>
      </article>`;
  }

  function createGridCard(item) {
    return `
      <article class="grid-card" data-id="${item.id}" tabindex="0">
        <div class="grid-card-banner">
          <img src="${item.bannerUrl}" alt="${item.title} banner" loading="lazy" />
        </div>
        <div class="grid-card-icon">
          <img src="${item.iconUrl}" alt="${item.title} icon" loading="lazy" />
        </div>
        <h3 class="grid-card-title">${item.title}</h3>
        <span class="grid-card-cat">${item.category} · ${item.size}</span>
        <div class="grid-card-foot">
          <span class="grid-card-rating">★ ${item.rating}</span>
          <button type="button" class="grid-card-btn" data-id="${item.id}">OPEN</button>
        </div>
      </article>`;
  }

  function bindCardClicks(container) {
    container.querySelectorAll('[data-id]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const item = CATALOG.find((c) => c.id === el.dataset.id);
        if (item) openItemModal(item);
      });
    });
  }

  function renderDiscoverLists() {
    const newGames = CATALOG.filter((i) => i.type === 'games' && i.isNew).slice(0, 6);
    const newApps = CATALOG.filter((i) => i.type === 'apps' && i.isNew).slice(0, 6);

    els.newGamesList.innerHTML = newGames.map(createStreamlineCard).join('');
    els.newAppsList.innerHTML = newApps.map(createStreamlineCard).join('');

    bindCardClicks(els.newGamesList);
    bindCardClicks(els.newAppsList);
  }

  function renderCatalogView(type) {
    const items = CATALOG.filter((i) => i.type === type);
    const categories = ['All', ...new Set(items.map((i) => i.category))];
    const activeFilter = type === 'games' ? state.gamesFilter : state.appsFilter;
    const filterContainer = type === 'games' ? els.gamesFilters : els.appsFilters;
    const gridContainer = type === 'games' ? els.gamesGrid : els.appsGrid;
    const countLabel = type === 'games' ? els.gamesCountLabel : els.appsCountLabel;

    filterContainer.innerHTML = categories
      .map(
        (cat) =>
          `<button type="button" class="filter-pill ${cat === activeFilter ? 'active' : ''}" data-cat="${cat}">${cat}</button>`
      )
      .join('');

    filterContainer.querySelectorAll('.filter-pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (type === 'games') state.gamesFilter = btn.dataset.cat;
        else state.appsFilter = btn.dataset.cat;
        renderCatalogView(type);
      });
    });

    const filtered = activeFilter === 'All' ? items : items.filter((i) => i.category === activeFilter);
    countLabel.textContent = `Showing ${filtered.length} ${type}`;
    gridContainer.innerHTML = filtered.map(createGridCard).join('');
    bindCardClicks(gridContainer);
  }

  /* =========================================================
     View Navigation & Live Search
     ========================================================= */
  function setView(viewName) {
    if (viewName !== 'search') {
      state.previousView = viewName;
    }
    state.view = viewName;

    Object.entries(els.views).forEach(([key, node]) => {
      node.hidden = key !== viewName;
    });

    els.navItems.forEach((item) => {
      item.classList.toggle('active', item.dataset.view === viewName);
    });

    if (viewName === 'games') renderCatalogView('games');
    if (viewName === 'apps') renderCatalogView('apps');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSearch(rawQuery) {
    const query = rawQuery.trim().toLowerCase();
    els.searchClear.hidden = query.length === 0;

    if (!query) {
      setView(state.previousView || 'discover');
      return;
    }

    const matches = CATALOG.filter(
      (i) =>
        i.title.toLowerCase().includes(query) ||
        i.category.toLowerCase().includes(query) ||
        i.tagline.toLowerCase().includes(query)
    );

    setView('search');
    els.searchCountLabel.textContent = `${matches.length} result${matches.length === 1 ? '' : 's'} for "${rawQuery.trim()}"`;
    els.searchGrid.innerHTML = matches.map(createGridCard).join('');
    els.searchEmpty.hidden = matches.length > 0;
    bindCardClicks(els.searchGrid);
  }

  /* =========================================================
     Item Detail & Preview Modal
     ========================================================= */
  function openItemModal(item) {
    state.activeItem = item;
    clearInterval(state.progressTimer);

    els.modalAppIcon.innerHTML = `<img src="${item.iconUrl}" alt="${item.title} icon" />`;
    els.modalAppEyebrow.textContent = `${item.type.toUpperCase()} · VERIFIED CLOUD PREVIEW`;
    els.modalAppTitle.textContent = item.title;
    els.modalAppRating.textContent = `★ ${item.rating}`;
    els.modalAppCat.textContent = item.category;
    els.modalAppSize.textContent = item.size;
    els.modalAppDesc.textContent = item.description;

    els.modalStep1.hidden = false;
    els.modalStep2.hidden = true;
    els.modalReadyCard.hidden = true;
    els.modalResetBtn.hidden = true;
    els.modalProgressFill.style.width = '0%';
    els.modalUsername.value = '';

    els.itemModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeItemModal() {
    clearInterval(state.progressTimer);
    els.itemModal.hidden = true;
    document.body.style.overflow = '';
  }

  function startPreviewFlow() {
    if (!state.activeItem) return;
    const handle = els.modalUsername.value.trim() || 'Guest';
    els.modalStep1.hidden = true;
    els.modalStep2.hidden = false;
    els.modalReadyCard.hidden = true;
    els.modalResetBtn.hidden = true;

    const stages = [
      { pct: 25, text: `Connecting to ${state.selectedPlatform} package mirror...` },
      { pct: 58, text: `Preparing ${state.activeItem.title} (${state.activeItem.size})...` },
      { pct: 86, text: `Applying profile preferences for ${handle}...` },
      { pct: 100, text: 'Verification complete.' }
    ];

    let step = 0;
    els.modalProgressFill.style.width = '10%';
    els.modalProgressStatus.textContent = 'Initializing cloud session...';

    state.progressTimer = setInterval(() => {
      const current = stages[step];
      if (!current) {
        clearInterval(state.progressTimer);
        els.modalReadySummary.textContent = `${state.activeItem.title} for ${state.selectedPlatform} (${handle}) is staged in this local UI clone.`;
        els.modalReadyCard.hidden = false;
        els.modalResetBtn.hidden = false;
        return;
      }
      els.modalProgressFill.style.width = `${current.pct}%`;
      els.modalProgressStatus.textContent = current.text;
      step += 1;
    }, 480);
  }

  /* =========================================================
     Event Wiring & Boot
     ========================================================= */
  function initEvents() {
    els.brandHome.addEventListener('click', (e) => {
      e.preventDefault();
      els.searchInput.value = '';
      els.searchClear.hidden = true;
      setView('discover');
    });

    els.navItems.forEach((item) => {
      item.addEventListener('click', () => {
        els.searchInput.value = '';
        els.searchClear.hidden = true;
        setView(item.dataset.view);
      });
    });

    document.querySelectorAll('[data-jump]').forEach((btn) => {
      btn.addEventListener('click', () => setView(btn.dataset.jump));
    });

    els.cfPrev.addEventListener('click', () => {
      stepCarousel(-1);
      restartAutoPlay();
    });

    els.cfNext.addEventListener('click', () => {
      stepCarousel(1);
      restartAutoPlay();
    });

    els.coverflowViewport.addEventListener('mouseenter', () => clearInterval(state.autoPlayTimer));
    els.coverflowViewport.addEventListener('mouseleave', restartAutoPlay);

    // Touch / pointer swipe for coverflow
    let dragStartX = null;
    els.coverflowViewport.addEventListener('pointerdown', (e) => {
      dragStartX = e.clientX;
    });
    els.coverflowViewport.addEventListener('pointerup', (e) => {
      if (dragStartX === null) return;
      const diff = e.clientX - dragStartX;
      if (Math.abs(diff) > 45) {
        stepCarousel(diff < 0 ? 1 : -1);
        restartAutoPlay();
      }
      dragStartX = null;
    });

    window.addEventListener('resize', updateCarouselPositions);

    els.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSearch(els.searchInput.value);
    });

    els.searchInput.addEventListener('input', (e) => {
      handleSearch(e.target.value);
    });

    els.searchClear.addEventListener('click', () => {
      els.searchInput.value = '';
      els.searchClear.hidden = true;
      setView(state.previousView || 'discover');
      els.searchInput.focus();
    });

    els.resetSearchBtn.addEventListener('click', () => {
      els.searchInput.value = '';
      els.searchClear.hidden = true;
      setView('discover');
    });

    // Item modal controls
    els.modalCloseBtn.addEventListener('click', closeItemModal);
    els.modalResetBtn.addEventListener('click', closeItemModal);
    els.itemModal.addEventListener('click', (e) => {
      if (e.target === els.itemModal) closeItemModal();
    });

    els.platformBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        state.selectedPlatform = btn.dataset.platform;
        els.platformBtns.forEach((b) => b.classList.toggle('active', b === btn));
      });
    });

    els.modalLaunchBtn.addEventListener('click', startPreviewFlow);

    // Promo modal controls
    els.headerDownloadBtn.addEventListener('click', () => {
      els.promoToast.hidden = true;
      els.promoModal.hidden = false;
      document.body.style.overflow = 'hidden';
    });

    const closePromo = () => {
      els.promoModal.hidden = true;
      document.body.style.overflow = '';
    };

    els.promoCloseBtn.addEventListener('click', closePromo);
    els.promoModal.addEventListener('click', (e) => {
      if (e.target === els.promoModal) closePromo();
    });
    els.promoConfirmBtn.addEventListener('click', () => {
      els.promoToast.hidden = false;
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!els.itemModal.hidden) closeItemModal();
        if (!els.promoModal.hidden) closePromo();
      }
    });
  }

  initTheme();
  renderCarousel();
  renderDiscoverLists();
  initEvents();
  restartAutoPlay();
})();
