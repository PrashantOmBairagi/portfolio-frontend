document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Progress Indicator ---
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        let ticking = false;

        const updateScrollProgress = () => {
            const winScroll = window.scrollY || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            if (height > 0) {
                const scrolled = winScroll / height;
                scrollProgress.style.transform = `scaleX(${scrolled})`;
            } else {
                scrollProgress.style.transform = 'scaleX(0)';
            }
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollProgress);
                ticking = true;
            }
        }, { passive: true });
    }

    // --- Dark Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('i');

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('ph-moon');
            themeIcon.classList.add('ph-sun');
        } else {
            themeIcon.classList.remove('ph-sun');
            themeIcon.classList.add('ph-moon');
        }
    }

    // --- Mobile Menu Toggle ---
    const mobileMenuToggleBtn = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    const menuIcon = mobileMenuToggleBtn.querySelector('i');

    mobileMenuToggleBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        if (mobileMenu.classList.contains('active')) {
            menuIcon.classList.remove('ph-list');
            menuIcon.classList.add('ph-x');
        } else {
            menuIcon.classList.remove('ph-x');
            menuIcon.classList.add('ph-list');
        }
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuIcon.classList.remove('ph-x');
            menuIcon.classList.add('ph-list');
        });
    });

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    // --- Certificate Lightbox ---
    const lightbox       = document.getElementById('cert-lightbox');
    const lightboxImg    = document.getElementById('cert-lightbox-img');
    const lightboxTitle  = document.getElementById('cert-lightbox-title');
    const lightboxClose  = document.getElementById('cert-lightbox-close');
    const lightboxBack   = lightbox.querySelector('.cert-lightbox-backdrop');

    function openLightbox(imgSrc, title) {
        lightboxImg.src   = imgSrc;
        lightboxTitle.textContent = title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        // Clear image after fade-out so there's no flash on next open
        setTimeout(() => {
            lightboxImg.src = '';
        }, 350);
    }

    // Open on cert card click
    document.querySelectorAll('.cert-card[data-cert-img]').forEach(card => {
        card.addEventListener('click', () => {
            openLightbox(card.dataset.certImg, card.dataset.certTitle);
        });
    });

    // Close on backdrop click
    lightboxBack.addEventListener('click', closeLightbox);

    // Close on X button
    lightboxClose.addEventListener('click', closeLightbox);

    // Close on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // --- Smooth Elastic Overscroll Stretch Effect ---
    const stretchWrapper = document.getElementById('scroll-stretch-wrapper');
    if (stretchWrapper) {
        let currentOverscroll = 0;
        let velocity = 0;
        let isTouchActive = false;
        let lastWheelTime = 0;
        let lastTouchY = 0;
        let animationFrameId = null;

        // Constants
        const k = 0.12; // Spring stiffness
        const c = 0.65; // Damping constant
        
        function getMaxLimit() {
            // Very subtle caps: 14px on desktop, 8px on mobile/tablets
            return window.innerWidth <= 768 ? 8 : 14;
        }

        function startAnimation() {
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(updatePhysics);
            }
        }

        function updatePhysics() {
            const now = performance.now();
            const isWheelInteracting = (now - lastWheelTime) < 80;
            const isUserInteracting = isTouchActive || isWheelInteracting;

            if (!isUserInteracting) {
                // Apply spring physics: force = -k*x, damping = -c*v
                const force = -k * currentOverscroll;
                const damping = -c * velocity;
                const acceleration = force + damping;
                velocity += acceleration;
                currentOverscroll += velocity;
            } else {
                velocity = 0;
            }

            // Apply transforms and loop or rest
            if (Math.abs(currentOverscroll) > 0.05) {
                if (currentOverscroll > 0) {
                    stretchWrapper.style.transformOrigin = 'center top';
                    const sY = 1 + (currentOverscroll / 2000);
                    stretchWrapper.style.transform = `scaleY(${sY})`;
                } else {
                    stretchWrapper.style.transformOrigin = 'center bottom';
                    const sY = 1 + (Math.abs(currentOverscroll) / 2000);
                    stretchWrapper.style.transform = `scaleY(${sY})`;
                }
                animationFrameId = requestAnimationFrame(updatePhysics);
            } else {
                stretchWrapper.style.transform = '';
                currentOverscroll = 0;
                velocity = 0;
                animationFrameId = null;
            }
        }

        // --- Wheel & Trackpad Listener ---
        window.addEventListener('wheel', (e) => {
            const maxLimit = getMaxLimit();
            const isAtTop = window.scrollY <= 0;
            // Subtract 1px for high-dpi screens and subpixel scrolling
            const isAtBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;

            if (isAtTop && e.deltaY < 0) {
                // Entering top overscroll
                e.preventDefault();
                lastWheelTime = performance.now();
                
                // Quadratic resistance curve for premium natural stiffness
                const resistance = Math.max(0.1, 1 - (currentOverscroll / maxLimit));
                currentOverscroll += -e.deltaY * 0.04 * resistance;
                currentOverscroll = Math.min(maxLimit, currentOverscroll);
                
                startAnimation();
            } else if (isAtBottom && e.deltaY > 0) {
                // Entering bottom overscroll
                e.preventDefault();
                lastWheelTime = performance.now();

                const resistance = Math.max(0.1, 1 - (Math.abs(currentOverscroll) / maxLimit));
                currentOverscroll += -e.deltaY * 0.04 * resistance;
                currentOverscroll = Math.max(-maxLimit, currentOverscroll);

                startAnimation();
            } else {
                // If scrolling in the opposite direction, immediately release the overscroll
                // to let the browser scroll natively without stickiness or locking.
                if (currentOverscroll > 0 && e.deltaY > 0) {
                    currentOverscroll = 0;
                    velocity = 0;
                    stretchWrapper.style.transform = '';
                } else if (currentOverscroll < 0 && e.deltaY < 0) {
                    currentOverscroll = 0;
                    velocity = 0;
                    stretchWrapper.style.transform = '';
                }
            }
        }, { passive: false });

        // --- Touch Gestures Listener ---
        window.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                lastTouchY = e.touches[0].clientY;
                isTouchActive = true;
                startAnimation();
            }
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1) {
                const currentY = e.touches[0].clientY;
                const touchDeltaY = currentY - lastTouchY;
                lastTouchY = currentY;

                const maxLimit = getMaxLimit();
                const isAtTop = window.scrollY <= 0;
                const isAtBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;

                if (isAtTop && touchDeltaY > 0) {
                    // Dragging down past top boundary
                    if (e.cancelable) {
                        e.preventDefault();
                        const resistance = Math.max(0.1, 1 - (currentOverscroll / maxLimit));
                        currentOverscroll += touchDeltaY * 0.30 * resistance;
                        currentOverscroll = Math.min(maxLimit, currentOverscroll);
                        startAnimation();
                    }
                } else if (isAtBottom && touchDeltaY < 0) {
                    // Dragging up past bottom boundary
                    if (e.cancelable) {
                        e.preventDefault();
                        const resistance = Math.max(0.1, 1 - (Math.abs(currentOverscroll) / maxLimit));
                        currentOverscroll += touchDeltaY * 0.30 * resistance;
                        currentOverscroll = Math.max(-maxLimit, currentOverscroll);
                        startAnimation();
                    }
                } else {
                    // Scrolling within normal page boundaries or reversing gesture direction
                    if (currentOverscroll > 0 && touchDeltaY < 0) {
                        // User swiping up while top-overscrolled: decay overscroll
                        currentOverscroll = Math.max(0, currentOverscroll + touchDeltaY * 0.5);
                    } else if (currentOverscroll < 0 && touchDeltaY > 0) {
                        // User swiping down while bottom-overscrolled: decay overscroll
                        currentOverscroll = Math.min(0, currentOverscroll + touchDeltaY * 0.5);
                    }
                }
            }
        }, { passive: false });

        window.addEventListener('touchend', () => {
            isTouchActive = false;
        }, { passive: true });

        window.addEventListener('touchcancel', () => {
            isTouchActive = false;
        }, { passive: true });
    }

    // --- Contact Form Logic ---
    const contactForm = document.getElementById('contact-form');
    const contactModal = document.getElementById('contact-modal');
    const contactModalLoading = document.getElementById('contact-modal-loading');
    const contactModalSuccess = document.getElementById('contact-modal-success');
    const contactModalError = document.getElementById('contact-modal-error');
    const contactLoadingMsg = document.getElementById('contact-loading-msg');
    const submitBtn = document.getElementById('submit-btn');
    const contactModalCloseBtns = document.querySelectorAll('.contact-modal-close-btn');
    
    // New Minimized Progress UI elements
    const minimizedProgressUI = document.getElementById('minimized-progress-ui');
    const floatingMailBtn = document.querySelector('.floating-mail-btn');

    const loadingMessages = [
        "Developer is currently fighting NullPointerException…",
        "Backend engineer claims this API works. Verifying…",
        "Spring Boot is warming up… please pretend to be patient.",
        "Developer may or may not know what he is doing.",
        "Negotiating with PostgreSQL…",
        "Contacting the cloud database somewhere in Singapore…",
        "Compiling confidence…",
        "Prashant insists this works."
    ];
    
    let loadingInterval;
    let isSubmitting = false;
    let isMinimized = false;
    let autoMinimizeTimeout = null;

    function showContactModal(state) {
        // Reset states
        if (contactModalLoading) contactModalLoading.style.display = 'none';
        if (contactModalSuccess) contactModalSuccess.style.display = 'none';
        if (contactModalError) contactModalError.style.display = 'none';
        clearInterval(loadingInterval);
        
        if (state === 'loading') {
            if (contactModalLoading) contactModalLoading.style.display = 'block';
            let msgIndex = 0;
            if (contactLoadingMsg) contactLoadingMsg.textContent = loadingMessages[0];
            
            loadingInterval = setInterval(() => {
                msgIndex = (msgIndex + 1) % loadingMessages.length;
                
                // Add a small fade effect
                if (contactLoadingMsg) {
                    contactLoadingMsg.style.opacity = 0;
                    setTimeout(() => {
                        contactLoadingMsg.textContent = loadingMessages[msgIndex];
                        contactLoadingMsg.style.opacity = 1;
                    }, 300);
                }
            }, 3000);
            
        } else if (state === 'success') {
            if (contactModalSuccess) contactModalSuccess.style.display = 'block';
            
            // Easter Egg Logic
            const easterEggEl = document.getElementById('contact-easter-egg');
            if (easterEggEl) {
                const easterEggs = [
                    "First real backend project says hello.",
                    "Somewhere in Neon DB, a new row was born. 😭",
                    "Spring Boot didn't crash this time. A miracle.",
                    "The backend works. I'm as surprised as you are.",
                    "100% hand-crafted artisan API response."
                ];
                const randomEgg = easterEggs[Math.floor(Math.random() * easterEggs.length)];
                easterEggEl.textContent = randomEgg;
            }
        } else if (state === 'error') {
            if (contactModalError) contactModalError.style.display = 'block';
        }

        if (contactModal) contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeContactModal() {
        if (contactModal) contactModal.classList.remove('active');
        document.body.style.overflow = '';
        clearInterval(loadingInterval);
        isMinimized = false;
        if (minimizedProgressUI) minimizedProgressUI.style.display = 'none';
    }
    
    function minimizeContactModal() {
        if (contactModal) contactModal.classList.remove('active');
        document.body.style.overflow = '';
        clearInterval(loadingInterval);
        isMinimized = true;
        if (minimizedProgressUI) {
            minimizedProgressUI.style.display = 'flex';
        }
    }
    
    function restoreContactModal(state) {
        isMinimized = false;
        if (minimizedProgressUI) {
            minimizedProgressUI.style.display = 'none';
        }
        showContactModal(state);
    }
    
    if (minimizedProgressUI) {
        minimizedProgressUI.addEventListener('click', () => {
            if (isSubmitting) {
                restoreContactModal('loading');
            }
        });
    }
    
    // Add transition to loading msg
    if (contactLoadingMsg) {
        contactLoadingMsg.style.transition = 'opacity 0.3s ease';
    }

    // Clear errors when typing
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                input.classList.remove('error');
                const errorSpan = document.getElementById(input.id + '-error');
                if (errorSpan) {
                    errorSpan.classList.remove('active');
                }
            }
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Prevent duplicate submissions
            if (isSubmitting) return;
            
            // Clear existing errors
            const errorFields = document.querySelectorAll('.form-input.error');
            errorFields.forEach(f => f.classList.remove('error'));
            const errorMsgs = document.querySelectorAll('.field-error-msg.active');
            errorMsgs.forEach(m => {
                m.classList.remove('active');
                m.textContent = '';
            });
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            const name = data.name ? data.name.trim() : '';
            const phone = data.phone ? data.phone.trim() : '';
            const email = data.email ? data.email.trim() : '';
            const message = data.message ? data.message.trim() : '';
            
            let hasFrontendError = false;

            const showError = (fieldId, msg) => {
                const input = document.getElementById(fieldId);
                const errorSpan = document.getElementById(fieldId + '-error');
                if (input && errorSpan) {
                    input.classList.add('error');
                    errorSpan.textContent = msg;
                    errorSpan.classList.add('active');
                    hasFrontendError = true;
                }
            };

            // Lightweight Frontend Validation
            if (name.length < 2) {
                showError('name', 'Name must be at least 2 characters');
            }
            if (phone && !/^\d{10}$/.test(phone)) {
                showError('phone', 'Phone number must be exactly 10 digits');
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showError('email', 'Enter a valid email');
            }
            if (message.length < 5) {
                showError('message', 'Message must be at least 5 characters');
            }

            if (hasFrontendError) {
                return;
            }
            
            isSubmitting = true;
            isMinimized = false;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            showContactModal('loading');
            
            // Auto minimize after 8 seconds
            if (autoMinimizeTimeout) clearTimeout(autoMinimizeTimeout);
            autoMinimizeTimeout = setTimeout(() => {
                if (isSubmitting && !isMinimized) {
                    minimizeContactModal();
                }
            }, 8000);
            
            try {
                const response = await fetch('https://portfolio-backend-api-onqc.onrender.com/api/contacts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                if (response.ok) {
                    if (isMinimized) {
                        restoreContactModal('success');
                    } else {
                        showContactModal('success');
                    }
                    contactForm.reset();
                } else if (response.status === 400) {
                    closeContactModal(); // Hide loading modal completely on validation error
                    const errors = await response.json();
                    for (const [field, msg] of Object.entries(errors)) {
                        showError(field, msg);
                    }
                } else {
                    const errDesc = document.querySelector('#contact-modal-error .contact-modal-desc');
                    if (errDesc) {
                        if (isMinimized) {
                            errDesc.innerHTML = 'Looks like the backend is still waking up — give it another moment and try again.<br><br>The cloud is a little slow today.';
                        } else {
                            errDesc.innerHTML = 'Either the backend is sleeping, the cloud is confused, or the developer forgot something.<br><br>Try again in a bit.';
                        }
                    }
                    if (isMinimized) {
                        restoreContactModal('error');
                    } else {
                        showContactModal('error');
                    }
                }
            } catch (error) {
                console.error("Contact Form Error:", error);
                const errDesc = document.querySelector('#contact-modal-error .contact-modal-desc');
                if (errDesc) {
                    if (isMinimized) {
                        errDesc.innerHTML = 'Looks like the backend is still waking up — give it another moment and try again.<br><br>Connection timed out or failed.';
                    } else {
                        errDesc.innerHTML = 'Either the backend is sleeping, the cloud is confused, or the developer forgot something.<br><br>Try again in a bit.';
                    }
                }
                if (isMinimized) {
                    restoreContactModal('error');
                } else {
                    showContactModal('error');
                }
            } finally {
                isSubmitting = false;
                if (autoMinimizeTimeout) clearTimeout(autoMinimizeTimeout);
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
    }

    if (contactModalCloseBtns) {
        contactModalCloseBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (isSubmitting && contactModalLoading && contactModalLoading.style.display === 'block') {
                    minimizeContactModal();
                } else {
                    closeContactModal();
                }
            });
        });
    }

    // Close/Minimize on backdrop click
    const contactModalBackdrop = document.getElementById('contact-modal-backdrop');
    if (contactModalBackdrop) {
        contactModalBackdrop.addEventListener('click', () => {
            if (isSubmitting && contactModalLoading && contactModalLoading.style.display === 'block') {
                minimizeContactModal();
            } else if (contactModalLoading && contactModalLoading.style.display !== 'block') {
                closeContactModal();
            }
        });
    }

    // --- Active Navigation Link Observer ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
    
    if (sections.length > 0 && navLinks.length > 0) {
        const activeSectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, {
            root: null,
            threshold: 0.25,
            rootMargin: "-20% 0px -50% 0px"
        });

        sections.forEach(sec => activeSectionObserver.observe(sec));
    }

    // --- Magnetic Hover Effect on Floating Button & Socials ---
    const magneticElements = document.querySelectorAll('.floating-mail-btn, .hero-social-icon');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px) scale(1.05)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
});
