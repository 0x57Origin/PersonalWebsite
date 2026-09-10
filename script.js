/* ============================================================
   HELPERS
============================================================ */
function getNavHeight() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-h');
  const parsed = parseInt(raw, 10);
  return Number.isNaN(parsed) ? 64 : parsed;
}

/* ============================================================
   NAVIGATION - scroll state
============================================================ */
const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ============================================================
   SMOOTH SCROLL HELPER
============================================================ */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - getNavHeight();
  window.scrollTo({ top, behavior: 'smooth' });
}

/* Make nav anchor clicks respect the fixed header too */
document.querySelectorAll('.nav-links a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    if (!document.getElementById(id)) return;
    e.preventDefault();
    scrollToSection(id);
    history.replaceState(null, '', `#${id}`);
  });
});

/* ============================================================
   INTERSECTION OBSERVER - fade-in on scroll
   Falls back to showing everything if the API is unavailable
   or the visitor prefers reduced motion.
============================================================ */
const fadeEls = document.querySelectorAll('.fade-in');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!('IntersectionObserver' in window) || reduceMotion) {
  fadeEls.forEach((el) => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  fadeEls.forEach((el) => observer.observe(el));
}

/* ============================================================
   ACTIVE NAV LINK - highlight based on scroll position
============================================================ */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

if ('IntersectionObserver' in window && sections.length && navAnchors.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navAnchors.forEach((a) => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--white)' : '';
        });
      });
    },
    { rootMargin: `-${getNavHeight()}px 0px -60% 0px`, threshold: 0 }
  );
  sections.forEach((s) => sectionObserver.observe(s));
}

/* ============================================================
   FOOTER YEAR
============================================================ */
const footerCopy = document.querySelector('.footer-copy');
if (footerCopy) {
  footerCopy.textContent = `\u00A9 ${new Date().getFullYear()} Mohammad Nazmul`;
}
