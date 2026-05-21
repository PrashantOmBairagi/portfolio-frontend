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
    const minimizedProgressCircle = document.getElementById('minimized-progress-circle');

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
            }, 2000);
            
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
    
    if (minimizedProgressCircle) {
        minimizedProgressCircle.addEventListener('click', () => {
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
});
