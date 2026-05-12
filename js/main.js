/* ── Mobile sidebar toggle ── */
const toggle = document.querySelector('.nav-toggle');
const sidebar = document.querySelector('.sidebar');

if (toggle && sidebar) {
  toggle.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    toggle.classList.toggle('open', open);
  });
}

/* ── Highlight active nav link ── */
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === page || (page === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

/* ── Lightbox ── */
const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const lb_img = lightbox.querySelector('.lightbox__img');
  const lb_title = lightbox.querySelector('.lightbox__title');
  const lb_cap = lightbox.querySelector('.lightbox__caption');
  const lb_close = lightbox.querySelector('.lightbox__close');
  const lb_prev = lightbox.querySelector('.lightbox__prev');
  const lb_next = lightbox.querySelector('.lightbox__next');

  let items = [];
  let current = 0;

  function buildItems() {
    items = [];
    const imgs = Array.from(document.querySelectorAll('.gallery-item img, .home-featured img'));

    // Sort by the number in the filename (1.jpg < 2.jpg ... < 28.png)
    // so lightbox navigation goes 1→2→3 (row order) not 1→4→7 (column order).
    // Images without a number (homepage) keep their DOM order.
    const num = src => parseInt(src.match(/\/(\d+)\.\w+$/)?.[1] ?? '999');
    imgs.sort((a, b) => num(a.src) - num(b.src));

    imgs.forEach((img, i) => {
      const el = img.closest('.gallery-item, .home-featured');
      const cap = el ? el.querySelector('.gallery-item__caption') : null;
      items.push({
        src: img.src,
        alt: img.alt || '',
        caption: cap ? cap.textContent.trim() : (img.alt || '')
      });
      img.addEventListener('click', () => open(i));
    });
  }

  function open(idx) {
    current = idx;
    lb_img.src = items[current].src;
    lb_img.alt = items[current].alt;
    lb_cap.textContent = items[current].caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lb_img.src = '';
  }

  buildItems();

  lb_close.addEventListener('click', close);
  lb_prev.addEventListener('click', () => { current = (current - 1 + items.length) % items.length; open(current); });
  lb_next.addEventListener('click', () => { current = (current + 1) % items.length; open(current); });
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') lb_prev.click();
    if (e.key === 'ArrowRight') lb_next.click();
  });
}
