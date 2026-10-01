// trip detail page js for ghumgham
// fills the template with the trip from the link, then runs the tabs, sliders,
// itinerary, departures, reviews, popups and photo viewer
// the content comes from trip-data.js


// ---------- which trip ----------
// package cards send ?trip=...&title=...&place=...&days=...&price=...
// short links like ?trip=phuket-island-tours are looked up in the trip list instead
const params = new URLSearchParams(location.search);
const allTrips = collectTrips();

let slug = params.get('trip') || 'wonders-of-bangkok';
let known = allTrips.find(t => t.slug === slug);

// a short link to a trip we do not have (links from the cards carry the trip name, so those still work)
if (!known && !params.get('title')) pageNotFound();

// a short link to a trip that is not in the list still gets a page, named from the link
function titleFromSlug(text) {
  return text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const info = {
  slug,
  title: params.get('title') || (known ? known.title : titleFromSlug(slug)),
  place: params.get('place') || (known ? known.place : 'Nepal'),
  daysText: params.get('days') || (known ? known.daysText : '5D/4N'),
  price: Number(params.get('price')) || (known ? known.price : 85000)
};
info.days = parseInt(info.daysText, 10) || 1;

// sample content first, then this trip's own content on top (see tripDetails)
const trip = { ...buildTrip(info), ...(tripDetails[slug] || {}) };
const nights = Math.max(info.days - 1, 0);


// ---------- small helpers ----------
function starIcons(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) html += `<i class="fa-solid fa-star${i <= Math.round(rating) ? '' : ' off'}"></i>`;
  return html;
}

function niceDate(value) {
  const date = new Date(value);
  return `${date.getDate()} ${date.toLocaleString('en-GB', { month: 'short' })}, ${date.getFullYear()}`;
}

// 2026-10-12, the way the booking page reads a date from the link
function isoDate(date) {
  return `${date.getFullYear()}-${padDay(date.getMonth() + 1)}-${padDay(date.getDate())}`;
}

function padDay(n) {
  return String(n).padStart(2, '0');
}

// one accordion row, used by know before you go, good to know and the faqs
function accordionItem(head, body, open) {
  return `
    <div class="acc-item${open ? ' open' : ''}">
      <button class="acc-head">${head}<i class="fa-solid fa-chevron-down"></i></button>
      <div class="acc-body">${body}</div>
    </div>`;
}

function arrowList(items) {
  return `<ul class="arrow-list">${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
}


// ---------- title, meta and booking card ----------
const durationText = info.days === 1 ? '1 Day' : `${info.days} Days ${nights} Nights`;

const fill = {
  title: info.title,
  location: trip.location,
  durationText,
  min: trip.min,
  max: trip.max,
  overview1: trip.overview[0],
  overview2: trip.overview[1] || ''
};

document.querySelectorAll('[data-fill]').forEach(el => {
  el.textContent = fill[el.dataset.fill];
});

document.title = `${info.title} | Ghumgham`;

// like the design: the place name in bold red, then a bold dash and the length
// the place is the trip's location, or its country, or else the first word (e.g. annapurna)
const placeWord = [trip.location, info.place].find(word => word && info.title.includes(word)) || info.title.split(' ')[0];
const titleHtml = info.title.replace(placeWord, `<span class="red">${placeWord}</span>`);
document.getElementById('tripTitle').innerHTML = `${titleHtml} <b>- ${durationText}</b>`;

// breadcrumb links to the country page when there is one
const crumb = document.getElementById('crumbPlace');
crumb.textContent = trip.location;
const countrySlug = toSlug(info.place);
if (destinations[countrySlug]) crumb.href = `destination-detail.html?country=${countrySlug}`;

document.getElementById('bookPrice').textContent = formatPrice(info.price);


// ---------- photo gallery ----------
const photos = [1, 2, 3, 4, 5, 6].map(n => `images/${slug}-${n}.jpg`);

document.getElementById('tripGallery').innerHTML = photos.map((src, i) => `
  <button class="g-photo g-${i + 1}" data-index="${i}" aria-label="open photo ${i + 1}">
    <img src="${src}" alt="${slug.replace(/-/g, ' ')} ${i + 1}">
    ${i === 5 ? '<span class="see-all">See all</span>' : ''}
  </button>
`).join('');


// ---------- quick facts ----------
const facts = [
  ['fa-location-dot', 'Location', trip.location],
  ['fa-calendar-days', 'Duration', info.days === 1 ? '1 Day' : `${info.days} Days`],
  ['fa-user-group', 'Pax', trip.facts.pax],
  ['fa-cloud-sun', 'Best Season', trip.facts.season],
  ['fa-gauge', 'Difficulty', trip.facts.difficulty],
  ['fa-plane', 'Flight', trip.facts.flight],
  ['fa-user', 'Guide', trip.facts.guide],
  ['fa-paw', 'Pet Friendly', trip.facts.pet]
];

document.getElementById('facts').innerHTML = facts.map(([icon, label, value]) => `
  <div class="fact">
    <small><i class="fa-solid ${icon}"></i>${label}</small>
    <strong>${value}</strong>
  </div>
`).join('');


// ---------- tour highlights ----------
const hlTrack = document.getElementById('hlTrack');

hlTrack.innerHTML = trip.highlights.map((text, i) => `
  <div class="hl-card">
    <img src="images/${slug}-highlight-${i + 1}.jpg" alt="${slug.replace(/-/g, ' ')} highlight ${i + 1}">
    <p>${text}</p>
  </div>
`).join('');

function slideHighlights(direction) {
  const card = hlTrack.querySelector('.hl-card');
  hlTrack.scrollBy({ left: direction * (card.offsetWidth + 16), behavior: 'smooth' });
}

document.getElementById('hlNext').addEventListener('click', () => slideHighlights(1));
document.getElementById('hlPrev').addEventListener('click', () => slideHighlights(-1));


// ---------- itinerary ----------
const dayIcons = ['fa-plane-arrival', 'fa-landmark', 'fa-store', 'fa-city', 'fa-mountain-sun', 'fa-camera'];
const timeline = document.getElementById('timeline');

timeline.innerHTML = trip.itinerary.map((day, i) => {
  const last = i === trip.itinerary.length - 1 && i > 0;
  const icon = last ? 'fa-plane-departure' : dayIcons[i % dayIcons.length];

  const places = day.places ? `
    <p class="places-title">Places you want to moment</p>
    <div class="places">
      ${day.places.map(([name, text]) => `
        <div class="place">
          ${imageTag(name)}
          <h5>${name}</h5>
          <p>${text}</p>
        </div>`).join('')}
    </div>` : '';

  return `
    <div class="day${i === 0 ? ' open' : ''}">
      <span class="day-icon"><i class="fa-solid ${icon}"></i></span>
      <div class="day-card">
        <button class="day-head">
          <span class="day-badge">Day ${padDay(i + 1)}</span>
          <span class="day-title">${day.title}</span>
          <span class="day-route">${day.route}</span>
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <div class="day-body">
          <div class="day-stay">
            <span><i class="fa-solid fa-hotel"></i>Accommodation: <b>${day.stay}</b></span>
            <span><i class="fa-solid fa-utensils"></i>Meals: <b>${day.meal}</b></span>
          </div>
          ${day.text.map(p => `<p>${p}</p>`).join('')}
          ${day.highlight ? `<div class="day-highlight"><span>Highlight</span><p>${day.highlight}</p></div>` : ''}
          ${places}
        </div>
      </div>
    </div>`;
}).join('');

const toggleDays = document.getElementById('toggleDays');

function updateToggleLabel() {
  const allOpen = [...timeline.querySelectorAll('.day')].every(day => day.classList.contains('open'));
  toggleDays.innerHTML = allOpen
    ? 'Collapse all <i class="fa-solid fa-chevron-up"></i>'
    : 'Expand all <i class="fa-solid fa-chevron-down"></i>';
}

timeline.addEventListener('click', event => {
  const head = event.target.closest('.day-head');
  if (!head) return;
  head.closest('.day').classList.toggle('open');
  updateToggleLabel();
});

toggleDays.addEventListener('click', () => {
  const days = timeline.querySelectorAll('.day');
  const allOpen = [...days].every(day => day.classList.contains('open'));
  days.forEach(day => day.classList.toggle('open', !allOpen));
  updateToggleLabel();
});

updateToggleLabel();


// ---------- map ----------
const mapSrc = `images/${slug}-map.jpg`;
document.getElementById('mapImg').src = mapSrc;
document.getElementById('mapImg').alt = `${slug.replace(/-/g, ' ')} map`;
document.getElementById('mapDownload').href = mapSrc;


// ---------- fixed departures ----------
// sample dates: a departure every 5 days, starting 2 weeks from today
// in wordpress these come from the trip post
const departures = [];
const firstDate = new Date();
firstDate.setDate(firstDate.getDate() + 14);

for (let i = 0; i < 16; i++) {
  const leave = new Date(firstDate);
  leave.setDate(firstDate.getDate() + i * 5);
  const back = new Date(leave);
  back.setDate(leave.getDate() + nights);
  departures.push({ leave, back, seats: 4 + (i * 3) % 9 });
}

const departureList = document.getElementById('departureList');
const moreDepartures = document.getElementById('moreDepartures');
let shownDepartures = 4;

// what the list is showing: every date, one month, or one day
let filter = { type: 'all' };

const sameDay = (a, b) => a.toDateString() === b.toDateString();
const sameMonth = (a, b) => a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
const monthName = date => date.toLocaleString('en-GB', { month: 'long', year: 'numeric' });

function dateBox(date) {
  return `<span class="date-box">${date.getDate()}<small>${date.toLocaleString('en-GB', { month: 'short' })}</small></span>`;
}

// a picked day with no fixed departure becomes a private trip that leaves on that day
function privateTrip(date) {
  const back = new Date(date);
  back.setDate(date.getDate() + nights);
  return { leave: date, back, private: true };
}

function renderDepartures() {
  let list = departures.filter(d =>
    filter.type === 'all' ||
    (filter.type === 'month' && sameMonth(d.leave, filter.date)) ||
    (filter.type === 'day' && sameDay(d.leave, filter.date))
  );
  if (filter.type === 'day' && !list.length) list = [privateTrip(filter.date)];

  departureList.innerHTML = list.slice(0, shownDepartures).map(d => `
    <div class="departure">
      ${dateBox(d.leave)}
      <div class="route-line">
        <span><i class="fa-solid fa-location-dot"></i> Departs</span>
        <i class="fa-solid fa-plane"></i>
        <span>Returns <i class="fa-solid fa-location-dot"></i></span>
      </div>
      ${dateBox(d.back)}
      <div class="dep-info">
        <span class="days-pill">${info.days} days</span>
        ${d.private
          ? '<span class="seats private"><i class="fa-solid fa-user-check"></i>Private trip on your date</span>'
          : `<span class="seats"><i class="fa-solid fa-user-group"></i>${d.seats} Seats Available</span>`}
      </div>
      <div class="dep-price">
        <strong>Npr. ${formatPrice(info.price)}</strong>
        <button class="small-book" data-open="inquiryModal" data-subject="Booking" data-date="${niceDate(d.leave)}" data-iso="${isoDate(d.leave)}">Book Now</button>
      </div>
    </div>
  `).join('');

  document.getElementById('noDepartures').hidden = list.length > 0;
  moreDepartures.hidden = list.length <= shownDepartures;

  // the button shows what is picked
  const label = document.getElementById('dateLabel');
  if (filter.type === 'all') label.textContent = 'Select Month, Year';
  if (filter.type === 'month') label.textContent = monthName(filter.date);
  if (filter.type === 'day') label.textContent = niceDate(filter.date);
}

moreDepartures.addEventListener('click', () => { shownDepartures += 4; renderDepartures(); });


// ---------- departure calendar ----------
const calendar = document.getElementById('calendar');
const dateBtn = document.getElementById('dateBtn');
const calDays = document.getElementById('calDays');

// the month the calendar is looking at, starts on the first departure
let viewMonth = new Date(departures[0].leave.getFullYear(), departures[0].leave.getMonth(), 1);

// no going back before this month, and dates can be picked up to a year ahead
const today = new Date();
today.setHours(0, 0, 0, 0);
const firstMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const lastMonth = new Date(today.getFullYear() + 1, today.getMonth(), 1);

// the earliest day a private trip can leave, a week from today to leave time for permits and bookings
const firstBookable = new Date(today);
firstBookable.setDate(today.getDate() + 7);

function renderCalendar() {
  document.getElementById('calTitle').textContent = monthName(viewMonth);
  document.getElementById('calPrev').disabled = viewMonth <= firstMonth;
  document.getElementById('calNext').disabled = viewMonth >= lastMonth;

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const blanks = (new Date(year, month, 1).getDay() + 6) % 7; // monday first

  let html = '<span></span>'.repeat(blanks);

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const trip = departures.find(d => sameDay(d.leave, date));
    const classes = ['cal-day'];

    if (trip) classes.push('has-trip');
    if (sameDay(date, today)) classes.push('today');
    if (filter.type === 'day' && sameDay(date, filter.date)) classes.push('picked');

    // fixed departures and any day from a week ahead can be clicked, earlier days are greyed out
    const title = trip ? `${trip.seats} seats available` : 'Private trip on this date';
    html += trip || date >= firstBookable
      ? `<button class="${classes.join(' ')}" data-day="${day}" title="${title}">${day}</button>`
      : `<span class="${classes.join(' ')} past">${day}</span>`;
  }

  calDays.innerHTML = html;
}

function openCalendar(open) {
  calendar.hidden = !open;
  dateBtn.setAttribute('aria-expanded', open);
  if (open) renderCalendar();
}

function pick(newFilter) {
  filter = newFilter;
  shownDepartures = 4;
  renderDepartures();
  openCalendar(false);
}

dateBtn.addEventListener('click', () => openCalendar(calendar.hidden));

document.getElementById('calPrev').addEventListener('click', () => {
  viewMonth.setMonth(viewMonth.getMonth() - 1);
  renderCalendar();
});

document.getElementById('calNext').addEventListener('click', () => {
  viewMonth.setMonth(viewMonth.getMonth() + 1);
  renderCalendar();
});

calDays.addEventListener('click', event => {
  const day = event.target.closest('button.cal-day');
  if (day) pick({ type: 'day', date: new Date(viewMonth.getFullYear(), viewMonth.getMonth(), Number(day.dataset.day)) });
});

document.getElementById('calMonth').addEventListener('click', () => pick({ type: 'month', date: new Date(viewMonth) }));
document.getElementById('calAll').addEventListener('click', () => pick({ type: 'all' }));

// closes when clicking anywhere else or pressing escape
document.addEventListener('click', event => {
  if (!event.target.closest('#datePicker')) openCalendar(false);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') openCalendar(false);
});

renderDepartures();


// ---------- includes and excludes ----------
document.getElementById('includes').innerHTML = trip.includes.map(item => `<li>${item}</li>`).join('');
document.getElementById('excludes').innerHTML = trip.excludes.map(item => `<li>${item}</li>`).join('');


// ---------- know before you go, good to know and faqs ----------
document.getElementById('knowList').innerHTML = trip.knowBefore.map(([icon, title, items], i) =>
  accordionItem(`<span><i class="fa-solid ${icon} acc-icon"></i>${title}</span>`, arrowList(items), i === 0)
).join('');

document.getElementById('goodList').innerHTML = trip.goodToKnow.map(([title, items], i) =>
  accordionItem(`<span>${title}</span>`, arrowList(items), i === 0)
).join('');

document.getElementById('tripFaqs').innerHTML = trip.faqs.map(([question, answer], i) =>
  accordionItem(`<span><em class="faq-num">${i + 1}.</em>${question}</span>`, `<p>${answer}</p>`, i === 0)
).join('');

// each row opens and closes on its own, so several can be open at once
document.addEventListener('click', event => {
  const head = event.target.closest('.acc-head');
  if (head) head.parentElement.classList.toggle('open');
});


// ---------- what to pack ----------
const packTabs = document.getElementById('packTabs');
const packList = document.getElementById('packList');

packTabs.innerHTML = trip.pack.map(([icon, title], i) =>
  `<button class="${i === 0 ? 'active' : ''}" data-index="${i}"><i class="fa-solid ${icon}"></i>${title}</button>`
).join('');

function showPack(index) {
  const [icon, title, items] = trip.pack[index];
  packTabs.querySelectorAll('button').forEach((tab, i) => tab.classList.toggle('active', i === index));
  packList.innerHTML = `<h4><i class="fa-solid ${icon}"></i>${title}</h4>${arrowList(items)}`;
}

packTabs.addEventListener('click', event => {
  const tab = event.target.closest('button');
  if (tab) showPack(Number(tab.dataset.index));
});

showPack(0);


// ---------- reviews ----------
// reviews live in trip-data.js, a review written here only stays until the page is reloaded
// in wordpress it would be saved as a comment on the trip post
const reviewArea = document.getElementById('reviewArea');
let reviewSort = 'newest';
let shownReviews = 3;

function averageRating() {
  const total = trip.reviews.reduce((sum, review) => sum + review.rating, 0);
  return trip.reviews.length ? total / trip.reviews.length : 0;
}

function renderTopRating() {
  const box = document.getElementById('topRating');

  if (!trip.reviews.length) {
    box.innerHTML = `${starIcons(0)} <span>No reviews yet, <a href="#reviews">be the first</a></span>`;
    return;
  }

  const average = averageRating();
  box.innerHTML = `${starIcons(average)} <b>${average.toFixed(1)}</b> <span>Based on <a href="#reviews">${trip.reviews.length} ${trip.reviews.length === 1 ? 'Review' : 'Reviews'}</a></span>`;
}

function reviewCard(review) {
  const photos = review.photos.length
    ? `<div class="review-photos">${review.photos.map(name => `<img src="images/${name}.jpg" alt="${name.replace(/-/g, ' ')}">`).join('')}</div>`
    : '';
  const avatar = review.avatar ? `images/${review.avatar}.jpg` : 'images/reviewer-default.jpg';

  return `
    <div class="review">
      <div class="review-who">
        <img class="review-avatar" src="${avatar}" alt="${review.name}">
        <div>
          <h5>${review.name}</h5>
          <span class="review-stars">${starIcons(review.rating)}</span>
          <small>${niceDate(review.date)}</small>
        </div>
      </div>
      <h4>${review.title}</h4>
      <p>${review.text}</p>
      ${photos}
    </div>`;
}

function renderReviews() {
  renderTopRating();
  document.getElementById('writeReviewText').textContent = trip.reviews.length ? 'Write a review' : 'Review Now';

  // empty state
  if (!trip.reviews.length) {
    reviewArea.innerHTML = `
      <div class="no-reviews">
        <img src="images/no-reviews.png" alt="no reviews">
        <h4>No reviews yet</h4>
        <p>No one has shared their experience on this adventure. Be the first to leave a comment and help fellow trekkers.</p>
        <button class="pill small" data-open="reviewModal">
          Review Now
          <span class="circle"><i class="fa-solid fa-arrow-right"></i></span>
        </button>
      </div>`;
    return;
  }

  // how many reviews gave each star, for the bars
  const counts = [5, 4, 3, 2, 1].map(star => trip.reviews.filter(r => r.rating === star).length);
  const most = Math.max(...counts);

  const sorted = [...trip.reviews].sort((a, b) => {
    if (reviewSort === 'highest') return b.rating - a.rating;
    if (reviewSort === 'lowest') return a.rating - b.rating;
    return new Date(b.date) - new Date(a.date);
  });

  reviewArea.innerHTML = `
    <div class="review-summary">
      <div class="score">
        <p><b>${averageRating().toFixed(1)}</b> out of 5</p>
        <span class="review-stars">${starIcons(averageRating())}</span>
        <small>(${trip.reviews.length} ${trip.reviews.length === 1 ? 'Review' : 'Reviews'})</small>
      </div>
      <div class="bars">
        ${counts.map((count, i) => `
          <div class="bar-row">
            <span>${5 - i} <i class="fa-solid fa-star"></i></span>
            <div class="bar"><span style="width:${most ? (count / most) * 100 : 0}%"></span></div>
          </div>`).join('')}
      </div>
    </div>

    <div class="review-top">
      <h3>What the travellers have to say?</h3>
      <label>Sort by:
        <select id="reviewSort">
          <option value="newest"${reviewSort === 'newest' ? ' selected' : ''}>Newest</option>
          <option value="highest"${reviewSort === 'highest' ? ' selected' : ''}>Highest rated</option>
          <option value="lowest"${reviewSort === 'lowest' ? ' selected' : ''}>Lowest rated</option>
        </select>
      </label>
    </div>

    ${sorted.slice(0, shownReviews).map(reviewCard).join('')}

    ${sorted.length > shownReviews ? `
      <div class="center">
        <button class="pill small" id="moreReviews">
          Load More Comments
          <span class="circle"><i class="fa-solid fa-arrow-down"></i></span>
        </button>
      </div>` : ''}`;
}

reviewArea.addEventListener('change', event => {
  if (event.target.id !== 'reviewSort') return;
  reviewSort = event.target.value;
  renderReviews();
});

reviewArea.addEventListener('click', event => {
  if (!event.target.closest('#moreReviews')) return;
  shownReviews += 3;
  renderReviews();
});

document.getElementById('writeReview').addEventListener('click', () => openModal('reviewModal'));

// the words next to the rating stars follow the star that is picked
const reviewFormBox = document.getElementById('reviewForm');
const ratingText = document.getElementById('ratingText');
const showRatingText = () => {
  ratingText.textContent = reviewFormBox.rating.value ? `${reviewFormBox.rating.value} out of 5` : 'Tap a star to rate';
  ratingText.classList.remove('missing');
};
reviewFormBox.addEventListener('change', showRatingText);
reviewFormBox.addEventListener('reset', () => setTimeout(showRatingText));

document.getElementById('reviewForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;

  // no star picked yet: ask for one and stop here
  if (!form.rating.value) {
    ratingText.textContent = 'Please pick a rating';
    ratingText.classList.add('missing');
    return;
  }

  trip.reviews.push({
    name: form.name.value,
    rating: Number(form.rating.value),
    date: new Date().toISOString(),
    title: form.title.value,
    text: form.text.value,
    photos: []
  });

  form.reset();
  reviewSort = 'newest';
  closeModals();
  renderReviews();
});

renderReviews();


// ---------- related trips ----------
// 3 other trips, from the same country first
const others = allTrips.filter(t => t.slug !== slug);
const related = [
  ...others.filter(t => t.place === info.place),
  ...others.filter(t => t.place !== info.place)
].slice(0, 3);

document.getElementById('relatedGrid').innerHTML = related
  .map(t => packageCard(t.title, t.place, t.daysText, t.price))
  .join('');


// ---------- popups ----------
function openModal(id) {
  document.getElementById(id).hidden = false;
  document.body.classList.add('no-scroll');
}

function closeModals() {
  document.querySelectorAll('.modal, .lightbox').forEach(box => { box.hidden = true; });
  document.body.classList.remove('no-scroll');
}

// any button with data-open="..." opens that popup (book now, quick inquiry, review now)
document.addEventListener('click', event => {
  const opener = event.target.closest('[data-open]');
  if (!opener) return;

  // book now opens the booking page with this trip and the date (the first departure when no date was picked)
  if (opener.dataset.subject === 'Booking') {
    const query = new URLSearchParams({
      trip: info.slug, title: info.title, place: info.place, days: info.daysText, price: info.price,
      date: opener.dataset.iso || isoDate(departures[0].leave)
    });
    location.href = `book.html?${query}`;
    return;
  }

  if (opener.dataset.open === 'inquiryModal') {
    document.getElementById('inquiryTitle').textContent = opener.dataset.subject === 'Booking' ? 'Book this trip' : 'Quick inquiry';
    document.getElementById('inquiryMessage').value = opener.dataset.date
      ? `I would like to book ${info.title} departing on ${opener.dataset.date}.`
      : `I am interested in ${info.title}.`;
    document.getElementById('inquiryForm').hidden = false;
    document.getElementById('inquiryThanks').hidden = true;
  }

  openModal(opener.dataset.open);
});

// close with the x, a click outside the box, or the escape key
document.querySelectorAll('.modal, .lightbox').forEach(box => {
  box.addEventListener('click', event => {
    if (event.target === box || event.target.closest('.modal-close')) closeModals();
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModals();
  if (!document.getElementById('lightbox').hidden) {
    if (event.key === 'ArrowRight') showPhoto(photoIndex + 1);
    if (event.key === 'ArrowLeft') showPhoto(photoIndex - 1);
  }
});

// the inquiry form only shows a thank you message for now
// in wordpress it would send an email (for example with contact form 7)
document.getElementById('inquiryForm').addEventListener('submit', event => {
  event.preventDefault();
  event.target.reset();
  event.target.hidden = true;
  document.getElementById('inquiryThanks').hidden = false;
});


// ---------- photo viewer ----------
let photoIndex = 0;

function showPhoto(index) {
  photoIndex = (index + photos.length) % photos.length;
  // the photo that is really showing in the gallery, so a missing file shows its stand-in photo here too
  document.getElementById('lbImg').src = document.querySelectorAll('#tripGallery img')[photoIndex].src;
  document.getElementById('lbImg').alt = `${slug.replace(/-/g, ' ')} ${photoIndex + 1}`;
  document.getElementById('lbCount').textContent = `${photoIndex + 1} / ${photos.length}`;
}

document.getElementById('tripGallery').addEventListener('click', event => {
  const photo = event.target.closest('.g-photo');
  if (!photo) return;
  showPhoto(Number(photo.dataset.index));
  openModal('lightbox');
});

document.getElementById('lbNext').addEventListener('click', () => showPhoto(photoIndex + 1));
document.getElementById('lbPrev').addEventListener('click', () => showPhoto(photoIndex - 1));


// ---------- share, like and pdf ----------
document.getElementById('shareBtn').addEventListener('click', async () => {
  const label = document.querySelector('#shareBtn span');
  if (navigator.share) {
    navigator.share({ title: info.title, url: location.href }).catch(() => {});
  } else {
    await navigator.clipboard.writeText(location.href).catch(() => {});
    label.textContent = 'Link copied';
    setTimeout(() => { label.textContent = 'Share'; }, 2000);
  }
});

// like saves the trip to the wishlist (see common.js), liking again takes it out
const likeBtn = document.getElementById('likeBtn');

function showLiked(liked) {
  likeBtn.classList.toggle('liked', liked);
  likeBtn.querySelector('i').className = liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
  likeBtn.querySelector('span').textContent = liked ? 'Liked' : 'Like';
}

likeBtn.addEventListener('click', () => {
  showLiked(toggleWishlist({ slug: info.slug, title: info.title, place: info.place, days: info.daysText, price: info.price }));
});

showLiked(inWishlist(info.slug));

// opens the print window, where "save as pdf" can be picked
document.getElementById('pdfBtn').addEventListener('click', () => window.print());


// ---------- tabs follow the scroll ----------
const tabs = document.querySelectorAll('#tripTabs a');

// the active tab is the section that has most recently scrolled past the tabs bar
// (the tabs are not in the same order as the sections, so the closest one wins)
window.addEventListener('scroll', () => {
  let current = tabs[0];
  let closest = -Infinity;

  tabs.forEach(tab => {
    const top = document.querySelector(tab.getAttribute('href')).getBoundingClientRect().top;
    if (top < 180 && top > closest) {
      closest = top;
      current = tab;
    }
  });

  tabs.forEach(tab => tab.classList.toggle('active', tab === current));
});
