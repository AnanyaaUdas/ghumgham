// book your trip page
// three steps: traveller details, payment and confirmation
// the trip comes from the link (?trip=...&date=...), the summary on the right updates as travellers are added

// ---------- which trip ----------
const params = new URLSearchParams(location.search);
const slug = params.get('trip') || 'annapurna-wonderland';
const known = collectTrips().find(t => t.slug === slug);

// cards send the trip name and price in the link too, short links are looked up in the trip list
if (!known && !params.get('title')) pageNotFound();

const trip = {
  title: params.get('title') || known?.title || '',
  place: params.get('place') || known?.place || 'Nepal',
  daysText: params.get('days') || known?.daysText || '1D',
  price: Number(params.get('price')) || known?.price || 0
};
trip.days = parseInt(trip.daysText, 10) || 1;

// the date picked on the trip page, or two weeks from today when none was picked
// read as a local date (new Date('2026-10-12') would be read as utc and can land on the day before)
const [y, m, d] = (params.get('date') || '').split('-').map(Number);
let start = new Date(y, m - 1, d);
if (isNaN(start)) {
  start = new Date();
  start.setDate(start.getDate() + 14);
}
const end = new Date(start);
end.setDate(start.getDate() + trip.days - 1);

// e.g. 24th feb, 2026
function longDate(date) {
  const day = date.getDate();
  const suffix = [11, 12, 13].includes(day % 100) ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[day % 10] || 'th');
  return `${day}${suffix} ${date.toLocaleString('en-GB', { month: 'short' })}, ${date.getFullYear()}`;
}

const npr = amount => `Npr. ${formatPrice(Math.round(amount))}`;


// ---------- trip summary ----------
document.title = `Book ${trip.title} | Ghumgham`;
document.getElementById('summaryPhoto').innerHTML = imageTag(trip.title);
document.getElementById('summaryTitle').textContent = trip.title;
document.getElementById('summaryPlace').textContent = trip.place;
document.getElementById('summaryDays').textContent = trip.daysText;
document.getElementById('startDate').textContent = longDate(start);
document.getElementById('endDate').textContent = longDate(end);

// children pay 70% of the adult price, groups of 4 or more get 10% off
const CHILD_RATE = 0.7;
const GROUP_SIZE = 4;
const GROUP_OFF = 0.1;

const people = { adults: 1, children: 0 };
let total = trip.price;

function updatePrices() {
  const adults = trip.price * people.adults;
  const children = trip.price * CHILD_RATE * people.children;
  const discount = people.adults + people.children >= GROUP_SIZE ? (adults + children) * GROUP_OFF : 0;
  total = adults + children - discount;

  document.getElementById('adultLabel').textContent = `Adult (x${people.adults}):`;
  document.getElementById('adultPrice').textContent = npr(adults);
  document.getElementById('childRow').hidden = people.children === 0;
  document.getElementById('childLabel').textContent = `Child (x${people.children}):`;
  document.getElementById('childPrice').textContent = npr(children);
  document.getElementById('discountRow').hidden = discount === 0;
  document.getElementById('discountPrice').textContent = `- ${npr(discount)}`;
  document.getElementById('totalPrice').textContent = npr(total);

  // the payment step shows the deposit and the full amount
  document.getElementById('depositAmount').textContent = npr(total * 0.2);
  document.getElementById('balanceText').textContent = npr(total * 0.8);
  document.getElementById('fullAmount').textContent = npr(total);
}


// ---------- plus and minus buttons ----------
// at least 1 adult, children can be 0, at most 20 of each
document.querySelectorAll('.counter').forEach(counter => {
  const key = counter.dataset.count;
  const min = key === 'adults' ? 1 : 0;

  counter.addEventListener('click', event => {
    const button = event.target.closest('[data-change]');
    if (!button) return;

    people[key] = Math.min(20, Math.max(min, people[key] + Number(button.dataset.change)));
    counter.querySelector('output').textContent = people[key];
    updatePrices();
  });
});


// ---------- moving between steps ----------
const stepItems = document.querySelectorAll('#stepsList li');
let reached = 1; // the furthest step opened so far

function goTo(step) {
  reached = Math.max(reached, step);

  [1, 2, 3].forEach(n => { document.getElementById(`step${n}`).hidden = n !== step; });
  stepItems.forEach(item => {
    const n = Number(item.dataset.step);
    item.classList.toggle('active', n === step);
    item.classList.toggle('done', n < step || (n <= reached && n !== step));
  });

  // after the booking is confirmed there is no going back to change it
  document.getElementById('stepsList').classList.toggle('locked', step === 3);

  document.querySelector('.booking').scrollIntoView({ behavior: 'smooth' });
}

// finished steps on the left can be clicked to go back
stepItems.forEach(item => item.addEventListener('click', () => {
  const n = Number(item.dataset.step);
  if (n <= reached && n < 3 && !document.getElementById('stepsList').classList.contains('locked')) goTo(n);
}));

document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => goTo(Number(button.dataset.go))));


// ---------- step 1 ----------
const step1 = document.getElementById('step1');

step1.addEventListener('submit', event => {
  event.preventDefault();

  // the browser checks the required boxes and the email format
  const ok = step1.checkValidity();
  document.getElementById('step1Error').hidden = ok;
  step1.querySelectorAll('input').forEach(input => input.classList.toggle('wrong', !input.checkValidity()));

  if (ok) goTo(2);
});


// ---------- step 2 ----------
const step2 = document.getElementById('step2');
let method = 'card';

// the three payment tabs, each shows its own box
document.getElementById('methodTabs').addEventListener('click', event => {
  const tab = event.target.closest('[data-method]');
  if (!tab) return;

  method = tab.dataset.method;
  document.querySelectorAll('#methodTabs button').forEach(b => b.classList.toggle('active', b === tab));
  document.querySelectorAll('.method-box').forEach(box => { box.hidden = box.dataset.box !== method; });
  document.getElementById('step2Error').hidden = true;
});

// card number in groups of four, expiry as mm / yy
step2.cardNumber.addEventListener('input', () => {
  step2.cardNumber.value = step2.cardNumber.value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
});

step2.cardExpiry.addEventListener('input', () => {
  const digits = step2.cardExpiry.value.replace(/\D/g, '').slice(0, 4);
  step2.cardExpiry.value = digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits;
});

step2.cardCvv.addEventListener('input', () => {
  step2.cardCvv.value = step2.cardCvv.value.replace(/\D/g, '').slice(0, 4);
});

// only the card tab has boxes to check, the other two are paid after confirming
function cardLooksRight() {
  const checks = [
    [step2.cardName, step2.cardName.value.trim().length > 1],
    [step2.cardNumber, step2.cardNumber.value.replace(/\s/g, '').length >= 13],
    [step2.cardExpiry, /^(0[1-9]|1[0-2]) \/ \d{2}$/.test(step2.cardExpiry.value)],
    [step2.cardCvv, step2.cardCvv.value.length >= 3]
  ];
  checks.forEach(([input, good]) => input.classList.toggle('wrong', !good));
  return checks.every(([, good]) => good);
}

step2.addEventListener('submit', event => {
  event.preventDefault();

  const ok = method !== 'card' || cardLooksRight();
  document.getElementById('step2Error').hidden = ok;
  if (!ok) return;

  // the card details are cleared straight away, nothing is kept on this page
  ['cardName', 'cardNumber', 'cardExpiry', 'cardCvv'].forEach(name => { step2[name].value = ''; });

  // a booking id like gg26x4k9p (shown in capitals)
  const code = Math.random().toString(36).slice(2, 7).toUpperCase();
  document.getElementById('bookingId').textContent = `GG${String(start.getFullYear()).slice(2)}${code}`;
  document.getElementById('doneDate').textContent = longDate(start);

  goTo(3);
});

updatePrices();


// ---------- clear the red boxes while typing ----------
// a box marked wrong goes back to normal as soon as it is changed, and so does the message under the form
document.querySelectorAll('#step1, #step2').forEach(form => {
  form.addEventListener('input', event => {
    event.target.classList.remove('wrong');
    if (!form.querySelector('.wrong')) form.querySelector('.form-error').hidden = true;
  });
});
