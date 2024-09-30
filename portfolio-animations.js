document.addEventListener('DOMContentLoaded', () => {
    const functions = [
        setupAnimations,
        setupSmoothScrolling,
        highlightActiveSection,
        setupFormSubmission,
        animateSkillBars,
        setupScrollToTop
    ];
    functions.forEach(fn => fn());
});

const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    }),
    { root: null, rootMargin: '0px', threshold: 0.1 }
);

function setupAnimations() {
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in')
        .forEach((el, index) => {
            el.classList.add(`delay-${index % 4 + 1}`);
            observer.observe(el);
        });
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) smoothScroll(target, 1000);
        });
    });
}

function smoothScroll(target, duration) {
    const start = window.pageYOffset;
    const distance = target.getBoundingClientRect().top;
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        return t < 1 ? c / 2 * t * t + b : -c / 2 * ((--t) * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - window.innerHeight / 2) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').substring(1) === current);
        });
    });
}

function setupFormSubmission() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            console.log('Form submitted');
            form.reset();
            alert('Thank you for your message. I will get back to you soon!');
        });
    }
}

function animateSkillBars() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                progressBar.style.width = progressBar.getAttribute('data-percentage');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-bar').forEach(bar => observer.observe(bar));
}

function setupScrollToTop() {
    const button = document.createElement('div');
    button.classList.add('scroll-to-top');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        button.classList.toggle('visible', window.pageYOffset > 300);
    });

    button.addEventListener('click', () => smoothScroll(document.body, 1000));
}