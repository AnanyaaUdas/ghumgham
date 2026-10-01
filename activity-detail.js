// activity detail page js for ghumgham
// fills the template with the activity from the link
// the content itself is in activity-data.js


// ---------- which activity ----------
// reads ?activity=rafting from the link, trekking is used if the activity is missing or unknown
const slug = new URLSearchParams(location.search).get('activity');
const activity = activities[slug] ? slug : 'trekking';
if (slug && !activities[slug]) pageNotFound(); // an activity we do not have
const data = activities[activity];
data.nameLower = data.name.toLowerCase();


// ---------- simple text ----------
// every element with data-fill="name" gets the activity name, data-fill="about" the about text and so on
document.title = `${data.name} | Ghumgham`;

document.querySelectorAll('[data-fill]').forEach(el => {
  el.textContent = data[el.dataset.fill];
});


// ---------- about photo ----------
const aboutImg = document.getElementById('aboutImg');
aboutImg.src = `images/about-${activity}.jpg`;
aboutImg.alt = `about ${activity.replace(/-/g, ' ')}`;


// ---------- region cards ----------
// the card code is shared, see regionCard in common.js
document.getElementById('regionGrid').innerHTML = data.regions.map(([region, count]) => regionCard(activity, region, count)).join('');


// ---------- reasons list ----------
document.getElementById('reasons').innerHTML = data.reasons.map(reason => `<li>${reason}</li>`).join('');


// ---------- package slider ----------
// the card code is shared, see packageCard in common.js
document.getElementById('pkgSlider').innerHTML = data.packages.map(([title, days]) => packageCard(title, 'Nepal', days)).join('');


// ---------- faq ----------
// first question starts open, the open and close clicks are handled in common.js
document.getElementById('faqList').innerHTML = data.faqs.map(([question, answer], i) => `
  <div class="faq-item${i === 0 ? ' open' : ''}">
    <button class="faq-q">${question} <i class="fa-solid fa-chevron-down"></i></button>
    <div class="faq-a"><p>${answer}</p></div>
  </div>
`).join('');
setupFaqMore();

refreshFaq();


// ---------- more activities ----------
// shows 4 other activities, never the one on this page
const others = Object.values(activities).filter(item => item !== data).slice(0, 4);
document.getElementById('moreActivities').innerHTML = others.map(item => activityCard(item.name)).join('');
