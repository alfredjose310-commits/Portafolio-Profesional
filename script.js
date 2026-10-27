'use strict';

document.documentElement.classList.add('js');

/* ---------- Menú móvil ---------- */
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  const setMenu = (open) => {
    navLinks.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };

  toggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !toggle.contains(event.target)) setMenu(false);
  });
}

/* ---------- Sombra del encabezado al hacer scroll ---------- */
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Animación de entrada de secciones ---------- */
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealItems.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    observer.observe(el);
  });
} else {
  revealItems.forEach((el) => el.classList.add('visible'));
}

/* ---------- Si una foto no carga, se muestra el fondo degradado ---------- */
document.querySelectorAll('img').forEach((img) => {
  img.addEventListener('error', () => { img.style.visibility = 'hidden'; }, { once: true });
});

/* ---------- Año automático ---------- */
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
