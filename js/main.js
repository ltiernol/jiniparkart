/* ── Mobile nav toggle ── */
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  // close on nav link click
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    });
  });
}

/* ── Highlight active nav link ── */
const currentPath = window.location.pathname.replace(/\/$/, '') || '/index.html';
document.querySelectorAll('nav a').forEach(a => {
  const href = a.getAttribute('href').replace(/\/$/, '');
  if (
    href === currentPath ||
    (currentPath === '' && href === 'index.html') ||
    (currentPath.endsWith(href) && href !== 'index.html')
  ) {
    a.classList.add('active');
  }
});

/* ── Lightbox ── */
const lightbox = document.querySelector('.lightbox');

if (lightbox) {
  const lb_img = lightbox.querySelector('.lightbox__img');
  const lb_cap = lightbox.querySelector('.lightbox__caption');
  const lb_close = lightbox.querySelector('.lightbox__close');
  const lb_prev = lightbox.querySelector('.lightbox__prev');
  const lb_next = lightbox.querySelector('.lightbox__next');

  let items = [];
  let current = 0;

  function openLightbox(idx) {
    current = idx;
    const item = items[current];
    lb_img.src = item.src;
    lb_img.alt = item.alt;
    lb_cap.textContent = item.caption || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lb_img.src = '';
  }

  function showPrev() {
    current = (current - 1 + items.length) % items.length;
    openLightbox(current);
  }

  function showNext() {
    current = (current + 1) % items.length;
    openLightbox(current);
  }

  // gather clickable gallery items
  function initGallery() {
    items = [];
    document.querySelectorAll('.gallery-item, .featured-work').forEach((el, i) => {
      const img = el.querySelector('img');
      const cap = el.querySelector('.gallery-item__caption, .featured-work__caption');
      if (!img) return;
      const item = {
        src: img.src,
        alt: img.alt || '',
        caption: cap ? cap.textContent.trim() : (img.alt || '')
      };
      items.push(item);
      el.addEventListener('click', () => openLightbox(items.length - 1 - (items.length - 1 - i)));
    });

    // rebuild with correct index mapping
    items = [];
    document.querySelectorAll('.gallery-item, .featured-work').forEach((el, i) => {
      const img = el.querySelector('img');
      const cap = el.querySelector('.gallery-item__caption, .featured-work__caption');
      if (!img) return;
      items.push({
        src: img.src,
        alt: img.alt || '',
        caption: cap ? cap.textContent.trim() : (img.alt || '')
      });
      el.addEventListener('click', () => openLightbox(i));
    });
  }

  initGallery();

  lb_close.addEventListener('click', closeLightbox);
  lb_prev.addEventListener('click', showPrev);
  lb_next.addEventListener('click', showNext);

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
}
