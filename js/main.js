/* ============================================================
   MAIN.JS — Rajpal Singh Personal Site
   ============================================================
   To add a new section:
     1. Create sections/mysection.html
     2. Add 'mysection' to the SECTIONS array below
     3. Add a nav link in index.html
   ============================================================ */


/* ── SECTION LOADER ── */

const SECTIONS = [
  'hero',
  'interests',
  'news',
  'publications',
  'education',
  'teaching',
  'contact',
];

async function loadSections() {
  const main = document.getElementById('main-content');
  main.innerHTML = ''; // clear loading message

  for (const name of SECTIONS) {
    try {
      const res  = await fetch(`sections/${name}.html`);
      const html = await res.text();

      const wrapper = document.createElement('div');
      wrapper.innerHTML = html;

      // Append each child node (avoids extra wrapper divs)
      while (wrapper.firstChild) {
        main.appendChild(wrapper.firstChild);
      }
    } catch (err) {
      console.warn(`Could not load sections/${name}.html`, err);
    }
  }

  // Run UI setup after all sections are in the DOM
  initNav();
  initScrollSpy();
  initBackToTop();
}

loadSections();


/* ── MOBILE NAV TOGGLE ── */

function initNav() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
    });
  });
}


/* ── ACTIVE NAV LINK ON SCROLL ── */

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], div[id="about"]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
}


/* ── BACK-TO-TOP BUTTON ── */

function initBackToTop() {
  const btn = document.getElementById('backTop');

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
}
