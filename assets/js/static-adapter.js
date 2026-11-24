(function($) {
  'use strict';
  if (!$) return;

  let allApps = null;
  let gcGamesHtml = null;
  let gcAppsHtml = null;
  let liveOffers = null;

  fetch('includes/all_apps.json')
    .then(r => r.json())
    .then(data => { allApps = data; })
    .catch(e => console.warn('Could not load all_apps.json:', e));

  fetch('includes/gc_games.html')
    .then(r => r.text())
    .then(data => { gcGamesHtml = data; })
    .catch(e => console.warn('Could not load gc_games.html:', e));

  fetch('includes/gc_apps.html')
    .then(r => r.text())
    .then(data => { gcAppsHtml = data; })
    .catch(e => console.warn('Could not load gc_apps.html:', e));

  fetch('includes/offers.json')
    .then(r => r.json())
    .then(data => {
      liveOffers = data;
      renderLiveOffers();
    })
    .catch(e => console.warn('Could not load offers.json:', e));

  function renderLiveOffers() {
    const listEl = document.getElementById('hv-offers-list');
    if (!listEl || !liveOffers || !liveOffers.length) return;

    listEl.innerHTML = liveOffers.map(function(offer) {
      const icon = offer.network_icon
        ? '<img src="' + offer.network_icon + '" alt="" loading="lazy" />'
        : '<i class="fas fa-gift"></i>';
      const anchor = offer.anchor || offer.conversion || 'Free completion';
      return (
        '<a href="' + offer.url + '" target="_blank" rel="noopener noreferrer" class="hv-offer-item">' +
          '<div class="hv-offer-icon">' + icon + '</div>' +
          '<div class="hv-offer-text">' +
            '<span class="hv-offer-name">' + offer.name + '</span>' +
            '<span class="hv-offer-desc">' + anchor + '</span>' +
          '</div>' +
          '<span class="hv-offer-btn">FREE</span>' +
        '</a>'
      );
    }).join('');
  }

  // Observe modal changes to render offers when step 3 appears
  const observer = new MutationObserver(function() {
    renderLiveOffers();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  const originalAjax = $.ajax;

  $.ajax = function(options) {
    const url = options.url || '';

    // 1. Get Category listing: includes/gc.php
    if (url.indexOf('includes/gc.php') !== -1) {
      const cat = (options.data && options.data.category) || 'games';
      setTimeout(function() {
        let content = '';
        if (cat === 'games') {
          content = gcGamesHtml || '';
        } else if (cat === 'apps') {
          content = gcAppsHtml || '';
        }
        if (typeof options.success === 'function') {
          options.success(content);
        }
        if (typeof options.complete === 'function') {
          options.complete();
        }
      }, 100);
      return;
    }

    // 2. App detail / generator modal: includes/ad.php
    if (url.indexOf('includes/ad.php') !== -1) {
      const id = (options.data && options.data.id) ? String(options.data.id) : '';
      setTimeout(function() {
        if (allApps && allApps[id]) {
          if (typeof options.success === 'function') {
            options.success(allApps[id]);
          }
          if (typeof options.complete === 'function') {
            options.complete();
          }
        } else {
          fetch('includes/app_details/' + id + '.json')
            .then(function(r) { return r.json(); })
            .then(function(res) {
              if (typeof options.success === 'function') options.success(res);
              if (typeof options.complete === 'function') options.complete();
            })
            .catch(function(err) {
              if (typeof options.error === 'function') options.error(err);
              if (typeof options.complete === 'function') options.complete();
            });
        }
      }, 100);
      return;
    }

    // 3. Search: includes/s.php — powered by IVPSearchEngine (fuzzy, international, ranked)
    if (url.indexOf('includes/s.php') !== -1) {
      const query = ((options.data && options.data.query) || '').trim();
      setTimeout(function() {
        let matchesHtml = '';
        if (query) {
          if (window.IVPSearchEngine && allApps) {
            // Use the professional search engine: fuzzy + ranked + international
            matchesHtml = window.IVPSearchEngine.performSearch(query, allApps);
          } else {
            // Fallback: simple substring search if engine not yet loaded
            const temp = document.createElement('div');
            temp.innerHTML = (gcGamesHtml || '') + (gcAppsHtml || '');
            const items = temp.querySelectorAll('.listing-item-wrapper');
            const q = query.toLowerCase();
            const seenIds = new Set();
            for (let i = 0; i < items.length; i++) {
              const item = items[i];
              const titleEl = item.querySelector('.listing-item-title');
              const appidEl = item.querySelector('[data-appid]');
              const appid = appidEl ? appidEl.getAttribute('data-appid') : '';
              if (seenIds.has(appid)) continue;
              const title = (titleEl ? titleEl.textContent : '').toLowerCase();
              const appData = (allApps && allApps[appid]) ? allApps[appid] : {};
              const desc = (appData.app_description || '').toLowerCase();
              if (title.indexOf(q) !== -1 || desc.indexOf(q) !== -1) {
                seenIds.add(appid);
                matchesHtml += item.outerHTML;
              }
            }
          }
        }
        if (typeof options.success === 'function') {
          options.success(matchesHtml);
        }
        if (typeof options.complete === 'function') {
          options.complete();
        }
      }, 100);
      return;
    }

    return originalAjax.apply(this, arguments);
  };
})(window.jQuery);
