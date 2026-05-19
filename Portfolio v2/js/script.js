document.addEventListener('DOMContentLoaded', () => {
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
        let targetOverscroll = 0;
        let isInteracting = false;
        let animationFrameId = null;
        let interactionTimeout = null;

        function startAnimation() {
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(updateStretch);
            }
        }

        function resetInteractionTimeout() {
            if (interactionTimeout) clearTimeout(interactionTimeout);
            interactionTimeout = setTimeout(() => {
                isInteracting = false;
            }, 100); // Smooth transition back after scroll wheel action stops
        }

        function updateStretch() {
            // Damping coefficients: snappy responsive tracking, super fast elastic return
            const lerpFactor = isInteracting ? 0.28 : 0.20;
            
            if (!isInteracting) {
                targetOverscroll += (0 - targetOverscroll) * 0.25; // Snappy return of target to zero
            }

            currentOverscroll += (targetOverscroll - currentOverscroll) * lerpFactor;

            // Apply transformed state if active
            if (Math.abs(currentOverscroll) > 0.05) {
                if (currentOverscroll > 0) {
                    stretchWrapper.style.transformOrigin = 'center top';
                    // Pure elastic stretch: keep top edge pinned, stretch body downwards
                    const sY = 1 + (currentOverscroll / 1800);
                    stretchWrapper.style.transform = `scaleY(${sY})`;
                } else {
                    stretchWrapper.style.transformOrigin = 'center bottom';
                    // Pure elastic stretch: keep footer pinned to bottom of page
                    // The rest of the body stretches upwards, leaving absolutely zero background gaps!
                    const sY = 1 + (Math.abs(currentOverscroll) / 1800);
                    stretchWrapper.style.transform = `scaleY(${sY})`;
                }
                animationFrameId = requestAnimationFrame(updateStretch);
            } else {
                stretchWrapper.style.transform = '';
                currentOverscroll = 0;
                targetOverscroll = 0;
                animationFrameId = null;
            }
        }

        // --- Wheel & Trackpad Interception ---
        window.addEventListener('wheel', (e) => {
            const isAtTop = window.scrollY <= 0;
            const isAtBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;

            if (isAtTop && (e.deltaY < 0 || targetOverscroll > 0)) {
                e.preventDefault();
                isInteracting = true;
                
                // Add to overscroll with high resistance; very subtle wheel multiplier (0.06) for butter smoothness
                const resistance = Math.max(0.1, 1 - (targetOverscroll / 50));
                targetOverscroll += -e.deltaY * 0.06 * resistance;
                targetOverscroll = Math.max(0, Math.min(42, targetOverscroll)); // Capped at tight 42px limit

                startAnimation();
                resetInteractionTimeout();
            } else if (isAtBottom && (e.deltaY > 0 || targetOverscroll < 0)) {
                e.preventDefault();
                isInteracting = true;

                const resistance = Math.max(0.1, 1 - (Math.abs(targetOverscroll) / 50));
                targetOverscroll += -e.deltaY * 0.06 * resistance;
                targetOverscroll = Math.min(0, Math.max(-42, targetOverscroll)); // Capped at tight 42px limit

                startAnimation();
                resetInteractionTimeout();
            }
        }, { passive: false });

        // --- Touch Gestures Interception ---
        let startY = 0;
        let isTouchOverscrolling = false;

        window.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                startY = e.touches[0].pageY;
                isInteracting = true;
                isTouchOverscrolling = false;
                startAnimation();
            }
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1) {
                const currentY = e.touches[0].pageY;
                const deltaY = currentY - startY;
                const isAtTop = window.scrollY <= 0;
                const isAtBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;

                if (isAtTop && deltaY > 0) {
                    isTouchOverscrolling = true;
                    isInteracting = true;
                    // Tightened resistance curve
                    targetOverscroll = Math.min(42, Math.pow(deltaY, 0.72) * 1.2);
                    startAnimation();
                    if (e.cancelable) e.preventDefault();
                } else if (isAtBottom && deltaY < 0) {
                    isTouchOverscrolling = true;
                    isInteracting = true;
                    targetOverscroll = -Math.min(42, Math.pow(Math.abs(deltaY), 0.72) * 1.2);
                    startAnimation();
                    if (e.cancelable) e.preventDefault();
                } else if (isTouchOverscrolling) {
                    isInteracting = true;
                    if (deltaY > 0 && isAtTop) {
                        targetOverscroll = Math.min(42, Math.pow(deltaY, 0.72) * 1.2);
                    } else if (deltaY < 0 && isAtBottom) {
                        targetOverscroll = -Math.min(42, Math.pow(Math.abs(deltaY), 0.72) * 1.2);
                    } else {
                        targetOverscroll = 0;
                    }
                    if (e.cancelable) e.preventDefault();
                }
            }
        }, { passive: false });

        window.addEventListener('touchend', () => {
            isInteracting = false;
            isTouchOverscrolling = false;
        }, { passive: true });

        window.addEventListener('touchcancel', () => {
            isInteracting = false;
            isTouchOverscrolling = false;
        }, { passive: true });
    }
});
