// script.js
// Coffee Shop Landing Page interactions
// - Render menu items
// - Mobile navigation toggle
// - Dark mode with localStorage
// - Smooth scroll and small UX enhancements

(() => {
  'use strict';

  const THEME_KEY = 'brew-theme';

  // Elements
  const yearSpan = document.getElementById('year');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const themeToggle = document.getElementById('themeToggle');
  const menuGrid = document.getElementById('menuGrid');

  // Data: sample menu items
  const MENU = [
    { id: 'esp', title: 'Espresso', desc: 'Classic double shot with rich crema.', price: 3.5, img: 'assets/images/latte.svg', tag: 'Signature' },
    { id: 'lat', title: 'Latte', desc: 'Velvety steamed milk over espresso.', price: 4.2, img: 'assets/images/latte.svg', tag: 'Popular' },
    { id: 'cap', title: 'Cappuccino', desc: 'Equal parts espresso, milk, and foam.', price: 4.0, img: 'assets/images/latte.svg', tag: 'Classic' },
    { id: 'moc', title: 'Mocha', desc: 'Chocolate, espresso, and milk harmony.', price: 4.7, img: 'assets/images/latte.svg', tag: 'Sweet' },
    { id: 'flt', title: 'Flat White', desc: 'Silky microfoam with a bold coffee base.', price: 4.4, img: 'assets/images/latte.svg', tag: 'Barista Pick' },
    { id: 'clr', title: 'Cold Brew', desc: 'Slow-steeped, smooth and refreshing.', price: 4.5, img: 'assets/images/hero.svg', tag: 'Iced' },
  ];

  // Helpers
  const currency = (n) => `$${n.toFixed(2)}`;

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? 'Light' : 'Dark';
  }
  function initTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(stored || (prefersDark ? 'dark' : 'light'));
  }
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(THEME_KEY, next); } catch {}
    applyTheme(next);
  }

  function renderMenu() {
    menuGrid.innerHTML = MENU.map(m => `
      <article class="card">
        <figure class="card__media">
          <img src="${m.img}" alt="${m.title}" loading="lazy" width="1600" height="900">
        </figure>
        <div class="card__body">
          <h3 class="card__title">${m.title}</h3>
          <div class="card__meta"><span class="muted">${m.tag}</span><span class="card__price">${currency(m.price)}</span></div>
          <p class="card__desc">${m.desc}</p>
          <div><button class="btn btn--primary" type="button" aria-label="Add ${m.title} to cart">Add to cart</button></div>
        </div>
      </article>
    `).join('');
  }

  function bindEvents() {
    // Mobile nav
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    // Close nav when clicking a link (mobile)
    navMenu.addEventListener('click', (e) => {
      if (e.target.matches('.nav__link')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
    // Theme
    themeToggle.addEventListener('click', toggleTheme);

    // Newsletter form validation
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('emailInput');
    const formMsg = document.getElementById('formMsg');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formMsg.textContent = '';
      const v = (emailInput.value || '').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        formMsg.textContent = 'Please enter a valid email address.';
        emailInput.focus();
        return;
      }
      formMsg.textContent = 'Thanks for subscribing!';
      form.reset();
    });

    // Smooth scroll for anchor links
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  function init() {
    yearSpan.textContent = new Date().getFullYear();
    initTheme();
    renderMenu();
    bindEvents();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
