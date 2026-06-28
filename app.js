/* ============================================================
   APP.JS — Kabinet Lentera Asa · Event Invitation
   ============================================================ */

"use strict";

// ─── Apply config ────────────────────────────────────────────
(function applyConfig() {
  if (typeof CONFIG === 'undefined') return;

  const c = CONFIG;

  // Event title & subtitle
  ['event-title', 'hero-title'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = c.event.title;
  });
  ['event-subtitle', 'hero-subtitle'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = c.event.subtitle;
  });

  // Dates
  const dateEl = document.getElementById('letter-date');
  if (dateEl) dateEl.textContent = '📅 ' + c.event.dateDisplay + ' · ' + c.event.time;
  const placeEl = document.getElementById('letter-place');
  if (placeEl) placeEl.textContent = '📍 ' + c.venue.name;

  const dtDate = document.getElementById('dt-date');
  if (dtDate) dtDate.textContent = c.event.dateDisplay;
  const dtTime = document.getElementById('dt-time');
  if (dtTime) dtTime.textContent = c.event.time;

  // Venue
  const venName = document.getElementById('venue-name');
  if (venName) venName.textContent = c.venue.name;
  const venAddr = document.getElementById('venue-address');
  if (venAddr) venAddr.textContent = c.venue.address;
  const mapsBtn = document.getElementById('maps-btn');
  if (mapsBtn) mapsBtn.href = c.venue.mapsUrl;
  const mapIframe = document.getElementById('map-iframe');
  if (mapIframe && c.venue.embedSrc) mapIframe.src = c.venue.embedSrc;

  // Pendahuluan
  const pendEl = document.getElementById('pendahuluan-text');
  if (pendEl) pendEl.textContent = c.content.pendahuluan;

  // Tujuan
  const goalEl = document.getElementById('goal-list');
  if (goalEl && c.content.tujuan) {
    goalEl.innerHTML = c.content.tujuan
      .map(t => `<li>${t}</li>`)
      .join('');
  }

  // Rundown
  const rdEl = document.getElementById('rundown-list');
  if (rdEl && c.content.rundown) {
    rdEl.innerHTML = c.content.rundown.map(r => `
      <div class="rundown-item">
        <div class="rd-time">${r.time}</div>
        <div class="rd-dot"></div>
        <div class="rd-event">${r.event}</div>
      </div>
    `).join('');
  }

  // Penutup
  const petEl = document.getElementById('penutup-text');
  if (petEl) petEl.textContent = c.content.penutup;

  // WhatsApp
  const waBtn = document.getElementById('wa-btn');
  if (waBtn && c.whatsapp) {
    waBtn.href = `https://wa.me/${c.whatsapp.nomor}?text=${encodeURIComponent(c.whatsapp.pesan)}`;
  }

  // Photo grid
  const photoGrid = document.getElementById('photo-grid');
  if (photoGrid && c.pengurus && c.pengurus.length > 0) {
    photoGrid.innerHTML = c.pengurus.map(p => {
      const imgHtml = p.foto
        ? `<img src="${p.foto}" alt="${p.nama}" onerror="this.parentElement.innerHTML='<div class=\\'photo-placeholder\\'><span>👤</span></div>'" />`
        : `<div class="photo-placeholder"><span>👤</span></div>`;
      return `
        <div class="photo-card reveal">
          <div class="photo-frame">${imgHtml}</div>
          <div class="photo-name">${p.nama}</div>
          <div class="photo-role">${p.jabatan}</div>
        </div>
      `;
    }).join('');
    // Elemen baru akan diobserve oleh initReveal() saat halaman utama dibuka
  }

  // Music src
  const audio = document.getElementById('bgMusic');
  if (audio && c.musicSrc) {
    audio.querySelector('source').src = c.musicSrc;
    audio.load();
  }
})();


// ─── ENVELOPE OPEN ───────────────────────────────────────────
let envelopeOpened = false;
let musicStarted   = false;

function openEnvelope() {
  if (envelopeOpened) return;
  envelopeOpened = true;

  const flap    = document.getElementById('flap');
  const letter  = document.getElementById('letter');
  const btn     = document.getElementById('open-btn');
  const hint    = document.querySelector('.tap-hint');
  const wrapper = document.querySelector('.envelope-wrapper');

  // Disable button
  btn.disabled = true;
  btn.style.opacity = '0.6';
  if (hint) hint.style.opacity = '0';

  // 1. Open flap
  flap.classList.add('open');

  // 2. Show letter content
  setTimeout(() => letter.classList.add('visible'), 600);

  // 3. After pause, zoom out envelope page and transition
  setTimeout(() => {
    wrapper.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease';
    wrapper.style.transform  = 'scale(2.5) translateY(-20px)';
    wrapper.style.opacity    = '0';
    wrapper.style.filter     = 'blur(4px)';
  }, 1800);

  // 4. Switch to main page
  setTimeout(() => {
    document.getElementById('page-envelope').classList.remove('active');
    document.getElementById('page-main').classList.add('active');
    window.scrollTo(0, 0);
    startCountdown();
    initReveal();
  }, 2600);

  // 5. Start music
  startMusic();
}


// ─── MUSIC ───────────────────────────────────────────────────
const audio      = document.getElementById('bgMusic');
let   isMuted    = false;

function startMusic() {
  if (!audio) return;
  audio.loop   = true;
  audio.volume = 0.4;
  const playPromise = audio.play();
  if (playPromise) {
    playPromise.then(() => {
      musicStarted = true;
      updateMusicIcon();
    }).catch(() => {
      // Autoplay blocked — user must interact
    });
  }
}

function toggleMusic() {
  if (!audio) return;
  if (audio.paused) {
    audio.play();
    isMuted = false;
  } else {
    audio.pause();
    isMuted = true;
  }
  updateMusicIcon();
}

function updateMusicIcon() {
  const icon = document.getElementById('musicIcon');
  const btn  = document.getElementById('musicToggle');
  if (!icon) return;
  if (!audio.paused) {
    icon.textContent = '🎵';
    if (btn) btn.classList.add('playing');
  } else {
    icon.textContent = '🔇';
    if (btn) btn.classList.remove('playing');
  }
}

// Also allow clicking the envelope directly
document.getElementById('envelope')?.addEventListener('click', openEnvelope);


// ─── COUNTDOWN ───────────────────────────────────────────────
function startCountdown() {
  let target;
  if (typeof CONFIG !== 'undefined' && CONFIG.event.date) {
    target = new Date(CONFIG.event.date);
  } else {
    target = new Date('2026-07-19T08:00:00');
  }

  function tick() {
    const now  = new Date();
    const diff = target - now;

    if (diff <= 0) {
      ['days','hours','minutes','seconds'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '00';
      });
      return;
    }

    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    const fmt = n => String(n).padStart(2, '0');
    document.getElementById('days').textContent    = fmt(days);
    document.getElementById('hours').textContent   = fmt(hours);
    document.getElementById('minutes').textContent = fmt(minutes);
    document.getElementById('seconds').textContent = fmt(seconds);
  }

  tick();
  setInterval(tick, 1000);
}


// ─── SCROLL REVEAL ───────────────────────────────────────────
let observer;

function initReveal() {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings slightly
        const siblings = entry.target.parentElement?.querySelectorAll('.reveal');
        let delay = 0;
        if (siblings) {
          const idx = Array.from(siblings).indexOf(entry.target);
          delay = idx * 80;
        }
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('#page-main .reveal').forEach(el => observer.observe(el));
}


// ─── STICKY NAV HIGHLIGHT ────────────────────────────────────
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.section, .hero-section');
  const navLinks = document.querySelectorAll('.nav-links a');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = '#' + section.id;
    }
  });

  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === current
      ? 'var(--gold)'
      : 'rgba(255,255,255,0.8)';
  });
}, { passive: true });


// ─── SMOOTH SCROLL for nav links ─────────────────────────────
document.querySelectorAll('.nav-links a, .scroll-indicator').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ─── KEYBOARD ACCESSIBILITY ──────────────────────────────────
document.getElementById('open-btn')?.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openEnvelope();
  }
});
