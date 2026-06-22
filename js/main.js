/* ============================================================
   MAIN.JS — Rajpal Singh Personal Site
   ============================================================
   1. Mobile nav toggle
   2. Active nav link on scroll
   3. Back-to-top button
   ============================================================ */


/* ── 1. MOBILE NAV TOGGLE ── */

const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


/* ── 2. ACTIVE NAV LINK ON SCROLL ── */

const sections = document.querySelectorAll('section[id], div[id="about"]');
const links    = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));


/* ── 3. BACK-TO-TOP BUTTON ── */

const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 400);
});

/* ── 4. PROJECT ACCORDION ── */

document.querySelectorAll('.project-header').forEach(header => {
  header.addEventListener('click', () => {
    const item   = header.closest('.project-item');
    const body   = item.querySelector('.project-body');
    const isOpen = item.classList.contains('open');

    // Close all open items
    document.querySelectorAll('.project-item.open').forEach(open => {
      open.classList.remove('open');
      open.querySelector('.project-body').style.maxHeight = null;
    });

    // Open clicked item (unless it was already open)
    if (!isOpen) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});
