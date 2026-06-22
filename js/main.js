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

    // Close all open items — pause any playing videos
    document.querySelectorAll('.project-item.open').forEach(open => {
      open.classList.remove('open');
      open.querySelector('.project-body').style.maxHeight = null;
      const iframe = open.querySelector('.project-video iframe');
      if (iframe) { iframe.src = ''; }
    });

    // Open clicked item
    if (!isOpen) {
      item.classList.add('open');
      const iframe = item.querySelector('.project-video iframe');
      if (iframe && iframe.dataset.src) { iframe.src = iframe.dataset.src; }
      body.style.maxHeight = body.scrollHeight + 'px';
      setTimeout(() => { body.style.maxHeight = body.scrollHeight + 'px'; }, 50);
    }
  });
});


/* ── 5. VIDEO EMBED ── */

function getEmbedUrl(url) {
  if (!url || url === '#') return null;
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?rel=0&modestbranding=1`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

document.querySelectorAll('.project-video').forEach(container => {
  const embedUrl = getEmbedUrl(container.dataset.videoUrl);
  if (embedUrl) {
    const iframe = document.createElement('iframe');
    iframe.dataset.src     = embedUrl;
    iframe.src             = '';
    iframe.allowFullscreen = true;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.title = 'Project video';
    container.appendChild(iframe);
  } else {
    container.style.display = 'none';
  }
});
