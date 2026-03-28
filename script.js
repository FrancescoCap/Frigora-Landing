(function () {
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
    const revealItems = document.querySelectorAll('.reveal');
    const yearElement = document.getElementById('year');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (yearElement) {
        yearElement.textContent = String(new Date().getFullYear());
    }


    function updateHeaderState() {
        if (!header) return;
        header.classList.toggle('scrolled', window.scrollY > 10);
    }

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });

    function closeMenu() {
        if (!menuToggle || !nav) return;
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    }

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            const isOpen = nav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', function (event) {
            const target = event.target;
            if (!(target instanceof Node)) return;
            if (!nav.contains(target) && !menuToggle.contains(target)) {
                closeMenu();
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth >= 960) {
                closeMenu();
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();

            const headerHeight = header ? header.offsetHeight : 0;
            const offset = target.getBoundingClientRect().top + window.scrollY - headerHeight - 10;

            window.scrollTo({
                top: offset,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        });
    });

    if (revealItems.length > 0) {
        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            revealItems.forEach(function (item) {
                item.classList.add('visible');
            });
        } else {
            const revealObserver = new IntersectionObserver(
                function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (!entry.isIntersecting) return;
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    });
                },
                {
                    threshold: 0.18,
                    rootMargin: '0px 0px -30px 0px'
                }
            );

            revealItems.forEach(function (item) {
                revealObserver.observe(item);
            });
        }
    }

})();
