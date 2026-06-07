/* =============================================
   THEME TOGGLE — dark / light
============================================= */
const themeToggle = document.getElementById('themeToggle');
const root        = document.documentElement;

function getInitialTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}
function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

applyTheme(getInitialTheme());

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches ? 'light' : 'dark');
  }
});

/* =============================================
   CURSOR PERSONALIZADO
============================================= */
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .service-item, .project-card, .pill').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    cursorRing.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    cursorRing.classList.remove('hover');
  });
});

/* =============================================
   NAV — EFECTO AL HACER SCROLL
============================================= */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* =============================================
   HAMBURGER — menú mobile real
============================================= */
const hamburger    = document.getElementById('hamburger');
const mobileMenu   = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

function openMenu() {
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  hamburger.classList.add('active');
}
function closeMenu() {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
  hamburger.classList.remove('active');
}

hamburger.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
});
mobileOverlay.addEventListener('click', closeMenu);

document.querySelectorAll('.mobile-menu-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* =============================================
   SCROLL REVEAL
============================================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* =============================================
   SLIDER DE TESTIMONIOS
============================================= */
const track         = document.getElementById('testimonialsTrack');
const cards         = track.querySelectorAll('.testimonial-card');
const dotsContainer = document.getElementById('sliderDots');
let currentSlide    = 0;

function getSlidesPerView() {
  return window.innerWidth < 900 ? 1 : 2;
}

function getTotalSlides() {
  return Math.ceil(cards.length / getSlidesPerView());
}

function buildDots() {
  dotsContainer.innerHTML = '';
  for (let i = 0; i < getTotalSlides(); i++) {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === currentSlide ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

function goToSlide(index) {
  const total = getTotalSlides();
  currentSlide = (index + total) % total;

  const spv       = getSlidesPerView();
  const cardWidth = track.parentElement.offsetWidth;
  const gapPx     = 24;
  const slideWidth = spv === 1
    ? cardWidth * 0.85 + gapPx
    : (cardWidth + gapPx) / 2;

  track.style.transform = `translateX(-${currentSlide * slideWidth * spv}px)`;

  dotsContainer.querySelectorAll('.slider-dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

document.getElementById('prevBtn').addEventListener('click', () => goToSlide(currentSlide - 1));
document.getElementById('nextBtn').addEventListener('click', () => goToSlide(currentSlide + 1));

buildDots();
window.addEventListener('resize', () => { buildDots(); goToSlide(currentSlide); });

/* =============================================
   HERO ORB — PARALLAX CON EL MOUSE
============================================= */
const orb = document.querySelector('.hero-orb');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 40;
  const y = (e.clientY / window.innerHeight - 0.5) * 40;
  orb.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
});