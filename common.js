// shared js for every ghumgham page
// header shadow, mobile menu, mega menu, read more, faq, package slider
// plus small helpers that build cards for the template pages
// header.js and footer.js load before this file, so the header is already on the page


// ---------- header shadow ----------
// add a shadow to the header once the page is scrolled a little
function setupHeader() {
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });
}


// ---------- mobile menu ----------
// open and close the menu with the hamburger, and close it again after a link is clicked
function setupMobileMenu() {
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');

  burger.addEventListener('click', () => menu.classList.toggle('show'));

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => menu.classList.remove('show'));
  });
}


// ---------- destination mega menu ----------
// the region under the mouse becomes the highlighted one
function setupMegaMenu() {
  const regions = document.querySelectorAll('.mega-regions a');

  regions.forEach(region => {
    region.addEventListener('mouseenter', () => {
      regions.forEach(r => r.classList.remove('active'));
      region.classList.add('active');
    });
  });
}


// ---------- read more ----------
// shows the full intro text, and hides it again on the second click
function setupReadMore() {
  const introText = document.getElementById('introText');
  const readMore = document.getElementById('readMore');
  if (!readMore) return; // this page has no read more

  readMore.addEventListener('click', () => {
    const isOpen = introText.classList.toggle('open');
    readMore.textContent = isOpen ? 'Read Less' : 'Read More';
  });
}


// ---------- faq ----------
// only one answer open at a time
// the click is caught on the whole page, so it also works for faqs added later by js
function setFaqHeight(item) {
  const answer = item.querySelector('.faq-a');
  answer.style.maxHeight = item.classList.contains('open') ? answer.scrollHeight + 'px' : '0';
}

// sets the right height for every faq, the template pages call this after adding their faqs
function refreshFaq() {
  document.querySelectorAll('.faq-item').forEach(setFaqHeight);
}

function setupFaq() {
  document.addEventListener('click', event => {
    const question = event.target.closest('.faq-q');
    if (!question) return;

    const item = question.closest('.faq-item');
    const wasOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach(other => other.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
    refreshFaq();
  });

  refreshFaq(); // opens the first one on page load
}

// load more under a faq list: only the first 5 questions show, the button shows the rest
// the button hides itself when there is nothing more to show
// the template pages call this again after adding their faqs
const FAQS_SHOWN = 5;

function setupFaqMore() {
  document.querySelectorAll('.faq-more').forEach(button => {
    const items = button.parentElement.querySelectorAll('.faq-item');
    items.forEach((item, i) => { item.hidden = i >= FAQS_SHOWN; });
    button.hidden = items.length <= FAQS_SHOWN;

    button.onclick = () => {
      items.forEach(item => { item.hidden = false; });
      button.hidden = true;
    };
  });
}


// ---------- package slider ----------
// the arrows move the slider by one card at a time
function setupSlider() {
  const slider = document.getElementById('pkgSlider');
  if (!slider) return; // this page has no slider

  function slideBy(direction) {
    const card = slider.querySelector('.pkg-card');
    const step = card.offsetWidth + 14; // card width plus the gap
    slider.scrollBy({ left: direction * step });
  }

  document.getElementById('pkgNext').addEventListener('click', () => slideBy(1));
  document.getElementById('pkgPrev').addEventListener('click', () => slideBy(-1));
}


// ---------- card helpers for the template pages ----------
// turns a name into an image file name, e.g. "Tiger's Nest Hike" -> images/tigers-nest-hike.jpg
function toSlug(name) {
  return name.toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function imageTag(name, extraClass = '') {
  const slug = toSlug(name);
  const cls = extraClass ? ` class="${extraClass}"` : '';
  return `<img${cls} src="images/${slug}.jpg" alt="${slug.replace(/-/g, ' ')}">`;
}

// writes prices the nepali way, e.g. 250000 -> 2,50,000
function formatPrice(amount) {
  return amount.toLocaleString('en-IN');
}

// link to the trip detail page, the trip's details ride along in the link
function tripLink(title, place, days, price) {
  const query = new URLSearchParams({ trip: toSlug(title), title, place, days, price });
  return `trip-detail.html?${query}`;
}

function packageCard(title, place, days, price = 85000) {
  return `
    <a href="${tripLink(title, place, days, price)}" class="pkg-card">
      ${imageTag(title)}
      <div class="pkg-body">
        <div class="stars">★★★★★ <span>(48)</span></div>
        <h4>${title}</h4>
        <div class="meta"><i class="fa-solid fa-location-dot"></i>${place} • ${days}</div>
        <div class="pkg-price">Npr. ${formatPrice(price)} <small>per person</small></div>
      </div>
    </a>`;
}

// region card with a dark layer, opens the region detail page for that activity
function regionCard(activitySlug, name, count) {
  return `
    <a href="region-detail.html?activity=${activitySlug}&region=${toSlug(name)}" class="region-card">
      ${imageTag(name)}
      <h3>${name}</h3>
      <small>(${count} packages)</small>
    </a>`;
}

// opens the activity detail page if that activity has one (see activity-data.js),
// otherwise it opens the activities listing page
function activityCard(name) {
  const slug = toSlug(name);
  const hasPage = typeof activities !== 'undefined' && activities[slug];
  const link = hasPage ? `activity-detail.html?activity=${slug}` : 'activities.html';

  return `
    <a href="${link}" class="act-card">
      ${imageTag(name)}
      <div class="act-card-body">
        <div>
          <h3>${name}</h3>
          <p>Explore scenic trails and breathtaking views.</p>
        </div>
        <i class="fa-solid fa-chevron-right"></i>
      </div>
    </a>`;
}


// ---------- missing photos ----------
// any photo that is not in the images folder yet borrows one of the real photos,
// picked from the group that fits the name (beach trips get beach photos, treks get mountains)
// the same name always gets the same photo so the page does not change on every visit
// faces (avatars and reviewers) get a simple person icon, the faded decorations are just hidden,
// and a trip without a map hides its map section
const photoGroups = {
  beach: ['thailand', 'maldives', 'indonesia', 'gallery-1', 'gallery-3', 'bangkok-and-pattaya-tour', 'phuket-island-tours', 'blog-2', 'blog-3', 'package-5'],
  culture: ['tibet', 'cultural-heritage-tour', 'blog-1', 'sightseeing', 'wonders-of-bangkok-1', 'about-why', 'boating', 'package-4', 'package-6'],
  wild: ['wildlife-safari', 'chiang-mai-explorer', 'paragliding', 'gallery-7'],
  mountain: [
    'nepal', 'trekking', 'peak-climbing', 'mountain-biking', 'everest-region', 'langtang-region', 'kanchenjunga-region',
    'dolpo-region', 'annapurna-region', 'manaslu-region', 'mustang-region', 'makalu-region', 'annapurna-luxury-trip',
    'annapurna-wonderland', 'everest-hiking-trip', 'jomsom-muktinath-tour', 'langtang-valley-trek', 'upper-mustang-trek',
    'about-us', 'about-mountains'
  ]
};

// words in a photo name that decide its group, anything else counts as mountains
const groupWords = {
  beach: /thailand|bangkok|pattaya|phuket|krabi|phi-phi|island|beach|bali|ubud|gili|komodo|indonesia|maldives|male|maafushi|villa|honeymoon|diving|snorkel|sunset|dolphin|water|sandbank|surf|cruise|backwater|kerala|spa|yoga/,
  culture: /city|heritage|temple|kathmandu|bhaktapur|patan|lumbini|swayambhu|boudha|pashupati|bandipur|lhasa|monastery|festival|market|food|cooking|golden-triangle|rajasthan|varanasi|india|paro|thimphu|punakha|nest|bhutan|sightseeing|culture|night|day-tour|history|java/,
  wild: /jungle|safari|chitwan|bardia|koshi|shuklaphanta|parsa|banke|bird|elephant|wildlife|rafting|river/
};

function pickPhoto(name) {
  const group = Object.keys(groupWords).find(key => groupWords[key].test(name)) || 'mountain';
  const photos = photoGroups[group];

  let total = 0;
  for (const letter of name) total = (total * 31 + letter.charCodeAt(0)) >>> 0;
  return `images/${photos[total % photos.length]}.jpg`;
}

const personIcon = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#eef0fb"/>' +
  '<circle cx="20" cy="15" r="7" fill="#0d0a63" opacity=".35"/><path d="M6 38a14 14 0 0 1 28 0z" fill="#0d0a63" opacity=".35"/></svg>'
);


function fixMissingPhoto(img) {
  const src = img.getAttribute('src');
  if (!src || img.dataset.fixed) return; // empty, or already swapped once
  img.dataset.fixed = 'yes';

  const name = src.split('/').pop();
  if (/^(avatar|reviewer)/.test(name)) img.src = personIcon;
  else if (/^(world-map|trips-mountain)/.test(name)) img.style.visibility = 'hidden';
  else if (img.classList.contains('hero-slide')) img.remove(); // a missing banner photo is taken out so the slider skips it
  else if (/-map\.(jpg|png)$/.test(name)) {
    // a trip without its own map hides the map section and its tab instead of showing a random photo
    const block = img.closest('.trip-block') || img;
    block.hidden = true;
    if (block.id) document.querySelector(`a[href="#${block.id}"]`)?.setAttribute('hidden', '');
  }
  else img.src = pickPhoto(name);
}

// catches photos that fail later (cards added by the page scripts), and ones that already failed
document.addEventListener('error', event => {
  if (event.target.tagName === 'IMG') fixMissingPhoto(event.target);
}, true);

document.querySelectorAll('img').forEach(img => {
  if (img.complete && img.naturalWidth === 0) fixMissingPhoto(img);
});


// ---------- wishlist ----------
// there are no accounts, so liked trips are saved in the browser (localStorage)
// they stay after closing the browser, but only on that device and in that browser
// in wordpress this can move to the logged in user, or stay in the browser like this
const WISHLIST_KEY = 'ghumghamWishlist';

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch {
    return []; // storage switched off or broken, start empty
  }
}

function saveWishlist(list) {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  } catch {
    // storage switched off, the heart still works until the page is closed
  }
  showWishCount();
}

function inWishlist(slug) {
  return getWishlist().some(trip => trip.slug === slug);
}

// adds the trip if it is not saved yet, removes it if it is, and says which happened
function toggleWishlist(trip) {
  const list = getWishlist();
  const saved = list.some(item => item.slug === trip.slug);
  saveWishlist(saved ? list.filter(item => item.slug !== trip.slug) : [...list, trip]);
  return !saved;
}

// the little number next to wishlist in the menu
function showWishCount() {
  const badge = document.getElementById('wishCount');
  const count = getWishlist().length;
  badge.textContent = count;
  badge.hidden = count === 0;
}


// ---------- page not found ----------
// the detail pages call this when the link asks for something that does not exist (a wrong country, trip or post)
// replace() is used so the back button skips the broken link
function pageNotFound() {
  location.replace('404.html');
}


// ---------- start ----------
setupHeader();
setupMobileMenu();
setupMegaMenu();
setupReadMore();
setupFaq();
setupFaqMore();
setupSlider();
showWishCount();
