// animations for every ghumgham page
// loaded last on each page, after the page has filled in its content
// scroll reveals, word by word headings, count up numbers, parallax, card tilt,
// button ripple, scroll progress, back to top and a fade between pages
// the styles for all of this are in animations.css

(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover: hover)').matches;

  // nothing inside these gets animated by the scroll reveals
  const skip = '.header, .mega, .dropdown, .menu, .modal, .lightbox, .calendar';


  // ---------- scroll progress bar and back to top button ----------
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';

  const toTop = document.createElement('button');
  toTop.className = 'to-top';
  toTop.setAttribute('aria-label', 'back to top');
  toTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  document.body.append(progress, toTop);


  // ---------- parallax ----------
  // these move a little slower than the page while scrolling
  // written as [selector, speed, most pixels it can move]
  const parallaxList = [
    ['.hero > img', 0.15, 22],
    ['.steps-bg', 0.15, 50],
    ['.world-map', 0.2, 80],
    ['.trips-art', 0.3, 60]
  ];

  const parallaxItems = reduceMotion ? [] : parallaxList.flatMap(([selector, speed, max]) =>
    [...document.querySelectorAll(selector)].map(el => ({ el, speed, max }))
  );

  function updateParallax() {
    parallaxItems.forEach(({ el, speed, max }) => {
      const box = el.parentElement.getBoundingClientRect();
      const fromCentre = box.top + box.height / 2 - innerHeight / 2;
      const move = Math.max(-max, Math.min(max, -fromCentre * speed));
      el.style.translate = `0 ${move}px`;
    });
  }


  // ---------- everything that follows the scroll ----------
  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      toTop.classList.toggle('show', scrollY > 600);
      updateParallax();
      ticking = false;
    });
  }

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();


  // ---------- button ripple ----------
  const rippleButtons = '.pill, .book-btn, .small-book, .outline-btn, .round-btn, .cal-foot button, .pack-tabs button';

  document.addEventListener('pointerdown', event => {
    const button = event.target.closest(rippleButtons);
    if (!button || reduceMotion) return;

    const box = button.getBoundingClientRect();
    const size = Math.max(box.width, box.height) * 2;
    const dot = document.createElement('span');

    dot.className = 'ripple';
    dot.style.width = dot.style.height = `${size}px`;
    dot.style.left = `${event.clientX - box.left - size / 2}px`;
    dot.style.top = `${event.clientY - box.top - size / 2}px`;

    button.classList.add('ripple-host');
    button.appendChild(dot);
    setTimeout(() => dot.remove(), 650);
  });


  // ---------- fade between pages ----------
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || link.target || link.hasAttribute('download')) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const url = new URL(link.href, location.href);
    if (!url.pathname.endsWith('.html')) return; // phone numbers, emails, outside links

    // a jump inside the same page just scrolls
    if (url.pathname === location.pathname && url.search === location.search && url.hash) return;

    event.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(() => { location.href = url.href; }, 280);
  });

  // coming back with the browser back button shows the page again
  addEventListener('pageshow', event => {
    if (event.persisted) document.body.classList.remove('leaving');
  });


  // everything below is movement, people who asked for less motion stop here
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('anim-on');


  // ---------- big headings, word by word ----------
  // wraps every word in a span, keeps bold and coloured parts as they are
  function splitWords(heading) {
    let index = 0;

    (function walk(node) {
      [...node.childNodes].forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          const pieces = document.createDocumentFragment();

          child.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              pieces.appendChild(document.createTextNode(part));
              return;
            }
            const word = document.createElement('span');
            word.className = 'word';
            word.style.setProperty('--i', index++);
            word.textContent = part;
            pieces.appendChild(word);
          });

          child.replaceWith(pieces);
        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') {
          walk(child);
        }
      });
    })(heading);

    heading.classList.add('split');
  }

  document.querySelectorAll('.hero h1, .intro h1, .who h1, .trip-title').forEach(splitWords);


  // ---------- scroll reveals ----------
  // single elements, grouped by how they come in
  const singles = {
    write: '.script',
    up: [
      '.title', '.lead', '.intro-text', '.read-more', '.trips-text', '.belief', '.why-head h2', '.why-head p',
      '.steps-head h2', '.steps-head p', '.steps-head .pill', '.team-head p', '.faq-left .sub', '.faq-left .link-under',
      '.results-top', '.trip-text', '.trip-meta', '.trip-bar', '.pack-grid', '.no-reviews', '.review-summary',
      '.offer-lead', '.history-story', '.about-text', '.center', '.head-row > .pill', '.act-top', '.act-bottom',
      '.rating', '.breadcrumb'
    ].join(', '),
    left: '.block-head, .filters, .history-intro, .feature, .about-left > p',
    right: '.book-card, .about-right > p',
    zoom: [
      '.about-img', '.who-img', '.banner', '.photo-box', '.history-img', '.why-grid > img', '.trip-map',
      '.act-box', '.why', '.steps', '.offer .container', '.post-cover', '.message-form', '.map-box', '.legal-toc', '.trip-summary'
    ].join(', ')
  };

  // groups whose children come in one after another
  const groups = [
    ['.dest-grid', 'zoom'], ['.pkg-grid', 'up'], ['.blog-grid', 'up'], ['.act-grid', 'up'],
    ['.region-grid', 'zoom'], ['.place-grid', 'up'], ['.result-grid', 'up'], ['.related-grid', 'up'],
    ['.step-cards', 'up'], ['.why-cards', 'fade'], ['.offer-list', 'up'],
    ['.incl-grid', 'up'], ['.stats', 'up'], ['.facts', 'fade'], ['.footer-cols', 'up'],
    ['.gallery', 'zoom'], ['.testi-track', 'zoom'], ['.who-photos', 'zoom'], ['.offer-photos', 'up'],
    ['.timeline', 'up'], ['.hl-track', 'right'], ['.pkg-slider', 'right'], ['.trip-gallery', 'zoom'],
    ['#knowList', 'up'], ['#goodList', 'up'], ['#tripFaqs', 'up'], ['#faqList', 'up'],
    ['.faq-grid > div:last-child', 'up'], ['#departureList', 'up'], ['#reviewArea', 'up'],
    ['.reasons', 'left'], ['.chips', 'fade'], ['.featured-grid', 'up'], ['.blog-side', 'right'], ['.post-nav', 'up'], ['.comment-grid', 'up'], ['.contact-cards', 'up'], ['.follow-icons', 'zoom']
  ];

  // the handwritten labels start fully clipped, which the browser counts as "not on screen",
  // so for those the parent is watched instead (this list says which elements each watched one reveals)
  const waiting = new Map();

  function reveal(el) {
    el.classList.add('is-in');

    // once it has arrived the element goes back to normal, so hover effects work as before
    const delay = parseFloat(el.style.getPropertyValue('--d')) || 0;
    setTimeout(() => {
      el.removeAttribute('data-anim');
      el.classList.remove('is-in');
      el.style.removeProperty('--d');
    }, (delay + 1.1) * 1000);
  }

  const watcher = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      watcher.unobserve(entry.target);
      (waiting.get(entry.target) || []).forEach(reveal);
      waiting.delete(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  function watch(el, type) {
    const target = type === 'write' ? el.parentElement : el;
    if (!waiting.has(target)) waiting.set(target, []);
    waiting.get(target).push(el);
    watcher.observe(target);
  }

  function tag(el, type, delay = 0) {
    if (el.hasAttribute('data-anim') || el.closest(skip)) return;
    if (!el.getClientRects().length) return; // hidden things are left alone

    // anything already on screen waits for the loader to go first
    if (el.getBoundingClientRect().top < innerHeight) delay += 0.75;

    el.dataset.anim = type;
    el.style.setProperty('--d', `${delay}s`);
    watch(el, type);
  }

  Object.entries(singles).forEach(([type, selector]) => {
    document.querySelectorAll(selector).forEach(el => tag(el, type));
  });

  groups.forEach(([selector, type]) => {
    document.querySelectorAll(selector).forEach(group => {
      [...group.children].forEach((child, i) => tag(child, type, (i % 4) * 0.09));
    });
  });


  // ---------- numbers count up ----------
  // for numbers like "10+" and "40%" (the about page counts its own numbers)
  function countUp(el) {
    const match = el.textContent.trim().match(/^(\d+)(.*)$/);
    if (!match) return;

    const target = Number(match[1]);
    const rest = match[2];
    const start = performance.now();

    (function step(now) {
      const done = Math.min((now - start) / 1300, 1);
      const eased = 1 - Math.pow(1 - done, 3);
      el.textContent = Math.round(target * eased) + rest;
      if (done < 1) requestAnimationFrame(step);
    })(start);
  }

  const counter = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      counter.unobserve(entry.target);
      countUp(entry.target);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.badge strong, .offer .big').forEach(el => counter.observe(el));


  // ---------- cards that tilt towards the mouse ----------
  if (canHover) {
    const tiltCards = '.dest-card, .place-card, .region-card, .step-card';
    let tilted = null;

    document.addEventListener('pointermove', event => {
      const card = event.target.closest(tiltCards);

      if (tilted && tilted !== card) {
        tilted.style.transform = '';
        tilted = null;
      }
      if (!card) return;

      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;

      card.style.transform = `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
      tilted = card;
    });

    document.addEventListener('pointerleave', () => {
      if (tilted) tilted.style.transform = '';
      tilted = null;
    });
  }


  // ---------- cards added later pop in ----------
  // filters, load more, sorting and new reviews replace cards, these give them an entrance
  const popCards = '.wish-item, .comment, .feat-card, .pkg-card, .review, .departure, .chip, .faq-item, .acc-item, .act-card, .region-card, .blog-card, .hl-card, .no-reviews';

  new MutationObserver(changes => {
    changes.forEach(change => {
      change.addedNodes.forEach(node => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;

        const cards = node.matches(popCards) ? [node] : [...node.querySelectorAll(popCards)];

        cards.forEach((card, i) => {
          if (card.closest(skip)) return;
          card.style.setProperty('--pi', i % 6);
          card.classList.add('pop-in');
          card.addEventListener('animationend', () => card.classList.remove('pop-in'), { once: true });
        });
      });
    });
  }).observe(document.body, { childList: true, subtree: true });
})();
