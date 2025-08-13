// ForexMaster Pro - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupNavigationEvents();
    setupModalEvents();
    setupFormValidation();
    setupAnimations();
    startLivePriceUpdates();
    setupMobileMenu();
    
    console.log('ForexMaster Pro initialized successfully!');
}

// Navigation Functions
function setupNavigationEvents() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const tickerHeight = document.querySelector('.trading-ticker').offsetHeight;
        const offset = headerHeight + tickerHeight + 20;
        
        const sectionTop = section.offsetTop - offset;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Mobile Menu Functions
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('mobile-active');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Modal Functions
function setupModalEvents() {
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add fade in animation
        setTimeout(() => {
            modal.querySelector('.modal-content').classList.add('fade-in-up');
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset form if it exists
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
            clearFormErrors(form);
        }
    }
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

function openLoginModal() {
    openModal('loginModal');
}

function openSignupModal() {
    openModal('signupModal');
}

function openDemoModal() {
    openModal('demoModal');
}

function openSupportModal() {
    // For now, show an alert. You can implement a proper support modal
    alert('Thank you for your interest in supporting us! This feature will redirect to our donation page.');
}

function openTermsModal() {
    // For now, show an alert. You can implement a proper terms modal
    alert('Terms & Conditions modal would open here. Please check our website for full terms.');
}

function openForgotPasswordModal() {
    closeAllModals();
    alert('Password reset functionality would be implemented here. Please contact support for assistance.');
}

function switchToSignup() {
    closeModal('loginModal');
    openSignupModal();
}

function switchToLogin() {
    closeModal('signupModal');
    openLoginModal();
}

// Form Validation and Handling
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Password validation
    if (fieldName === 'password' && value) {
        if (value.length < 8) {
            isValid = false;
            errorMessage = 'Password must be at least 8 characters long';
        }
    }
    
    // Confirm password validation
    if (fieldName === 'confirmPassword' && value) {
        const passwordField = field.form.querySelector('input[name="password"]');
        if (passwordField && value !== passwordField.value) {
            isValid = false;
            errorMessage = 'Passwords do not match';
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.color = '#ff4757';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '5px';
    errorElement.textContent = message;
    
    field.style.borderColor = '#ff4757';
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
}

function clearFormErrors(form) {
    const errorElements = form.querySelectorAll('.field-error');
    errorElements.forEach(error => error.remove());
    
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Form Submission Handlers
function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        const formData = new FormData(form);
        const email = formData.get('email');
        
        // Simulate successful login
        showSuccessMessage('Login successful! Welcome back to ForexMaster Pro.');
        closeModal('loginModal');
        
        // Update UI to show logged in state
        updateUIForLoggedInUser(email);
        
        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
    }, 2000);
}

function handleSignup(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        const formData = new FormData(form);
        const firstName = formData.get('firstName');
        const email = formData.get('email');
        
        // Simulate successful signup
        showSuccessMessage(`Welcome to ForexMaster Pro, ${firstName}! Your account has been created successfully.`);
        closeModal('signupModal');
        
        // Update UI to show logged in state
        updateUIForLoggedInUser(email);
        
        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
    }, 2000);
}

function handleDemo(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        const formData = new FormData(form);
        const name = formData.get('name');
        
        // Simulate successful demo account creation
        showSuccessMessage(`Demo account created successfully for ${name}! You now have $100,000 virtual money to practice trading.`);
        closeModal('demoModal');
        
        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        
        // Redirect to demo dashboard (simulate)
        setTimeout(() => {
            alert('Redirecting to your demo trading dashboard...');
        }, 1000);
    }, 2000);
}

// UI Update Functions
function updateUIForLoggedInUser(email) {
    // Update auth buttons
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        authButtons.innerHTML = `
            <div class="user-menu">
                <span class="user-email">${email}</span>
                <button class="btn btn-logout" onclick="handleLogout()">
                    <i class="fas fa-sign-out-alt"></i>
                    Logout
                </button>
            </div>
        `;
    }
    
    // Update welcome message
    setTimeout(() => {
        showWelcomeMessage();
    }, 500);
}

function handleLogout() {
    // Reset UI to logged out state
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        authButtons.innerHTML = `
            <button class="btn btn-login" onclick="openLoginModal()">
                <i class="fas fa-sign-in-alt"></i>
                Login
            </button>
            <button class="btn btn-trading" onclick="openSignupModal()">
                Start Trading
            </button>
        `;
    }
    
    showSuccessMessage('You have been logged out successfully.');
}

// Notification Functions
function showSuccessMessage(message) {
    const notification = createNotification(message, 'success');
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function showErrorMessage(message) {
    const notification = createNotification(message, 'error');
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function createNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentNode.parentNode.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10001;
        background: ${type === 'success' ? 'linear-gradient(135deg, #5cb85c, #449d44)' : 'linear-gradient(135deg, #ff4757, #ff3742)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.3s ease;
        max-width: 350px;
        font-size: 14px;
        font-weight: 500;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
        opacity: 0.8;
        font-size: 12px;
    `;
    
    // Add show class styles
    const style = document.createElement('style');
    style.textContent = `
        .notification.show {
            transform: translateX(0) !important;
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);
    
    return notification;
}

function showWelcomeMessage() {
    const welcomeModal = document.createElement('div');
    welcomeModal.className = 'welcome-modal';
    welcomeModal.innerHTML = `
        <div class="welcome-content">
            <div class="welcome-header">
                <i class="fas fa-rocket"></i>
                <h2>Welcome to ForexMaster Pro!</h2>
            </div>
            <div class="welcome-body">
                <p>You now have access to:</p>
                <ul>
                    <li><i class="fas fa-check"></i> 5000+ Trading Resources</li>
                    <li><i class="fas fa-check"></i> AI-Powered Signals</li>
                    <li><i class="fas fa-check"></i> Community Forum Access</li>
                    <li><i class="fas fa-check"></i> Live Trading Tools</li>
                    <li><i class="fas fa-check"></i> 24/7 Support</li>
                </ul>
                <button class="btn btn-primary" onclick="this.closest('.welcome-modal').remove()">
                    Get Started
                </button>
            </div>
        </div>
    `;
    
    welcomeModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
        z-index: 10002;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const content = welcomeModal.querySelector('.welcome-content');
    content.style.cssText = `
        background: linear-gradient(135deg, #1a1d3a 0%, #2d3561 100%);
        border-radius: 20px;
        padding: 40px;
        max-width: 500px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: white;
    `;
    
    document.body.appendChild(welcomeModal);
}

// Live Price Updates
function startLivePriceUpdates() {
    const priceItems = document.querySelectorAll('.price-item .price');
    
    setInterval(() => {
        priceItems.forEach(priceElement => {
            updatePrice(priceElement);
        });
    }, 3000); // Update every 3 seconds
}

function updatePrice(priceElement) {
    const currentText = priceElement.textContent;
    const isPositive = Math.random() > 0.5;
    
    // Simulate price change
    const changeAmount = (Math.random() * 0.02 - 0.01).toFixed(4);
    const changePercent = (Math.random() * 0.5 - 0.25).toFixed(2);
    
    // Update class based on change
    priceElement.classList.remove('positive', 'negative');
    priceElement.classList.add(parseFloat(changeAmount) >= 0 ? 'positive' : 'negative');
    
    // Add flash effect
    priceElement.style.background = parseFloat(changeAmount) >= 0 ? 'rgba(92, 184, 92, 0.3)' : 'rgba(255, 71, 87, 0.3)';
    setTimeout(() => {
        priceElement.style.background = 'transparent';
    }, 500);
}

// Animation Functions
function setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(
        '.stat-item, .access-card, .education-item, .signal-feature, .community-stat'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Smooth scrolling for anchor links
function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const tickerHeight = document.querySelector('.trading-ticker').offsetHeight;
        const offset = headerHeight + tickerHeight + 20;
        
        window.scrollTo({
            top: target.offsetTop - offset,
            behavior: 'smooth'
        });
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization: Throttle scroll events
const throttledScrollHandler = debounce(() => {
    // Handle scroll events here if needed
    const scrollTop = window.pageYOffset;
    const header = document.querySelector('.header');
    
    if (scrollTop > 100) {
        header.style.background = 'rgba(26, 29, 58, 0.98)';
    } else {
        header.style.background = 'rgba(26, 29, 58, 0.95)';
    }
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        closeAllModals();
    }
    
    // Navigate sections with arrow keys (when no input is focused)
    if (!document.activeElement.matches('input, textarea, select')) {
        const sections = ['home', 'education', 'community', 'signals'];
        const currentSection = getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            e.preventDefault();
            scrollToSection(sections[currentIndex + 1]);
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            scrollToSection(sections[currentIndex - 1]);
        }
    }
});

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollTop = window.pageYOffset + 200;
    
    for (let section of sections) {
        if (scrollTop >= section.offsetTop && scrollTop < section.offsetTop + section.offsetHeight) {
            return section.id;
        }
    }
    return 'home';
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Optionally show user-friendly error message
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(function(registrationError) {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}

// Export functions for global access
window.ForexMasterPro = {
    openLoginModal,
    openSignupModal,
    openDemoModal,
    openSupportModal,
    closeModal,
    scrollToSection,
    handleLogin,
    handleSignup,
    handleDemo
};

console.log('ForexMaster Pro JavaScript loaded successfully!');

