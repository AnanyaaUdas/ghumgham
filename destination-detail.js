// destination detail page js for ghumgham
// fills the template with the country from the link
// the content itself is in destination-data.js


// ---------- which country ----------
// reads ?country=thailand from the link, nepal is used if the country is missing or unknown
const slug = new URLSearchParams(location.search).get('country');
const country = destinations[slug] ? slug : 'nepal';
if (slug && !destinations[slug]) pageNotFound(); // a country we do not have
const data = destinations[country];


// ---------- simple text ----------
// every element with data-fill="name" gets the country name, data-fill="about" the about text and so on
document.title = `${data.name} | Ghumgham`;

document.querySelectorAll('[data-fill]').forEach(el => {
  el.textContent = data[el.dataset.fill];
});


// ---------- banner and about photo ----------
const banner = document.getElementById('banner');
banner.src = `images/${country}-banner.jpg`;
banner.alt = `${country} banner`;

const aboutImg = document.getElementById('aboutImg');
aboutImg.src = `images/about-${country}.jpg`;
aboutImg.alt = `about ${country}`;


// ---------- activity and package cards ----------
// the card code is shared, see packageCard and activityCard in common.js
document.getElementById('actGrid').innerHTML = data.activities.map(activityCard).join('');
document.getElementById('pkgSlider').innerHTML = data.packages.map(([title, days]) => packageCard(title, data.name, days)).join('');


// ---------- reasons list ----------
document.getElementById('reasons').innerHTML = data.reasons.map(reason => `<li>${reason}</li>`).join('');
