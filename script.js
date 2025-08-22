// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initNavigationEffects();
    initImageInteractions();
    initParticleBackground();
    createProgressBar();
    setTimeout(initTypingAnimation, 500);
    initKonamiCode();
    initDeviceCardEffects();
});

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Add active class animation
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 300);
            }
        });
    });
}

// Scroll-based Animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    const cards = document.querySelectorAll('.device-card, .feature, .result-item');
    
    // Intersection Observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Staggered animation for cards
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = `slideInUp 0.6s ease-out forwards`;
                    entry.target.style.opacity = '1';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        cardObserver.observe(card);
    });
}

// Navigation Effects - FIXED: Removed navbar hiding on scroll
function initNavigationEffects() {
    const navbar = document.querySelector('.navbar');
    
    // Navbar scroll effect - only change background and shadow
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        }
        
        // REMOVED: Hide/show navbar functionality that was causing header to disappear
    });
    
    // Active section highlighting
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Image Interactions - FIXED: Removed opacity hiding
function initImageInteractions() {
    const images = document.querySelectorAll('.responsive-image');
    
    images.forEach(image => {
        // REMOVED: Initial opacity and transform settings that were hiding images
        
        // Add click to zoom effect
        image.addEventListener('click', () => {
            createImageModal(image);
        });
        
        // Add hover effect
        image.addEventListener('mouseenter', () => {
            image.style.transform = 'scale(1.05)';
            image.style.filter = 'brightness(1.1)';
        });
        
        image.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1)';
            image.style.filter = 'brightness(1)';
        });
    });
}

// Create Image Modal for zoom effect
function createImageModal(image) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-content">
                <img src="${image.src}" alt="${image.alt}" class="modal-image">
                <button class="modal-close">&times;</button>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    const modalImage = modal.querySelector('.modal-image');
    modalImage.style.cssText = `
        width: 100%;
        height: auto;
        border-radius: 10px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    `;
    
    const closeButton = modal.querySelector('.modal-close');
    closeButton.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.3s ease;
    `;
    
    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    });
    
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.backgroundColor = 'transparent';
    });
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close modal events
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    };
    
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.className === 'modal-backdrop') {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// Particle Background Effect
function initParticleBackground() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(hero);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const animationDuration = Math.random() * 20 + 10;
    const delay = Math.random() * 20;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        animation: float ${animationDuration}s infinite linear;
        animation-delay: ${delay}s;
        pointer-events: none;
    `;
    
    container.appendChild(particle);
}

// Device Card Interactive Effects
function initDeviceCardEffects() {
    const deviceCards = document.querySelectorAll('.device-card');
    
    deviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add glowing effect
            this.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.4), 0 0 20px rgba(102, 126, 234, 0.3)';
            
            // Animate icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Progress Bar Animation
function createProgressBar() {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'scroll-progress';
    progressContainer.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(0, 0, 0, 0.1);
        z-index: 999;
    `;
    
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.style.cssText = `
        height: 100%;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        width: 0%;
        transition: width 0.1s ease;
    `;
    
    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Typing Animation for Hero Title
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid white';
    
    let index = 0;
    const typeSpeed = 100;
    
    function typeWriter() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, typeSpeed);
        } else {
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 500);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// Konami Code Easter Egg
function initKonamiCode() {
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join('') === konamiSequence.join('')) {
            // Easter egg effect
            document.body.style.animation = 'rainbow 2s ease infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });
}