// Intersection Observer options
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Intersection Observer callback
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
};

// Create the Intersection Observer
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Function to set up animations
const setupAnimations = () => {
    // Animate main sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.classList.add('fade-in', `delay-${index + 1}`);
        observer.observe(section);
    });

    // Animate stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.classList.add('scale-in', `delay-${index + 1}`);
        observer.observe(item);
    });

    // Animate skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right', `delay-${index + 1}`);
        observer.observe(category);
    });

    // Animate education, experience, and activity items
    const items = document.querySelectorAll('.education-item, .experience-item, .activity-item');
    items.forEach((item, index) => {
        item.classList.add('fade-in', `delay-${index % 4 + 1}`);
        observer.observe(item);
    });

    const newElements = document.querySelectorAll('.project-card, .skill-bar');
    newElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
};

// Run setup when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    setupAnimations();
    setupSmoothScrolling();
    highlightActiveSection();
    setupFormSubmission(); // Add this new function call
});

// Function to set up smooth scrolling for navigation links
const setupSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Function to highlight active section in navigation
const highlightActiveSection = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
};

// Run setup when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    setupAnimations();
    setupSmoothScrolling();
    highlightActiveSection();
});


// Form submission handler
const setupFormSubmission = () => {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            console.log('Form submitted');
            // You can add an AJAX request to send the form data to a server
        });
    }
};





document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Form submitted');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('.skill-bar').forEach(bar => {
    observer.observe(bar);
});