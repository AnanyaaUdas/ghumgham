// homepage only js for ghumgham
// hero counter and activities slider (shared stuff like the faq is in common.js)


// ---------- hero slider ----------
// every 4 seconds the next photo fades in and the counter and bar move on
// the photos are looked up each time, so a missing one (taken out by common.js) is simply skipped
const heroBar = document.getElementById('heroBar');
const heroCount = document.getElementById('heroCount');
const heroTotal = document.getElementById('heroTotal');
let heroSlide = 0;

function showHeroCount(slides) {
  heroCount.textContent = String(heroSlide + 1).padStart(2, '0');
  heroTotal.textContent = String(slides.length).padStart(2, '0');
  heroBar.style.width = ((heroSlide + 1) / slides.length) * 100 + '%';
}

setInterval(() => {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length < 2) return;

  const old = document.querySelector('.hero-slide.active');
  heroSlide = (heroSlide + 1) % slides.length;

  old?.classList.replace('active', 'leaving');
  slides[heroSlide].classList.add('active');
  setTimeout(() => old?.classList.remove('leaving'), 1300);

  showHeroCount(slides);
}, 4000);

// once every photo has loaded (or failed), the total shows the real number
window.addEventListener('load', () => showHeroCount(document.querySelectorAll('.hero-slide')));


// ---------- activities slider ----------
// same order as the tabs in the html, icon is the font awesome class shown above the title
const activities = [
  { title: 'Trekking', icon: 'fa-person-hiking', text: 'Experience the Himalayas on foot, from peaceful mountain trails and ancient villages to spectacular high-altitude landscapes.' },
  { title: 'Boating', icon: 'fa-sailboat', text: 'Glide across calm lakes surrounded by hills and temples, perfect for a relaxing day on the water.' },
  { title: 'Rafting', icon: 'fa-person-swimming', text: 'Ride thrilling white water rapids on glacier fed rivers with experienced and certified crews.' },
  { title: 'Sightseeing', icon: 'fa-binoculars', text: 'Explore ancient cities, heritage sites and local markets with guides who know every story.' }
];

const tabs = document.querySelectorAll('#actTabs li');
const slides = document.querySelectorAll('.act-slide');
const actTitle = document.getElementById('actTitle');
const actText = document.getElementById('actText');
const actIcon = document.getElementById('actIcon');
let current = 0;

function showActivity(index) {
  // wraps around, so next on the last one goes back to the first
  current = (index + activities.length) % activities.length;

  tabs.forEach((tab, i) => tab.classList.toggle('active', i === current));
  slides.forEach((slide, i) => slide.classList.toggle('active', i === current));

  // the picked photo always moves to the front of the row as the big one, the rest follow in order
  // (otherwise picking the last one would put it past the edge of the box where it can not be seen)
  slides.forEach((slide, i) => { slide.style.order = (i - current + slides.length) % slides.length; });

  actTitle.textContent = activities[current].title;
  actText.textContent = activities[current].text;
  actIcon.className = `fa-solid ${activities[current].icon}`;
}

// clicking a tab or a slide opens that one
tabs.forEach((tab, i) => tab.addEventListener('click', () => showActivity(i)));
slides.forEach((slide, i) => slide.addEventListener('click', () => showActivity(i)));

document.getElementById('actNext').addEventListener('click', () => showActivity(current + 1));
document.getElementById('actPrev').addEventListener('click', () => showActivity(current - 1));


// ---------- testimonials slider ----------
// the reviews glide to the left all the time, like a moving belt
// when a card has fully slid out on the left it is moved to the end, so it never runs out
// the 3 cards in the middle are bright, the ones on the sides fade, it stops while the mouse is over it
const testiTrack = document.getElementById('testiTrack');
const testiWrap = testiTrack.parentElement;
const speed = 0.6; // pixels per frame, bigger is faster
let offset = 0;
let paused = false;

function fadeSides() {
  const box = testiWrap.getBoundingClientRect();
  const centre = box.left + box.width / 2;

  [...testiTrack.children].forEach(card => {
    const cardBox = card.getBoundingClientRect();
    const distance = Math.abs(cardBox.left + cardBox.width / 2 - centre);
    // more than one and a half cards away from the middle means it is on the side
    card.classList.toggle('fade', distance > cardBox.width * 1.5);
  });
}

function glide() {
  if (!paused && !showingAll) {
    offset -= speed;

    // first card has gone past the left edge, send it to the back
    const first = testiTrack.firstElementChild;
    const gap = parseFloat(getComputedStyle(testiTrack).columnGap) || 18;
    const step = first.offsetWidth + gap;

    if (-offset >= step) {
      testiTrack.appendChild(first);
      offset += step;
    }

    testiTrack.style.transform = `translateX(${offset}px)`;
    fadeSides();
  }

  requestAnimationFrame(glide);
}

// view all testimonials stops the slider and shows every review in a grid, clicking again goes back
const allTestis = document.getElementById('allTestis');
let showingAll = false;

allTestis.addEventListener('click', () => {
  showingAll = !showingAll;
  testiWrap.classList.toggle('show-all', showingAll);
  testiTrack.style.transform = '';
  offset = 0;
  allTestis.querySelector('span').textContent = showingAll ? 'Show Less' : 'View All Testimonials';
});

testiWrap.addEventListener('mouseenter', () => { paused = true; });
testiWrap.addEventListener('mouseleave', () => { paused = false; });

requestAnimationFrame(glide);


// ---------- gallery photo viewer ----------
// a click on a photo opens it big, view all gallery starts from the first one
// the arrows and the arrow keys move between photos, esc or a click outside closes it
const galleryPhotos = [...document.querySelectorAll('.gallery img')];
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
let photoIndex = 0;

function showPhoto(index) {
  photoIndex = (index + galleryPhotos.length) % galleryPhotos.length;
  lbImg.src = galleryPhotos[photoIndex].src;
  lbImg.alt = galleryPhotos[photoIndex].alt;
  document.getElementById('lbCount').textContent = `${photoIndex + 1} / ${galleryPhotos.length}`;
}

function openViewer(index) {
  showPhoto(index);
  lightbox.hidden = false;
  document.body.classList.add('no-scroll');
}

function closeViewer() {
  lightbox.hidden = true;
  document.body.classList.remove('no-scroll');
}

galleryPhotos.forEach((photo, i) => photo.addEventListener('click', () => openViewer(i)));
document.getElementById('allGallery').addEventListener('click', () => openViewer(0));
document.getElementById('lbNext').addEventListener('click', () => showPhoto(photoIndex + 1));
document.getElementById('lbPrev').addEventListener('click', () => showPhoto(photoIndex - 1));

lightbox.addEventListener('click', event => {
  if (event.target === lightbox || event.target.closest('.modal-close')) closeViewer();
});

document.addEventListener('keydown', event => {
  if (lightbox.hidden) return;
  if (event.key === 'Escape') closeViewer();
  if (event.key === 'ArrowRight') showPhoto(photoIndex + 1);
  if (event.key === 'ArrowLeft') showPhoto(photoIndex - 1);
});
