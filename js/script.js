// Dark Mode Toggle Functionality
        class ThemeManager {
            constructor() {
                this.darkModeToggle = document.getElementById('darkModeToggle');
                this.body = document.body;
                this.currentTheme = localStorage.getItem('theme') || 'light';
                
                this.init();
            }
            
            init() {
                // Set initial theme
                this.setTheme(this.currentTheme);
                
                // Add event listener
                this.darkModeToggle.addEventListener('click', () => this.toggleTheme());
            }
            
            setTheme(theme) {
                this.body.setAttribute('data-theme', theme);
                this.darkModeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
                localStorage.setItem('theme', theme);
                this.currentTheme = theme;
            }
            
            toggleTheme() {
                const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
                this.setTheme(newTheme);
            }
        }

        // Mobile Navigation
        class MobileNavigation {
            constructor() {
                this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
                this.navLinks = document.getElementById('navLinks');
                this.isOpen = false;
                
                this.init();
            }
            
            init() {
                this.mobileMenuBtn.addEventListener('click', () => this.toggleMenu());
                
                // Close menu when clicking on a link
                this.navLinks.addEventListener('click', (e) => {
                    if (e.target.tagName === 'A') {
                        this.closeMenu();
                    }
                });
                
                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!e.target.closest('.nav') && this.isOpen) {
                        this.closeMenu();
                    }
                });
            }
            
            toggleMenu() {
                this.isOpen = !this.isOpen;
                this.navLinks.classList.toggle('active', this.isOpen);
                this.mobileMenuBtn.textContent = this.isOpen ? '✕' : '☰';
            }
            
            closeMenu() {
                this.isOpen = false;
                this.navLinks.classList.remove('active');
                this.mobileMenuBtn.textContent = '☰';
            }
        }

        // Smooth Scrolling for Navigation Links
        class SmoothScrolling {
            constructor() {
                this.init();
            }
            
            init() {
                document.addEventListener('click', (e) => {
                    if (e.target.matches('a[href^="#"]')) {
                        e.preventDefault();
                        const targetId = e.target.getAttribute('href').substring(1);
                        const targetElement = document.getElementById(targetId);
                        
                        if (targetElement) {
                            const headerHeight = document.querySelector('.header').offsetHeight;
                            const targetPosition = targetElement.offsetTop - headerHeight;
                            
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            }
        }

        // Contact Form Handler
        class ContactForm {
            constructor() {
                this.form = document.getElementById('contactForm');
                this.init();
            }
            
            init() {
                this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            }
            
            handleSubmit(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this.form);
                const data = Object.fromEntries(formData);
                
                // Simulate form submission
                this.showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                this.form.reset();
            }
            
            showMessage(message, type) {
                // Create message element
                const messageEl = document.createElement('div');
                messageEl.textContent = message;
                messageEl.style.cssText = `
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: ${type === 'success' ? '#10b981' : '#ef4444'};
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    z-index: 10000;
                    animation: slideIn 0.3s ease;
                `;
                
                document.body.appendChild(messageEl);
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    messageEl.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => messageEl.remove(), 300);
                }, 5000);
            }
        }

        // Intersection Observer for Animations
        class ScrollAnimations {
            constructor() {
                this.init();
            }
            
            init() {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                            }
                        });
                    },
                    { threshold: 0.1 }
                );
                
                // Observe all sections except hero
                document.querySelectorAll('.section').forEach(section => {
                    section.style.opacity = '0';
                    observer.observe(section);
                });
            }
        }

        // Header Scroll Effect
        class HeaderScrollEffect {
            constructor() {
                this.header = document.querySelector('.header');
                this.init();
            }
            
            init() {
                let lastScrollY = window.scrollY;
                
                window.addEventListener('scroll', () => {
                    const currentScrollY = window.scrollY;
                    
                    if (currentScrollY > 100) {
                        this.header.style.transform = currentScrollY > lastScrollY ? 
                            'translateY(-100%)' : 'translateY(0)';
                        this.header.style.boxShadow = 'var(--shadow)';
                    } else {
                        this.header.style.transform = 'translateY(0)';
                        this.header.style.boxShadow = 'none';
                    }
                    
                    lastScrollY = currentScrollY;
                });
            }
        }

        // Initialize all components when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new ThemeManager();
            new MobileNavigation();
            new SmoothScrolling();
            new ContactForm();
            new ScrollAnimations();
            new HeaderScrollEffect();
        });