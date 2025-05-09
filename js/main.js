// Initialize AOS animations
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        once: true
    });

    // Initialize variables
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const contactForm = document.getElementById('contactForm');
    const backToTop = document.querySelector('.back-to-top');
    const header = document.getElementById('header');
    const skillBars = document.querySelectorAll('.skill-progress-bar');

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        
        // Save the theme preference to localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Mobile Menu Toggle
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }

        // Header shadow on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Animate skill bars when in view
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                const percentage = bar.parentElement.previousElementSibling.lastElementChild.textContent;
                bar.style.width = percentage;
            }
        });

        // Active nav link on scroll
        const sections = document.querySelectorAll('section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Contact form submission - redirect to email client
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Create mailto link
            const mailtoLink = `mailto:shivam16yadav16@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Reset form
            contactForm.reset();
        });
    }

    // GitHub redirect handler
    const handleGitHubRedirect = (project) => {
        const githubUrls = {
            'filefusion': 'https://github.com/shivamtechstack/filefusion',
            'android-browser': 'https://github.com/shivamtechstack/android-browser',
            'url-shortener-api': 'https://github.com/shivamtechstack/url-shortener-api'
        };

        if (githubUrls[project]) {
            window.open(githubUrls[project], '_blank');
        } else {
            alert('GitHub repository not found');
        }
    };

    // Play Store redirect handler
    const handlePlayStoreRedirect = (project) => {
        const playStoreUrls = {
            'filefusion': 'https://play.google.com/store/apps/details?id=com.shivam.filefusion',
            'browser': 'https://play.google.com/store/apps/details?id=com.shivam.browser',
            'urlshortener': 'https://play.google.com/store/apps/details?id=com.shivam.urlshortener'
        };

        if (playStoreUrls[project]) {
            window.open(playStoreUrls[project], '_blank');
        } else {
            alert('Play Store listing not found');
        }
    };

    // Check for URL parameters for redirect pages
    const handleRedirectPages = () => {
        const url = new URL(window.location.href);
        const pathname = window.location.pathname;
        
        // GitHub redirect
        if (pathname.includes('github.html')) {
            const project = url.searchParams.get('project');
            if (project) {
                handleGitHubRedirect(project);
                window.location.href = 'index.html';
            }
        }
        
        // Play Store redirect
        if (pathname.includes('play-store.html')) {
            const project = url.searchParams.get('project');
            if (project) {
                handlePlayStoreRedirect(project);
                window.location.href = 'index.html';
            }
        }
    };

    // Handle redirects
    handleRedirectPages();

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
    }
});