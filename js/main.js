/* ── Page transition: split panels ── */
const pcTop   = document.createElement('div');
const pcBot   = document.createElement('div');
const pcLabel = document.createElement('div');
pcTop.className   = 'pc-top';
pcBot.className   = 'pc-bottom';
pcLabel.className = 'pc-label';
document.body.append(pcTop, pcBot, pcLabel);

const PANEL_DUR = 650;

const panelsClose = () => {
  pcTop.classList.add('closed');
  pcBot.classList.add('closed');
};
const panelsOpen = () => {
  pcTop.classList.remove('closed');
  pcBot.classList.remove('closed');
};
const labelShow = (text) => {
  pcLabel.textContent = text;
  pcLabel.classList.add('visible');
};
const labelHide = () => pcLabel.classList.remove('visible');

// On load: panels cover instantly → show section name → peel away
const sectionName = document.title.split('|')[0].trim();
pcTop.style.transition  = 'none';
pcBot.style.transition  = 'none';
pcLabel.style.transition = 'none';
panelsClose();
labelShow(sectionName);

setTimeout(() => {
  pcTop.style.transition  = '';
  pcBot.style.transition  = '';
  pcLabel.style.transition = '';
  panelsOpen();
  labelHide();
}, 520);

// On nav click: panels slide in → label appears → navigate
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
  link.addEventListener('click', e => {
    e.preventDefault();
    const dest = link.textContent.trim();
    pcTop.style.transition = 'none';
    pcBot.style.transition = 'none';
    panelsOpen();
    requestAnimationFrame(() => requestAnimationFrame(() => {
      pcTop.style.transition = '';
      pcBot.style.transition = '';
      panelsClose();
    }));
    setTimeout(() => labelShow(dest), 260);
    setTimeout(() => { window.location.href = href; }, PANEL_DUR + 20);
  });
});

/* ── Mobile sidebar toggle ── */
const toggle = document.querySelector('.nav-toggle');
const sidebar = document.querySelector('.sidebar');

if (toggle && sidebar) {
  toggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
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

/* ── Video autoplay on scroll ── */
const galleryVideos = document.querySelectorAll('.gallery-video');
if (galleryVideos.length && 'IntersectionObserver' in window) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play().catch(() => {});
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.4 });
  galleryVideos.forEach(v => videoObserver.observe(v));
}

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

  const lbOpen = (idx) => {
    current = idx;
    lb_img.src = items[current].src;
    lb_img.alt = items[current].alt;
    lb_title.textContent = items[current].title;
    lb_title.style.display = items[current].title ? '' : 'none';
    lb_cap.textContent = items[current].caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const lbClose = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lb_img.src = '';
  };

  const buildItems = () => {
    items = [];
    const imgs = Array.from(document.querySelectorAll('.gallery-item img, .home-featured img'));

    // Sort by number in filename so navigation goes 1→2→3 (row order) not column order.
    const num = (src) => {
      const m = src.match(/\/(\d+)\.\w+$/);
      return m ? parseInt(m[1], 10) : 999;
    };
    imgs.sort((a, b) => num(a.src) - num(b.src));

    imgs.forEach((img, i) => {
      const el = img.closest('.gallery-item, .home-featured');
      const cap = el ? el.querySelector('.gallery-item__caption') : null;
      items.push({
        src: img.src,
        alt: img.alt || '',
        title: img.dataset.title || '',
        caption: cap ? cap.textContent.trim() : ''
      });
      img.addEventListener('click', () => lbOpen(i));
    });
  };

  buildItems();

  lb_close.addEventListener('click', lbClose);
  lb_prev.addEventListener('click', () => { current = (current - 1 + items.length) % items.length; lbOpen(current); });
  lb_next.addEventListener('click', () => { current = (current + 1) % items.length; lbOpen(current); });
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lbClose(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') lbClose();
    if (e.key === 'ArrowLeft') lb_prev.click();
    if (e.key === 'ArrowRight') lb_next.click();
  });
}
