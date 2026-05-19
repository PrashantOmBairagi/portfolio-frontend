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
});
