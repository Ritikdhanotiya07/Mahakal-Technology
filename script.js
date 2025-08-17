// Initialize Splitting.js for character animations
Splitting();

document.addEventListener('DOMContentLoaded', function() {

    const cursor = document.querySelector('.cursor');
    const hoverElements = document.querySelectorAll('[data-cursor-hover]');

    // -------------------------
    // --- GSAP DEFAULTS ---
    // -------------------------
    gsap.defaults({
        duration: 1,
        ease: 'power3.out'
    });

    // -------------------------
    // --- MASTER TIMELINE ---
    // -------------------------
    const masterTimeline = gsap.timeline({ paused: true });

    // -------------------------
    // --- CUSTOM CURSOR LOGIC ---
    // -------------------------
    const initCursor = () => {
        window.addEventListener('mousemove', e => {
            gsap.to(cursor, {
                duration: 0.3,
                x: e.clientX,
                y: e.clientY,
                ease: 'power2.out'
            });
        });

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    };

    // -------------------------
    // --- HEADER SCROLL ---
    // -------------------------
    const initHeaderScroll = () => {
        const header = document.querySelector('header');
        ScrollTrigger.create({
            start: 'top top-=70',
            onUpdate: self => {
                self.direction === -1 ? header.classList.remove('scrolled') : header.classList.add('scrolled');
            }
        });
    };

    // -------------------------
    // --- PRELOADER ANIMATION ---
    // -------------------------
    const initPreloader = () => {
        const preloader = document.querySelector('.preloader');
        const preloaderLogo = document.querySelector('.preloader-logo');

        const preloaderTl = gsap.timeline();
        preloaderTl
            .from(preloaderLogo, {
                scale: 0.8,
                opacity: 0,
                duration: 1.5,
                ease: 'power3.inOut'
            })
            .to(preloaderLogo, {
                scale: 1.2,
                opacity: 0,
                duration: 1,
                ease: 'power3.in'
            }, "+=0.5")
            .to(preloader, {
                y: '-100%',
                duration: 1.5,
                ease: 'power4.inOut',
                onComplete: () => {
                    document.body.style.overflow = 'auto';
                    masterTimeline.play();
                }
            }, "-=0.5");
    };

    // -------------------------
    // --- HERO ANIMATION ---
    // -------------------------
    const initHeroAnimation = () => {
        const heroTl = gsap.timeline();
        heroTl
            .from('.main-headline .line', {
                y: '100%',
                stagger: 0.1,
                delay: 0.5
            })
            .from('.sub-headline', {
                y: 30,
                opacity: 0
            }, "-=0.5")
            .from('.cta-button', {
                y: 30,
                opacity: 0,
                scale: 0.9
            }, "-=0.8")
            .from('nav', {
                y: -30,
                opacity: 0
            }, "-=0.8");

        // Parallax Background Shape
        gsap.to('.hero-bg-shape', {
            scrollTrigger: {
                trigger: '.hero',
                scrub: 1,
                start: 'top top',
                end: 'bottom top'
            },
            scale: 1.5,
            y: '-30%',
            ease: 'none'
        });

        masterTimeline.add(heroTl);
    };

    // -------------------------
    // --- SCROLL-TRIGGERED ANIMATIONS ---
    // -------------------------
    const initScrollAnimations = () => {
        const sections = gsap.utils.toArray('section:not(.hero)');

        sections.forEach(section => {
            const sectionTitle = section.querySelector('.section-title[data-splitting]');
            const content = section.querySelectorAll('p, .card, .step, .about-image, .contact-form');

            const sectionTl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                }
            });

            if (sectionTitle) {
                sectionTl.from(sectionTitle.querySelectorAll('.char'), {
                    y: '100%',
                    opacity: 0,
                    stagger: 0.03,
                    ease: 'power3.out'
                });
            }

            sectionTl.from(content, {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                ease: 'power3.out'
            }, "-=0.5");
        });
    };

    // -------------------------
    // --- INITIALIZE EVERYTHING ---
    // -------------------------
    const init = () => {
        document.body.style.overflow = 'hidden';
        initCursor();
        initHeaderScroll();
        initHeroAnimation();
        initScrollAnimations();
        // Preloader must be last to start the master timeline
        initPreloader();
    };

    init();
});