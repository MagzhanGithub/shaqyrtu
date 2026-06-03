/* ═══════════════════════════════════════════════════════════
   SHAQYRTU — Main JavaScript
   Countdown · Nav · RSVP · Wishes · Animations · Lightbox
═══════════════════════════════════════════════════════════ */

'use strict';

/* ── CONFIG ─────────────────────────────────── */
const WEDDING_DATE = new Date('2026-06-20T17:00:00');
const STORAGE_KEY  = 'shaqyrtu_rsvp';
const WISHES_KEY   = 'shaqyrtu_wishes';

const SEED_WISHES = [
  { name: 'Алия мен Нұрлан', text: 'Бақыт пен береке тілейміз! Өмір жолдарыңыз ортақ болсын, арман-мақсаттарыңыз орындалсын!' },
  { name: 'Гүлнар Сейткали', text: 'Ыстық махаббат пен мейірімнің үйінде өмір сүріңіздер. Мәңгілік бақытқа бөленіңіздер!' },
  { name: 'Серік Жақсылықов', text: 'Отбасыларыңызда тыныштық, дастарқандарыңызда мол дәм болсын. Ұрпақтарыңыз кемел болсын!' },
];

/* ── DOM READY ─────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initNav();
  initScrollReveal();
  initDividerReveal();
  initRSVP();
  initWishes();
  initGallery();
});

/* ═════════════════════════════════════════════════
   COUNTDOWN TIMER
═════════════════════════════════════════════════ */
function initCountdown() {
  const daysEl    = document.getElementById('cd-days');
  const hoursEl   = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  if (!daysEl) return;

  function tick() {
    const now  = new Date();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) {
      daysEl.textContent    = '00';
      hoursEl.textContent   = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      const timerEl = document.querySelector('.countdown');
      if (timerEl) timerEl.setAttribute('aria-label', 'Той басталды!');
      return;
    }

    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    setNum(daysEl,    days);
    setNum(hoursEl,   hours);
    setNum(minutesEl, minutes);
    setNum(secondsEl, seconds);
  }

  function setNum(el, val) {
    const str = String(val).padStart(2, '0');
    if (el.textContent !== str) {
      el.classList.add('flip');
      setTimeout(() => el.classList.remove('flip'), 300);
      el.textContent = str;
    }
  }

  tick();
  setInterval(tick, 1000);
}

/* ═════════════════════════════════════════════════
   NAVIGATION
═════════════════════════════════════════════════ */
function initNav() {
  const header  = document.querySelector('.site-header');
  const toggle  = document.querySelector('.nav__toggle');
  const audio = document.getElementById('wedding-audio');
  let isPlaying = false;
  const menu    = document.querySelector('.nav__menu');
  const navLinks = document.querySelectorAll('.nav__link');

  /* Sticky header shadow */
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* Mobile overlay */
  const overlay = document.createElement('div');
  overlay.className = 'nav__overlay';
  document.body.appendChild(overlay);

  function openMenu() {
    menu.classList.add('open');
    overlay.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    overlay.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // toggle?.addEventListener('click', () => {
  //   const isOpen = menu.classList.contains('open');
  //   isOpen ? closeMenu() : openMenu();
  // });
  toggle?.addEventListener('click', async () => {

  try {

    if (!isPlaying) {

      await audio.play();
      toggle.textContent = '❚❚';
      toggle.classList.add('playing');
      isPlaying = true;

    } else {

      audio.pause();
      audio.currentTime = 0;
      toggle.textContent = '▶';
      toggle.classList.remove('playing');
      isPlaying = false;

    }

  } catch (err) {

    console.error(err);

  }

});

  overlay.addEventListener('click', closeMenu);

  /* Close on nav link click (mobile) */
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) closeMenu();
    });
  });

  /* Active section highlight */
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
        active?.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ═════════════════════════════════════════════════
   SCROLL REVEAL
═════════════════════════════════════════════════ */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* ═════════════════════════════════════════════════
   DIVIDER REVEAL (line animation)
═════════════════════════════════════════════════ */
function initDividerReveal() {
  const dividers = document.querySelectorAll('.divider');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  dividers.forEach(d => observer.observe(d));
}

/* ═════════════════════════════════════════════════
   RSVP FORM
═════════════════════════════════════════════════ */
function initRSVP() {
  const form        = document.getElementById('rsvp-form');
  const confirm     = document.getElementById('rsvp-confirm');
  const resetBtn    = document.getElementById('rsvp-reset');
  const attendRadios = document.querySelectorAll('input[name="attending"]');
  const guestsField  = document.getElementById('guests-field');
  const submitBtn    = document.getElementById('rsvp-submit');
  const btnText      = submitBtn?.querySelector('.btn__text');
  const btnSpinner   = submitBtn?.querySelector('.btn__spinner');

  if (!form) return;

  /* Restore previous submission */
  const saved = loadRSVP();
  if (saved) {
    showConfirm(saved);
    return;
  }

  /* Show/hide guest count based on attendance */
  attendRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const attending = radio.value === 'yes';
      guestsField.hidden = !attending;
      guestsField.setAttribute('aria-hidden', String(!attending));
    });
  });

  /* Validation */
  function validateField(input, errorId, message) {
    const errorEl = document.getElementById(errorId);
    if (!input.value.trim()) {
      input.classList.add('error');
      if (errorEl) errorEl.textContent = message;
      return false;
    }
    input.classList.remove('error');
    if (errorEl) errorEl.textContent = '';
    return true;
  }

  function validatePhone(input) {
    const val = input.value.trim();
    if (!val) return true; // optional field
    const pattern = /^[\+]?[\d\s\-\(\)]{7,15}$/;
    const errorEl = document.getElementById('rsvp-phone-error');
    if (!pattern.test(val)) {
      input.classList.add('error');
      if (errorEl) errorEl.textContent = 'Дұрыс телефон нөмірін енгізіңіз';
      return false;
    }
    input.classList.remove('error');
    if (errorEl) errorEl.textContent = '';
    return true;
  }

  function validateAttendance() {
    const checked = document.querySelector('input[name="attending"]:checked');
    const errorEl = document.getElementById('rsvp-attending-error');
    if (!checked) {
      if (errorEl) errorEl.textContent = 'Жауапты таңдаңыз';
      return false;
    }
    if (errorEl) errorEl.textContent = '';
    return true;
  }

  /* Clear error on input */
  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errorId = input.getAttribute('aria-describedby');
      if (errorId) {
        const errorEl = document.getElementById(errorId);
        if (errorEl) errorEl.textContent = '';
      }
    });
  });

  /* Submit */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput  = document.getElementById('rsvp-name');
    const phoneInput = document.getElementById('rsvp-phone');
    const msgInput   = document.getElementById('rsvp-message');
    const attending  = document.querySelector('input[name="attending"]:checked')?.value;
    const guests     = document.getElementById('rsvp-guests')?.value || '1';

    const nameValid   = validateField(nameInput, 'rsvp-name-error', 'Атыңызды енгізіңіз');
    const phoneValid  = validatePhone(phoneInput);
    const attendValid = validateAttendance();

    if (!nameValid || !phoneValid || !attendValid) {
      const firstError = form.querySelector('.form-input.error, input[name="attending"]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
const data = {
  name: nameInput.value.trim(),
  phone: phoneInput.value.trim(),
  attending,
  guests: attending === 'yes' ? guests : '0',
  message: msgInput?.value.trim() || ''
};

try {

  setLoading(true);

  const response = await fetch(
    'https://script.google.com/macros/s/AKfycbxIGIGuV-BPYouPSHChN0OwqqZtopCW0zrj7P_Hmms1i9MvF96P2Kl4KwS8AyE15hD7/exec',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );

  const result = await response.json();

  if (!result.success) {
    throw new Error('Ошибка сохранения');
  }

  showConfirm(data);

} catch (error) {

  console.error(error);
  alert('Ошибка отправки анкеты');

} finally {

  setLoading(false);

}

  });

  resetBtn?.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    confirm.hidden = true;
    form.hidden    = false;
    form.reset();
    guestsField.hidden = true;
  });

  function setLoading(loading) {
    submitBtn.disabled = loading;
    if (btnText)    btnText.hidden    = loading;
    if (btnSpinner) btnSpinner.hidden = !loading;
  }

  function showConfirm(data) {
    form.hidden    = true;
    confirm.hidden = false;

    const titleEl = document.getElementById('rsvp-confirm-title');
    const textEl  = document.getElementById('rsvp-confirm-text');

    if (data.attending === 'yes') {
      if (titleEl) titleEl.textContent = 'Рақмет, ' + data.name + '!';
      if (textEl)  textEl.textContent  = 'Тойда ' + data.guests + ' адаммен келетінді белгіледіңіз. Кездесейік!';
    } else {
      if (titleEl) titleEl.textContent = 'Хабарыңызды алдық';
      if (textEl)  textEl.textContent  = 'Қаты алмайтыныңыз өкінішті. Ризашылығымызды білдіреміз!';
    }

    confirm.scrollIntoView({ behavior: 'smooth', block: 'center' });

    /* Trigger reveal animation */
    requestAnimationFrame(() => {
      confirm.querySelector('.reveal')?.classList.add('in-view');
    });
  }
}

/* ═════════════════════════════════════════════════
   WISHES
═════════════════════════════════════════════════ */
function initWishes() {
  /* Seed default wishes if none stored */
  const stored = loadWishes();
  if (!stored.length) {
    localStorage.setItem(WISHES_KEY, JSON.stringify(SEED_WISHES));
  }
  renderWishes();
}

function renderWishes() {
  const grid = document.getElementById('wishes-grid');
  if (!grid) return;

  const wishes = loadWishes();
  grid.innerHTML = '';

  if (!wishes.length) {
    grid.innerHTML = '<p style="color:var(--color-text-muted);font-size:14px;grid-column:1/-1;text-align:center;">Бірінші тілекті сіз жазыңыз!</p>';
    return;
  }

  wishes.forEach((wish, i) => {
    const card = document.createElement('article');
    card.className = 'wish-card reveal';
    card.style.transitionDelay = `${i * 60}ms`;
    card.innerHTML = `
      <div class="wish-card__quote" aria-hidden="true">"</div>
      <p class="wish-card__text">${escapeHtml(wish.text)}</p>
      <p class="wish-card__name">— ${escapeHtml(wish.name)}</p>
    `;
    grid.appendChild(card);
  });

  /* Re-observe new cards */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  grid.querySelectorAll('.wish-card').forEach(c => observer.observe(c));
}

function addWish(wish) {
  const wishes = loadWishes();
  wishes.push(wish);
  localStorage.setItem(WISHES_KEY, JSON.stringify(wishes));
}

function loadWishes() {
  try { return JSON.parse(localStorage.getItem(WISHES_KEY) || '[]'); }
  catch { return []; }
}

/* ═════════════════════════════════════════════════
   GALLERY LIGHTBOX
═════════════════════════════════════════════════ */
function initGallery() {
  const items = document.querySelectorAll('.gallery__item');
  if (!items.length) return;

  /* Create lightbox */
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Суретті үлкейту');
  lightbox.innerHTML = `
    <button class="lightbox__close" aria-label="Жабу">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  `;
  document.body.appendChild(lightbox);

  const closeBtn = lightbox.querySelector('.lightbox__close');
  let lastFocused = null;

  function open() {
    lastFocused = document.activeElement;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lastFocused?.focus();
  }

  items.forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', 'Суретті үлкейту');

    item.addEventListener('click', open);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) close();
  });
}

/* ═════════════════════════════════════════════════
   UTILITIES
═════════════════════════════════════════════════ */
function saveRSVP(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadRSVP() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); }
  catch { return null; }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


// Инициализация карты 2GIS после загрузки скрипта API
DG.then(function () {
    // 1. Создаем карту
    var map = DG.map('map2gis', {
        center: [42.345348, 69.526457], // Координаты вашей тойханы
        zoom: 16,                        // Масштаб (чем больше число, тем ближе)
        fullscreenControl: false,        // Отключаем лишние кнопки по желанию
        zoomControl: true
    });

    // 2. Создаем маркер (булавку) на карте
    var myMarker = DG.marker([42.345348, 69.526457]).addTo(map);

    // 3. Добавляем всплывающее окно при клике на маркер
    myMarker.bindPopup('<div style="font-family: sans-serif; text-align: center;"><b>777 Тойханасы</b><br>Шымкент</div>');
});