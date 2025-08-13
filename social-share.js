// Social Media Sharing System
class SocialShareManager {
    constructor() {
        this.initializeSocialSharing();
        this.setupFloatingShareButtons();
        this.trackShareEvents();
    }
    
    initializeSocialSharing() {
        // Add social share buttons to all content
        this.addShareButtonsToContent();
        this.createFloatingShareWidget();
        this.setupShareModal();
    }
    
    addShareButtonsToContent() {
        // Add share buttons to blog articles
        const blogCards = document.querySelectorAll('.content-card, .forum-thread, .course-card');
        blogCards.forEach(card => {
            if (!card.querySelector('.social-share-buttons')) {
                const shareButtons = this.createShareButtons(card);
                card.appendChild(shareButtons);
            }
        });
    }
    
    createShareButtons(element) {
        const shareContainer = document.createElement('div');
        shareContainer.className = 'social-share-buttons';
        
        const title = element.querySelector('.card-title, .thread-info h4, .course-title')?.textContent || 'ForexMaster Pro';
        const url = window.location.href;
        const description = element.querySelector('.card-description, .thread-content, .course-description')?.textContent || 'Professional Trading Platform';
        
        shareContainer.innerHTML = `
            <div class="share-label">
                <i class="fas fa-share-alt"></i>
                <span>Share</span>
            </div>
            <div class="share-buttons">
                <button class="share-btn facebook" onclick="socialShare.shareToFacebook('${encodeURIComponent(url)}', '${encodeURIComponent(title)}')">
                    <i class="fab fa-facebook-f"></i>
                </button>
                <button class="share-btn twitter" onclick="socialShare.shareToTwitter('${encodeURIComponent(url)}', '${encodeURIComponent(title)}')">
                    <i class="fab fa-twitter"></i>
                </button>
                <button class="share-btn linkedin" onclick="socialShare.shareToLinkedIn('${encodeURIComponent(url)}', '${encodeURIComponent(title)}', '${encodeURIComponent(description)}')">
                    <i class="fab fa-linkedin-in"></i>
                </button>
                <button class="share-btn telegram" onclick="socialShare.shareToTelegram('${encodeURIComponent(url)}', '${encodeURIComponent(title)}')">
                    <i class="fab fa-telegram-plane"></i>
                </button>
                <button class="share-btn whatsapp" onclick="socialShare.shareToWhatsApp('${encodeURIComponent(url)}', '${encodeURIComponent(title)}')">
                    <i class="fab fa-whatsapp"></i>
                </button>
                <button class="share-btn reddit" onclick="socialShare.shareToReddit('${encodeURIComponent(url)}', '${encodeURIComponent(title)}')">
                    <i class="fab fa-reddit-alien"></i>
                </button>
                <button class="share-btn copy" onclick="socialShare.copyToClipboard('${url}')">
                    <i class="fas fa-copy"></i>
                </button>
                <button class="share-btn more" onclick="socialShare.openShareModal('${encodeURIComponent(title)}', '${encodeURIComponent(url)}', '${encodeURIComponent(description)}')">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
            </div>
        `;
        
        return shareContainer;
    }
    
    createFloatingShareWidget() {
        const floatingWidget = document.createElement('div');
        floatingWidget.className = 'floating-share-widget';
        floatingWidget.id = 'floatingShareWidget';
        
        floatingWidget.innerHTML = `
            <div class="floating-share-toggle" onclick="socialShare.toggleFloatingShare()">
                <i class="fas fa-share-alt"></i>
            </div>
            <div class="floating-share-buttons">
                <button class="floating-share-btn facebook" onclick="socialShare.shareCurrentPage('facebook')" title="Share on Facebook">
                    <i class="fab fa-facebook-f"></i>
                </button>
                <button class="floating-share-btn twitter" onclick="socialShare.shareCurrentPage('twitter')" title="Share on Twitter">
                    <i class="fab fa-twitter"></i>
                </button>
                <button class="floating-share-btn linkedin" onclick="socialShare.shareCurrentPage('linkedin')" title="Share on LinkedIn">
                    <i class="fab fa-linkedin-in"></i>
                </button>
                <button class="floating-share-btn telegram" onclick="socialShare.shareCurrentPage('telegram')" title="Share on Telegram">
                    <i class="fab fa-telegram-plane"></i>
                </button>
                <button class="floating-share-btn whatsapp" onclick="socialShare.shareCurrentPage('whatsapp')" title="Share on WhatsApp">
                    <i class="fab fa-whatsapp"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(floatingWidget);
    }
    
    setupShareModal() {
        const shareModal = document.createElement('div');
        shareModal.className = 'share-modal';
        shareModal.id = 'shareModal';
        
        shareModal.innerHTML = `
            <div class="share-modal-content">
                <div class="share-modal-header">
                    <h3>Share This Content</h3>
                    <span class="share-modal-close" onclick="socialShare.closeShareModal()">&times;</span>
                </div>
                <div class="share-modal-body">
                    <div class="share-url-section">
                        <label>Share URL:</label>
                        <div class="url-copy-container">
                            <input type="text" id="shareUrlInput" readonly>
                            <button onclick="socialShare.copyShareUrl()">
                                <i class="fas fa-copy"></i>
                            </button>
                        </div>
                    </div>
                    <div class="share-platforms-grid">
                        <button class="platform-btn facebook" onclick="socialShare.shareModalTo('facebook')">
                            <i class="fab fa-facebook-f"></i>
                            <span>Facebook</span>
                        </button>
                        <button class="platform-btn twitter" onclick="socialShare.shareModalTo('twitter')">
                            <i class="fab fa-twitter"></i>
                            <span>Twitter</span>
                        </button>
                        <button class="platform-btn linkedin" onclick="socialShare.shareModalTo('linkedin')">
                            <i class="fab fa-linkedin-in"></i>
                            <span>LinkedIn</span>
                        </button>
                        <button class="platform-btn telegram" onclick="socialShare.shareModalTo('telegram')">
                            <i class="fab fa-telegram-plane"></i>
                            <span>Telegram</span>
                        </button>
                        <button class="platform-btn whatsapp" onclick="socialShare.shareModalTo('whatsapp')">
                            <i class="fab fa-whatsapp"></i>
                            <span>WhatsApp</span>
                        </button>
                        <button class="platform-btn reddit" onclick="socialShare.shareModalTo('reddit')">
                            <i class="fab fa-reddit-alien"></i>
                            <span>Reddit</span>
                        </button>
                        <button class="platform-btn pinterest" onclick="socialShare.shareModalTo('pinterest')">
                            <i class="fab fa-pinterest-p"></i>
                            <span>Pinterest</span>
                        </button>
                        <button class="platform-btn discord" onclick="socialShare.shareModalTo('discord')">
                            <i class="fab fa-discord"></i>
                            <span>Discord</span>
                        </button>
                        <button class="platform-btn email" onclick="socialShare.shareModalTo('email')">
                            <i class="fas fa-envelope"></i>
                            <span>Email</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(shareModal);
    }
    
    // Share functions for different platforms
    shareToFacebook(url, title) {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`;
        this.openShareWindow(shareUrl, 'Facebook');
        this.trackShare('facebook', title);
    }
    
    shareToTwitter(url, title) {
        const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}&hashtags=ForexTrading,TradingPlatform,ForexMasterPro`;
        this.openShareWindow(shareUrl, 'Twitter');
        this.trackShare('twitter', title);
    }
    
    shareToLinkedIn(url, title, description) {
        const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${description}`;
        this.openShareWindow(shareUrl, 'LinkedIn');
        this.trackShare('linkedin', title);
    }
    
    shareToTelegram(url, title) {
        const shareUrl = `https://t.me/share/url?url=${url}&text=${title}`;
        this.openShareWindow(shareUrl, 'Telegram');
        this.trackShare('telegram', title);
    }
    
    shareToWhatsApp(url, title) {
        const shareUrl = `https://wa.me/?text=${title}%20${url}`;
        this.openShareWindow(shareUrl, 'WhatsApp');
        this.trackShare('whatsapp', title);
    }
    
    shareToReddit(url, title) {
        const shareUrl = `https://reddit.com/submit?url=${url}&title=${title}`;
        this.openShareWindow(shareUrl, 'Reddit');
        this.trackShare('reddit', title);
    }
    
    shareToPinterest(url, title, image) {
        const shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${title}&media=${image || ''}`;
        this.openShareWindow(shareUrl, 'Pinterest');
        this.trackShare('pinterest', title);
    }
    
    shareToEmail(url, title, description) {
        const subject = encodeURIComponent(`Check out: ${decodeURIComponent(title)}`);
        const body = encodeURIComponent(`I thought you might be interested in this:\n\n${decodeURIComponent(title)}\n\n${decodeURIComponent(description)}\n\n${decodeURIComponent(url)}\n\nShared from ForexMaster Pro`);
        const shareUrl = `mailto:?subject=${subject}&body=${body}`;
        window.location.href = shareUrl;
        this.trackShare('email', title);
    }
    
    copyToClipboard(url) {
        navigator.clipboard.writeText(url).then(() => {
            this.showNotification('Link copied to clipboard!', 'success');
            this.trackShare('copy', 'URL copied');
        }).catch(err => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification('Link copied to clipboard!', 'success');
            this.trackShare('copy', 'URL copied');
        });
    }
    
    openShareWindow(url, platform) {
        const width = 600;
        const height = 400;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        
        window.open(
            url,
            `share-${platform}`,
            `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
        );
    }
    
    toggleFloatingShare() {
        const widget = document.getElementById('floatingShareWidget');
        widget.classList.toggle('active');
    }
    
    shareCurrentPage(platform) {
        const title = encodeURIComponent(document.title);
        const url = encodeURIComponent(window.location.href);
        const description = encodeURIComponent(document.querySelector('meta[name="description"]')?.content || 'Professional Trading Platform');
        
        switch (platform) {
            case 'facebook':
                this.shareToFacebook(url, title);
                break;
            case 'twitter':
                this.shareToTwitter(url, title);
                break;
            case 'linkedin':
                this.shareToLinkedIn(url, title, description);
                break;
            case 'telegram':
                this.shareToTelegram(url, title);
                break;
            case 'whatsapp':
                this.shareToWhatsApp(url, title);
                break;
        }
        
        this.toggleFloatingShare();
    }
    
    openShareModal(title, url, description) {
        const modal = document.getElementById('shareModal');
        const urlInput = document.getElementById('shareUrlInput');
        
        modal.style.display = 'block';
        urlInput.value = decodeURIComponent(url);
        
        // Store current share data
        modal.dataset.title = title;
        modal.dataset.url = url;
        modal.dataset.description = description;
    }
    
    closeShareModal() {
        document.getElementById('shareModal').style.display = 'none';
    }
    
    shareModalTo(platform) {
        const modal = document.getElementById('shareModal');
        const title = modal.dataset.title;
        const url = modal.dataset.url;
        const description = modal.dataset.description;
        
        switch (platform) {
            case 'facebook':
                this.shareToFacebook(url, title);
                break;
            case 'twitter':
                this.shareToTwitter(url, title);
                break;
            case 'linkedin':
                this.shareToLinkedIn(url, title, description);
                break;
            case 'telegram':
                this.shareToTelegram(url, title);
                break;
            case 'whatsapp':
                this.shareToWhatsApp(url, title);
                break;
            case 'reddit':
                this.shareToReddit(url, title);
                break;
            case 'pinterest':
                this.shareToPinterest(url, title);
                break;
            case 'email':
                this.shareToEmail(url, title, description);
                break;
        }
        
        this.closeShareModal();
    }
    
    copyShareUrl() {
        const urlInput = document.getElementById('shareUrlInput');
        urlInput.select();
        document.execCommand('copy');
        this.showNotification('URL copied to clipboard!', 'success');
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#26a69a' : '#4a6cf7'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    trackShareEvents() {
        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    trackShare(platform, content) {
        // Analytics tracking (can be integrated with Google Analytics or other services)
        console.log(`Share tracked: ${platform} - ${content}`);
        
        // Store share statistics
        const shares = JSON.parse(localStorage.getItem('shareStats') || '{}');
        shares[platform] = (shares[platform] || 0) + 1;
        localStorage.setItem('shareStats', JSON.stringify(shares));
        
        // You can add Google Analytics or other tracking here
        if (typeof gtag !== 'undefined') {
            gtag('event', 'share', {
                method: platform,
                content_type: 'article',
                item_id: content
            });
        }
    }
    
    getShareStats() {
        return JSON.parse(localStorage.getItem('shareStats') || '{}');
    }
}

// Initialize social sharing
const socialShare = new SocialShareManager();

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add share buttons to existing content
    setTimeout(() => {
        socialShare.addShareButtonsToContent();
    }, 1000);
});

