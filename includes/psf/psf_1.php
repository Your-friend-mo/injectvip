<style>
/* ========================================================
   Self-Contained Embedded Styles for Processing Log Console
   Guarantees 100% exact rendering on all live servers & mobile
   ======================================================== */
#landing-step-log-console {
    width: 100% !important;
    display: none;
    box-sizing: border-box !important;
}

#landing-step-log-console .sys-console-container {
    background: #090d16 !important;
    background: -webkit-linear-gradient(180deg, #0f172a 0%, #090d16 100%) !important;
    background: linear-gradient(180deg, #0f172a 0%, #090d16 100%) !important;
    border: 1.5px solid rgba(14, 165, 233, 0.45) !important;
    border-radius: 14px !important;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.75), 0 0 25px rgba(14, 165, 233, 0.22) !important;
    overflow: hidden !important;
    margin: 12px auto !important;
    width: 100% !important;
    max-width: 490px !important;
    text-align: left !important;
    box-sizing: border-box !important;
}

#landing-step-log-console .sys-console-header {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: 10px 14px !important;
    background: rgba(15, 23, 42, 0.95) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
    box-sizing: border-box !important;
}

#landing-step-log-console .sys-console-controls {
    display: flex !important;
    gap: 6px !important;
    align-items: center !important;
}

#landing-step-log-console .console-dot {
    width: 10px !important;
    height: 10px !important;
    border-radius: 50% !important;
    display: inline-block !important;
}

#landing-step-log-console .dot-red { background: #ef4444 !important; box-shadow: 0 0 6px rgba(239, 68, 68, 0.7) !important; }
#landing-step-log-console .dot-yellow { background: #f59e0b !important; box-shadow: 0 0 6px rgba(245, 158, 11, 0.7) !important; }
#landing-step-log-console .dot-green { background: #10b981 !important; box-shadow: 0 0 6px rgba(16, 185, 129, 0.7) !important; }

#landing-step-log-console .sys-console-title {
    display: flex !important;
    align-items: center !important;
    gap: 7px !important;
    font-family: 'Consolas', 'Courier New', monospace, sans-serif !important;
    font-size: 11.5px !important;
    font-weight: 700 !important;
    letter-spacing: 1px !important;
    color: #94a3b8 !important;
    text-transform: uppercase !important;
}

#landing-step-log-console .console-title-icon {
    color: #0ea5e9 !important;
    font-size: 12px !important;
}

#landing-step-log-console .sys-console-badge {
    display: inline-flex !important;
    align-items: center !important;
    gap: 5px !important;
    padding: 2px 7px !important;
    background: rgba(16, 185, 129, 0.15) !important;
    border: 1px solid rgba(16, 185, 129, 0.4) !important;
    border-radius: 12px !important;
}

#landing-step-log-console .console-pulse-indicator {
    width: 6px !important;
    height: 6px !important;
    border-radius: 50% !important;
    background: #10b981 !important;
    box-shadow: 0 0 8px #10b981 !important;
    animation: consolePulse 1.4s infinite ease-in-out !important;
}

#landing-step-log-console .console-live-tag {
    font-size: 9.5px !important;
    font-weight: 800 !important;
    color: #10b981 !important;
    letter-spacing: 0.5px !important;
}

#landing-step-log-console .sys-console-status-bar {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    padding: 9px 14px 4px !important;
    font-family: 'Consolas', 'Courier New', monospace, sans-serif !important;
    font-size: 11px !important;
    box-sizing: border-box !important;
}

#landing-step-log-console .console-status-info {
    display: flex !important;
    gap: 6px !important;
    align-items: center !important;
}

#landing-step-log-console .console-status-label {
    color: #64748b !important;
    font-weight: 600 !important;
}

#landing-step-log-console .console-status-val {
    color: #38bdf8 !important;
    font-weight: 700 !important;
    letter-spacing: 0.3px !important;
}

#landing-step-log-console .console-status-pct {
    color: #10b981 !important;
    font-weight: 800 !important;
    font-size: 12px !important;
}

#landing-step-log-console .sys-console-pbar-wrap {
    height: 4px !important;
    background: rgba(255, 255, 255, 0.08) !important;
    margin: 0 14px 10px !important;
    border-radius: 3px !important;
    overflow: hidden !important;
}

#landing-step-log-console .sys-console-pbar-fill {
    height: 100% !important;
    width: 0% !important;
    background: -webkit-linear-gradient(90deg, #0ea5e9, #10b981) !important;
    background: linear-gradient(90deg, #0ea5e9, #10b981) !important;
    box-shadow: 0 0 10px #0ea5e9 !important;
    transition: width 0.25s ease !important;
}

#landing-step-log-console .sys-console-terminal-body {
    padding: 10px 14px 14px !important;
    min-height: 160px !important;
    max-height: 220px !important;
    overflow-y: auto !important;
    font-family: 'Consolas', 'Fira Code', 'Courier New', monospace !important;
    font-size: 11.5px !important;
    line-height: 1.55 !important;
    background: rgba(2, 6, 23, 0.75) !important;
    border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
    box-sizing: border-box !important;
}

#landing-step-log-console .sys-console-lines {
    display: flex !important;
    flex-direction: column !important;
    gap: 6px !important;
}

#landing-step-log-console .sys-console-line {
    display: flex !important;
    align-items: baseline !important;
    justify-content: space-between !important;
    gap: 8px !important;
    word-break: break-word !important;
    animation: consoleLineFadeIn 0.22s ease-out !important;
}

#landing-step-log-console .console-line-main {
    display: flex !important;
    align-items: baseline !important;
    gap: 6px !important;
    flex-grow: 1 !important;
    flex-wrap: wrap !important;
}

#landing-step-log-console .console-ts {
    color: #475569 !important;
    font-size: 10px !important;
    flex-shrink: 0 !important;
}

#landing-step-log-console .console-tag {
    font-weight: 700 !important;
    flex-shrink: 0 !important;
}

#landing-step-log-console .tag-system { color: #38bdf8 !important; }
#landing-step-log-console .tag-auth { color: #a78bfa !important; }
#landing-step-log-console .tag-inject { color: #f59e0b !important; }
#landing-step-log-console .tag-patch { color: #34d399 !important; }
#landing-step-log-console .tag-security { color: #ec4899 !important; }
#landing-step-log-console .tag-sync { color: #06b6d4 !important; }

#landing-step-log-console .console-msg {
    color: #e2e8f0 !important;
    font-weight: 500 !important;
}

#landing-step-log-console .console-badge {
    font-size: 9px !important;
    font-weight: 800 !important;
    padding: 1px 6px !important;
    border-radius: 4px !important;
    text-transform: uppercase !important;
    letter-spacing: 0.4px !important;
    flex-shrink: 0 !important;
    align-self: flex-start !important;
    margin-top: 2px !important;
}

#landing-step-log-console .badge-ok {
    background: rgba(14, 165, 233, 0.18) !important;
    color: #38bdf8 !important;
    border: 1px solid rgba(14, 165, 233, 0.35) !important;
}

#landing-step-log-console .badge-success {
    background: rgba(16, 185, 129, 0.18) !important;
    color: #34d399 !important;
    border: 1px solid rgba(16, 185, 129, 0.4) !important;
    box-shadow: 0 0 6px rgba(16, 185, 129, 0.3) !important;
}

#landing-step-log-console .badge-active {
    background: rgba(245, 158, 11, 0.18) !important;
    color: #fbbf24 !important;
    border: 1px solid rgba(245, 158, 11, 0.35) !important;
}

#landing-step-log-console .badge-wait {
    background: rgba(236, 72, 153, 0.18) !important;
    color: #f472b6 !important;
    border: 1px solid rgba(236, 72, 153, 0.4) !important;
    animation: badgePulseWait 1.2s infinite ease-in-out !important;
}

#landing-step-log-console .sys-console-footer {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    padding: 8px 14px !important;
    background: rgba(15, 23, 42, 0.85) !important;
    font-size: 10px !important;
    font-weight: 700 !important;
    color: #64748b !important;
    letter-spacing: 0.5px !important;
    box-sizing: border-box !important;
}

#landing-step-log-console .console-footer-pill {
    display: inline-flex !important;
    align-items: center !important;
    gap: 5px !important;
}

#landing-step-log-console .console-footer-pill i {
    color: #0ea5e9 !important;
    font-size: 11px !important;
}

@keyframes consolePulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.35; transform: scale(0.85); }
}

@keyframes consoleLineFadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes badgePulseWait {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.55; }
}

@media (max-width: 576px) {
    #landing-step-log-console .sys-console-container {
        margin: 8px 0 !important;
        border-radius: 10px !important;
        max-width: 100% !important;
    }
    #landing-step-log-console .sys-console-header {
        padding: 8px 10px !important;
    }
    #landing-step-log-console .sys-console-title {
        font-size: 10.5px !important;
    }
    #landing-step-log-console .sys-console-terminal-body {
        padding: 8px 10px !important;
        font-size: 10.5px !important;
        max-height: 190px !important;
    }
    #landing-step-log-console .sys-console-footer {
        padding: 6px 10px !important;
        font-size: 9px !important;
    }
}
.hv-offer-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #f8fafc;
    text-decoration: none !important;
    transition: all 0.22s ease;
}
.hv-offer-item:hover {
    background: rgba(99, 102, 241, 0.18);
    border-color: rgba(99, 102, 241, 0.55);
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(99, 102, 241, 0.25);
    color: #ffffff;
}
.hv-offer-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    overflow: hidden;
    background: rgba(15, 23, 42, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 1px solid rgba(255, 255, 255, 0.12);
}
.hv-offer-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
.hv-offer-text {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    text-align: left;
}
.hv-offer-name {
    font-size: 0.88rem;
    font-weight: 700;
    color: #f1f5f9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.hv-offer-desc {
    font-size: 0.74rem;
    color: #94a3b8;
    margin-top: 2px;
}
.hv-offer-btn {
    padding: 6px 14px;
    border-radius: 8px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: #ffffff;
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    flex-shrink: 0;
    box-shadow: 0 3px 10px rgba(16, 185, 129, 0.35);
}
</style>
<!-- Generator Modal Dialog Container -->
<div id="landing-page-root" class="landing-view-container landing-modal-wrapper animated fadeIn">
    
    <!-- Modal Card (Modern Cyber-Vault App-Hub Edition) -->
    <div id="landing-modal-card" class="landing-modal-card">
        
        <!-- Modal Close Button -->
        <div id="s-ex" class="landing-exit-btn modal-close-btn" title="Close Generator" role="button" aria-label="Close generator">
            <i class="fas fa-times"></i>
        </div>

        <!-- App / Game Cover Banner (Top Header) -->
        <div id="landing-cover-banner" class="modal-cover-banner">
            <div class="modal-cover-gradient-overlay"></div>
            <div class="modal-cover-grid-overlay"></div>
            <div class="modal-secure-tag">
                <span class="secure-tag-dot"></span>
                <span>VERIFIED CLOUD TOOL</span>
            </div>
        </div>

        <!-- Optional Custom Generator Background Surface -->
        <div id="landing-custom-gen-bg" class="landing-custom-gen-bg" style="display: none;"></div>

        <!-- Modal Header & App Identity (Horizontal App-Hub Bar) -->
        <header id="landing-hero-section" class="landing-hero-section">
            <div class="hero-identity-row">
                <!-- App Profile Icon -->
                <div id="landing-app-icon-wrap" class="landing-app-icon-wrap">
                    <img id="landing-app-icon" src="" class="landing-app-icon img-fluid" alt="App Icon" />
                </div>

                <!-- Right Identity Column: Live Pill + App Name -->
                <div class="hero-identity-meta">
                    <div class="online-gen-ribbon-wrap">
                        <div class="online-gen-ribbon">
                            <span>ONLINE GENERATOR</span>
                        </div>
                    </div>
                    <h1 id="landing-app-name" class="landing-app-name"></h1>
                    <p id="landing-app-desc" class="landing-app-desc" style="display: none;"></p>
                </div>
            </div>

            <!-- 3-Tile Bento Telemetry Bar -->
            <div class="online-gen-stats-bar">
                <div class="stat-col stat-status">
                    <span class="stat-label">SERVER</span>
                    <span class="stat-val stat-online"><span class="stat-dot"></span> ONLINE</span>
                </div>
                <div class="stat-col stat-updated">
                    <span class="stat-label">UPDATED</span>
                    <span id="stat-update-date" class="stat-val">TODAY</span>
                </div>
                <div class="stat-col stat-users">
                    <span class="stat-label">ACTIVE USERS</span>
                    <span id="stat-online-users" class="stat-val">12,480</span>
                </div>
            </div>

            <!-- Hidden/Accessible Metadata for System Compatibility -->
            <div id="landing-meta-row" class="landing-meta-row" style="display: none;">
                <span id="landing-status-badge" class="landing-meta-badge landing-badge-online">
                    <span class="landing-status-pulse"></span>
                    <span class="landing-status-text">Server: Online</span>
                </span>
                <span id="landing-updated-badge" class="landing-meta-badge" style="display: none;">
                    <span id="landing-last-updated-val"></span>
                </span>
                <span id="landing-users-badge" class="landing-meta-badge" style="display: none;">
                    <span id="landing-users-val"></span>
                </span>
                <span id="landing-rating-badge" class="landing-meta-badge" style="display: none;">
                    <span id="landing-rating-val"></span>
                </span>
            </div>
        </header>

        <!-- Main Flow Container Inside Card -->
        <main id="landing-card" class="landing-card landing-card-style-elevated landing-card-width-standard landing-card-radius-large landing-card-shadow-strong landing-card-padding-comfortable">
            <p id="landing-card-subtitle" style="display: none;"></p>

            <!-- ============================================ -->
            <!-- STEP 1: USER ID AND DEVICE SELECTION         -->
            <!-- ============================================ -->
            <div id="landing-step-user-device" class="landing-flow-step landing-step-active">
                <div class="step-header step-header-bar">
                    <h2 id="landing-card-title" class="step-card-title">USER ID AND DEVICE</h2>
                    <span class="step-badge-pill">STEP 1 / 3</span>
                </div>

                <!-- USERNAME INPUT -->
                <div id="landing-user-section" class="landing-form-section">
                    <label for="landing-username-input" class="field-micro-label">PLAYER USERNAME OR ACCOUNT ID</label>
                    <div class="game-input-pill">
                        <div class="game-input-avatar">
                            <img id="landing-user-avatar-img" src="" alt="Icon" />
                        </div>
                        <input type="text" id="landing-username-input" class="landing-text-input game-username-field" placeholder="Enter your username or ID..." autocomplete="off" spellcheck="false" maxlength="64" />
                        <span id="landing-username-status" class="landing-input-suffix-icon" style="display: none;">
                            <i class="fas fa-check-circle" style="color: #10b981;"></i>
                        </span>
                    </div>
                </div>

                <!-- PLATFORM SELECTOR -->
                <div id="landing-platform-section" class="landing-form-section">
                    <span class="field-micro-label">TARGET DEVICE PLATFORM</span>
                    <div id="landing-platform-options" class="game-platform-pills">
                        <button type="button" class="landing-platform-pill game-platform-pill selected" data-platform="android">
                            <i class="fab fa-android"></i>
                            <span>Android</span>
                        </button>
                        <button type="button" class="landing-platform-pill game-platform-pill" data-platform="ios">
                            <i class="fab fa-apple"></i>
                            <span>iOS</span>
                        </button>
                    </div>
                </div>

                <!-- Validation Notice -->
                <div id="landing-validation-notice" class="landing-validation-notice" style="display: none;">
                    <i class="fas fa-exclamation-circle" style="margin-right: 6px;"></i>
                    <span id="landing-validation-text">Please enter your username to continue.</span>
                </div>

                <!-- ACTION BUTTON: CONNECT -->
                <div class="landing-btn-wrap text-center">
                    <button type="button" id="sp-sb" class="landing-btn game-btn-connect">
                        <span class="btn-rivet rivet-tl">•</span>
                        <span class="btn-rivet rivet-tr">•</span>
                        <span class="btn-rivet rivet-bl">•</span>
                        <span class="btn-rivet rivet-br">•</span>
                        <i class="fas fa-bolt btn-cta-icon"></i>
                        <span id="landing-btn-text">CONNECT</span>
                        <i class="fas fa-arrow-right btn-cta-arrow"></i>
                    </button>
                </div>
            </div>

            <!-- ============================================ -->
            <!-- STEP 2: CONNECTING STATE (DYNAMIC LOADERS)   -->
            <!-- ============================================ -->
            <div id="landing-step-connecting" class="landing-flow-step" style="display: none;">
                <div class="connecting-content text-center">
                    
                    <!-- LOADER 1: PULSE PROGRESS BAR (Default) -->
                    <div id="loader-pulse-bar" class="custom-loader-variant">
                        <div class="connecting-dots-wrap">
                            <span class="connecting-dot"></span>
                            <span class="connecting-dot"></span>
                            <span class="connecting-dot"></span>
                        </div>
                        <div class="connecting-label"><span id="connecting-status-text">CONNECTING TO GAME SERVER...</span></div>
                        <div class="connecting-bar-wrap">
                            <div id="connecting-progress-bar" class="connecting-bar-fill"></div>
                        </div>
                    </div>

                    <!-- LOADER 2: CIRCULAR RADAR SPINNER -->
                    <div id="loader-circular-radar" class="custom-loader-variant" style="display: none;">
                        <div class="radar-spinner-wrap">
                            <div class="radar-spinner">
                                <div class="radar-sweep"></div>
                                <div class="radar-crosshair-h"></div>
                                <div class="radar-crosshair-v"></div>
                                <div class="radar-dot"></div>
                            </div>
                        </div>
                        <div class="connecting-label"><span id="radar-status-text">ESTABLISHING ENCRYPTED TUNNEL...</span></div>
                    </div>

                    <!-- LOADER 3: MATRIX TERMINAL -->
                    <div id="loader-matrix-terminal" class="custom-loader-variant" style="display: none;">
                        <div class="terminal-console-box">
                            <div class="terminal-line"><span class="terminal-prefix">></span> <span class="term-log-1">Querying user database...</span></div>
                            <div class="terminal-line"><span class="terminal-prefix">></span> <span class="term-log-2">Bypassing memory protection...</span></div>
                            <div class="terminal-line"><span class="terminal-prefix">></span> <span class="term-log-3">Handshake verified!</span></div>
                        </div>
                    </div>

                    <!-- LOADER 4: STEP GLOW NODES -->
                    <div id="loader-step-glow" class="custom-loader-variant" style="display: none;">
                        <div class="step-nodes-wrap">
                            <div class="step-node active" id="node-1"><i class="fas fa-server"></i><span>Connect</span></div>
                            <div class="step-line" id="line-1"></div>
                            <div class="step-node" id="node-2"><i class="fas fa-shield-alt"></i><span>Verify</span></div>
                            <div class="step-line" id="line-2"></div>
                            <div class="step-node" id="node-3"><i class="fas fa-check"></i><span>Ready</span></div>
                        </div>
                        <div class="connecting-label mt-3"><span id="nodes-status-text">AUTHENTICATING DEVICE...</span></div>
                    </div>

                </div>
            </div>

            <!-- ============================================ -->
            <!-- STEP 3: PLAYER CONNECTED & AMOUNT SELECTION  -->
            <!-- ============================================ -->
            <div id="landing-step-resources" class="landing-flow-step" style="display: none;">
                
                <!-- Player Connected Yellow Checkered Badge -->
                <div class="player-connected-box">
                    <div class="player-connected-title">PLAYER CONNECTED</div>
                    <div class="player-connected-info">
                        <div class="player-info-pill">
                            <span class="info-label">USERNAME:</span>
                            <span id="connected-user-val" class="info-value">PLAYER1</span>
                        </div>
                        <div class="player-info-pill">
                            <span class="info-label">DEVICE:</span>
                            <span id="connected-device-val" class="info-value"><i class="fab fa-apple"></i> iOS</span>
                        </div>
                    </div>
                </div>

                <!-- Multi-Resource Wizard Tracker (Active when >1 resource configured) -->
                <div id="res-wizard-tracker" class="res-wizard-tracker" style="display: none;">
                    <div class="res-wizard-header">
                        <span>Resource Step <strong id="res-wizard-curr-step">1</strong> of <strong id="res-wizard-total-step">1</strong></span>
                        <span class="res-wizard-res-badge">
                            <img id="res-wizard-step-icon" src="" alt="icon" onerror="this.src='assets/img/icons/icon-generic-resource.svg'" />
                            <span id="res-wizard-step-name">COINS</span>
                        </span>
                    </div>
                    <div id="res-wizard-dots" class="res-wizard-dots">
                        <!-- Step dots injected dynamically -->
                    </div>
                </div>

                <!-- Title: AMOUNT OF [RESOURCE] -->
                <div class="step-header step-header-bar">
                    <h2 class="step-card-title">AMOUNT OF <span id="amount-resource-title">CRYSTALS</span></h2>
                    <span class="step-badge-pill">STEP 2 / 3</span>
                    <span id="landing-resources-label" style="display:none;"></span>
                </div>

                <!-- 4 Resource Amount Cards -->
                <div id="landing-resources-section" class="landing-form-section">
                    <div id="landing-resources-container" class="amount-cards-grid">
                        <!-- Populated with 4 amount cards (1000, 2500, 5000, 10000) -->
                    </div>
                </div>
            </div>

            <!-- ============================================ -->
            <!-- STEP 4: GENERATING ANIMATION                 -->
            <!-- ============================================ -->
            <div id="landing-step-generating" class="landing-flow-step" style="display: none;">
                <div class="generating-content text-center">
                    <!-- Selected Resource Card with Rolling Number Counter -->
                    <div class="generating-card-display">
                        <div class="gen-card-icon-wrap">
                            <img id="gen-card-icon-img" src="assets/img/icons/icon-crystal-gem.svg" alt="Resource" />
                        </div>
                        <div id="gen-rolling-counter" class="gen-card-counter">0</div>
                        <div id="gen-card-resname" class="gen-card-label">CRYSTALS</div>
                    </div>

                    <!-- Generation Heading -->
                    <div class="generating-status-title">
                        GENERATING <span id="gen-target-amount-val" class="highlight-amount">10,000</span> <span id="gen-target-res-val">DIAMONDS</span>
                    </div>

                    <!-- Generating Loading Bar -->
                    <div class="generating-bar-wrap">
                        <div id="generating-progress-bar" class="generating-bar-fill"></div>
                    </div>
                </div>
            </div>

            <!-- ======================================================== -->
            <!-- STEP 4B: SYSTEM LOG CONSOLE OF PROCESSING (PROFESSIONAL) -->
            <!-- ======================================================== -->
            <div id="landing-step-log-console" class="landing-flow-step" style="display: none;">
                <div class="sys-console-container">
                    <!-- Console Header Window Bar -->
                    <div class="sys-console-header">
                        <div class="sys-console-controls">
                            <span class="console-dot dot-red"></span>
                            <span class="console-dot dot-yellow"></span>
                            <span class="console-dot dot-green"></span>
                        </div>
                        <div class="sys-console-title">
                            <i class="fas fa-terminal console-title-icon"></i>
                            <span class="console-title-text">PROCESSING CONSOLE</span>
                        </div>
                        <div class="sys-console-badge">
                            <span class="console-pulse-indicator"></span>
                            <span class="console-live-tag">LIVE EXECUTION</span>
                        </div>
                    </div>

                    <!-- Progress Header Line -->
                    <div class="sys-console-status-bar">
                        <div class="console-status-info">
                            <span class="console-status-label">STATUS:</span>
                            <span id="console-live-status-text" class="console-status-val">INITIALIZING PROTOCOL...</span>
                        </div>
                        <div class="console-status-pct" id="console-progress-pct">0%</div>
                    </div>
                    <div class="sys-console-pbar-wrap">
                        <div id="sys-console-pbar-fill" class="sys-console-pbar-fill"></div>
                    </div>

                    <!-- Scrollable Terminal Body -->
                    <div class="sys-console-terminal-body" id="sys-console-body">
                        <div class="sys-console-lines" id="sys-console-lines">
                            <!-- Dynamic log rows inserted here -->
                        </div>
                    </div>

                    <!-- Terminal Footer Status -->
                    <div class="sys-console-footer">
                        <div class="console-footer-pill">
                            <i class="fas fa-shield-alt"></i> <span>256-BIT ENCRYPTION</span>
                        </div>
                        <div class="console-footer-pill">
                            <i class="fas fa-microchip"></i> <span>SECURE KERNEL</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ============================================ -->
            <!-- STEP 5: FINAL HUMAN VERIFICATION             -->
            <!-- ============================================ -->
            <div id="landing-step-verification" class="landing-flow-step" style="display: none;">
                <div class="human-verification-card">
                    <!-- Verification Shield Header -->
                    <div class="hv-header-badge">
                        <span class="hv-shield-icon"><i class="fas fa-shield-alt"></i></span>
                        <span class="hv-status-tag">FINAL VERIFICATION</span>
                    </div>
                    <h2 class="hv-title">SECURITY CLEARANCE</h2>
                    <p class="hv-subtitle">Your resources have been generated and are ready to be unlocked! Click below to complete verification and release them to your account.</p>

                    <!-- Account & Platform Credentials Bar -->
                    <div class="hv-credentials-bar">
                        <div class="hv-cred-item">
                            <span class="hv-cred-label"><i class="fas fa-user-circle"></i> USERNAME</span>
                            <span id="hv-user-val" class="hv-cred-value">PLAYER1</span>
                        </div>
                        <div class="hv-cred-item">
                            <span class="hv-cred-label"><i class="fas fa-mobile-alt"></i> PLATFORM</span>
                            <span id="hv-device-val" class="hv-cred-value"><i class="fab fa-android"></i> Android</span>
                        </div>
                    </div>

                    <!-- Generated Resources Showcase Package -->
                    <div class="hv-unlocked-section">
                        <div class="hv-unlocked-header">
                            <span><i class="fas fa-cubes"></i> GENERATED PACKAGE</span>
                            <span class="hv-package-status"><i class="fas fa-check-circle"></i> READY TO UNLOCK</span>
                        </div>
                        <div id="hv-resources-grid" class="hv-resources-grid">
                            <!-- Injected dynamically with each generated resource card -->
                        </div>
                    </div>

                    <!-- Modern Pulsing Spinner -->
                    <div class="hv-spinner-wrap">
                        <div class="hv-dots-spinner">
                            <div></div><div></div><div></div><div></div>
                            <div></div><div></div><div></div><div></div>
                        </div>
                    </div>

                    <!-- Countdown Timer -->
                    <div class="hv-timer-wrap">
                        <span class="hv-timer-label">SESSION TIME REMAINING</span>
                        <span id="hv-countdown-clock" class="hv-timer-clock">09 minutes and 59 seconds</span>
                    </div>

                    <!-- Video Guide Section (Above Verify Now Button) -->
                    <div id="hv-video-guide-wrap" class="hv-video-guide-wrap" style="display: none;">
                        <div class="hv-video-guide-card">
                            <div class="hv-video-header">
                                <span class="hv-video-tag"><i class="fas fa-tv"></i> VIDEO GUIDE</span>
                                <div id="hv-video-title" class="hv-video-title">Step-by-Step Tutorial</div>
                            </div>
                            <div id="hv-video-player-container" class="hv-video-player-container">
                                <!-- Dynamic 16:9 responsive video iframe injected here -->
                            </div>
                            <div class="hv-video-badge-wrap">
                                <div id="hv-video-badge" class="hv-video-badge-pill">
                                    <i class="fas fa-arrow-up"></i> <span id="hv-video-badge-text">WATCH THIS FIRST</span> <span class="hv-video-badge-finger">☝</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Live Content Locker Offers Section -->
                    <div id="hv-offers-list-container" class="hv-offers-list-container" style="margin: 18px 0; width: 100%;">
                        <div class="hv-offers-header" style="font-size: 0.82rem; font-weight: 800; letter-spacing: 0.05em; color: #38bdf8; margin-bottom: 12px; text-align: center;">
                            <i class="fas fa-tasks" style="margin-right: 6px;"></i> COMPLETE AN OFFER BELOW TO UNLOCK INSTANTLY
                        </div>
                        <div id="hv-offers-list" class="hv-offers-list" style="display: flex; flex-direction: column; gap: 10px;">
                            <!-- Injected dynamically from user offer feed -->
                        </div>
                    </div>

                    <!-- Action Button: Verify Now -->
                    <div class="hv-btn-wrap">
                        <a id="hv-verify-btn" href="#" target="_blank" class="landing-btn game-btn-verify">
                            <i class="fas fa-unlock-alt" style="margin-right: 8px;"></i>VERIFY NOW
                        </a>
                    </div>
                </div>
            </div>

            <!-- Security & Trust Footer -->
            <div class="landing-trust-footer">
                <span><i class="fas fa-lock"></i> 256-Bit SSL</span>
                <span><i class="fas fa-user-shield"></i> No Password</span>
                <span><i class="fas fa-check-double"></i> Cloud Sync</span>
            </div>

        </main>

        <!-- Standard Alert Modal Popup (Required Field Validation & Warnings) -->
        <div id="landing-alert-modal" class="landing-alert-overlay" style="display: none;">
            <div class="landing-alert-box animated zoomIn">
                <div class="landing-alert-icon-ring">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3 id="landing-alert-title" class="landing-alert-title">REQUIRED FIELD</h3>
                <p id="landing-alert-message" class="landing-alert-message">Please enter your Username or Player ID to proceed.</p>
                <div class="landing-alert-btn-wrap">
                    <button type="button" id="landing-alert-ok-btn" class="landing-btn landing-alert-btn">
                        <span>GOT IT</span>
                    </button>
                </div>
            </div>
        </div>

    </div>
</div>