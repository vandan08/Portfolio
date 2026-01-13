// Enhanced Portfolio Interactivity

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Initialize theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.setAttribute('data-theme', 'light');
    themeToggle.textContent = '☀️ Light';
} else {
    themeToggle.textContent = '🌙 Dark';
}

themeToggle.addEventListener('click', () => {
    if (body.hasAttribute('data-theme')) {
        body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙 Dark';
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        themeToggle.textContent = '☀️ Light';
        localStorage.setItem('theme', 'light');
    }
});

// Enhanced Cursor Trail
const cursorTrail = document.querySelector('.cursor-trail');
let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursorTrail() {
    const dx = mouseX - trailX;
    const dy = mouseY - trailY;

    trailX += dx * 0.15;
    trailY += dy * 0.15;

    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';

    requestAnimationFrame(updateCursorTrail);
}

updateCursorTrail();

// Enhanced Sparkle Effect on Click
document.addEventListener('click', (e) => {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';

            const angle = (Math.PI * 2 * i) / 8;
            const distance = 50 + Math.random() * 30;
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;

            sparkle.style.left = e.clientX + offsetX + 'px';
            sparkle.style.top = e.clientY + offsetY + 'px';
            document.body.appendChild(sparkle);

            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }, i * 50);
    }
});

// Project Modal Functions
const projectData = {
    'aveling-lms': {
        title: 'Aveling-LMS Portal',
        content: `
            <h3>Project Overview</h3>
            <p>A flagship enterprise-grade Learning Management System tailored for Aveling Australia, offering a unified experience across <strong>client, trainer, and admin portals</strong>. Designed to manage complex scheduling, course delivery, and financial operations for corporate and individual clients.</p>
            
            <h3>Key Features</h3>
            <ul>
                <li>Multi-role access: clients (individual/company), trainers, and admins</li>
                <li>Fully functional group booking and scheduling engine</li>
                <li>Invoice generation, company-level pricing, and payment management</li>
                <li>Secure and seamless <strong>Eway Payment Gateway</strong> integration</li>
                <li>Dynamic user interface with Angular for real-time interaction</li>
            </ul>
            
            <h3>Technical Implementation</h3>
            <ul>
                <li>Developed 20+ Angular components for dynamic UI across user roles</li>
                <li>Built RESTful backend services in Core Java for booking and invoice modules</li>
                <li>Used custom-built ORM for optimized database interactions</li>
                <li>Integrated external payment provider (Eway) for financial processing</li>
                <li>Managed deployment and debugging for both frontend and backend modules</li>
            </ul>
            
            <h3>Tech Stack</h3>
            <p>
                <span class="tech-tag">Java</span>
                <span class="tech-tag">Angular 19</span>
                <span class="tech-tag">TypeScript</span>
                <span class="tech-tag">REST APIs</span>
                <span class="tech-tag">ORM</span>
                <span class="tech-tag">Eway Gateway</span>
            </p>
        `
    },
    'task-manager': {
        title: 'Task Manager',
        content: `
            <h3>Project Overview</h3>
            <p>A robust in-memory Task Management system that supports hierarchical task-note structures and real-time updates. Built for quick prototyping, note-taking, and structured project tracking with scalability in mind.</p>
            
            <h3>Key Features</h3>
            <ul>
                <li>Nested notes and tasks with full CRUD operations</li>
                <li>DTO pattern for clean and efficient data transfer</li>
                <li>RESTful APIs designed with reusability and extensibility</li>
                <li>Spring layered architecture (Controller-Service-Repository)</li>
                <li>Unit-tested core functionalities for reliability</li>
            </ul>
            
            <h3>Technical Implementation</h3>
            <ul>
                <li>Implemented in-memory data structures for rapid response and low latency</li>
                <li>Applied DTO mapping and service-level abstraction for cleaner architecture</li>
                <li>Created REST APIs for task/note operations with Spring MVC</li>
                <li>Tested endpoints using Postman and JUnit</li>
            </ul>
            
            <h3>Tech Stack</h3>
            <p>
                <span class="tech-tag">Java</span>
                <span class="tech-tag">Spring Boot</span>
                <span class="tech-tag">Spring MVC</span>
                <span class="tech-tag">MySQL</span>
                <span class="tech-tag">REST APIs</span>
                <span class="tech-tag">DTO</span>
            </p>
        `
    },
    'skyline-estate': {
        title: 'Skyline Estate',
        content: `
            <h3>Project Overview</h3>
            <p>A modern real estate platform that breaks away from conventional limitations by allowing dynamic property type creation and better property discovery. Built for property owners and seekers with seamless listing and search experience.</p>
            
            <h3>Key Features</h3>
            <ul>
                <li>Dynamic property type selection during listing creation</li>
                <li>Advanced filtering and category management</li>
                <li>User dashboard for property listing and management</li>
                <li>Mobile-first responsive UI for a seamless browsing experience</li>
            </ul>
            
            <h3>Technical Implementation</h3>
            <ul>
                <li>Frontend powered by React.js with modular and reusable components</li>
                <li>Node.js backend using Express for REST API handling</li>
                <li>MongoDB with dynamic schema to support varying property types</li>
                <li>Tailwind CSS used for a modern and responsive UI</li>
            </ul>
            
            <h3>Problem Solved</h3>
            <p>Conventional real estate websites restrict property categorization. Skyline Estate introduced dynamic types to enable a more flexible and personalized user experience, both for listers and seekers.</p>
            
            <h3>Tech Stack</h3>
            <p>
                <span class="tech-tag">React.js</span>
                <span class="tech-tag">Node.js</span>
                <span class="tech-tag">Express.js</span>
                <span class="tech-tag">MongoDB</span>
                <span class="tech-tag">REST APIs</span>
                <span class="tech-tag">Tailwind CSS</span>
            </p>
        `
    },
    'hotel-hub': {
        title: 'Hotel Hub',
        content: `
            <h3>Project Overview</h3>
            <p>A full-featured hotel management and booking system supporting both customer-facing and administrator roles. Designed to simplify hotel operations, booking workflows, and guest experience.</p>
            
            <h3>Customer Features</h3>
            <ul>
                <li>Room search and booking based on availability and amenities</li>
                <li>Filter by room types, facilities (WiFi, Pool, AC, etc.), and price</li>
                <li>Interactive calendar for booking and availability</li>
                <li>User review and rating system for guest feedback</li>
            </ul>
            
            <h3>Hotel Admin Features</h3>
            <ul>
                <li>Room inventory and pricing management</li>
                <li>Availability calendar and dynamic pricing updates</li>
                <li>Comprehensive analytics for revenue and booking trends</li>
                <li>Guest management and reporting tools</li>
            </ul>
            
            <h3>Technical Architecture</h3>
            <ul>
                <li>Java (Spring Boot) backend with layered MVC structure</li>
                <li>Angular frontend for a dynamic and responsive user interface</li>
                <li>MySQL for transactional data storage</li>
                <li>RESTful APIs for modular communication</li>
                <li>JWT-based authentication for secure access</li>
            </ul>
            
            <h3>Tech Stack</h3>
            <p>
                <span class="tech-tag">Java</span>
                <span class="tech-tag">Spring Boot</span>
                <span class="tech-tag">Angular</span>
                <span class="tech-tag">JWT</span>
                <span class="tech-tag">MySQL</span>
                <span class="tech-tag">REST APIs</span>
                <span class="tech-tag">Bootstrap</span>
            </p>
        `
    }
};

function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    if (projectData[projectId]) {
        modalTitle.textContent = projectData[projectId].title;
        modalBody.innerHTML = projectData[projectId].content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('project-modal');
    if (e.target === modal) {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

// Enhanced Scroll Animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveNavLink);

// Header Scroll Effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Enhanced Card Hover Effects
document.querySelectorAll('.project-card, .experience-card, .skill-category, .certificate-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});

// Typing Effect for Hero Text
const heroTitle = document.querySelector('.hero-text h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';

    function typeWriter(element, text, speed = 100) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Start typing effect after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            typeWriter(heroTitle, text, 100);
        }, 300);
    });
}

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add smooth entrance animations
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('Portfolio Enhanced - All interactive features loaded successfully! 🚀');