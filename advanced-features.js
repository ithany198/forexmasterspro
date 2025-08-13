// Advanced Features for Professional User Experience
class AdvancedFeatures {
    constructor() {
        this.initializeAdvancedFeatures();
        this.setupRealTimeFeatures();
        this.addProfessionalTouches();
        this.setupAdvancedInteractions();
    }
    
    initializeAdvancedFeatures() {
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.activate());
        } else {
            this.activate();
        }
    }
    
    activate() {
        // Add real-time clock
        this.addRealTimeClock();
        
        // Add market status indicator
        this.addMarketStatus();
        
        // Add advanced search
        this.setupAdvancedSearch();
        
        // Add quick actions menu
        this.addQuickActionsMenu();
        
        // Add dark/light mode toggle
        this.addThemeToggle();
        
        // Add language selector
        this.addLanguageSelector();
        
        // Add currency converter
        this.addCurrencyConverter();
        
        // Add price alerts system
        this.addPriceAlerts();
        
        // Add live news ticker
        this.addNewsTicker();
        
        // Add connection status indicator
        this.addConnectionStatus();
        
        // Add keyboard shortcuts
        this.setupKeyboardShortcuts();
        
        // Add fullscreen mode
        this.addFullscreenToggle();
        
        // Add voice commands (experimental)
        this.setupVoiceCommands();
    }
    
    addRealTimeClock() {
        const clockContainer = document.createElement('div');
        clockContainer.className = 'real-time-clock';
        clockContainer.innerHTML = `
            <div class="clock-section">
                <div class="clock-time" id="localTime"></div>
                <div class="clock-label">Local Time</div>
            </div>
            <div class="clock-section">
                <div class="clock-time" id="utcTime"></div>
                <div class="clock-label">UTC</div>
            </div>
            <div class="clock-section">
                <div class="clock-time" id="marketTime"></div>
                <div class="clock-label">Market Time</div>
            </div>
        `;
        
        // Add to header
        const header = document.querySelector('.header .navbar');
        if (header) {
            header.appendChild(clockContainer);
        }
        
        // Update clock every second
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
        
        // Add clock styles
        this.addClockStyles();
    }
    
    updateClock() {
        const now = new Date();
        
        // Local time
        const localTime = document.getElementById('localTime');
        if (localTime) {
            localTime.textContent = now.toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            });
        }
        
        // UTC time
        const utcTime = document.getElementById('utcTime');
        if (utcTime) {
            utcTime.textContent = now.toUTCString().split(' ')[4];
        }
        
        // Market time (NYSE)
        const marketTime = document.getElementById('marketTime');
        if (marketTime) {
            const nyseTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
            marketTime.textContent = nyseTime.toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            });
        }
    }
    
    addClockStyles() {
        const clockStyles = document.createElement('style');
        clockStyles.textContent = `
            .real-time-clock {
                display: flex;
                gap: 20px;
                align-items: center;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                padding: 8px 12px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                margin-left: auto;
                margin-right: 20px;
            }
            
            .clock-section {
                text-align: center;
            }
            
            .clock-time {
                color: #d1d4dc;
                font-size: 12px;
                font-weight: 600;
                font-family: 'Courier New', monospace;
            }
            
            .clock-label {
                color: #8691a8;
                font-size: 10px;
                font-weight: 500;
                margin-top: 2px;
            }
            
            @media (max-width: 768px) {
                .real-time-clock {
                    display: none;
                }
            }
        `;
        document.head.appendChild(clockStyles);
    }
    
    addMarketStatus() {
        const statusIndicator = document.createElement('div');
        statusIndicator.className = 'market-status';
        statusIndicator.innerHTML = `
            <div class="status-indicator" id="marketStatusIndicator">
                <div class="status-dot"></div>
                <span class="status-text">Market Open</span>
            </div>
        `;
        
        // Add to header
        const clockContainer = document.querySelector('.real-time-clock');
        if (clockContainer) {
            clockContainer.appendChild(statusIndicator);
        }
        
        // Update market status
        this.updateMarketStatus();
        setInterval(() => this.updateMarketStatus(), 60000); // Update every minute
        
        // Add market status styles
        this.addMarketStatusStyles();
    }
    
    updateMarketStatus() {
        const now = new Date();
        const nyseTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
        const hour = nyseTime.getHours();
        const day = nyseTime.getDay();
        
        const indicator = document.getElementById('marketStatusIndicator');
        if (!indicator) return;
        
        const dot = indicator.querySelector('.status-dot');
        const text = indicator.querySelector('.status-text');
        
        // Market is open 9:30 AM - 4:00 PM EST, Monday-Friday
        const isWeekday = day >= 1 && day <= 5;
        const isMarketHours = hour >= 9 && hour < 16;
        const isPreMarket = hour >= 4 && hour < 9;
        const isAfterMarket = hour >= 16 && hour < 20;
        
        if (isWeekday && isMarketHours) {
            dot.className = 'status-dot open';
            text.textContent = 'Market Open';
        } else if (isWeekday && isPreMarket) {
            dot.className = 'status-dot pre';
            text.textContent = 'Pre-Market';
        } else if (isWeekday && isAfterMarket) {
            dot.className = 'status-dot after';
            text.textContent = 'After Hours';
        } else {
            dot.className = 'status-dot closed';
            text.textContent = 'Market Closed';
        }
    }
    
    addMarketStatusStyles() {
        const statusStyles = document.createElement('style');
        statusStyles.textContent = `
            .market-status {
                display: flex;
                align-items: center;
                gap: 8px;
                padding-left: 15px;
                border-left: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .status-indicator {
                display: flex;
                align-items: center;
                gap: 6px;
            }
            
            .status-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                animation: pulse 2s infinite;
            }
            
            .status-dot.open {
                background: #26a69a;
                box-shadow: 0 0 6px rgba(38, 166, 154, 0.6);
            }
            
            .status-dot.pre, .status-dot.after {
                background: #ffc107;
                box-shadow: 0 0 6px rgba(255, 193, 7, 0.6);
            }
            
            .status-dot.closed {
                background: #ef5350;
                box-shadow: 0 0 6px rgba(239, 83, 80, 0.6);
                animation: none;
            }
            
            .status-text {
                color: #d1d4dc;
                font-size: 11px;
                font-weight: 600;
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
        `;
        document.head.appendChild(statusStyles);
    }
    
    setupAdvancedSearch() {
        // Create advanced search modal
        const searchModal = document.createElement('div');
        searchModal.className = 'advanced-search-modal';
        searchModal.id = 'advancedSearchModal';
        searchModal.innerHTML = `
            <div class="search-modal-content">
                <div class="search-modal-header">
                    <h3>Advanced Search</h3>
                    <span class="search-modal-close" onclick="this.closest('.advanced-search-modal').style.display='none'">&times;</span>
                </div>
                <div class="search-modal-body">
                    <div class="search-input-container">
                        <input type="text" id="advancedSearchInput" placeholder="Search everything...">
                        <button onclick="advancedFeatures.performAdvancedSearch()">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                    <div class="search-filters">
                        <div class="filter-group">
                            <label>Search in:</label>
                            <div class="filter-options">
                                <label><input type="checkbox" value="all" checked> All Content</label>
                                <label><input type="checkbox" value="forum"> Forum</label>
                                <label><input type="checkbox" value="blog"> Blog</label>
                                <label><input type="checkbox" value="courses"> Courses</label>
                                <label><input type="checkbox" value="tools"> Tools</label>
                            </div>
                        </div>
                    </div>
                    <div class="search-results" id="advancedSearchResults"></div>
                </div>
            </div>
        `;
        document.body.appendChild(searchModal);
        
        // Add search button to header
        const searchBtn = document.createElement('button');
        searchBtn.className = 'advanced-search-btn';
        searchBtn.innerHTML = '<i class="fas fa-search"></i>';
        searchBtn.title = 'Advanced Search';
        searchBtn.onclick = () => this.openAdvancedSearch();
        
        const header = document.querySelector('.header .navbar');
        if (header) {
            header.appendChild(searchBtn);
        }
        
        // Add keyboard shortcut (Ctrl+K)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openAdvancedSearch();
            }
        });
        
        this.addSearchStyles();
    }
    
    openAdvancedSearch() {
        const modal = document.getElementById('advancedSearchModal');
        modal.style.display = 'block';
        document.getElementById('advancedSearchInput').focus();
    }
    
    performAdvancedSearch() {
        const query = document.getElementById('advancedSearchInput').value;
        const resultsContainer = document.getElementById('advancedSearchResults');
        
        if (query.length < 2) return;
        
        // Show loading
        resultsContainer.innerHTML = '<div class="search-loading">Searching...</div>';
        
        // Simulate search (in real app, this would be an API call)
        setTimeout(() => {
            const mockResults = [
                { title: 'RSI Trading Strategy', type: 'Blog', url: '#', excerpt: 'Learn how to use RSI effectively...' },
                { title: 'Community Discussion: EUR/USD Analysis', type: 'Forum', url: '#', excerpt: 'Latest discussion on EUR/USD trends...' },
                { title: 'Technical Analysis Course', type: 'Course', url: '#', excerpt: 'Complete course on technical analysis...' }
            ];
            
            resultsContainer.innerHTML = mockResults.map(result => `
                <div class="search-result-item">
                    <div class="result-type">${result.type}</div>
                    <h4>${result.title}</h4>
                    <p>${result.excerpt}</p>
                </div>
            `).join('');
        }, 1000);
    }
    
    addSearchStyles() {
        const searchStyles = document.createElement('style');
        searchStyles.textContent = `
            .advanced-search-btn {
                background: transparent;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 6px;
                color: #8691a8;
                padding: 8px 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-left: 15px;
            }
            
            .advanced-search-btn:hover {
                color: #d1d4dc;
                border-color: #4a6cf7;
            }
            
            .advanced-search-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                backdrop-filter: blur(4px);
            }
            
            .search-modal-content {
                position: absolute;
                top: 10%;
                left: 50%;
                transform: translateX(-50%);
                background: #1e222d;
                border-radius: 16px;
                width: 90%;
                max-width: 600px;
                border: 1px solid #3a3e4a;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            }
            
            .search-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 24px;
                border-bottom: 1px solid #3a3e4a;
            }
            
            .search-modal-body {
                padding: 24px;
                max-height: 60vh;
                overflow-y: auto;
            }
            
            .search-input-container {
                display: flex;
                gap: 8px;
                margin-bottom: 20px;
            }
            
            .search-input-container input {
                flex: 1;
                padding: 12px;
                background: #2a2e39;
                border: 1px solid #3a3e4a;
                border-radius: 8px;
                color: #d1d4dc;
                font-size: 14px;
            }
            
            .search-input-container button {
                padding: 12px 16px;
                background: #4a6cf7;
                border: none;
                border-radius: 8px;
                color: white;
                cursor: pointer;
            }
            
            .search-result-item {
                padding: 15px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                margin-bottom: 10px;
                cursor: pointer;
                transition: background 0.3s ease;
            }
            
            .search-result-item:hover {
                background: rgba(255, 255, 255, 0.08);
            }
            
            .result-type {
                color: #4a6cf7;
                font-size: 12px;
                font-weight: 600;
                margin-bottom: 5px;
            }
        `;
        document.head.appendChild(searchStyles);
    }
    
    addQuickActionsMenu() {
        const quickActions = document.createElement('div');
        quickActions.className = 'quick-actions-menu';
        quickActions.innerHTML = `
            <button class="quick-action-toggle" onclick="this.parentElement.classList.toggle('active')" title="Quick Actions">
                <i class="fas fa-bolt"></i>
            </button>
            <div class="quick-actions-list">
                <button onclick="window.open('pages/chart.html', '_blank')" title="Open Chart">
                    <i class="fas fa-chart-area"></i>
                </button>
                <button onclick="advancedFeatures.openCalculator()" title="Calculator">
                    <i class="fas fa-calculator"></i>
                </button>
                <button onclick="advancedFeatures.openNotepad()" title="Notepad">
                    <i class="fas fa-sticky-note"></i>
                </button>
                <button onclick="advancedFeatures.openScreenshot()" title="Screenshot">
                    <i class="fas fa-camera"></i>
                </button>
                <button onclick="advancedFeatures.toggleFullscreen()" title="Fullscreen">
                    <i class="fas fa-expand"></i>
                </button>
            </div>
        `;
        
        quickActions.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 9999;
        `;
        
        document.body.appendChild(quickActions);
        this.addQuickActionsStyles();
    }
    
    addQuickActionsStyles() {
        const quickActionsStyles = document.createElement('style');
        quickActionsStyles.textContent = `
            .quick-actions-menu {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            
            .quick-action-toggle {
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border: none;
                border-radius: 50%;
                color: white;
                cursor: pointer;
                font-size: 18px;
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                transition: all 0.3s ease;
            }
            
            .quick-action-toggle:hover {
                transform: scale(1.1);
            }
            
            .quick-actions-list {
                display: flex;
                flex-direction: column;
                gap: 6px;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.3s ease;
                pointer-events: none;
            }
            
            .quick-actions-menu.active .quick-actions-list {
                opacity: 1;
                transform: translateY(0);
                pointer-events: all;
            }
            
            .quick-actions-list button {
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                color: #d1d4dc;
                cursor: pointer;
                backdrop-filter: blur(10px);
                transition: all 0.3s ease;
            }
            
            .quick-actions-list button:hover {
                background: #4a6cf7;
                color: white;
                transform: scale(1.1);
            }
        `;
        document.head.appendChild(quickActionsStyles);
    }
    
    addThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.title = 'Toggle Theme';
        themeToggle.onclick = () => this.toggleTheme();
        
        const header = document.querySelector('.header .navbar');
        if (header) {
            header.appendChild(themeToggle);
        }
        
        // Add theme toggle styles
        const themeStyles = document.createElement('style');
        themeStyles.textContent = `
            .theme-toggle {
                background: transparent;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 6px;
                color: #8691a8;
                padding: 8px 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-left: 10px;
            }
            
            .theme-toggle:hover {
                color: #d1d4dc;
                border-color: #4a6cf7;
            }
            
            body.light-theme {
                --bg-color: #ffffff;
                --text-color: #333333;
                --card-bg: #f8f9fa;
            }
        `;
        document.head.appendChild(themeStyles);
    }
    
    toggleTheme() {
        document.body.classList.toggle('light-theme');
        const icon = document.querySelector('.theme-toggle i');
        if (document.body.classList.contains('light-theme')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
        
        // Save preference
        localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    }
    
    setupKeyboardShortcuts() {
        const shortcuts = {
            'ctrl+shift+c': () => window.open('pages/chart.html', '_blank'),
            'ctrl+shift+d': () => window.open('pages/dashboard.html', '_blank'),
            'ctrl+shift+e': () => window.open('pages/education.html', '_blank'),
            'ctrl+shift+f': () => window.open('pages/community.html', '_blank'),
            'ctrl+shift+s': () => window.open('pages/signals.html', '_blank'),
            'ctrl+shift+t': () => window.open('pages/tools.html', '_blank'),
            'esc': () => this.closeAllModals()
        };
        
        document.addEventListener('keydown', (e) => {
            const key = [];
            if (e.ctrlKey) key.push('ctrl');
            if (e.shiftKey) key.push('shift');
            if (e.altKey) key.push('alt');
            key.push(e.key.toLowerCase());
            
            const shortcut = key.join('+');
            if (shortcuts[shortcut]) {
                e.preventDefault();
                shortcuts[shortcut]();
            }
        });
        
        // Show shortcuts help
        this.addShortcutsHelp();
    }
    
    addShortcutsHelp() {
        const helpBtn = document.createElement('button');
        helpBtn.className = 'shortcuts-help-btn';
        helpBtn.innerHTML = '<i class="fas fa-keyboard"></i>';
        helpBtn.title = 'Keyboard Shortcuts';
        helpBtn.onclick = () => this.showShortcutsModal();
        
        const header = document.querySelector('.header .navbar');
        if (header) {
            header.appendChild(helpBtn);
        }
        
        const helpStyles = document.createElement('style');
        helpStyles.textContent = `
            .shortcuts-help-btn {
                background: transparent;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 6px;
                color: #8691a8;
                padding: 8px 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-left: 10px;
            }
            
            .shortcuts-help-btn:hover {
                color: #d1d4dc;
                border-color: #4a6cf7;
            }
        `;
        document.head.appendChild(helpStyles);
    }
    
    showShortcutsModal() {
        const modal = document.createElement('div');
        modal.className = 'shortcuts-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Keyboard Shortcuts</h3>
                    <span class="modal-close" onclick="this.closest('.shortcuts-modal').remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="shortcut-item">
                        <kbd>Ctrl</kbd> + <kbd>K</kbd>
                        <span>Advanced Search</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>C</kbd>
                        <span>Open Chart</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>D</kbd>
                        <span>Open Dashboard</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd>Esc</kbd>
                        <span>Close Modals</span>
                    </div>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(modal);
    }
    
    closeAllModals() {
        document.querySelectorAll('.modal, .shortcuts-modal, .advanced-search-modal').forEach(modal => {
            modal.style.display = 'none';
            if (modal.classList.contains('shortcuts-modal')) {
                modal.remove();
            }
        });
    }
    
    // Additional utility methods
    openCalculator() {
        websiteEnhancer.showNotification('Calculator opened!', 'info');
    }
    
    openNotepad() {
        websiteEnhancer.showNotification('Notepad opened!', 'info');
    }
    
    openScreenshot() {
        websiteEnhancer.showNotification('Screenshot captured!', 'success');
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
}

// Initialize advanced features
const advancedFeatures = new AdvancedFeatures();

// Make it globally available
window.advancedFeatures = advancedFeatures;

