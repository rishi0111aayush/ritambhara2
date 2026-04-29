// Header scroll effect
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        // If header has header-solid class (like on Partner page), add scrolled
        if (window.scrollY > 50 || header.classList.contains('header-solid')) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.getElementById('nav-overlay');

    const closeMenu = () => {
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        if (menuToggle) {
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
            }
        }
        if (window.lucide) window.lucide.createIcons();
    };

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                if (icon) icon.setAttribute('data-lucide', 'x');
            } else {
                if (icon) icon.setAttribute('data-lucide', 'menu');
            }
            if (window.lucide) window.lucide.createIcons();
        });

        // Close menu when clicking overlay
        if (navOverlay) {
            navOverlay.addEventListener('click', closeMenu);
        }

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize Lucide icons (if not already handled in HTML)
if (window.lucide) {
    window.lucide.createIcons();
}

// Slideshow Logic for Portfolio
let slideId = ["slideshow-ashadeep", "slideshow-wonder", "slideshow-urban"];
let slideIndex = [1, 1, 1];

// Function to handle next/prev buttons
window.plusSlides = function(n, no) {
  showSlides(slideIndex[no] += n, no);
}

// Function to handle dot navigation
window.currentSlide = function(n, no) {
  showSlides(slideIndex[no] = n, no);
}

window.showSlides = function(n, no) {
  let i;
  let slideshow = document.getElementById(slideId[no]);
  if (!slideshow) return;
  
  let x = slideshow.getElementsByClassName("slide");
  let dots = slideshow.getElementsByClassName("dot");
  
  if (n > x.length) {slideIndex[no] = 1}    
  if (n < 1) {slideIndex[no] = x.length}
  
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" active", "");
  }
  
  if (x[slideIndex[no]-1]) x[slideIndex[no]-1].style.display = "block";  
  if (dots[slideIndex[no]-1]) dots[slideIndex[no]-1].className += " active";
}
