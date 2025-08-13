// SEO Optimization System based on SEMrush Best Practices
class SEOOptimizer {
    constructor() {
        this.initializeSEO();
        this.setupStructuredData();
        this.optimizeMetaTags();
        this.setupAnalytics();
        this.enhancePerformance();
    }
    
    initializeSEO() {
        // Add essential meta tags if missing
        this.addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
        this.addMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
        this.addMetaTag('googlebot', 'index, follow');
        this.addMetaTag('bingbot', 'index, follow');
        
        // Social media meta tags
        this.addOpenGraphTags();
        this.addTwitterCardTags();
        
        // Technical SEO
        this.addCanonicalLink();
        this.setupHreflang();
        this.optimizeTitleTags();
    }
    
    addMetaTag(name, content) {
        if (!document.querySelector(`meta[name="${name}"]`)) {
            const meta = document.createElement('meta');
            meta.name = name;
            meta.content = content;
            document.head.appendChild(meta);
        }
    }
    
    addOpenGraphTags() {
        const ogTags = {
            'og:site_name': 'ForexMaster Pro',
            'og:type': 'website',
            'og:title': document.title || 'ForexMaster Pro - Professional Trading Platform',
            'og:description': this.getPageDescription(),
            'og:url': window.location.href,
            'og:image': this.getPageImage(),
            'og:image:width': '1200',
            'og:image:height': '630',
            'og:image:alt': 'ForexMaster Pro Trading Platform',
            'og:locale': 'en_US'
        };
        
        Object.entries(ogTags).forEach(([property, content]) => {
            if (!document.querySelector(`meta[property="${property}"]`)) {
                const meta = document.createElement('meta');
                meta.setAttribute('property', property);
                meta.content = content;
                document.head.appendChild(meta);
            }
        });
    }
    
    addTwitterCardTags() {
        const twitterTags = {
            'twitter:card': 'summary_large_image',
            'twitter:site': '@ForexMasterPro',
            'twitter:creator': '@ForexMasterPro',
            'twitter:title': document.title || 'ForexMaster Pro - Professional Trading Platform',
            'twitter:description': this.getPageDescription(),
            'twitter:image': this.getPageImage(),
            'twitter:image:alt': 'ForexMaster Pro Trading Platform'
        };
        
        Object.entries(twitterTags).forEach(([name, content]) => {
            if (!document.querySelector(`meta[name="${name}"]`)) {
                const meta = document.createElement('meta');
                meta.name = name;
                meta.content = content;
                document.head.appendChild(meta);
            }
        });
    }
    
    getPageDescription() {
        const existingDescription = document.querySelector('meta[name="description"]')?.content;
        if (existingDescription) return existingDescription;
        
        const pageDescriptions = {
            '/': 'ForexMaster Pro - Professional trading platform with 50+ indicators, AI signals, and comprehensive education. Join 50,000+ traders.',
            '/pages/chart.html': 'Advanced TradingView-style charting platform with 50+ technical indicators, Pine Script editor, and professional trading tools.',
            '/pages/education.html': 'Comprehensive trading education with 5000+ courses, expert instructors, and complete learning paths from beginner to advanced.',
            '/pages/community.html': 'Join 50,000+ active traders in our community forum. Share strategies, get insights, and learn from expert traders.',
            '/pages/signals.html': 'AI-powered trading signals with 87% accuracy. Get real-time alerts for forex, crypto, stocks, and commodities.',
            '/pages/tools.html': 'Professional trading tools including calculators, analyzers, and risk management utilities for successful trading.',
            '/pages/blog.html': 'Expert trading insights and market analysis. 300+ articles on forex, crypto, technical analysis, and trading psychology.',
            '/pages/research.html': 'Professional market research and analysis reports. Stay informed with daily market insights and economic forecasts.',
            '/pages/contact.html': 'Contact ForexMaster Pro support team. Get help with trading questions, platform issues, and partnership inquiries.'
        };
        
        const currentPath = window.location.pathname;
        return pageDescriptions[currentPath] || pageDescriptions['/'];
    }
    
    getPageImage() {
        // Return appropriate image based on page
        const baseUrl = window.location.origin;
        return `${baseUrl}/assets/og-image.png`; // You would add this image
    }
    
    addCanonicalLink() {
        if (!document.querySelector('link[rel="canonical"]')) {
            const canonical = document.createElement('link');
            canonical.rel = 'canonical';
            canonical.href = window.location.href.split('?')[0]; // Remove query parameters
            document.head.appendChild(canonical);
        }
    }
    
    setupHreflang() {
        // Add hreflang for international SEO (if needed)
        const hreflangLinks = [
            { hreflang: 'en', href: window.location.href },
            { hreflang: 'x-default', href: window.location.href }
        ];
        
        hreflangLinks.forEach(({ hreflang, href }) => {
            if (!document.querySelector(`link[hreflang="${hreflang}"]`)) {
                const link = document.createElement('link');
                link.rel = 'alternate';
                link.hreflang = hreflang;
                link.href = href;
                document.head.appendChild(link);
            }
        });
    }
    
    optimizeTitleTags() {
        if (!document.title) {
            const pageTitles = {
                '/': 'ForexMaster Pro - Professional Trading Platform | 50+ Indicators & AI Signals',
                '/pages/chart.html': 'Advanced Trading Chart Platform | TradingView-Style Charting | ForexMaster Pro',
                '/pages/education.html': 'Trading Education Hub | 5000+ Courses & Expert Training | ForexMaster Pro',
                '/pages/community.html': 'Trading Community Forum | 50,000+ Active Traders | ForexMaster Pro',
                '/pages/signals.html': 'AI Trading Signals | 87% Accuracy | Real-Time Alerts | ForexMaster Pro',
                '/pages/tools.html': 'Professional Trading Tools & Calculators | Risk Management | ForexMaster Pro',
                '/pages/blog.html': 'Trading Blog | Expert Market Analysis & Insights | ForexMaster Pro',
                '/pages/research.html': 'Market Research & Analysis | Daily Reports & Forecasts | ForexMaster Pro',
                '/pages/contact.html': 'Contact Us | Support & Partnership Inquiries | ForexMaster Pro'
            };
            
            const currentPath = window.location.pathname;
            document.title = pageTitles[currentPath] || pageTitles['/'];
        }
    }
    
    setupStructuredData() {
        // Add JSON-LD structured data
        this.addOrganizationSchema();
        this.addWebsiteSchema();
        this.addBreadcrumbSchema();
        this.addServiceSchema();
        this.addReviewSchema();
    }
    
    addOrganizationSchema() {
        const organizationSchema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "ForexMaster Pro",
            "url": window.location.origin,
            "logo": `${window.location.origin}/assets/logo.png`,
            "description": "Professional trading platform with advanced charting, AI signals, and comprehensive education for forex, crypto, and stock trading.",
            "foundingDate": "2024",
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-800-FOREX-PRO",
                "contactType": "Customer Service",
                "availableLanguage": ["English"],
                "areaServed": "Worldwide"
            },
            "sameAs": [
                "https://facebook.com/forexmasterpro",
                "https://twitter.com/forexmasterpro",
                "https://linkedin.com/company/forexmasterpro",
                "https://youtube.com/forexmasterpro"
            ],
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Wall Street, Suite 456",
                "addressLocality": "New York",
                "addressRegion": "NY",
                "postalCode": "10005",
                "addressCountry": "US"
            }
        };
        
        this.addStructuredDataScript(organizationSchema);
    }
    
    addWebsiteSchema() {
        const websiteSchema = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "ForexMaster Pro",
            "url": window.location.origin,
            "description": "Professional trading platform with advanced tools and education",
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `${window.location.origin}/search?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
            }
        };
        
        this.addStructuredDataScript(websiteSchema);
    }
    
    addBreadcrumbSchema() {
        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": this.generateBreadcrumbItems()
        };
        
        this.addStructuredDataScript(breadcrumbSchema);
    }
    
    generateBreadcrumbItems() {
        const pathParts = window.location.pathname.split('/').filter(part => part);
        const breadcrumbItems = [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": window.location.origin
            }
        ];
        
        let currentPath = window.location.origin;
        pathParts.forEach((part, index) => {
            currentPath += `/${part}`;
            const name = part.replace('.html', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
            
            breadcrumbItems.push({
                "@type": "ListItem",
                "position": index + 2,
                "name": name,
                "item": currentPath
            });
        });
        
        return breadcrumbItems;
    }
    
    addServiceSchema() {
        const serviceSchema = {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Professional Trading Platform",
            "description": "Comprehensive trading platform with advanced charting, AI signals, education, and community features",
            "provider": {
                "@type": "Organization",
                "name": "ForexMaster Pro"
            },
            "serviceType": "Financial Trading Platform",
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Trading Services",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Advanced Charting Platform"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "AI Trading Signals"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Trading Education"
                        }
                    }
                ]
            }
        };
        
        this.addStructuredDataScript(serviceSchema);
    }
    
    addReviewSchema() {
        const reviewSchema = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "ForexMaster Pro Trading Platform",
            "description": "Professional trading platform with advanced features",
            "brand": {
                "@type": "Brand",
                "name": "ForexMaster Pro"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "2847",
                "bestRating": "5",
                "worstRating": "1"
            },
            "review": [
                {
                    "@type": "Review",
                    "author": {
                        "@type": "Person",
                        "name": "John Smith"
                    },
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": "5",
                        "bestRating": "5"
                    },
                    "reviewBody": "Excellent trading platform with professional features and great community support."
                }
            ]
        };
        
        this.addStructuredDataScript(reviewSchema);
    }
    
    addStructuredDataScript(schema) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    }
    
    setupAnalytics() {
        // Google Analytics 4
        this.setupGA4();
        
        // Google Search Console verification
        this.addSearchConsoleVerification();
        
        // Facebook Pixel (optional)
        this.setupFacebookPixel();
    }
    
    setupGA4() {
        const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 ID
        
        // Load gtag script
        const gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(gtagScript);
        
        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID, {
            page_title: document.title,
            page_location: window.location.href
        });
        
        // Make gtag available globally
        window.gtag = gtag;
        
        // Track custom events
        this.setupCustomEvents();
    }
    
    setupCustomEvents() {
        // Track social shares
        document.addEventListener('social-share', (e) => {
            gtag('event', 'share', {
                method: e.detail.platform,
                content_type: e.detail.type,
                item_id: e.detail.content
            });
        });
        
        // Track chart interactions
        document.addEventListener('chart-interaction', (e) => {
            gtag('event', 'chart_interaction', {
                action: e.detail.action,
                tool: e.detail.tool
            });
        });
        
        // Track form submissions
        document.addEventListener('form-submit', (e) => {
            gtag('event', 'form_submit', {
                form_type: e.detail.type
            });
        });
    }
    
    addSearchConsoleVerification() {
        // Add Google Search Console verification meta tag
        const verificationMeta = document.createElement('meta');
        verificationMeta.name = 'google-site-verification';
        verificationMeta.content = 'your-verification-code-here'; // Replace with actual code
        document.head.appendChild(verificationMeta);
    }
    
    setupFacebookPixel() {
        const FACEBOOK_PIXEL_ID = 'YOUR_PIXEL_ID'; // Replace with your pixel ID
        
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        
        fbq('init', FACEBOOK_PIXEL_ID);
        fbq('track', 'PageView');
    }
    
    enhancePerformance() {
        // Lazy loading for images
        this.setupLazyLoading();
        
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Optimize loading strategy
        this.optimizeResourceLoading();
        
        // Add performance monitoring
        this.setupPerformanceMonitoring();
    }
    
    setupLazyLoading() {
        const images = document.querySelectorAll('img[src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
    
    preloadCriticalResources() {
        const criticalResources = [
            { href: 'styles.css', as: 'style' },
            { href: 'pages-styles.css', as: 'style' },
            { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap', as: 'style' },
            { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css', as: 'style' }
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.as === 'style') {
                link.onload = () => {
                    link.rel = 'stylesheet';
                };
            }
            document.head.appendChild(link);
        });
    }
    
    optimizeResourceLoading() {
        // Add resource hints
        const resourceHints = [
            { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
            { rel: 'dns-prefetch', href: '//cdnjs.cloudflare.com' },
            { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
        ];
        
        resourceHints.forEach(hint => {
            const link = document.createElement('link');
            link.rel = hint.rel;
            link.href = hint.href;
            if (hint.crossorigin) link.crossOrigin = hint.crossorigin;
            document.head.appendChild(link);
        });
    }
    
    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('web-vital' in window) {
            import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(this.sendToAnalytics);
                getFID(this.sendToAnalytics);
                getFCP(this.sendToAnalytics);
                getLCP(this.sendToAnalytics);
                getTTFB(this.sendToAnalytics);
            });
        }
        
        // Monitor page load performance
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            
            if (window.gtag) {
                gtag('event', 'page_load_time', {
                    value: Math.round(loadTime),
                    custom_parameter: 'load_time'
                });
            }
        });
    }
    
    sendToAnalytics(metric) {
        if (window.gtag) {
            gtag('event', metric.name, {
                value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                custom_parameter: 'web_vital'
            });
        }
    }
    
    // SEO-friendly URL generation
    generateSEOFriendlyURL(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }
    
    // Site search functionality for SEO
    setupSiteSearch() {
        const searchInput = document.getElementById('siteSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value;
                if (query.length > 2) {
                    this.performSiteSearch(query);
                }
            });
        }
    }
    
    performSiteSearch(query) {
        // Implement site search functionality
        const results = this.searchContent(query);
        this.displaySearchResults(results);
        
        // Track search in analytics
        if (window.gtag) {
            gtag('event', 'search', {
                search_term: query
            });
        }
    }
    
    searchContent(query) {
        // Search through all content
        const searchableContent = [
            ...document.querySelectorAll('h1, h2, h3, p, .content-card, .forum-thread')
        ];
        
        return searchableContent.filter(element => 
            element.textContent.toLowerCase().includes(query.toLowerCase())
        );
    }
    
    // Generate sitemap data
    generateSitemapData() {
        const pages = [
            { url: '/', priority: 1.0, changefreq: 'daily' },
            { url: '/pages/chart.html', priority: 0.9, changefreq: 'weekly' },
            { url: '/pages/education.html', priority: 0.8, changefreq: 'weekly' },
            { url: '/pages/community.html', priority: 0.8, changefreq: 'daily' },
            { url: '/pages/signals.html', priority: 0.9, changefreq: 'hourly' },
            { url: '/pages/tools.html', priority: 0.7, changefreq: 'weekly' },
            { url: '/pages/blog.html', priority: 0.8, changefreq: 'daily' },
            { url: '/pages/research.html', priority: 0.7, changefreq: 'daily' },
            { url: '/pages/contact.html', priority: 0.5, changefreq: 'monthly' }
        ];
        
        return pages.map(page => ({
            ...page,
            url: `${window.location.origin}${page.url}`,
            lastmod: new Date().toISOString()
        }));
    }
}

// Initialize SEO optimization
const seoOptimizer = new SEOOptimizer();

// Export for use in other scripts
window.seoOptimizer = seoOptimizer;

