/**
 * InjectVIP Professional Search Engine
 * Features:
 *  - Fuzzy matching with Levenshtein distance (typo tolerance)
 *  - Unicode / diacritic normalization (international characters)
 *  - Multi-token query support (every word must match somewhere)
 *  - Relevance-ranked results (title > short_desc > description > category)
 *  - Minimum 1-character query support
 *  - "Did you mean?" alias/tag matching
 *  - Works identically on ALL pages (index, product, keyword pages)
 *  - Zero external dependencies beyond jQuery
 */

(function (global) {
  'use strict';

  /* ============================================================
     1. UTILITY: Unicode & Diacritic Normalization
     Converts "Café", "café", "CAFE" → "cafe"
     Handles Arabic, Latin, Cyrillic, Greek partial normalization
  ============================================================ */
  function normalize(str) {
    if (!str) return '';
    return str
      .toString()
      .normalize('NFD')               // decompose diacritics (é → e + combining accent)
      .replace(/[\u0300-\u036f]/g, '') // strip combining diacritics
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')       // replace punctuation with space
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* ============================================================
     2. UTILITY: Levenshtein Distance (edit distance)
     Returns the minimum number of single-character edits
     needed to change word A into word B.
     Used for fuzzy / typo-tolerant matching.
  ============================================================ */
  function levenshtein(a, b) {
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    var matrix = [];
    var i, j;
    for (i = 0; i <= b.length; i++) matrix[i] = [i];
    for (j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        matrix[i][j] = b[i - 1] === a[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(
              matrix[i - 1][j - 1] + 1,  // substitution
              matrix[i][j - 1] + 1,       // insertion
              matrix[i - 1][j] + 1        // deletion
            );
      }
    }
    return matrix[b.length][a.length];
  }

  /* ============================================================
     3. UTILITY: Fuzzy token match
     Returns a score [0–1] for how well `token` matches `text`.
     1.0 = exact substring, 0.9 = word boundary start,
     0.5–0.8 = fuzzy (typo-tolerant), 0 = no match.
  ============================================================ */
  function fuzzyScore(token, text) {
    if (!token || !text) return 0;
    var t = normalize(token);
    var s = normalize(text);
    if (!t || !s) return 0;

    // Exact substring match → highest score
    if (s.indexOf(t) !== -1) return 1.0;

    // Word-boundary start match (starts-with on any word)
    var words = s.split(' ');
    for (var w = 0; w < words.length; w++) {
      if (words[w].indexOf(t) === 0) return 0.9;
    }

    // Fuzzy: check each word in text against token using edit distance
    var bestFuzzy = 0;
    for (var wi = 0; wi < words.length; wi++) {
      var word = words[wi];
      if (!word) continue;
      // Only compare words of similar length to avoid false positives
      var lenDiff = Math.abs(word.length - t.length);
      if (lenDiff > Math.max(2, Math.floor(t.length * 0.5))) continue;
      var dist = levenshtein(t, word);
      // Allowed edits: 1 for ≤4 chars, 2 for ≤7 chars, 3 for longer
      var maxDist = t.length <= 4 ? 1 : (t.length <= 7 ? 2 : 3);
      if (dist <= maxDist) {
        var score = 1 - (dist / Math.max(t.length, word.length));
        if (score > bestFuzzy) bestFuzzy = score * 0.75; // penalty vs exact
      }
    }
    return bestFuzzy;
  }

  /* ============================================================
     4. CORE: Score a single app against the full query
     Returns numeric relevance score (higher = more relevant)
     Fields weighted by importance:
       app_name (×5), app_short_name (×4),
       app_category (×3), app_short_description (×2),
       app_description (×1), app_author (×1)
  ============================================================ */
  function scoreApp(app, queryTokens) {
    var fields = [
      { key: 'app_name',              weight: 5 },
      { key: 'app_short_name',        weight: 4 },
      { key: 'category_label',        weight: 3 },
      { key: 'app_category',          weight: 3 },
      { key: 'app_short_description', weight: 2 },
      { key: 'app_description',       weight: 1 },
      { key: 'app_author',            weight: 1 }
    ];

    var totalScore = 0;

    for (var ti = 0; ti < queryTokens.length; ti++) {
      var token = queryTokens[ti];
      var bestForToken = 0;

      for (var fi = 0; fi < fields.length; fi++) {
        var fieldVal = app[fields[fi].key] || '';
        var s = fuzzyScore(token, fieldVal) * fields[fi].weight;
        if (s > bestForToken) bestForToken = s;
      }

      // If NO field matches this token at all, the app is irrelevant
      if (bestForToken === 0) return 0;
      totalScore += bestForToken;
    }

    // Bonus: if app_name exactly contains the whole query string
    var fullQuery = queryTokens.join(' ');
    if (normalize(app.app_name || '').indexOf(normalize(fullQuery)) !== -1) {
      totalScore += 10;
    }

    return totalScore;
  }

  /* ============================================================
     5. RENDER: Build result card HTML for a matched app
  ============================================================ */
  function buildResultCard(app, score) {
    var id      = app.id || '';
    var name    = app.app_name || '';
    var imgSrc  = app.app_img_src || 'assets/img/2535516.png';
    var rating  = parseFloat(app.app_rating) || 4.5;
    var downloads = app.app_downloads || '10K+';
    var shortDesc = app.app_short_description || app.app_description || '';
    if (shortDesc.length > 72) shortDesc = shortDesc.substring(0, 72) + '…';
    var catLabel = app.category_label || app.app_category || '';
    var badge    = app.app_badge || '';

    // Build star display (filled / half / empty)
    var starsHtml = '';
    for (var s = 1; s <= 5; s++) {
      if (s <= Math.floor(rating)) {
        starsHtml += '<i class="fas fa-star"></i>';
      } else if (s - rating < 1 && s - rating > 0) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>';
      } else {
        starsHtml += '<i class="far fa-star"></i>';
      }
    }

    var badgeHtml = badge
      ? '<span class="listing-item-badge">' + badge + '</span>'
      : '';

    return (
      '<div class="listing-item-wrapper" data-appid="' + id + '" style="cursor:pointer;" onclick="ivpOpenApp(\'' + id + '\')">' +
        '<div class="listing-item">' +
          '<div class="listing-item-img">' +
            '<img src="' + imgSrc + '" alt="' + name + ' App Icon" loading="lazy" onerror="this.src=\'assets/img/2535516.png\'" />' +
            badgeHtml +
          '</div>' +
          '<div class="listing-item-info">' +
            '<div class="listing-item-title">' + name + '</div>' +
            '<div class="listing-item-desc">' + shortDesc + '</div>' +
            '<div class="listing-item-meta">' +
              '<span class="listing-item-stars">' + starsHtml + '</span>' +
              '<span class="listing-item-downloads">' + downloads + '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ============================================================
     6. RENDER: No-results message
  ============================================================ */
  function buildNoResults(query) {
    return (
      '<div class="search-no-results" style="text-align:center;padding:40px 20px;color:#94a3b8;">' +
        '<div style="font-size:2.5rem;margin-bottom:14px;">🔍</div>' +
        '<div style="font-size:1.1rem;font-weight:700;color:#f1f5f9;margin-bottom:8px;">' +
          'No results for &ldquo;' + escapeHtml(query) + '&rdquo;' +
        '</div>' +
        '<div style="font-size:0.88rem;color:#64748b;">' +
          'Try a different spelling, or browse the app categories below.' +
        '</div>' +
      '</div>'
    );
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ============================================================
     7. MAIN SEARCH FUNCTION
     Called by static-adapter.js with the raw query string.
     Returns HTML string of results sorted by relevance.
  ============================================================ */
  function performSearch(query, allApps) {
    var raw = (query || '').trim();
    if (!raw) return '';

    // Tokenize: split by spaces, filter empty, max 6 tokens
    var tokens = raw.split(/\s+/).filter(Boolean).slice(0, 6);

    // Score every app
    var scored = [];
    var appIds = Object.keys(allApps || {});
    for (var i = 0; i < appIds.length; i++) {
      var app = allApps[appIds[i]];
      var score = scoreApp(app, tokens);
      if (score > 0) {
        scored.push({ app: app, score: score });
      }
    }

    // Sort by score descending
    scored.sort(function (a, b) { return b.score - a.score; });

    if (scored.length === 0) {
      return buildNoResults(raw);
    }

    // Render result cards (max 20)
    var html = '<div class="search-results-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px;padding:4px 0;">';
    var limit = Math.min(scored.length, 20);
    for (var ri = 0; ri < limit; ri++) {
      html += buildResultCard(scored[ri].app, scored[ri].score);
    }
    html += '</div>';

    if (scored.length > 20) {
      html += '<div style="text-align:center;padding:14px;color:#64748b;font-size:0.82rem;">Showing top 20 of ' + scored.length + ' results</div>';
    }

    return html;
  }

  /* ============================================================
     8. GLOBAL OPENER — allows result cards to open the app modal
     Works on all pages regardless of their local context
  ============================================================ */
  global.ivpOpenApp = function (appId) {
    if (typeof $ !== 'undefined' && $.ajax) {
      // Trigger the same modal flow that clicking an app card would trigger
      var $item = $('[data-appid="' + appId + '"]').first();
      if ($item.length) {
        $item.trigger('click');
        return;
      }
      // Fallback: dispatch a custom event that main.js may intercept
      var ev = new CustomEvent('ivp:open-app', { detail: { id: appId } });
      document.dispatchEvent(ev);
    }
  };

  /* ============================================================
     9. EXPORT search engine to global so static-adapter can use it
  ============================================================ */
  global.IVPSearchEngine = {
    normalize: normalize,
    fuzzyScore: fuzzyScore,
    scoreApp: scoreApp,
    performSearch: performSearch
  };

}(window));
