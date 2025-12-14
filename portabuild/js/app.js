// ===== Dark Mode & General Interactivity =====

// Initialize dark mode (already applied via CSS, but we keep localStorage support)
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateNavbarState();
});

function initializeApp() {
    setupNavigation();
    setupSmoothScroll();
    setupHeroAnimation();
}
// ===== Navigation State Management =====
function updateNavbarState() {
    const session = JSON.parse(localStorage.getItem('portabuild_session'));
    const navDashboard = document.getElementById('navDashboard');
    const navLogin = document.getElementById('navLogin');
    const navRegister = document.getElementById('navRegister');
    const navLogout = document.getElementById('navLogout');

    if (session && navDashboard) {
        navDashboard.style.display = 'block';
        if (navLogin) navLogin.style.display = 'none';
        if (navRegister) navRegister.style.display = 'none';
        if (navLogout) navLogout.style.display = 'block';
    } else {
        if (navDashboard) navDashboard.style.display = 'none';
        if (navLogin) navLogin.style.display = 'block';
        if (navRegister) navRegister.style.display = 'block';
        if (navLogout) navLogout.style.display = 'none';
    }
}
// ===== Navigation Setup =====
function setupNavigation() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburgerBtn.setAttribute('aria-expanded', 
                hamburgerBtn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && hamburgerBtn && !navMenu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// ===== Smooth Scroll for Anchor Links =====
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just a hash
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Hero Animation =====
function setupHeroAnimation() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    if (heroContent && heroImage) {
        // Check if elements are in viewport and add visible class
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                }
            });
        }, observerOptions);

        observer.observe(heroContent);
        observer.observe(heroImage);
    }
}

// ===== Button Ripple Effect =====
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===== Form Input Focus Animation =====
const formInputs = document.querySelectorAll('input, select, textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.boxShadow = 'none';
    });
});

// ===== Scroll Reveal Animation =====
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.feature-card, .step');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible && !card.classList.contains('revealed')) {
            card.style.opacity = '1';
            card.classList.add('revealed');
        }
    });
});

// Ensure cards start with full opacity
document.querySelectorAll('.feature-card, .step').forEach(card => {
    card.style.opacity = '1';
});

// ===== Accessibility =====
document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape key
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        if (navMenu) {
            navMenu.classList.remove('active');
            const hamburgerBtn = document.getElementById('hamburgerBtn');
            if (hamburgerBtn) {
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        }
    }
});

console.log('PortaBuild app initialized successfully!');
