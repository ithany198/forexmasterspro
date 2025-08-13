// Website Enhancement and Polish System
class WebsiteEnhancer {
    constructor() {
        this.initializeEnhancements();
        this.fixCommonErrors();
        this.addProfessionalTouches();
        this.setupUXImprovements();
        this.optimizePerformance();
    }
    
    initializeEnhancements() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.applyEnhancements());
        } else {
            this.applyEnhancements();
        }
    }
    
    applyEnhancements() {
        // Fix layout issues
        this.fixLayoutIssues();
        
        // Add smooth scrolling
        this.enableSmoothScrolling();
        
        // Add loading animations
        this.addLoadingAnimations();
        
        // Enhance forms
        this.enhanceForms();
        
        // Add tooltips
        this.addTooltips();
        
        // Improve accessibility
        this.improveAccessibility();
        
        // Add professional animations
        this.addAnimations();
        
        // Fix responsive issues
        this.fixResponsiveIssues();
        
        // Add progress indicators
        this.addProgressIndicators();
    }
    
    fixCommonErrors() {
        // Fix missing alt attributes
        document.querySelectorAll('img:not([alt])').forEach(img => {
            img.alt = img.title || 'ForexMaster Pro Image';
        });
        
        // Fix missing labels for form inputs
        document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])').forEach(input => {
            if (!input.closest('label') && input.id) {
                const label = document.querySelector(`label[for="${input.id}"]`);
                if (!label && input.placeholder) {
                    input.setAttribute('aria-label', input.placeholder);
                }
            }
        });
        
        // Fix links without proper text
        document.querySelectorAll('a:empty, a:not([aria-label]):not([title])').forEach(link => {
            if (link.innerHTML.trim() === '' || link.innerHTML.includes('<i class=')) {
                const icon = link.querySelector('i');
                if (icon) {
                    link.setAttribute('aria-label', this.getIconLabel(icon.className));
                }
            }
        });
        
        // Fix missing focus indicators
        this.addFocusIndicators();
    }
    
    getIconLabel(className) {
        const iconLabels = {
            'fa-home': 'Home',
            'fa-chart-line': 'Dashboard',
            'fa-graduation-cap': 'Education',
            'fa-users': 'Community',
            'fa-brain': 'AI Signals',
            'fa-tools': 'Trading Tools',
            'fa-chart-bar': 'Research',
            'fa-blog': 'Blog',
            'fa-envelope': 'Contact',
            'fa-share-alt': 'Share',
            'fa-facebook-f': 'Share on Facebook',
            'fa-twitter': 'Share on Twitter',
            'fa-linkedin-in': 'Share on LinkedIn',
            'fa-telegram-plane': 'Share on Telegram',
            'fa-whatsapp': 'Share on WhatsApp'
        };
        
        for (const [iconClass, label] of Object.entries(iconLabels)) {
            if (className.includes(iconClass)) {
                return label;
            }
        }
        return 'Action';
    }
    
    addFocusIndicators() {
        const style = document.createElement('style');
        style.textContent = `
            /* Enhanced focus indicators */
            .nav-link:focus,
            .btn:focus,
            .control-btn:focus,
            .tool-btn:focus,
            .share-btn:focus,
            input:focus,
            textarea:focus,
            select:focus {
                outline: 2px solid #4a6cf7 !important;
                outline-offset: 2px !important;
                box-shadow: 0 0 0 4px rgba(74, 108, 247, 0.2) !important;
            }
            
            /* Skip to main content link */
            .skip-to-main {
                position: absolute;
                top: -40px;
                left: 6px;
                background: #4a6cf7;
                color: white;
                padding: 8px 16px;
                text-decoration: none;
                border-radius: 4px;
                z-index: 10000;
                transition: top 0.3s ease;
            }
            
            .skip-to-main:focus {
                top: 6px;
            }
        `;
        document.head.appendChild(style);
        
        // Add skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-to-main';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    fixLayoutIssues() {
        // Ensure main content has proper ID
        const mainContent = document.querySelector('main, .main-content, .page-content');
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
        }
        
        // Fix container overflow issues
        document.querySelectorAll('.container').forEach(container => {
            if (container.scrollWidth > container.clientWidth) {
                container.style.overflowX = 'auto';
            }
        });
        
        // Fix image aspect ratios
        document.querySelectorAll('img').forEach(img => {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        });
        
        // Ensure proper heading hierarchy
        this.fixHeadingHierarchy();
    }
    
    fixHeadingHierarchy() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let lastLevel = 0;
        
        headings.forEach(heading => {
            const currentLevel = parseInt(heading.tagName.substring(1));
            
            // Skip h1 validation as it should be unique
            if (currentLevel === 1) {
                lastLevel = 1;
                return;
            }
            
            // If jumping more than one level, add warning
            if (currentLevel > lastLevel + 1) {
                console.warn(`Heading hierarchy issue: ${heading.tagName} follows h${lastLevel}`, heading);
            }
            
            lastLevel = currentLevel;
        });
    }
    
    enableSmoothScrolling() {
        // Add smooth scrolling behavior
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Enhanced smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    addLoadingAnimations() {
        // Add entrance animations for content
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        document.querySelectorAll('.content-card, .feature-card, .stat-card, .forum-thread, .trust-badge').forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
        
        // Add CSS for animations
        const animationStyle = document.createElement('style');
        animationStyle.textContent = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .fade-in {
                animation: fadeIn 0.6s ease forwards;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .loading-skeleton {
                background: linear-gradient(90deg, 
                    rgba(255,255,255,0.1) 25%, 
                    rgba(255,255,255,0.2) 50%, 
                    rgba(255,255,255,0.1) 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
            }
            
            @keyframes loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
        `;
        document.head.appendChild(animationStyle);
    }
    
    enhanceForms() {
        // Add form validation styling
        document.querySelectorAll('input, textarea, select').forEach(input => {
            // Add required field indicators
            if (input.required && !input.closest('.form-group')?.querySelector('.required-indicator')) {
                const indicator = document.createElement('span');
                indicator.className = 'required-indicator';
                indicator.textContent = '*';
                indicator.style.color = '#ef5350';
                indicator.style.marginLeft = '4px';
                
                const label = input.closest('.form-group')?.querySelector('label') || 
                            document.querySelector(`label[for="${input.id}"]`);
                if (label) {
                    label.appendChild(indicator);
                }
            }
            
            // Add real-time validation
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
        
        // Add form submission handling
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => this.handleFormSubmission(e));
        });
    }
    
    validateField(field) {
        const isValid = field.checkValidity();
        const formGroup = field.closest('.form-group') || field.parentElement;
        
        // Remove existing error messages
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        if (!isValid) {
            field.classList.add('error');
            
            // Add error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = field.validationMessage;
            errorDiv.style.cssText = `
                color: #ef5350;
                font-size: 12px;
                margin-top: 4px;
                display: flex;
                align-items: center;
                gap: 4px;
            `;
            errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${field.validationMessage}`;
            
            formGroup.appendChild(errorDiv);
        } else {
            field.classList.remove('error');
            field.classList.add('valid');
        }
    }
    
    clearFieldError(field) {
        field.classList.remove('error');
        const formGroup = field.closest('.form-group') || field.parentElement;
        const errorDiv = formGroup.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    handleFormSubmission(e) {
        const form = e.target;
        const isValid = form.checkValidity();
        
        if (!isValid) {
            e.preventDefault();
            
            // Validate all fields
            form.querySelectorAll('input, textarea, select').forEach(field => {
                this.validateField(field);
            });
            
            // Focus first invalid field
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.focus();
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            // Add loading state
            this.addFormLoadingState(form);
        }
    }
    
    addFormLoadingState(form) {
        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            // Add spinner
            const spinner = document.createElement('i');
            spinner.className = 'fas fa-spinner fa-spin';
            spinner.style.marginRight = '8px';
            submitBtn.insertBefore(spinner, submitBtn.firstChild);
            
            // Reset after delay (for demo)
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                spinner.remove();
            }, 2000);
        }
    }
    
    addTooltips() {
        // Add tooltips for elements with title attribute
        document.querySelectorAll('[title]').forEach(element => {
            this.createTooltip(element);
        });
        
        // Add tooltips for icon buttons
        document.querySelectorAll('.control-btn, .tool-btn, .indicator-control').forEach(btn => {
            if (!btn.title && !btn.getAttribute('aria-label')) {
                const icon = btn.querySelector('i');
                if (icon) {
                    btn.title = this.getIconLabel(icon.className);
                }
            }
        });
    }
    
    createTooltip(element) {
        let tooltip;
        
        element.addEventListener('mouseenter', (e) => {
            if (tooltip) return;
            
            tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = element.title || element.getAttribute('aria-label');
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 500;
                white-space: nowrap;
                z-index: 10000;
                pointer-events: none;
                opacity: 0;
                transform: translateY(-5px);
                transition: all 0.2s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            // Position tooltip
            const rect = element.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltipRect.width / 2)}px`;
            tooltip.style.top = `${rect.top - tooltipRect.height - 8}px`;
            
            // Animate in
            requestAnimationFrame(() => {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(0)';
            });
        });
        
        element.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateY(-5px)';
                setTimeout(() => {
                    if (tooltip && tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                    tooltip = null;
                }, 200);
            }
        });
    }
    
    improveAccessibility() {
        // Add ARIA labels where missing
        document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])').forEach(btn => {
            if (btn.textContent.trim() === '') {
                const icon = btn.querySelector('i');
                if (icon) {
                    btn.setAttribute('aria-label', this.getIconLabel(icon.className));
                }
            }
        });
        
        // Add landmark roles
        const nav = document.querySelector('nav:not([role])');
        if (nav) nav.setAttribute('role', 'navigation');
        
        const main = document.querySelector('main:not([role])');
        if (main) main.setAttribute('role', 'main');
        
        const footer = document.querySelector('footer:not([role])');
        if (footer) footer.setAttribute('role', 'contentinfo');
        
        // Add live region for notifications
        if (!document.getElementById('live-region')) {
            const liveRegion = document.createElement('div');
            liveRegion.id = 'live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.cssText = `
                position: absolute;
                left: -10000px;
                width: 1px;
                height: 1px;
                overflow: hidden;
            `;
            document.body.appendChild(liveRegion);
        }
        
        // Improve keyboard navigation
        this.improveKeyboardNavigation();
    }
    
    improveKeyboardNavigation() {
        // Add keyboard event handlers
        document.addEventListener('keydown', (e) => {
            // ESC key handling
            if (e.key === 'Escape') {
                // Close modals
                document.querySelectorAll('.modal[style*="block"]').forEach(modal => {
                    modal.style.display = 'none';
                });
                
                // Close dropdowns
                document.querySelectorAll('.dropdown.active, .instrument-dropdown.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
                
                // Close floating share widget
                const shareWidget = document.getElementById('floatingShareWidget');
                if (shareWidget?.classList.contains('active')) {
                    shareWidget.classList.remove('active');
                }
            }
        });
        
        // Tab key management for modals
        document.querySelectorAll('.modal').forEach(modal => {
            this.trapFocusInModal(modal);
        });
    }
    
    trapFocusInModal(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
    
    addAnimations() {
        // Add hover animations for interactive elements
        const hoverStyle = document.createElement('style');
        hoverStyle.textContent = `
            .content-card, .trust-badge, .partner-logo {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .btn, .nav-link, .control-btn, .tool-btn {
                transition: all 0.2s ease;
                position: relative;
                overflow: hidden;
            }
            
            .btn::before, .nav-link::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                transition: left 0.5s ease;
            }
            
            .btn:hover::before, .nav-link:hover::before {
                left: 100%;
            }
            
            /* Loading animations for dynamic content */
            .content-loading {
                animation: contentPulse 1.5s ease-in-out infinite;
            }
            
            @keyframes contentPulse {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(hoverStyle);
    }
    
    fixResponsiveIssues() {
        // Add responsive meta tag if missing
        if (!document.querySelector('meta[name="viewport"]')) {
            const viewportMeta = document.createElement('meta');
            viewportMeta.name = 'viewport';
            viewportMeta.content = 'width=device-width, initial-scale=1.0';
            document.head.appendChild(viewportMeta);
        }
        
        // Fix text that might be too small on mobile
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            @media (max-width: 480px) {
                body {
                    font-size: 16px; /* Prevent zoom on iOS */
                }
                
                input, textarea, select {
                    font-size: 16px; /* Prevent zoom on iOS */
                }
                
                .small-text {
                    font-size: 14px !important;
                }
            }
        `;
        document.head.appendChild(mobileStyle);
    }
    
    addProgressIndicators() {
        // Add page loading progress bar
        const progressBar = document.createElement('div');
        progressBar.id = 'page-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #4a6cf7, #667eea);
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
        
        // Update progress on scroll
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
        
        // Add reading progress for articles
        this.addReadingProgress();
    }
    
    addReadingProgress() {
        const articles = document.querySelectorAll('.content-card, .forum-thread');
        
        articles.forEach(article => {
            if (article.querySelector('.card-description, .thread-content')) {
                const progressDiv = document.createElement('div');
                progressDiv.className = 'reading-progress';
                progressDiv.style.cssText = `
                    width: 100%;
                    height: 2px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 1px;
                    margin-top: 10px;
                    overflow: hidden;
                `;
                
                const progressBar = document.createElement('div');
                progressBar.style.cssText = `
                    width: 0%;
                    height: 100%;
                    background: #4a6cf7;
                    transition: width 0.3s ease;
                `;
                
                progressDiv.appendChild(progressBar);
                article.appendChild(progressDiv);
                
                // Simulate reading progress
                let progress = 0;
                const interval = setInterval(() => {
                    progress += Math.random() * 10;
                    if (progress >= 100) {
                        progress = 100;
                        clearInterval(interval);
                    }
                    progressBar.style.width = progress + '%';
                }, 500);
            }
        });
    }
    
    optimizePerformance() {
        // Debounce scroll events
        let scrollTimeout;
        const originalScrollHandlers = [];
        
        // Wrap existing scroll handlers
        window.addEventListener = (function(originalAddEventListener) {
            return function(type, listener, options) {
                if (type === 'scroll') {
                    originalScrollHandlers.push(listener);
                    return originalAddEventListener.call(this, type, function(e) {
                        clearTimeout(scrollTimeout);
                        scrollTimeout = setTimeout(() => listener(e), 16); // ~60fps
                    }, options);
                }
                return originalAddEventListener.call(this, type, listener, options);
            };
        })(window.addEventListener);
        
        // Optimize images
        this.optimizeImages();
        
        // Add service worker for caching (if supported)
        this.setupServiceWorker();
    }
    
    optimizeImages() {
        // Add lazy loading to images
        document.querySelectorAll('img').forEach(img => {
            if (!img.loading) {
                img.loading = 'lazy';
            }
            
            // Add fade-in effect when image loads
            if (!img.complete) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
            }
        });
    }
    
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }
    
    // Add notification system
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 0;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideInRight 0.3s ease;
            max-width: 350px;
            overflow: hidden;
        `;
        
        const notificationStyle = document.createElement('style');
        notificationStyle.textContent = `
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 15px 20px;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                opacity: 0.7;
                margin-left: auto;
                padding: 0;
                width: 20px;
                height: 20px;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        
        document.head.appendChild(notificationStyle);
        document.body.appendChild(notification);
        
        // Auto remove after duration
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
        
        return notification;
    }
    
    getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }
    
    getNotificationColor(type) {
        const colors = {
            success: '#26a69a',
            error: '#ef5350',
            warning: '#ffc107',
            info: '#4a6cf7'
        };
        return colors[type] || colors.info;
    }
}

// Initialize website enhancer
const websiteEnhancer = new WebsiteEnhancer();

// Make it globally available
window.websiteEnhancer = websiteEnhancer;

