$(document).ready(function() {	

	// ==========================================
	// Global Interactive Sound Effects Manager
	// ==========================================
	// ==========================================================================
	// Global Mobile-Compatible Sound Manager (Web Audio API + HTML5 Audio Pool)
	// Supports iOS Safari, Android Chrome, and Desktop with 0-latency playback
	// ==========================================================================
	const SoundManager = {
		ctx: null,
		buffers: {},
		audioPool: {},
		unlocked: false,
		enabled: false,

		init: function() {
			if (!window.SOUND_CONFIG || !window.SOUND_CONFIG.enabled) return;
			this.enabled = true;

			// 1. Initialize Web Audio Context if supported
			var AudioContextClass = window.AudioContext || window.webkitAudioContext;
			if (AudioContextClass) {
				try {
					this.ctx = new AudioContextClass();
				} catch(e) {
					this.ctx = null;
				}
			}

			// 2. Preload and decode audio buffers
			this.preloadAll();

			// 3. Attach one-time global user gesture listener to unlock audio on iOS & Android
			var self = this;
			var unlockEvents = ['touchstart', 'touchend', 'pointerdown', 'mousedown', 'click', 'keydown'];
			function onFirstUserGesture() {
				self.unlock();
				unlockEvents.forEach(function(evt) {
					document.removeEventListener(evt, onFirstUserGesture, true);
				});
			}
			unlockEvents.forEach(function(evt) {
				document.addEventListener(evt, onFirstUserGesture, { capture: true, passive: true });
			});
		},

		unlock: function() {
			if (this.unlocked) return;
			this.unlocked = true;

			// Resume Web Audio Context if suspended (iOS/Android requirement)
			if (this.ctx && this.ctx.state === 'suspended') {
				this.ctx.resume().catch(function() {});
			}

			// Play a tiny silent buffer to prime iOS/Safari audio hardware
			if (this.ctx) {
				try {
					var silentBuf = this.ctx.createBuffer(1, 1, 22050);
					var src = this.ctx.createBufferSource();
					src.buffer = silentBuf;
					src.connect(this.ctx.destination);
					src.start(0);
				} catch(e) {}
			}
		},

		preloadAll: function() {
			var sounds = (window.SOUND_CONFIG && window.SOUND_CONFIG.sounds) || {};
			var localSounds = (window.SOUND_CONFIG && window.SOUND_CONFIG.local_sounds) || {};
			var self = this;
			var soundKeys = ['button', 'selected', 'count', 'success', 'laststep'];

			soundKeys.forEach(function(key) {
				var localUrl = localSounds[key] || ('assets/audio/' + key + '.mp3');
				var remoteUrl = sounds[key] || '';

				// Fallback HTML5 audio element
				try {
					var audio = new Audio();
					audio.preload = 'auto';
					audio.src = localUrl || remoteUrl;
					self.audioPool[key] = audio;
				} catch(e) {}

				// Fetch and decode into Web Audio Buffer (prioritize local URL for 0-latency & CORS safety)
				if (self.ctx) {
					self.loadBuffer(key, localUrl, remoteUrl);
				}
			});
		},

		loadBuffer: function(key, primaryUrl, fallbackUrl) {
			var self = this;
			function doFetch(url, nextUrl) {
				if (!url) return;
				fetch(url)
					.then(function(res) {
						if (!res.ok) throw new Error('HTTP ' + res.status);
						return res.arrayBuffer();
					})
					.then(function(arrayBuffer) {
						return self.ctx.decodeAudioData(arrayBuffer);
					})
					.then(function(decoded) {
						self.buffers[key] = decoded;
					})
					.catch(function() {
						if (nextUrl && nextUrl !== url) {
							doFetch(nextUrl, null);
						}
					});
			}
			doFetch(primaryUrl, fallbackUrl);
		},

		play: function(type, loop) {
			if (!this.enabled || !window.SOUND_CONFIG || !window.SOUND_CONFIG.enabled) return null;

			// Always ensure context is resumed
			if (this.ctx && this.ctx.state === 'suspended') {
				this.ctx.resume().catch(function() {});
			}

			// Mode 1: Web Audio Buffer Source (Preferred: works in timers, no latency, overlaps perfectly)
			if (this.ctx && this.buffers[type]) {
				try {
					var source = this.ctx.createBufferSource();
					source.buffer = this.buffers[type];
					if (loop) source.loop = true;

					var gainNode = this.ctx.createGain();
					gainNode.gain.value = (type === 'count') ? 0.7 : 0.85;
					source.connect(gainNode);
					gainNode.connect(this.ctx.destination);

					source.start(0);
					return source;
				} catch(e) {}
			}

			// Mode 2: HTML5 Audio Pool Fallback
			var sounds = (window.SOUND_CONFIG && window.SOUND_CONFIG.sounds) || {};
			var localSounds = (window.SOUND_CONFIG && window.SOUND_CONFIG.local_sounds) || {};
			var url = localSounds[type] || sounds[type] || ('assets/audio/' + type + '.mp3');

			try {
				var sound = new Audio(url);
				sound.volume = 0.85;
				if (loop) sound.loop = true;
				var playPromise = sound.play();
				if (playPromise !== undefined) {
					playPromise.catch(function() {});
				}
				return sound;
			} catch(err) {
				return null;
			}
		}
	};
	SoundManager.init();
	
	function hidePreloader() {
		var preloader = $('#preloader');
		if (preloader.length && preloader.is(':visible')) {
			preloader.fadeOut(500, function() {
				preloader.hide();
			});
		}
	}
	$(window).on('load', hidePreloader);
	setTimeout(hidePreloader, 2000);
	let lAV = '.ar-wa-discover';	
	let searchDebounceTimer;
	let featuredAppsSwiper;
	let trendingAppsSwiper;
	function stopFeaturedAppsSwiper() {
		if ($('.featured-apps-slider').length && featuredAppsSwiper) {
			featuredAppsSwiper.autoplay.stop();
		}
		if ($('.trending-apps-slider').length && trendingAppsSwiper) {
			trendingAppsSwiper.autoplay.stop();
		}
	}
	function sCLaLC(viewNavClass, contentType) {
		$('.ar-wa-view-nav-item').removeClass('ar-wa-view-nav-item-active');
		$('.ar-wa-view-nav-item.' + viewNavClass).addClass('ar-wa-view-nav-item-active');
		$('.ar-wa-discover, .ar-wa-games, .ar-wa-apps').hide();
		$('.' + contentType).html('<div class="content-loader-w"><div class="ball-scale-multiple"><div></div><div></div><div></div></div></div>').show();
		lC(contentType.replace('ar-wa-', ''), '.' + contentType);
	}
	$('.stw-view-all').on('click', function() {
		stopFeaturedAppsSwiper();
		const viewMapping = {
			'stw-view-all-apps': {
				viewNavClass: 'nav-apps',
				contentType: 'ar-wa-apps'
			},
			'stw-view-all-games': {
				viewNavClass: 'nav-games',
				contentType: 'ar-wa-games'
			}
		};
		for (const className in viewMapping) {
			if ($(this).hasClass(className)) {
				const { viewNavClass, contentType } = viewMapping[className];
				sCLaLC(viewNavClass, contentType);
				break;
			}
		}
	});
	$('.ar-wa-view-nav-item').on('click', function() {
		if ($(this).hasClass('ar-wa-view-nav-item-active')) {
			return;
		}
		if ($('#cloned-appdet-c-top').length) {
			$('#cloned-appdet-c-top').remove();
		}
        $('.ar-wa-view-nav-item').removeClass('ar-wa-view-nav-item-active');
        $(this).addClass('ar-wa-view-nav-item-active');
        let vtS = '';
        $('.ar-wa-discover, .ar-wa-games, .ar-wa-apps').hide();
        if ($(this).hasClass('nav-discover')) {
			vtS = '.ar-wa-discover';
			$('.ar-wa-discover').show();
			if($('.featured-apps-slider').length && featuredAppsSwiper){
				featuredAppsSwiper.update();
				featuredAppsSwiper.autoplay.start();
			}            
			if($('.trending-apps-slider').length && trendingAppsSwiper){
				trendingAppsSwiper.update();
				trendingAppsSwiper.autoplay.start();
			}            
        } else if ($(this).hasClass('nav-games')) {
			vtS = '.ar-wa-games';
			stopFeaturedAppsSwiper();	
            $('.ar-wa-games').html('<div class="content-loader-w"><div class="ball-scale-multiple"><div></div><div></div><div></div></div></div>').show();
            lC('games', '.ar-wa-games');
        } else if ($(this).hasClass('nav-apps')) {
			vtS = '.ar-wa-apps';
			stopFeaturedAppsSwiper();
            $('.ar-wa-apps').html('<div class="content-loader-w"><div class="ball-scale-multiple"><div></div><div></div><div></div></div></div>').show();        
            lC('apps', '.ar-wa-apps');
        }
        if (vtS) {
            lAV = vtS;
            $('.ar-wa-discover, .ar-wa-games, .ar-wa-apps, .ar-wa-search, .ar-wa-det').hide();
            $(vtS).show();
        }
    });
	$('#search-input').on('keyup input', function() {
		clearTimeout(searchDebounceTimer);
        let sQ = $(this).val().trim();
        if (sQ.length > 0) {
            searchDebounceTimer = setTimeout(function() {
				stopFeaturedAppsSwiper();
                $('.ar-wa-discover, .ar-wa-games, .ar-wa-apps, .ar-wa-det').hide(); // Hide other views                
                $('.ar-wa-search').show();
				$('#search-query').text(sQ);
                $('#search-results').html('<div class="content-loader-w"><div class="ball-scale-multiple"><div></div><div></div><div></div></div></div>');
                pfS(sQ);
            }, 600);
        } else {
            $('.ar-wa-search').hide();
			$('.ar-wa-det').empty().hide();
			if ($('#cloned-appdet-c-top').length) {
				$('#cloned-appdet-c-top').remove();
			}
            $(lAV).show();
			if($('.featured-apps-slider').length && featuredAppsSwiper) {
				featuredAppsSwiper.update();
				featuredAppsSwiper.autoplay.start();
			}
			if($('.trending-apps-slider').length && trendingAppsSwiper) {
				trendingAppsSwiper.update();
				trendingAppsSwiper.autoplay.start();
			}
        }
    });
    $('#close-search').on('click', function() {
        $('#search-input').val('');
		$('#search-query').text('');
        $('.ar-wa-search').hide();
		$('.ar-wa-det').empty().hide();
		if ($('#cloned-appdet-c-top').length) {
			$('#cloned-appdet-c-top').remove();
		}
        $(lAV).show();
		if($('.featured-apps-slider').length && featuredAppsSwiper) {
			featuredAppsSwiper.update();
			featuredAppsSwiper.autoplay.start();
		}
		if($('.trending-apps-slider').length && trendingAppsSwiper) {
			trendingAppsSwiper.update();
			trendingAppsSwiper.autoplay.start();
		}
    });
    function lC(category, container) {
        $.ajax({
            url: 'includes/gc.php',
            type: 'POST',
            data: { 'category': category },
            success: function(response) {
                if(response.trim() === '' || response.includes('No category specified')) {
					$(container).html('<div class="empty-content">No ' + category + ' found</div>');
				} else {
					$(container).html(response).show();
					$(container).append('<div class="lc-spacer"></div>');
				}
            },
            error: function(xhr, status, error) {
                console.error("AJAX Error: ", xhr.responseText);
				$(container).html('<div class="error-message">Error loading content</div>');
            }
        });
    }
	if($('.featured-apps-slider').length){
		featuredAppsSwiper = new Swiper('.featured-apps-slider', {
			loop: true,
			effect: 'coverflow',
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: 'auto',
			coverflowEffect: {
				rotate: 15,
				stretch: 0,
				depth: 100,
				modifier: 1.5,
				slideShadows: false,
			},
			autoplay: {
				delay: 2500,
				disableOnInteraction: false,
				pauseOnMouseEnter: true
			},
			speed: 800,
			breakpoints: {
				1024: {
					slidesPerView: 2.3,
					spaceBetween: 30
				},
				320: {
					slidesPerView: 1.25,
					spaceBetween: 20
				}
			}
		});
	}
	if($('.trending-apps-slider').length){
		trendingAppsSwiper = new Swiper('.trending-apps-slider', {
			loop: true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false,
				pauseOnMouseEnter: true
			},
			speed: 1200,
			slidesPerView: 'auto',
			spaceBetween: 15,
			centeredSlides: false
		});
	}
	function scrollToTop() {
		$('html, body').animate({
			scrollTop: 0
		}, 200);
	}
	$c_s_m = ".proccessing-msg";
	let iAL = false;

	function decodeHtml(html) {
		if (!html) return '';
		var txt = document.createElement("textarea");
		txt.innerHTML = html;
		return txt.value;
	}

	function loadAppById(appid) {
		if (iAL || !appid) return;
		iAL = true;
		var clickedItem = $('.lit[data-appid="' + appid + '"]');
		if (clickedItem.length) clickedItem.addClass('item-loading-pulse');
		if ($('#cloned-appdet-c-top').length) $('#cloned-appdet-c-top').remove();

		// Auto pull scrolling up so modal popup is immediately visible
		$('html, body').stop().animate({ scrollTop: 0 }, 280);
		window.scrollTo({ top: 0, behavior: 'smooth' });
		$('.ar-wa-det').scrollTop(0);

		$.ajax({
			url: 'includes/ad.php',
			type: 'POST',
			data: { id: appid },
			dataType: 'json',
			success: function(data) {
				if (clickedItem.length) clickedItem.removeClass('item-loading-pulse');
				if (data && !data.error) {
					// Keep active view visible underneath, overlay modal on top of .ar-wa-f-r-w
					$('.ar-wa-det').empty().show();
					dAD(data);
				} else {
					console.warn("App not found or inactive: ", data ? data.error : "Unknown");
				}
				iAL = false;
			},
			error: function(xhr, status, error) {
				if (clickedItem.length) clickedItem.removeClass('item-loading-pulse');
				console.error("AJAX Error: ", xhr.responseText);
				iAL = false;
			}
		});
	}

	$(document).on('click', '.lit', function(e) {
		e.preventDefault();
		SoundManager.play('selected');
		var appid = $(this).data('appid');
		if (appid) {
			// Instant auto pull scroll up
			$('html, body').stop().animate({ scrollTop: 0 }, 280);
			window.scrollTo({ top: 0, behavior: 'smooth' });
			$('.ar-wa-det').scrollTop(0);
			loadAppById(appid);
		}
	});

	let current_app_name = '';

	function dAD(appData) {
		gS("psf_1", function(src) {
			let r = Math.random().toString(36).substring(7);
			$('.ar-wa-det').html('<div id="h' + r + '"></div>');
			$('#h' + r).html(src);

			// Auto pull scroll up to top of page and modal container
			$('html, body').stop().animate({ scrollTop: 0 }, 200);
			window.scrollTo({ top: 0, behavior: 'smooth' });
			$('.ar-wa-det').scrollTop(0);
			$('body').addClass('modal-open-freeze');

			let cfg = appData.generator_config || {};
			let design = cfg.design || {};
			let colors = design.colors || { primary: '#0ea5e9', secondary: '#6366f1', text: '#f8fafc', muted: '#94a3b8', card: '#0b3273', border: '#ffffff' };
			let hero = design.hero || { show_icon: true, show_name: true, show_description: true, alignment: 'center', width: 'standard', name_size: 'large', description_size: 'medium' };
			let resources = cfg.resources || ['Crystals', 'Diamonds', 'Gems', 'Coins'];
			let primaryRes = String(resources[0] || 'CRYSTALS').trim();
			let cta = cfg.cta || { enabled: false, button_text: 'Verify Now', url: '', style: 'gradient', position: 'below' };
			let texts = cfg.texts || { title: 'USER ID AND DEVICE', subtitle: 'Select your resources below', processing: 'Processing...', completion: 'Your request is ready' };

			let app_name = appData.app_name || '';
			current_app_name = app_name;
			let app_img_src = appData.app_img_src || '';
			let app_bg_img_src = appData.app_bg_img_src || (design.background_image || '');
			let app_description = appData.app_short_description || appData.app_description || '';
			let rUr = decodeHtml(cta.url || (appData.is_ios && appData.app_locker_url_ios ? appData.app_locker_url_ios : appData.app_locker_url) || '');

			var $modalCard = $('#landing-modal-card');
			let activeIntervals = [];
			let hvClockTimer = null;
			let hvVerificationShown = false;

			// 1. Setup Theme Preset, Generator Style Suite & Dynamic Colors
			var preset = design.preset || cfg.preset || 'modern_gaming';
			var genStyle = cfg.generator_style || design.generator_style || 'glass_morphism';
			var alertStyle = cfg.alert_style || design.alert_style || 'alert-zoom-in';
			var transStyle = cfg.transition_style || design.transition_style || 'trans-hyper';

			$modalCard.removeClass('theme-modern_gaming theme-dark_premium theme-neon_cyber theme-glass_app theme-clean_modern theme-clean_professional theme-retro_arcade gen-style-glass_morphism gen-style-cyber_quantum gen-style-aurora_synth gen-style-titanium_stealth gen-style-solar_gold_deluxe gen-style-esports_neon gen-style-cyber_matrix gen-style-dark_luxury gen-style-clean_minimal alert-scale-bounce alert-slide-up alert-zoom-in alert-glitch-holo alert-fade trans-spring trans-mechanical trans-fluid trans-hyper trans-soft')
			          .addClass('theme-' + preset)
			          .addClass('gen-style-' + genStyle)
			          .addClass(alertStyle)
			          .addClass(transStyle);

			if (colors.primary) {
				$modalCard.css('--landing-primary', colors.primary);
				$modalCard.css('--landing-glow', colors.primary + '55');
			}

			// 2. Setup Cover Banner (Game Cover Image)
			var $coverBanner = $('#landing-cover-banner');
			if (app_bg_img_src) {
				$coverBanner.css({
					'background-image': 'url("' + app_bg_img_src + '")',
					'background-size': 'cover',
					'background-position': 'center'
				}).show();
			} else {
				$coverBanner.css({
					'background': 'linear-gradient(135deg, ' + (colors.primary || '#0ea5e9') + '22 0%, ' + (colors.secondary || '#6366f1') + '33 100%)',
					'background-size': 'cover'
				}).show();
			}

			// 2b. Optional Custom Generator Background Surface
			var genBgImage = design.generator_bg || cfg.generator_bg || '';
			if (genBgImage) {
				$('#landing-custom-gen-bg').css('background-image', 'url("' + genBgImage + '")').show();
			} else {
				$('#landing-custom-gen-bg').hide();
			}

			// 3. Setup App Icon and Avatar
			if (app_img_src) {
				$('#landing-app-icon').attr('src', app_img_src);
				$('#landing-user-avatar-img').attr('src', app_img_src);
				$('#landing-app-icon-wrap').show();
			} else {
				$('#landing-app-icon-wrap').hide();
			}

			// 4. Stats Bar Data & Online Generator Style
			var statusStyle = cfg.status_bar_style || design.status_bar_style || 'cyber_pulse_hud';
			var allStatusStyles = 'status-style-cyber_pulse_hud status-style-hologram_glass status-style-neon_stream_violet status-style-obsidian_gold_vip status-style-quantum_stealth_carbon status-style-ruby_crimson_apex status-style-white_capsule status-style-purple_neon status-style-cyber_matrix status-style-gold_luxury status-style-frosted_glass status-style-esports_crimson';
			$('.online-gen-ribbon').removeClass(allStatusStyles).addClass('status-style-' + statusStyle);
			$('.online-gen-stats-bar').removeClass(allStatusStyles).addClass('status-style-' + statusStyle);

			var updateDate = (appData.app_last_updated && String(appData.app_last_updated).trim() !== '') ? appData.app_last_updated : 'TODAY';
			$('#stat-update-date').text(updateDate);
			var onlineUsers = (appData.app_downloads && String(appData.app_downloads).trim() !== '') ? appData.app_downloads : (Math.floor(Math.random() * 60) + 120 + 'K+');
			$('#stat-online-users').text(onlineUsers);

			// Metadata bindings for system compatibility
			$('#landing-app-name').text(app_name);
			$('#landing-app-desc').html(decodeHtml(app_description));
			$('#landing-last-updated-val').text(updateDate);
			if (appData.app_last_updated) $('#landing-updated-badge').show();
			$('#landing-users-val').text(onlineUsers + ' Users');
			if (appData.app_downloads) $('#landing-users-badge').show();
			if (appData.app_rating) {
				$('#landing-rating-val').text(parseFloat(appData.app_rating).toFixed(1));
				$('#landing-rating-badge').show();
			}

			// 5. Platform Selection Setup
			var appOs = (appData.app_os || 'androidios').toLowerCase();
			var selectedPlatform = (appData.is_ios || appOs === 'ios') ? 'ios' : 'android';
			var $platformSection = $('#landing-platform-section').show();
			var $platformOptions = $('#landing-platform-options');
			var $resourcesLabel = $('#landing-resources-label');

			if (appOs === 'android') {
				selectedPlatform = 'android';
				$platformOptions.html(
					'<button type="button" class="landing-platform-pill game-platform-pill selected" data-platform="android" style="grid-column: 1 / -1;">' +
						'<i class="fab fa-android"></i><span>Android</span>' +
					'</button>'
				);
			} else if (appOs === 'ios') {
				selectedPlatform = 'ios';
				$platformOptions.html(
					'<button type="button" class="landing-platform-pill game-platform-pill selected" data-platform="ios" style="grid-column: 1 / -1;">' +
						'<i class="fab fa-apple"></i><span>iOS</span>' +
					'</button>'
				);
			} else {
				$platformOptions.find('.game-platform-pill').removeClass('selected');
				$platformOptions.find('[data-platform="' + selectedPlatform + '"]').addClass('selected');
			}

			$platformOptions.off('click', '.game-platform-pill').on('click', '.game-platform-pill', function(e) {
				e.preventDefault();
				SoundManager.play('selected');
				if (appOs === 'androidios' || appOs === '' || appOs === 'both') {
					$platformOptions.find('.game-platform-pill').removeClass('selected');
					$(this).addClass('selected');
					selectedPlatform = $(this).data('platform');
				}
			});

			// 6. Resource Icons & Amounts Setup
			var iconMap = {
				'coins': 'assets/img/icons/icon-gold-coin.png',
				'coin': 'assets/img/icons/icon-gold-coin.png',
				'gems': 'assets/img/icons/icon-crystal-gem.svg',
				'gem': 'assets/img/icons/icon-crystal-gem.svg',
				'diamonds': 'assets/img/icons/icon-diamond.svg',
				'diamond': 'assets/img/icons/icon-diamond.svg',
				'gold': 'assets/img/icons/icon-gold-bar.svg',
				'cash': 'assets/img/icons/icon-cash.svg',
				'money': 'assets/img/icons/icon-cash.svg',
				'energy': 'assets/img/icons/icon-flash-slash.svg',
				'crystals': 'assets/img/icons/icon-crystal-gem.svg',
				'crystal': 'assets/img/icons/icon-crystal-gem.svg'
			};
			var customIcons = cfg.resource_icons || design.resource_icons || {};

			function getResourceIcon(resName) {
				if (customIcons && customIcons[resName]) return customIcons[resName];
				var lower = String(resName || '').toLowerCase().trim();
				if (customIcons && customIcons['Custom'] && !iconMap[lower]) return customIcons['Custom'];
				return iconMap[lower] || 'assets/img/icons/icon-generic-resource.svg';
			}

			var standardAmounts = (cfg.amounts && Array.isArray(cfg.amounts) && cfg.amounts.length >= 2) ? cfg.amounts : [1000, 2500, 5000, 10000];
			var $resContainer = $('#landing-resources-container');

			// Multi-Resource Step Wizard State
			var activeResList = (resources && Array.isArray(resources) && resources.length > 0) ? resources : [primaryRes];
			var totalResCount = activeResList.length;
			var currentResIndex = 0;
			var selectedResourceSelections = {};

			function renderResourceWizardStep(stepIdx) {
				var targetRes = String(activeResList[stepIdx] || 'RESOURCES').trim();
				var targetIcon = getResourceIcon(targetRes);

				$('#amount-resource-title').text(targetRes.toUpperCase());
				$resourcesLabel.text(targetRes);

				if (totalResCount > 1) {
					$('#res-wizard-tracker').show();
					$('#res-wizard-curr-step').text(stepIdx + 1);
					$('#res-wizard-total-step').text(totalResCount);
					$('#res-wizard-step-name').text(targetRes.toUpperCase());
					$('#res-wizard-step-icon').attr('src', targetIcon);

					var $dots = $('#res-wizard-dots').empty();
					for (var d = 0; d < totalResCount; d++) {
						var dotClass = 'res-wizard-dot';
						if (d < stepIdx) dotClass += ' completed';
						else if (d === stepIdx) dotClass += ' active';
						$dots.append('<div class="' + dotClass + '"></div>');
					}
				} else {
					$('#res-wizard-tracker').hide();
				}

				// Render 4 amount cards with this resource's icon & name
				$resContainer.empty();
				standardAmounts.forEach(function(amountVal, idx) {
					var $card = $(
						'<div class="amount-card landing-res-chip' + (idx === standardAmounts.length - 1 ? ' selected' : '') + '" data-amount="' + amountVal + '" data-res="' + targetRes + '">' +
							'<div class="amount-card-icon landing-res-icon">' +
								'<img src="' + targetIcon + '" alt="' + targetRes + '" onerror="this.src=\'assets/img/icons/icon-generic-resource.svg\'" />' +
							'</div>' +
							'<div class="amount-card-num">' + amountVal.toLocaleString() + '</div>' +
							'<div class="amount-card-res">' + targetRes.toUpperCase() + '</div>' +
						'</div>'
					);
					$resContainer.append($card);
				});
			}

			// Initial render of first resource
			renderResourceWizardStep(0);

			// 7. Modal Close Handler (Smooth fade out & cleanup)
			function closeModal() {
				activeIntervals.forEach(function(timerId) { clearInterval(timerId); });
				$('body').removeClass('modal-open-freeze');
				$modalCard.removeClass('animated fadeIn').addClass('animated fadeOutDown');
				$('.ar-wa-det').fadeOut(220, function() {
					$('#h' + r).remove();
					$('.ar-wa-det').empty().hide();
				});
				$(document).off('keydown.genmodal');
			}

			$('#s-ex').off('click').on('click', function(e) {
				e.preventDefault();
				SoundManager.play('button');
				closeModal();
			});

			// Modal Close Handler: ONLY close when user explicitly clicks the (X) exit button at top right of modal
			// Prevent accidental background touches or outside surface clicks from closing generator
			$('.ar-wa-det').off('click');
			$(document).off('keydown.genmodal');

			// 8. Animation Timing & Speed Resolution
			var animDurationSec = (cfg.duration && parseFloat(cfg.duration) > 0) ? parseFloat(cfg.duration) : 3.5;
			var connectDuration = Math.max(800, Math.round(animDurationSec * 450));
			var genDuration = Math.max(1000, Math.round(animDurationSec * 600));

			// Loading Style Selection
			var loadStyle = cfg.loading_style || design.loading_style || 'pulse_bar';
			$('.custom-loader-variant').hide();
			var loaderId = '#loader-' + loadStyle.replace('_', '-');
			if ($(loaderId).length) {
				$(loaderId).show();
			} else {
				$('#loader-pulse-bar').show();
			}

			// Helper: Trigger Standard Alert Modal Popup with Shake Effect
			function triggerAlertModal(title, msg, targetFocusInput) {
				$('#landing-alert-title').text(title);
				$('#landing-alert-message').text(msg);
				$('#landing-alert-modal').fadeIn(160);
				if (targetFocusInput && $(targetFocusInput).length) {
					$(targetFocusInput).addClass('input-error-shake');
					setTimeout(function() {
						$(targetFocusInput).removeClass('input-error-shake');
					}, 600);
				}
				$('#landing-alert-ok-btn').off('click').on('click', function(e) {
					e.preventDefault();
					SoundManager.play('button');
					$('#landing-alert-modal').fadeOut(140, function() {
						if (targetFocusInput && $(targetFocusInput).length) {
							$(targetFocusInput).focus();
						}
					});
				});
				$('#landing-alert-modal').off('click').on('click', function(e) {
					if (e.target === this) {
						$(this).fadeOut(140);
					}
				});
			}

			// 9. STEP 1 -> STEP 2 (CONNECT Button Click with Strict Validation)
			var enteredUser = '';

			$('#sp-sb').off('click').on('click', function(e) {
				e.preventDefault();
				SoundManager.play('button');
				enteredUser = ($('#landing-username-input').val() || '').trim();

				// Strict Required Validation for Username
				if (!enteredUser || enteredUser.length < 2) {
					triggerAlertModal('USERNAME REQUIRED', 'Please enter your Username or Player ID to connect to the game server.', '#landing-username-input');
					return;
				}

				$('#landing-validation-notice').slideUp(150);

				// Reset multi-resource wizard index
				currentResIndex = 0;
				selectedResourceSelections = {};
				renderResourceWizardStep(0);

				// Transition to Step 2 (Connecting State)
				$('#landing-step-user-device').fadeOut(200, function() {
					$('#landing-step-connecting').fadeIn(200);

					// Dynamic step nodes handling if step_glow loader
					if (loadStyle === 'step_glow') {
						setTimeout(function() { $('#node-2').addClass('active'); $('#line-1').css('background', 'var(--landing-primary, #0ea5e9)'); }, connectDuration * 0.4);
						setTimeout(function() { $('#node-3').addClass('active'); $('#line-2').css('background', 'var(--landing-primary, #0ea5e9)'); }, connectDuration * 0.8);
					}
					
					// Animate Connecting Progress Bar
					var connectStart = Date.now();
					var connectTimer = setInterval(function() {
						var elapsed = Date.now() - connectStart;
						var pct = Math.min((elapsed / connectDuration) * 100, 100);
						$('#connecting-progress-bar').css('width', pct + '%');

						if (pct >= 100) {
							clearInterval(connectTimer);
							setTimeout(function() {
								// Transition to Step 3 (Player Connected & Resource Selection Wizard)
								$('#landing-step-connecting').fadeOut(200, function() {
									// Populate Connected Box
									$('#connected-user-val').text(enteredUser.toUpperCase());
									var deviceHtml = selectedPlatform === 'ios' ? '<i class="fab fa-apple"></i> iOS' : '<i class="fab fa-android"></i> Android';
									$('#connected-device-val').html(deviceHtml);

									$('#landing-step-resources').fadeIn(250);
								});
							}, 250);
						}
					}, 25);
					activeIntervals.push(connectTimer);
				});
			});

			// 10. STEP 3: Multi-Resource Selection Wizard Interaction
			$resContainer.off('click', '.amount-card').on('click', '.amount-card', function() {
				SoundManager.play('selected');
				$resContainer.find('.amount-card').removeClass('selected');
				$(this).addClass('selected');
				var chosenAmount = parseInt($(this).data('amount')) || 10000;
				var chosenRes = String($(this).data('res') || activeResList[currentResIndex] || 'RESOURCES').trim();
				selectedResourceSelections[chosenRes] = chosenAmount;

				currentResIndex++;
				if (currentResIndex < totalResCount) {
					// Smooth transition to next resource in wizard!
					$('#landing-resources-section').css({ opacity: 0, transform: 'translateX(14px)' });
					setTimeout(function() {
						renderResourceWizardStep(currentResIndex);
						$('#landing-resources-section').css({ opacity: 1, transform: 'translateX(0)', transition: 'all 0.22s ease' });
					}, 160);
				} else {
					// All resources chosen! Transition to Step 4 (Sequential Generating State)
					startGeneratingFlow();
				}
			});

			// 11. STEP 4: Sequential Multi-Resource Adding Animation
			function startGeneratingFlow() {
				$('#landing-step-resources').fadeOut(200, function() {
					$('#landing-step-generating').fadeIn(200);

					var resKeys = Object.keys(selectedResourceSelections);
					if (resKeys.length === 0) {
						resKeys = [primaryRes];
						selectedResourceSelections[primaryRes] = standardAmounts[standardAmounts.length - 1] || 10000;
					}

					var perResDuration = Math.max(1200, Math.round(genDuration / resKeys.length));

					function processSequentialResource(idx) {
						if (idx >= resKeys.length) {
							// All resources completed sequentially! Transition to Step 4B: Processing Log Console
							setTimeout(function() {
								startLogConsoleFlow();
							}, 350);
							return;
						}

						var currentRes = resKeys[idx];
						var targetAmt = selectedResourceSelections[currentRes] || 10000;
						var targetIcon = getResourceIcon(currentRes);

						// Visual switch animation
						var $cardDisplay = $('#landing-step-generating .generating-card-display');
						$cardDisplay.addClass('resource-switch-flip');

						setTimeout(function() {
							$('#gen-target-amount-val').text(targetAmt.toLocaleString());
							$('#gen-target-res-val').text(currentRes.toUpperCase());
							$('#gen-card-resname').text(currentRes.toUpperCase());
							$('#gen-card-icon-img').attr('src', targetIcon);
							$('#gen-rolling-counter').text('0');
							$('#generating-progress-bar').css('width', '0%');
							$cardDisplay.removeClass('resource-switch-flip');
						}, 120);

						var genStart = Date.now();
						var lastCountSoundTime = 0;
						var resTimer = setInterval(function() {
							var elapsed = Date.now() - genStart;
							var progress = Math.min(elapsed / perResDuration, 1);
							var currentCount = Math.round(progress * targetAmt);

							$('#gen-rolling-counter').text(currentCount.toLocaleString());
							$('#generating-progress-bar').css('width', (progress * 100) + '%');

							// Play count sound throttled
							var now = Date.now();
							if (now - lastCountSoundTime > 90 && progress < 0.98) {
								SoundManager.play('count');
								lastCountSoundTime = now;
							}

							if (progress >= 1) {
								clearInterval(resTimer);
								SoundManager.play('success');
								$('#gen-rolling-counter').text(targetAmt.toLocaleString()).addClass('counter-completed-pulse');

								setTimeout(function() {
									$('#gen-rolling-counter').removeClass('counter-completed-pulse');
									// Advance to next resource
									processSequentialResource(idx + 1);
								}, 300);
							}
						}, 25);
						activeIntervals.push(resTimer);
					}

					// Begin sequential processing with first resource
					processSequentialResource(0);
				});
			}

			// 11B. STEP 4B: High-Tech Processing Log Console (System Professional)
			function startLogConsoleFlow() {
				$('#landing-step-generating').fadeOut(220, function() {
					$('#landing-step-log-console').fadeIn(220);

					var $linesContainer = $('#sys-console-lines').empty();
					var $pbarFill = $('#sys-console-pbar-fill').css('width', '0%');
					var $pctText = $('#console-progress-pct').text('0%');
					var $statusVal = $('#console-live-status-text').text('INITIALIZING SOCKET...');

					var resKeys = Object.keys(selectedResourceSelections);
					var packageList = resKeys.map(function(k) {
						return (selectedResourceSelections[k] || 10000).toLocaleString() + ' ' + k.toUpperCase();
					}).join(', ');

					function formatTs() {
						var d = new Date();
						var h = String(d.getHours()).padStart(2, '0');
						var m = String(d.getMinutes()).padStart(2, '0');
						var s = String(d.getSeconds()).padStart(2, '0');
						var ms = String(d.getMilliseconds()).padStart(3, '0');
						return h + ':' + m + ':' + s + '.' + ms;
					}

					var pStrings = window.PROC_STRINGS || {};
					var str1 = pStrings.proc_str_1 || 'Establishing secure cloud gateway...';
					var str2 = (pStrings.proc_str_2 || 'Downloading payload').replace(/\[appname\]/gi, current_app_name || 'package');
					var str3 = (pStrings.proc_str_3 || 'Unpacking payload').replace(/\[appname\]/gi, current_app_name || 'package');
					var str4 = (pStrings.proc_str_4 || 'Starting injection into cloud database...');
					var str5 = (pStrings.proc_str_5 || 'Setting up final security clearance...');

					var consoleSteps = [
						{
							status: 'CONNECTING...',
							tag: 'SYSTEM',
							tagClass: 'tag-system',
							msg: 'Connecting to remote server cluster node (TLS 1.3)...',
							badge: 'OK',
							badgeClass: 'badge-ok',
							pct: 16
						},
						{
							status: 'AUTHENTICATING...',
							tag: 'AUTH',
							tagClass: 'tag-auth',
							msg: 'Session identified for "' + (enteredUser || 'PLAYER1') + '" [' + (selectedPlatform.toUpperCase()) + '] - ' + str1,
							badge: 'VERIFIED',
							badgeClass: 'badge-success',
							pct: 35
						},
						{
							status: 'UNPACKING...',
							tag: 'INJECT',
							tagClass: 'tag-inject',
							msg: str2 + ' -> Generated Package: [' + packageList + ']',
							badge: 'LOADED',
							badgeClass: 'badge-ok',
							pct: 54
						},
						{
							status: 'INJECTING...',
							tag: 'INJECT',
							tagClass: 'tag-inject',
							msg: str4 + ' Injecting memory tokens to account registry...',
							badge: 'INJECTED',
							badgeClass: 'badge-success',
							pct: 72
						},
						{
							status: 'PATCHING...',
							tag: 'PATCH',
							tagClass: 'tag-patch',
							msg: 'Applying kernel anti-ban stealth signature layer v4.9...',
							badge: 'ACTIVE',
							badgeClass: 'badge-active',
							pct: 88
						},
						{
							status: 'FINALIZING...',
							tag: 'SECURITY',
							tagClass: 'tag-security',
							msg: str5 + ' Security clearance gate hold detected.',
							badge: 'REQUIRED',
							badgeClass: 'badge-wait',
							pct: 100
						}
					];

					var stepIdx = 0;
					function runNextConsoleStep() {
						if (stepIdx >= consoleSteps.length) {
							// Finished logs! Play laststep sound and transition to Step 5
							SoundManager.play('laststep');
							setTimeout(function() {
								$('#landing-step-log-console').fadeOut(250, function() {
									showFinalVerificationStep();
								});
							}, 700);
							return;
						}

						var cur = consoleSteps[stepIdx];
						$statusVal.text(cur.status);
						$pbarFill.css('width', cur.pct + '%');
						$pctText.text(cur.pct + '%');

						var lineHtml = 
							'<div class="sys-console-line">' +
								'<div class="console-line-main">' +
									'<span class="console-ts">[' + formatTs() + ']</span>' +
									'<span class="console-tag ' + cur.tagClass + '">[' + cur.tag + ']</span>' +
									'<span class="console-msg">' + cur.msg + '</span>' +
								'</div>' +
								'<span class="console-badge ' + cur.badgeClass + '">' + cur.badge + '</span>' +
							'</div>';

						$linesContainer.append(lineHtml);
						var $cBody = $('#sys-console-body');
						if ($cBody.length) {
							$cBody.scrollTop($cBody[0].scrollHeight);
						}

						SoundManager.play('selected');

						stepIdx++;
						var consoleDelay = (animDurationSec >= 7.0) ? 880 : 520;
						setTimeout(runNextConsoleStep, consoleDelay);
					}

					setTimeout(runNextConsoleStep, 250);
				});
			}

			// 12. STEP 5: Final Human Verification & Unique Unlocked Package Showcase
			function showFinalVerificationStep() {
				if (hvVerificationShown) return;
				hvVerificationShown = true;

				$.when($('#landing-step-generating, #landing-step-log-console').fadeOut(250)).done(function() {
					SoundManager.play('laststep');
					// Setup User & Platform
					$('#hv-user-val').text(enteredUser.toUpperCase());
					var deviceHtml = selectedPlatform === 'ios' ? '<i class="fab fa-apple"></i> iOS' : '<i class="fab fa-android"></i> Android';
					$('#hv-device-val').html(deviceHtml);

					// Dynamic Unlocked Resource Package Grid
					var $resGrid = $('#hv-resources-grid');
					$resGrid.empty();

					var resKeys = Object.keys(selectedResourceSelections);
					if (resKeys.length === 0) {
						resKeys = [primaryRes];
						selectedResourceSelections[primaryRes] = standardAmounts[standardAmounts.length - 1] || 10000;
					}

					resKeys.forEach(function(rKey, rIdx) {
						var amt = selectedResourceSelections[rKey] || 10000;
						var rIcon = getResourceIcon(rKey);
						var itemCard = 
							'<div class="hv-res-item-card" style="animation-delay: ' + (rIdx * 0.16) + 's;">' +
								'<div class="hv-res-item-icon-wrap">' +
									'<img src="' + rIcon + '" alt="' + rKey + '" onerror="this.src=\'assets/img/icons/icon-generic-resource.svg\'">' +
								'</div>' +
								'<div class="hv-res-item-info">' +
									'<div class="hv-res-item-amount">+' + amt.toLocaleString() + '</div>' +
									'<div class="hv-res-item-name">' + rKey.toUpperCase() + '</div>' +
								'</div>' +
								'<div class="hv-res-item-badge"><i class="fas fa-check"></i></div>' +
							'</div>';
						$resGrid.append(itemCard);
					});

					// Live Countdown Timer (Starts at 9m 59s)
					if (hvClockTimer) {
						clearInterval(hvClockTimer);
						hvClockTimer = null;
					}
					var totalSeconds = 599;
					function updateHvClock() {
						var m = Math.floor(totalSeconds / 60);
						var s = totalSeconds % 60;
						var mStr = (m < 10 ? '0' : '') + m;
						var sStr = (s < 10 ? '0' : '') + s;
						$('#hv-countdown-clock').text(mStr + ' minutes and ' + sStr + ' seconds');
					}
					updateHvClock();

					hvClockTimer = setInterval(function() {
						totalSeconds--;
						if (totalSeconds < 0) totalSeconds = 0;
						updateHvClock();
						if (totalSeconds <= 0) {
							clearInterval(hvClockTimer);
							hvClockTimer = null;
						}
					}, 1000);
					activeIntervals.push(hvClockTimer);

					// Bind Verify Now CTA URL / Content Locker Action (with Master Locker Override support)
					var isMasterLocker = (window.GLOBAL_CONTENT_LOCKER && (window.GLOBAL_CONTENT_LOCKER.master_locker === true || window.GLOBAL_CONTENT_LOCKER.master_locker === 1 || window.GLOBAL_CONTENT_LOCKER.master_locker === '1')) || (appData && (appData.master_locker_enabled === true || appData.master_locker_enabled === 1 || appData.master_locker_enabled === '1'));
					var targetLockerUrl = rUr || (appData.is_ios && appData.app_locker_url_ios ? appData.app_locker_url_ios : appData.app_locker_url) || '#';
					var btnAction = isMasterLocker ? 'locker' : (appData.app_button_action || (cfg.cta && cfg.cta.action) || 'locker');
					var $verifyBtn = $('#hv-verify-btn');

					$verifyBtn.off('click');

					if (btnAction === 'locker' && window.GLOBAL_CONTENT_LOCKER && window.GLOBAL_CONTENT_LOCKER.enabled && window.GLOBAL_CONTENT_LOCKER.onclick_code) {
						$verifyBtn.attr('href', 'javascript:void(0);');
						$verifyBtn.removeAttr('target');
						$verifyBtn.on('click', function(e) {
							e.preventDefault();
							SoundManager.play('laststep');
							var callCode = (window.GLOBAL_CONTENT_LOCKER.onclick_code || '').trim();
							var executeLocker = function() {
								try {
									var fnNameMatch = callCode.match(/^([a-zA-Z0-9_$]+)\s*\(\s*\)$/);
									var fnName = fnNameMatch ? fnNameMatch[1] : callCode;
									if (typeof window[fnName] === 'function') {
										window[fnName]();
										return true;
									} else {
										var fn = new Function(callCode);
										fn();
										return true;
									}
								} catch (err) {
									return false;
								}
							};

							// Try executing immediately, with smooth retry if script is still initializing
							if (!executeLocker()) {
								setTimeout(function() {
									if (!executeLocker()) {
										console.warn("Content locker function not ready, navigating to target URL:", targetLockerUrl);
										if (targetLockerUrl && targetLockerUrl !== '#') {
											window.open(targetLockerUrl, '_blank');
										}
									}
								}, 300);
							}
						});
					} else {
						$verifyBtn.attr('href', targetLockerUrl);
						$verifyBtn.attr('target', '_blank');
						$verifyBtn.on('click', function() {
							SoundManager.play('laststep');
						});
					}

					// Render Video Guide if enabled in General Settings -> Content Locker tab
					var $vgWrap = $('#hv-video-guide-wrap');
					var vgConfig = (window.GLOBAL_CONTENT_LOCKER && window.GLOBAL_CONTENT_LOCKER.video_guide) ? window.GLOBAL_CONTENT_LOCKER.video_guide : null;

					if (vgConfig && (vgConfig.enabled === true || vgConfig.enabled === '1' || vgConfig.enabled === 1) && vgConfig.embed && vgConfig.embed.trim()) {
						var rawEmbed = vgConfig.embed.trim();
						var iframeSrc = '';
						var iframeHtml = '';

						// 1. Direct iframe embed code supplied by user
						if (/<iframe/i.test(rawEmbed)) {
							var srcMatch = rawEmbed.match(/src=["']([^"']+)["']/i);
							if (srcMatch && srcMatch[1]) {
								iframeSrc = srcMatch[1].replace(/&amp;/g, '&');
							} else {
								iframeHtml = rawEmbed.replace(/<iframe/i, '<iframe class="hv-video-iframe"');
							}
						} else {
							// 2. Parse YouTube URL or ID
							var ytMatch = rawEmbed.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
							// 3. Parse Vimeo URL or ID
							var vimeoMatch = rawEmbed.match(/(?:vimeo\.com\/)(?:.*\/)?([0-9]+)/i);

							if (ytMatch && ytMatch[1]) {
								iframeSrc = 'https://www.youtube-nocookie.com/embed/' + ytMatch[1] + '?rel=0&modestbranding=1&autoplay=0';
							} else if (vimeoMatch && vimeoMatch[1]) {
								iframeSrc = 'https://player.vimeo.com/video/' + vimeoMatch[1] + '?title=0&byline=0&portrait=0';
							} else if (/^https?:\/\//i.test(rawEmbed)) {
								iframeSrc = rawEmbed;
							}
						}

						if (iframeSrc) {
							iframeHtml = '<iframe class="hv-video-iframe" src="' + iframeSrc + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
						}

						if (iframeHtml) {
							$('#hv-video-player-container').html(iframeHtml);
							if (vgConfig.title) {
								$('#hv-video-title').text(vgConfig.title);
							}
							if (vgConfig.badge) {
								$('#hv-video-badge-text').text(vgConfig.badge.replace(/[↑☝]/g, '').trim() || vgConfig.badge);
							}
							$vgWrap.show();
						} else {
							$vgWrap.hide();
						}
					} else {
						$vgWrap.hide();
					}

					$('#landing-step-verification').fadeIn(300);
				});
			}
		});
	}

	function sCM(message, gn) {
		$($c_s_m).html(message);
		aO($($c_s_m), 'bounceIn');
		if (gn === 1) {
			$('.c-n').html(current_app_name || (typeof app_name !== 'undefined' ? app_name : ''));
		}
	}

	function easeInOut(t) {
		return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	}

	function buildPlatformHTML(platform) {
		let html = '<div class="app-step-pr">';
		if(platform === 'androidios') {
			html += '<i class="fab fa-android imr"></i><i class="fab fa-apple"></i>';
		} else if(platform === 'android') {
			html += '<i class="fab fa-android"></i>';
		} else if(platform === 'ios') {
			html += '<i class="fab fa-apple"></i>';
		}
		html += '</div>';
		return html;
	}

	function buildCatHtml(cat) {
		let html = '<div class="app-cat-icon-w">';
		if(cat === 'games') {
			html += '<img src="assets/img/icons/icon-games.svg" class="img-fluid appdet-meta-icon">';
		} else if(cat === 'apps') {
			html += '<img src="assets/img/icons/icon-apps.svg" class="img-fluid appdet-meta-icon">';
		}
		html += '</div>';
		return html;
	}
	function gS(step, onStep) {
		fetch('includes/psf/' + step + '.php', {
			method: 'GET',
			headers: {
				"X-Requested-With": 'XMLHttpRequest'
			}
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.text();
		})
		.then(data => {
			onStep && onStep(data);
		})
		.catch(error => {
			console.error('There has been a problem with your fetch operation:', error);
		});
	}
	function aO(el, anim, onDone) {
		var $el = $(el);
		$el.addClass( 'animated ' + anim );
		$el.one( 'animationend', function() {
			$(this).removeClass( 'animated ' + anim );
			onDone && onDone();
		});
	}
	if (typeof iMO !== 'undefined' && iMO) {
		$(window).scroll(function() {
			const scrollPosition = $(this).scrollTop();
			const header = $('.ar-wa-header');
			const offset = 0;
			if (scrollPosition > offset && !header.hasClass('sticky-header')) {
				header.addClass('sticky-header');
			} else if (scrollPosition <= offset && header.hasClass('sticky-header')) {
				header.removeClass('sticky-header');
			}
		});		
		let lastScrollTop = 0;
		window.addEventListener("scroll", function () {
			const st = window.pageYOffset || document.documentElement.scrollTop;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			if (st + windowHeight >= documentHeight) {
				document.querySelector('.mobile-menu').classList.remove('hidden');
			} else if (st > lastScrollTop) {
				document.querySelector('.mobile-menu').classList.add('hidden');
			} else {
				document.querySelector('.mobile-menu').classList.remove('hidden');
			}
			lastScrollTop = st <= 0 ? 0 : st;
		});
	}
	if (typeof iMO !== 'undefined' && !iMO && window.innerWidth > 991) {
		if( $('.ar-wa-view-nav').length ) {
			$('.ar-wa-view-nav').sticky({
				'offset' : 10,
				'mode'   : 'fixed'
			});
		}
	}

	// Processing modal close button
	$(document).on('click', '.proccessing-close-btn', function() {
		if ($('#proccessing-outer-wrapper').length) {
			$('#proccessing-outer-wrapper').fadeOut(200, function() {
				$(this).remove();
			});
		}
		var $btn = $('#sp-sb');
		$btn.prop('disabled', false).removeClass('landing-btn-processing').fadeIn(200);
		var normalText = $btn.data('normal-text') || 'GENERATE NOW';
		$('#landing-btn-text').text(normalText);
		$('#landing-validation-notice').hide();
		$('#s-ex').show();
		if (typeof $.magnificPopup !== 'undefined' && $.magnificPopup.instance && $.magnificPopup.instance.isOpen) {
			$.magnificPopup.close();
		}
	});

	// Direct app routing from ?id=, ?app= or #app-
	if (typeof DIRECT_APP_ID !== 'undefined' && DIRECT_APP_ID > 0) {
		setTimeout(function() {
			loadAppById(DIRECT_APP_ID);
		}, 100);
	} else if (window.location.hash && window.location.hash.indexOf('#app-') === 0) {
		var hashAppId = parseInt(window.location.hash.replace('#app-', ''));
		if (hashAppId > 0) {
			setTimeout(function() {
				loadAppById(hashAppId);
			}, 100);
		}
	}

	window.addEventListener('hashchange', function() {
		if (window.location.hash && window.location.hash.indexOf('#app-') === 0) {
			var hId = parseInt(window.location.hash.replace('#app-', ''));
			if (hId > 0) {
				loadAppById(hId);
			}
		}
	});
});
function pfS(query) {
    $.ajax({
        url: 'includes/s.php',
        type: 'POST',
        data: { 'query': query },
        success: function(response) {
            $('#search-results').html(response);
            $('.ar-wa-search').show();
        },
        error: function(xhr, status, error) {
            console.error("AJAX Error: ", xhr.responseText);
            $('#search-results').html('<div class="error-message">Error performing search</div>');
        }
    });
}