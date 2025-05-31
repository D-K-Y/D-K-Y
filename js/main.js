// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Scroll-Reveal Animations for Sections
const sections = document.querySelectorAll('main > section');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Fixed Active Navigation Highlighting
const navLinks = document.querySelectorAll('nav a[href^="#"]');

const highlightNavigation = () => {
    const scrollPosition = window.scrollY + 150; // Header offset
    let currentSection = 'home'; // Default to home

    // Get all sections and check from bottom to top
    const sectionsArray = Array.from(document.querySelectorAll('section[id]'));
    
    // Check each section from top to bottom
    for (let i = 0; i < sectionsArray.length; i++) {
        const section = sectionsArray[i];
        const sectionTop = section.offsetTop;
        
        if (scrollPosition >= sectionTop) {
            currentSection = section.id;
        }
    }

    // Special case: if we're near the bottom of the page, highlight contact
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    
    if (scrollTop + windowHeight >= documentHeight - 100) {
        currentSection = 'contact';
    }

    // Remove active class from all nav links
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to current section's nav link
    const activeLink = document.querySelector(`nav a[href="#${currentSection}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
};

// Listen for scroll events with throttling
let ticking = false;
const throttledHighlight = () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            highlightNavigation();
            ticking = false;
        });
        ticking = true;
    }
};

window.addEventListener('scroll', throttledHighlight);
window.addEventListener('load', highlightNavigation);

// Scroll-to-Top Button Functionality
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
}