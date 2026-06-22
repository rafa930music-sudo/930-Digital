// ============================================
// 930 DIGITAL - SCRIPT PRINCIPAL (VERSIÓN FINAL OPTIMIZADA)
// ============================================

// 1. SPLASH SCREEN
(function() {
    const splash = document.getElementById('splash');
    if (!splash) return;
    setTimeout(() => {
        splash.classList.add('hidden');
        setTimeout(() => {
            if (splash.parentNode) splash.remove();
        }, 700);
    }, 2600);
})();

// 2. NAVBAR SCROLL EFFECT
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// 3. MENÚ MÓVIL
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
if (hamburger && mobileMenu && mobileClose) {
    hamburger.addEventListener('click', () => mobileMenu.classList.add('active'));
    mobileClose.addEventListener('click', () => mobileMenu.classList.remove('active'));
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.remove('active'));
    });
}

// 4. TEMA OSCURO/CLARO (TOGGLE)
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light');
        const isLight = document.body.classList.contains('light');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light');
} else if (savedTheme === 'dark') {
    document.body.classList.remove('light');
} else {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!systemPrefersDark) document.body.classList.add('light');
}

// 5. SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// 6. RESALTAR SECCIÓN ACTIVA
(function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
    if (!sections.length || !navLinks.length) return;
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.style.color = '';
            link.style.textShadow = '';
            if (link.getAttribute('href') === '#' + current) {
                link.style.color = 'var(--neon-cyan)';
                link.style.textShadow = '0 0 8px var(--neon-cyan)';
            }
        });
    });
})();

// 7. BOTÓN VOLVER ARRIBA
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) backToTop.classList.add('visible');
        else backToTop.classList.remove('visible');
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 8. CURSOR PERSONALIZADO (SOLO DISPOSITIVOS CON RATÓN)
function isTouchDevice() {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
}
if (!isTouchDevice()) {
    const cursor = document.getElementById('customCursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        const interactive = document.querySelectorAll('a, button, .btn, input, select, textarea, .theme-toggle, .hamburger');
        interactive.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
        });
    }
} else {
    const cursor = document.getElementById('customCursor');
    if (cursor) cursor.style.display = 'none';
    document.body.style.cursor = 'auto';
}

// 9. FONDO DE PARTÍCULAS CONECTADAS (RED NEURONAL) - OPTIMIZADO
(function() {
    const canvas = document.getElementById('networkCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 40 : 70;
    const CONNECTION_DIST = isMobile ? 130 : 170;
    let mouseX = null, mouseY = null;

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.radius = Math.random() * 1.8 + 0.8;
            this.color = Math.random() > 0.6 ? '#00e5ff' : '#bf00ff';
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
            if (!isMobile && mouseX && mouseY) {
                let dx = this.x - mouseX;
                let dy = this.y - mouseY;
                let dist = Math.hypot(dx, dy);
                if (dist < 90) {
                    let angle = Math.atan2(dy, dx);
                    let force = (90 - dist) / 90 * 1.0;
                    this.x += Math.cos(angle) * force;
                    this.y += Math.sin(angle) * force;
                }
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 4;
            ctx.shadowColor = this.color;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.hypot(dx, dy);
                if (dist < CONNECTION_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    let gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                    gradient.addColorStop(0, particles[i].color);
                    gradient.addColorStop(1, particles[j].color);
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 0.6;
                    ctx.shadowBlur = 1;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        ctx.shadowBlur = 0;
        particles.forEach(p => p.update());
        drawLines();
        particles.forEach(p => p.draw());
        requestAnimationFrame(animate);
    }
    animate();

    if (!isMobile) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        document.addEventListener('mouseleave', () => { mouseX = null; mouseY = null; });
    }
})();

// 10. FORMULARIO AJAX (SIN RECARGA)
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                form.reset();
                alert('¡Mensaje enviado correctamente! Te responderé en menos de 24h.');
            } else {
                alert('Hubo un error. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            alert('Error de conexión. Revisa tu internet.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// 11. LIGHTBOX PARA IMÁGENES DEL PORTFOLIO
const portfolioImages = document.querySelectorAll('.portfolio-card__image img');
if (portfolioImages.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);
    portfolioImages.forEach(img => {
        img.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            lightbox.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
            lightbox.classList.add('active');
        });
    });
    lightbox.addEventListener('click', () => lightbox.classList.remove('active'));
}