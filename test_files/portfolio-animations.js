document.addEventListener('DOMContentLoaded', () => {
    setupAnimations();
    setupSmoothScrolling();
    highlightActiveSection();
    setupFormSubmission();
    animateSkillBars();
    setupScrollToTop();
  });
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
  }, observerOptions);
  
  function setupAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .skill-bar');
    animatedElements.forEach((el, index) => {
        el.classList.add(`delay-${index % 4 + 1}`);
        observer.observe(el);
    });
  }
  
  function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
  }
  
  function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
  
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - window.innerHeight / 2) {
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
  }
  
  function setupFormSubmission() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
        });
    }
  }
  
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const percentage = progressBar.getAttribute('data-percentage');
                progressBar.style.width = percentage;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
  
    skillBars.forEach(bar => observer.observe(bar));
  }
  
  function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
  
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
  
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
  
    requestAnimationFrame(animation);
  }
  
  function setupScrollToTop() {
    const scrollToTopButton = document.createElement('div');
    scrollToTopButton.classList.add('scroll-to-top');
    scrollToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollToTopButton);
  
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });
  
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
  }