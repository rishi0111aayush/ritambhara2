// Minimal initialization - run only what's needed
(function() {
    'use strict';

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        initHeader();
        initMobileMenu();
        
        // Defer non-critical items
        setTimeout(function() {
            initLucideIcons();
            initSmoothScroll();
            initSlideshow();
        }, 0);
    }

    // Header scroll effect - optimized
    function initHeader() {
        var header = document.getElementById('header');
        if (!header) return;
        
        var ticking = false;
        
        function handleScroll() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    var scrollY = window.scrollY;
                    if (scrollY > 50 || header.classList.contains('header-solid')) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    // Mobile Menu Handler - clean and simple
    function initMobileMenu() {
        var menuToggle = document.getElementById('mobile-menu-toggle');
        var mobileMenu = document.getElementById('mobile-menu');
        var navOverlay = document.getElementById('nav-overlay');
        var menuClose = document.getElementById('mobile-menu-close');
        
        if (!menuToggle || !mobileMenu) return;

        function openMenu() {
            mobileMenu.classList.add('active');
            navOverlay.classList.add('active');
            document.body.classList.add('menu-open');
            updateIcon('x');
        }

        function closeMenu() {
            mobileMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            updateIcon('menu');
        }

        function updateIcon(name) {
            var icon = menuToggle.querySelector('i');
            if (icon && window.lucide) {
                icon.setAttribute('data-lucide', name);
                window.lucide.createIcons();
            }
        }

        // Toggle click
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            if (mobileMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close button
        if (menuClose) {
            menuClose.addEventListener('click', closeMenu);
        }

        // Overlay click
        if (navOverlay) {
            navOverlay.addEventListener('click', closeMenu);
        }

        // Links close menu
        var links = mobileMenu.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', closeMenu);
        }

        // Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // Lucide Icons
    function initLucideIcons() {
        if (window.lucide && window.lucide.createIcons) {
            window.lucide.createIcons();
        }
    }

    // Smooth scroll
    function initSmoothScroll() {
        var anchors = document.querySelectorAll('a[href^="#"]');
        for (var i = 0; i < anchors.length; i++) {
            anchors[i].addEventListener('click', function(e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                var target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // Slideshow
    var slideId = ['slideshow-ashadeep', 'slideshow-wonder', 'slideshow-urban'];
    var slideIndex = [1, 1, 1];

    window.plusSlides = function(n, no) {
        showSlides(slideIndex[no] += n, no);
    };

    window.currentSlide = function(n, no) {
        showSlides(slideIndex[no] = n, no);
    };

    window.showSlides = function(n, no) {
        var slideshow = document.getElementById(slideId[no]);
        if (!slideshow) return;
        
        var slides = slideshow.getElementsByClassName('slide');
        var dots = slideshow.getElementsByClassName('dot');
        
        if (n > slides.length) slideIndex[no] = 1;
        if (n < 1) slideIndex[no] = slides.length;
        
        for (var i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        for (var j = 0; j < dots.length; j++) {
            dots[j].className = dots[j].className.replace(' active', '');
        }
        
        if (slides[slideIndex[no] - 1]) {
            slides[slideIndex[no] - 1].style.display = 'block';
        }
        if (dots[slideIndex[no] - 1]) {
            dots[slideIndex[no] - 1].className += ' active';
        }
    };

    function initSlideshow() {
        for (var i = 0; i < slideId.length; i++) {
            showSlides(1, i);
        }
    }
})();