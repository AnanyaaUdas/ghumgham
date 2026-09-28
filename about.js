// about us page js for ghumgham
// counting numbers and the history year slider
// shared stuff (header, menu) is in common.js


// ---------- numbers count up ----------
// starts once the numbers scroll into view, only runs one time
const counters = document.querySelectorAll('[data-count]');

function countUp(el) {
  const target = Number(el.dataset.count);
  const start = performance.now();
  const duration = 1200;

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * progress);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const counterWatcher = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    countUp(entry.target);
    counterWatcher.unobserve(entry.target);
  });
}, { threshold: 0.5 });

counters.forEach(el => counterWatcher.observe(el));


// ---------- our journey through time ----------
// one entry per year, photo is the file name in the images folder (swap it for a real photo from that year)
const history = [
  { year: 2016, photo: 'about-nepal', title: 'New Journey Begins', text: 'Our story began in a small office in Lalitpur with a big dream: to show travellers the real Nepal. Armed with passion and local knowledge, we planned our first treks and welcomed our first guests within months.' },
  { year: 2018, photo: 'about-who', title: 'Growing Our Team', text: 'Word spread quickly. We grew into a team of guides, planners and drivers, and added cultural tours and jungle safaris to our trekking trips.' },
  { year: 2020, photo: 'about-mountains', title: 'Standing Strong', text: 'When the world stopped travelling, we used the time to train our guides, support local communities and plan better, safer trips for the future.' },
  { year: 2022, photo: 'tibet', title: 'Beyond Nepal', text: 'We opened trips to Bhutan, Tibet and India, giving our travellers more of the Himalayas and the wider region to explore.' },
  { year: 2024, photo: 'thailand', title: 'Across Asia', text: 'Thailand, Indonesia and the Maldives joined our list, bringing beach holidays and island escapes alongside our mountain adventures.' },
  { year: 2025, photo: 'about-us', title: 'A Decade of Journeys', text: 'Ten years, hundreds of happy travellers and trusted partners across Asia. We are proud of every trip and excited for what comes next.' },
  { year: 2026, photo: 'about-street', title: 'Travel Made Simple', text: 'Our new website lets travellers explore destinations, compare packages and book their dream trip in just a few clicks.' }
];

let historyIndex = history.length - 2; // starts on 2025 like the design

function showYear(index) {
  historyIndex = (index + history.length) % history.length;
  const item = history[historyIndex];

  document.getElementById('historyYear').textContent = item.year;
  document.getElementById('historyLast').textContent = `/${history[history.length - 1].year}`;
  document.getElementById('historyTitle').textContent = item.title;
  document.getElementById('historyText').textContent = item.text;

  const img = document.getElementById('historyImg');
  img.src = `images/${item.photo}.jpg`;
  img.alt = `history ${item.year}`;
}

document.getElementById('historyPrev').addEventListener('click', () => showYear(historyIndex - 1));
document.getElementById('historyNext').addEventListener('click', () => showYear(historyIndex + 1));

showYear(historyIndex);
