// ===== Particle System (Background) =====
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-bg');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        this.mouse = { x: 0, y: 0, radius: 100 };
        
        this.init();
        this.animate();
        this.bindEvents();
    }
    
    init() {
        this.resizeCanvas();
        
        // Create particles
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                color: this.getRandomColor(),
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }
    
    getRandomColor() {
        const colors = [
            '#00ff9d', // Terminal Green
            '#00d9ff', // Terminal Blue
            '#b967ff', // Terminal Purple
            '#ff6bcb', // Terminal Pink
            '#ffcc00'  // Terminal Yellow
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resizeCanvas());
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
        
        window.addEventListener('mouseout', () => {
            this.mouse.x = 0;
            this.mouse.y = 0;
        });
    }
    
    drawParticles() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(0, 255, 157, ${0.1 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.mouse.radius) {
                const angle = Math.atan2(dy, dx);
                const force = (this.mouse.radius - distance) / this.mouse.radius;
                particle.x -= Math.cos(angle) * force * 5;
                particle.y -= Math.sin(angle) * force * 5;
            }
            
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off walls
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;
            
            // Keep particles within bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        });
    }
    
    animate() {
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// ===== Floating Code Generator =====
function generateFloatingCode() {
    const codeContainer = document.getElementById('floatingCode');
    if (!codeContainer) return;
    
    const codeSnippets = [
        'const developer = new Ayesha();',
        'function createAwesome() { return "🚀"; }',
        '<div class="code">Hello World!</div>',
        'flutter: build(BuildContext context)',
        'npm install success',
        'git commit -m "Update portfolio"',
        'const skills = ["React", "Flutter", "Node"];',
        'export default Portfolio;',
        'console.log("Ready to code!");',
        'docker-compose up --build',
        'async function innovate() {}',
        'state = { projects: 10 }',
        'SELECT * FROM skills WHERE awesome = true;',
        'Future<void> buildApps() async {}',
        'const creativity = ∞;',
        'while(true) { innovate(); }',
        'interface Developer { code(): void; }',
        'try { buildSomething(); } catch { tryAgain(); }'
    ];
    
    // Clear existing snippets
    codeContainer.innerHTML = '';
    
    // Create new snippets
    for(let i = 0; i < 8; i++) {
        const snippet = document.createElement('div');
        snippet.className = 'code-snippet';
        snippet.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        snippet.style.left = `${Math.random() * 100}%`;
        snippet.style.top = `${Math.random() * 100}%`;
        snippet.style.animationDelay = `${Math.random() * 20}s`;
        snippet.style.animationDuration = `${20 + Math.random() * 30}s`;
        snippet.style.opacity = Math.random() * 0.2 + 0.05;
        codeContainer.appendChild(snippet);
    }
}

// ===== Image Loading Functions =====
function handleImageLoad(img) {
    img.classList.remove('image-loading');
    img.classList.add('image-loaded');
    const placeholder = img.previousElementSibling;
    if (placeholder && placeholder.classList.contains('image-placeholder')) {
        placeholder.style.opacity = '0';
        setTimeout(() => placeholder.style.display = 'none', 500);
    }
}

function handleImageError(img) {
    img.style.display = 'none';
    const placeholder = img.previousElementSibling;
    if (placeholder && placeholder.classList.contains('image-placeholder')) {
        placeholder.innerHTML = '<div class="slide-loading">⚠️ Image failed to load</div>';
        placeholder.style.display = 'flex';
        placeholder.style.alignItems = 'center';
        placeholder.style.justifyContent = 'center';
        placeholder.style.color = '#ff6bcb';
        placeholder.style.fontSize = '0.9rem';
    }
}

// ===== Typing Animation =====
class TypingAnimation {
    constructor() {
        this.typingContainer = document.getElementById('typingContent');
        if (!this.typingContainer) return;
        
        this.phrases = [
            "Full-Stack & Mobile Developer",
            "Computer Science Student",
            "UI/UX Enthusiast",
            "Problem Solver",
            "Tech Innovator",
            "Code Artisan",
            "Digital Creator",
            "Open Source Contributor"
        ];
        this.phraseIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isWaiting = false;
        this.speed = 100;
        this.start();
    }
    
    start() {
        setTimeout(() => this.type(), 1000);
    }
    
    type() {
        if (this.isWaiting) return;
        
        const currentPhrase = this.phrases[this.phraseIndex];
        
        if (!this.isDeleting && this.charIndex <= currentPhrase.length) {
            this.typingContainer.textContent = currentPhrase.substring(0, this.charIndex);
            this.charIndex++;
            this.speed = 80 + Math.random() * 40;
        } else if (this.isDeleting && this.charIndex >= 0) {
            this.typingContainer.textContent = currentPhrase.substring(0, this.charIndex);
            this.charIndex--;
            this.speed = 30 + Math.random() * 30;
        } else {
            this.isDeleting = !this.isDeleting;
            if (!this.isDeleting) {
                this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
            }
            this.isWaiting = true;
            this.speed = 1500;
            
            setTimeout(() => {
                this.isWaiting = false;
                this.type();
            }, 1500);
        }
        
        setTimeout(() => this.type(), this.speed);
    }
}

// ===== Enhanced Scroll Animation System =====
class ScrollAnimation {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in, .animate-on-scroll');
        this.triggerOffset = 150;
        this.init();
    }
    
    init() {
        this.checkElements();
        window.addEventListener('scroll', () => this.checkElements());
        window.addEventListener('resize', () => this.checkElements());
        
        // Initial check
        setTimeout(() => this.checkElements(), 100);
    }
    
    checkElements() {
        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = this.triggerOffset;
            
            if (elementTop < window.innerHeight - elementVisible) {
                this.animateElement(element);
            }
        });
        
        // Animate tech tags with delays
        document.querySelectorAll('.tech-tag').forEach((tag, index) => {
            const delay = tag.dataset.delay || index * 50;
            const elementTop = tag.getBoundingClientRect().top;
            
            if (elementTop < window.innerHeight - 100) {
                setTimeout(() => {
                    tag.style.opacity = '1';
                    tag.style.transform = 'translateY(0)';
                }, delay);
            }
        });
        
        // Animate skill bars
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const elementTop = bar.getBoundingClientRect().top;
            
            if (elementTop < window.innerHeight - 100) {
                const width = bar.getAttribute('data-width') || '80';
                bar.style.width = width + '%';
            }
        });
        
        // Animate timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            const elementTop = item.getBoundingClientRect().top;
            
            if (elementTop < window.innerHeight - 100) {
                item.classList.add('visible');
            }
        });
    }
    
    animateElement(element) {
        if (element.classList.contains('fade-in')) {
            element.classList.add('visible');
        }
        
        // Add specific animations based on class
        if (element.classList.contains('animate-slide-up')) {
            const delay = element.dataset.delay || 0;
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delay);
        }
        
        if (element.classList.contains('animate-slide-in')) {
            const delay = element.dataset.delay || 0;
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
            }, delay);
        }
        
        if (element.classList.contains('animate-pop-in')) {
            const delay = element.dataset.delay || 0;
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            }, delay);
        }
    }
}

// ===== Project Slider System =====
class ProjectSlider {
    constructor() {
        this.sliders = document.querySelectorAll('.slideshow-container');
        this.init();
    }
    
    init() {
        this.sliders.forEach(container => {
            const slides = container.querySelectorAll('.slide');
            const prevBtn = container.querySelector('.prev');
            const nextBtn = container.querySelector('.next');
            const indicators = container.querySelectorAll('.indicator');
            
            if (slides.length === 0) return;
            
            let currentSlide = 0;
            let slideInterval;
            
            const showSlide = (index) => {
                // Validate index
                if (index < 0) index = slides.length - 1;
                if (index >= slides.length) index = 0;
                
                // Hide all slides
                slides.forEach((slide, i) => {
                    slide.classList.remove('active');
                    if (indicators.length > 0 && i < indicators.length) {
                        indicators[i].classList.remove('active');
                    }
                });
                
                // Show current slide
                slides[index].classList.add('active');
                if (indicators.length > 0 && index < indicators.length) {
                    indicators[index].classList.add('active');
                }
                
                currentSlide = index;
                
                // Preload next image
                const nextIndex = (index + 1) % slides.length;
                const nextImg = slides[nextIndex].querySelector('img');
                if (nextImg && !nextImg.classList.contains('image-loaded')) {
                    // Trigger image load
                    const src = nextImg.getAttribute('src');
                    if (src) {
                        const tempImg = new Image();
                        tempImg.src = src;
                    }
                }
            };
            
            const nextSlide = () => {
                showSlide((currentSlide + 1) % slides.length);
            };
            
            const prevSlide = () => {
                showSlide((currentSlide - 1 + slides.length) % slides.length);
            };
            
            // Auto advance slides every 6 seconds
            const startAutoSlide = () => {
                slideInterval = setInterval(nextSlide, 6000);
            };
            
            const stopAutoSlide = () => {
                clearInterval(slideInterval);
            };
            
            const resetAutoSlide = () => {
                stopAutoSlide();
                startAutoSlide();
            };
            
            // Start auto-slide
            startAutoSlide();
            
            // Navigation buttons
            if (nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    nextSlide();
                    resetAutoSlide();
                });
            }
            
            if (prevBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    prevSlide();
                    resetAutoSlide();
                });
            }
            
            // Indicator clicks
            if (indicators.length > 0) {
                indicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', (e) => {
                        e.stopPropagation();
                        showSlide(index);
                        resetAutoSlide();
                    });
                });
            }
            
            // Pause on hover
            container.addEventListener('mouseenter', stopAutoSlide);
            container.addEventListener('mouseleave', startAutoSlide);
            
            // Touch swipe support
            let touchStartX = 0;
            let touchEndX = 0;
            
            container.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoSlide();
            }, { passive: true });
            
            container.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                startAutoSlide();
            }, { passive: true });
            
            const handleSwipe = () => {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                    resetAutoSlide();
                }
            };
            
            // Initialize first slide
            showSlide(0);
            
            // Set tabindex for accessibility
            slides.forEach((slide, index) => {
                slide.setAttribute('tabindex', '0');
                slide.setAttribute('aria-label', `Slide ${index + 1} of ${slides.length}`);
            });
        });
    }
}

// ===== Project Filtering System =====
class ProjectFilter {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }
    
    init() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                // Filter projects with animation
                this.projectCards.forEach((card, index) => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        setTimeout(() => {
                            card.style.display = 'block';
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, index * 100);
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// ===== Notification System =====
class NotificationSystem {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'notification-container';
        this.container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 99999;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(this.container);
    }
    
    show(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            background: var(--terminal-card);
            border: 2px solid ${this.getBorderColor(type)};
            color: ${this.getTextColor(type)};
            padding: 1rem 1.5rem;
            border-radius: 10px;
            font-family: 'Fira Code', monospace;
            display: flex;
            align-items: center;
            gap: 10px;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            max-width: 300px;
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        `;
        
        const icon = this.getIcon(type);
        notification.innerHTML = `
            <i class="bi ${icon}" style="font-size: 1.2rem;"></i>
            <span>${message}</span>
        `;
        
        this.container.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 300);
            }, duration);
        }
        
        // Add close button functionality
        notification.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        });
        
        return notification;
    }
    
    getBorderColor(type) {
        const colors = {
            success: 'var(--terminal-green)',
            error: 'var(--terminal-pink)',
            warning: 'var(--terminal-yellow)',
            info: 'var(--terminal-blue)'
        };
        return colors[type] || colors.info;
    }
    
    getTextColor(type) {
        const colors = {
            success: 'var(--terminal-green)',
            error: 'var(--terminal-pink)',
            warning: 'var(--terminal-yellow)',
            info: 'var(--terminal-blue)'
        };
        return colors[type] || colors.info;
    }
    
    getIcon(type) {
        const icons = {
            success: 'bi-check-circle-fill',
            error: 'bi-exclamation-circle-fill',
            warning: 'bi-exclamation-triangle-fill',
            info: 'bi-info-circle-fill'
        };
        return icons[type] || icons.info;
    }
}

// ===== 2-Second Straight Loader =====
class QuickLoader {
    constructor() {
        this.loader = document.getElementById('loader');
        if (!this.loader) {
            this.initPortfolio();
            return;
        }
        
        // Start 2-second timer
        setTimeout(() => this.hideLoader(), 2000);
        
        // Animate terminal lines with staggered delays
        this.animateTerminalLines();
    }
    
    animateTerminalLines() {
        const lines = document.querySelectorAll('.terminal-line');
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }, index * 300);
        });
    }
    
    hideLoader() {
        if (!this.loader) return;
        
        // Fade out loader
        this.loader.style.opacity = '0';
        this.loader.style.transition = 'opacity 0.3s ease';
        
        // Remove from DOM after fade out
        setTimeout(() => {
            this.loader.style.display = 'none';
            this.initPortfolio();
        }, 300);
    }
    
    initPortfolio() {
        // Initialize all portfolio components
        new Portfolio();
    }
}

// ===== Main Portfolio Class =====
class Portfolio {
    constructor() {
        this.notifications = new NotificationSystem();
        this.init();
    }
    
    init() {
        // Initialize systems
        this.initParticleSystem();
        this.initFloatingCode();
        this.initNavigation();
        this.initThemeToggle();
        this.initScrollToTop();
        this.initContactForm();
        this.initAnimations();
        this.initEventListeners();
        
        // Initialize animations
        setTimeout(() => {
            new ScrollAnimation();
            new ProjectSlider();
            new ProjectFilter();
            new TypingAnimation();
        }, 100);
        
        // Show welcome notification
        setTimeout(() => {
            this.notifications.show('🚀 Portfolio loaded successfully!', 'success', 3000);
        }, 500);
        
        // Initial scroll check
        setTimeout(() => {
            const scrollAnim = new ScrollAnimation();
            scrollAnim.checkElements();
        }, 200);
    }
    
    initParticleSystem() {
        try {
            new ParticleSystem();
        } catch (error) {
            console.log('Particle system not initialized:', error.message);
        }
    }
    
    initFloatingCode() {
        try {
            generateFloatingCode();
        } catch (error) {
            console.log('Floating code not initialized:', error.message);
        }
    }
    
    initNavigation() {
        const nav = document.getElementById('main-nav');
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        
        if (!nav || !mobileToggle || !navLinks) return;
        
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            // Update active nav link
            const sections = document.querySelectorAll('section');
            const scrollPos = window.pageYOffset + 150;
            
            let currentSection = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                }
            });
            
            // Update active link
            document.querySelectorAll('#navLinks a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        });
        
        // Mobile menu toggle
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
        
        // Smooth scroll for nav links
        document.querySelectorAll('#navLinks a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    mobileToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;
        
        const savedTheme = localStorage.getItem('theme');
        
        // Apply saved theme
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }
        
        // Toggle theme
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Save preference
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                this.notifications.show('🌙 Dark mode activated', 'info', 2000);
            } else {
                localStorage.setItem('theme', 'light');
                this.notifications.show('☀️ Light mode activated', 'info', 2000);
            }
        });
    }
    
    initScrollToTop() {
        const scrollBtn = document.getElementById('scrollToTop');
        if (!scrollBtn) return;
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    initContactForm() {
        const form = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        
        if (!form || !submitBtn) return;
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Disable submit button
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(form);
                
                // Add honeypot field
                formData.append('_gotcha', '');
                
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    this.notifications.show('✅ Message sent successfully!', 'success', 5000);
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Form error:', error);
                this.notifications.show('❌ Error sending message. Please try again.', 'error', 5000);
            } finally {
                // Re-enable submit button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
        
        // Form validation styling
        form.querySelectorAll('.form-control').forEach(field => {
            field.addEventListener('input', function() {
                if (this.checkValidity()) {
                    this.style.borderColor = 'var(--terminal-green)';
                } else {
                    this.style.borderColor = 'var(--terminal-border)';
                }
            });
            
            field.addEventListener('invalid', function(e) {
                e.preventDefault();
                this.style.borderColor = 'var(--terminal-pink)';
                this.notifications.show('Please fill in all required fields correctly.', 'error', 3000);
            });
        });
    }
    
    initAnimations() {
        // Add hover effects to buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Add ripple effect to buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
        
        // Add CSS for ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Animate elements on hover
        document.querySelectorAll('.highlight-card, .skill-category, .project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.zIndex = '1';
            });
        });
    }
    
    initEventListeners() {
        // PDF download tracking
        document.querySelectorAll('a[href*=".pdf"]').forEach(link => {
            link.addEventListener('click', () => {
                this.notifications.show('📥 Downloading resume...', 'info', 2000);
                
                // Track download in localStorage
                let downloads = parseInt(localStorage.getItem('resumeDownloads') || '0');
                localStorage.setItem('resumeDownloads', (downloads + 1).toString());
            });
        });
        
        // Social media links animation
        document.querySelectorAll('.social-icon').forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) rotate(5deg)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotate(0)';
            });
        });
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + T to toggle theme
            if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                e.preventDefault();
                document.getElementById('themeToggle')?.click();
            }
            
            // Esc to close mobile menu
            if (e.key === 'Escape') {
                document.getElementById('mobileToggle')?.classList.remove('active');
                document.getElementById('navLinks')?.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
        
        // Initialize Intersection Observer for scroll animations
        this.initIntersectionObserver();
    }
    
    initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Add specific animations based on data attributes
                    const delay = entry.target.dataset.delay;
                    if (delay) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, parseInt(delay));
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe elements
        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    }
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    // Start the 2-second loader
    new QuickLoader();
    
    // Add console greeting
    console.log('%c✨ Ayesha Muneer Portfolio', 
        'color: #00ff9d; font-size: 18px; font-weight: bold; font-family: "Fira Code", monospace;');
    console.log('%c🚀 Loading in 2 seconds...', 
        'color: #00d9ff; font-size: 14px; font-family: "Fira Code", monospace;');
});

// Easter egg: Simple Konami code
(function() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                konamiIndex = 0;
                
                // Trigger easter egg
                const notification = new NotificationSystem();
                notification.show('🎮 Cheat code activated!', 'success', 3000);
                
                // Add some fun animations
                document.querySelectorAll('.code-snippet').forEach(snippet => {
                    snippet.style.animationDuration = '3s';
                    snippet.style.color = '#ffcc00';
                    
                    setTimeout(() => {
                        snippet.style.animationDuration = '';
                        snippet.style.color = '';
                    }, 2000);
                });
            }
        } else {
            konamiIndex = 0;
        }
    });
})();
