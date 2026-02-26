/* ============================================================
   NAVIGATION — scroll state
============================================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ============================================================
   SMOOTH SCROLL HELPER
============================================================ */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
  const top = el.getBoundingClientRect().top + window.scrollY - navH;
  window.scrollTo({ top, behavior: 'smooth' });
}

/* ============================================================
   INTERSECTION OBSERVER — fade-in on scroll
============================================================ */
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  }
);

fadeEls.forEach((el) => observer.observe(el));

/* ============================================================
   ACTIVE NAV LINK — highlight based on scroll position
============================================================ */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach((a) => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--white)' : '';
        });
      }
    });
  },
  {
    rootMargin: `-${64}px 0px -60% 0px`,
    threshold: 0,
  }
);

sections.forEach((s) => sectionObserver.observe(s));
