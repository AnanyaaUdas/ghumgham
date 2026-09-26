// blog detail page, one template for every post
// reads ?post= from the link, finds that post in blog-data.js and fills in the page
// the article text is written for the country the post is about, and the package box shows a matching trip

const slug = new URLSearchParams(location.search).get('post');
const postIndex = Math.max(0, blogs.findIndex(post => toSlug(post.title) === slug));
if (slug && !blogs.some(post => toSlug(post.title) === slug)) pageNotFound(); // a post we do not have
const post = blogs[postIndex];


// ---------- which trips go with this post ----------
// words in the title pick the country, and the box under "packages available" shows that country's trips
// (one trip shows as a wide card, two or three sit side by side)
// each trip is [name, days, price], the names match trip-data.js so the links open the right trip page
const tripsByWord = [
  [/lhasa|tibet|plateau|chorten/i, 'Tibet', [['Lhasa City Tour', 5, 85500]]],
  [/phuket|thailand|island hopping|bangkok|pattaya/i, 'Thailand', [['Phuket Island Tours', 6, 57000], ['Bangkok and Pattaya Tour', 5, 47500]]],
  [/bali|indonesia/i, 'Indonesia', [['Bali Island Escape', 6, 57000]]],
  [/golden triangle|delhi|agra|india/i, 'India', [['Golden Triangle Tour', 6, 102600]]],
  [/villa|reef|maldives/i, 'Maldives', [['Maldives Honeymoon Escape', 5, 85500]]],
  [/everest|khumbu|sherpa/i, 'Nepal', [['Everest Hiking Trip', 12, 114000], ['Langtang Valley Trek', 8, 76000]]]
];

// anything else is about nepal and gets three of our treks
const [, country, trips] = tripsByWord.find(([words]) => words.test(post.title)) ||
  [null, 'Nepal', [['Annapurna Wonderland', 7, 66500], ['Upper Mustang Trek', 10, 171000], ['Langtang Valley Trek', 8, 76000]]];

const nights = days => `${days}D/${days - 1}N`;

function packageBox() {
  if (trips.length === 1) {
    const [title, days, price] = trips[0];
    return `
      <a href="${tripLink(title, country, nights(days), price)}" class="post-pkg">
        ${imageTag(title)}
        <div>
          <div class="stars">★★★★★ <span>(48)</span></div>
          <h4>${title}</h4>
          <div class="meta"><i class="fa-solid fa-location-dot"></i>${country} • ${nights(days)}</div>
          <div class="pkg-price">Npr. ${formatPrice(price)} <small>per person</small></div>
        </div>
      </a>`;
  }

  // the normal package cards from common.js, two or three in a row
  return `<div class="post-pkgs cols-${trips.length}">${trips.map(([title, days, price]) => packageCard(title, country, nights(days), price)).join('')}</div>`;
}

const tripTitle = trips[0][0];


// ---------- top of the page ----------
const author = post.author || 'Anna Sharma';

document.title = `${post.title} | Ghumgham`;
document.getElementById('crumbTitle').textContent = post.title;
document.getElementById('postTitle').textContent = post.title;
document.getElementById('authorName').textContent = author;
document.getElementById('authorInitials').textContent = author.split(' ').map(word => word[0]).join('').slice(0, 2);
document.getElementById('postDate').textContent = post.date;
document.getElementById('postCover').innerHTML = imageTag(post.image);


// ---------- the article ----------
// headings get an id so the table of contents can jump to them
function heading(level, text) {
  return `<h${level} id="${toSlug(text)}">${text}</h${level}>`;
}

const facts = [
  ['Best season', 'Spring (March to May) and autumn (September to November)'],
  ['Getting there', `International flights into ${country}, then road or domestic flights`],
  ['Trip length', `Most of our ${country} trips run between 5 and 14 days`],
  ['Group size', 'Private trips or small groups of up to 12 travellers'],
  ['Stay', 'Handpicked hotels, homestays and family run lodges'],
  ['Guides', 'Local, licensed guides who grew up in the region']
];

const specials = [
  ['Scenery', `Every day in ${country} brings a new view, from quiet mornings over the valleys to evenings that glow gold on the hills. Our routes are planned around the best light and the calmest trails, so you spend less time in traffic and more time taking it all in.`],
  ['Culture', 'Temples, festivals and small village rituals are part of daily life here. Our guides explain what you are seeing and when it is fine to join in, so you leave with real stories and not only photos.'],
  ['Local Stays', 'We stay with families and in small lodges wherever we can. The money stays in the community, the food is cooked fresh, and the evenings around the table are often the part people remember most.'],
  ['Hospitality', `The warmth of the people in ${country} surprises almost every traveller. A cup of tea offered on the trail or a shared meal in a village home turns a good trip into a great one.`]
];

document.getElementById('postBody').innerHTML = `
  ${heading(2, 'A Journey Beyond the Guidebook')}
  <p>${post.title} started as a simple idea: go slower, talk to the people who live there, and see the places most tours rush past. What we found in ${country} was more than a list of sights. It was a chance to share stories, food and time with communities that have welcomed travellers for generations.</p>
  <p>As more travellers look for real connections, responsible tourism and off-the-beaten-path adventures, trips like this give homestay owners, local guides, cooperatives and small businesses a fair share of every journey. It is travel that leaves the place a little better than we found it.</p>

  <blockquote>The best moments of a trip are rarely on the itinerary. They happen when you slow down, say yes to a cup of tea, and let the place tell its own story.</blockquote>

  ${heading(2, `Planning Your Trip to ${country}`)}
  <p>A little planning goes a long way. Here is a quick look at what to expect before you book, from the best time to go to the kind of places you will stay in along the way.</p>

  <div class="table-wrap">
    <table class="post-table">
      <thead><tr><th>Topic</th><th>Details</th></tr></thead>
      <tbody>${facts.map(([topic, detail]) => `<tr><td>${topic}</td><td>${detail}</td></tr>`).join('')}</tbody>
    </table>
  </div>

  <figure>
    ${imageTag(tripTitle)}
    <figcaption>fig. On the road with our ${tripTitle} group</figcaption>
  </figure>

  ${heading(2, 'What Makes the Journey Special?')}
  <p>Our team has been guiding trips in ${country} for years, and every route is walked or driven by us before a single guest joins it. These are the things travellers tell us they loved the most.</p>

  ${specials.map(([title, text]) => `<div class="point">${heading(3, title)}<p>${text}</p></div>`).join('')}

  <h4 class="pkg-label">Packages available</h4>
  ${packageBox()}

  ${heading(2, `Why ${country} Matters`)}
  <p>Travelling the right way can create a lasting impact through:</p>
  <ul class="dot-list">
    <li><b>Local income</b>: money spent with families, guides and small businesses stays in the community</li>
    <li><b>Culture</b>: festivals, crafts and traditions are kept alive when visitors value them</li>
    <li><b>Nature</b>: fees and responsible travel help protect trails, parks and wildlife</li>
    <li><b>Connection</b>: travellers and hosts learn from each other and leave as friends</li>
  </ul>

  ${heading(2, 'The Journey Continues')}
  <p>In the end, a trip like this is about people as much as places. The views stay with you, but so do the conversations, the shared meals and the small kindnesses along the way.</p>
  <p>If this story has you thinking about your own adventure in ${country}, our team is happy to help you plan it, from the first question to the day you fly home.</p>`;


// ---------- table of contents ----------
// main headings, with the points under "what makes the journey special" a little indented
const headings = [...document.querySelectorAll('#postBody h2, #postBody h3')];
const tocList = document.getElementById('tocList');

tocList.innerHTML = headings.map(h =>
  `<li class="${h.tagName === 'H3' ? 'sub' : ''}"><a href="#${h.id}">${h.textContent}</a></li>`
).join('');

// the heading nearest the top of the screen is the one being read
function markReading() {
  let current = headings[0];
  headings.forEach(h => {
    if (h.getBoundingClientRect().top < 160) current = h;
  });

  tocList.querySelectorAll('a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current.id}`);
  });
}

addEventListener('scroll', markReading, { passive: true });
markReading();


// ---------- previous and next post ----------
function navCard(target, label, arrowFirst) {
  if (!target) return '<span></span>';
  const arrow = `<i class="fa-solid fa-arrow-${arrowFirst ? 'left' : 'right'}"></i>`;

  return `
    <a href="blog-detail.html?post=${toSlug(target.title)}" class="nav-card ${arrowFirst ? '' : 'next'}">
      <span class="nav-label">${arrowFirst ? arrow + label : label + arrow}</span>
      <h4>${target.title}</h4>
      <span class="date"><i></i>${target.date}</span>
    </a>`;
}

document.getElementById('postNav').innerHTML =
  navCard(blogs[postIndex - 1], 'Previous', true) + navCard(blogs[postIndex + 1], 'Next', false);


// ---------- share buttons ----------
const copied = document.getElementById('copied');

document.getElementById('shareButtons').addEventListener('click', event => {
  const button = event.target.closest('a');
  if (!button) return;
  event.preventDefault();

  const url = encodeURIComponent(location.href);
  const text = encodeURIComponent(post.title);

  if (button.dataset.share === 'facebook') open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  else if (button.dataset.share === 'x') open(`https://x.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  else {
    // these apps have no share link, so the link is copied for pasting into them
    navigator.clipboard?.writeText(location.href);
    copied.hidden = false;
    setTimeout(() => { copied.hidden = true; }, 2000);
  }
});


// ---------- comments ----------
// sample comments for now, posts marked noComments in blog-data.js start with none and show the empty screen
const comments = post.noComments ? [] : [
  { name: 'Sakar Regmi', date: '30 June, 2025', text: 'This was super helpful! I have been stuck between two treks for weeks and this breakdown made it much clearer. Thinking I will go with Annapurna for my first trek. Thanks for the insights!' },
  { name: 'Arjun Basnet', date: '28 June, 2025', text: 'Loved the part about staying with local families. We did a homestay last spring and it was easily the best night of the whole trip.' },
  { name: 'Anna Sharma', date: '25 June, 2025', text: 'Great tips on the best season. We went in October and the skies were clear almost every morning. Booking again for next year.' },
  { name: 'Emma Clarke', date: '19 June, 2025', text: 'The table at the top saved me a lot of searching. Would love a packing list post next!' },
  { name: 'Kenji Tanaka', date: '11 June, 2025', text: 'Our guide from Ghumgham was exactly as described here, patient, funny and full of stories. Highly recommend.' },
  { name: 'Priya Sharma', date: '02 June, 2025', text: 'Beautiful writing. It made me miss the mountains already.' }
];

const commentList = document.getElementById('commentList');
const moreComments = document.getElementById('moreComments');
let commentsShown = 3;

// turns < > & " into safe text, so whatever someone types in a comment shows as plain words
function safe(text) {
  const box = document.createElement('div');
  box.textContent = text;
  return box.innerHTML;
}

function initials(name) {
  return name.trim().split(/\s+/).map(word => word[0]).join('').slice(0, 2).toUpperCase();
}

function showComments() {
  // no comments yet: the picture, a short line and a button that opens the form
  if (!comments.length) {
    commentList.innerHTML = `
      <div class="no-comments">
        <img src="images/no-reviews.png" alt="no comments">
        <h4>No comments yet</h4>
        <p>Be the first to leave a comment and help fellow trekkers.</p>
        <a href="#commentForm" class="pill small comment-now">
          Comment Now
          <span class="circle"><i class="fa-solid fa-arrow-right"></i></span>
        </a>
      </div>`;
    moreComments.hidden = true;
    return;
  }

  commentList.innerHTML = comments.slice(0, commentsShown).map(c => `
    <div class="comment">
      <div class="comment-head">
        <span class="initials">${safe(initials(c.name))}</span>
        <div><h5>${safe(c.name)}</h5><small>${c.date}</small></div>
      </div>
      <p>${safe(c.text)}</p>
    </div>`).join('');
  moreComments.hidden = commentsShown >= comments.length;
}

moreComments.addEventListener('click', () => {
  commentsShown += 3;
  showComments();
});

// both comment now buttons (top right, and the one on the empty screen) jump to the form and put the cursor in the name box
document.addEventListener('click', event => {
  if (!event.target.closest('#commentNow, .comment-now')) return;
  event.preventDefault();
  commentForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => commentForm.name.focus(), 500);
});

const commentForm = document.getElementById('commentForm');
const commentThanks = document.getElementById('commentThanks');

commentForm.addEventListener('submit', event => {
  event.preventDefault();

  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).replace(/ (\d{4})$/, ', $1');
  comments.unshift({ name: commentForm.name.value.trim(), date: today, text: commentForm.text.value.trim() });
  commentsShown++;
  showComments();

  commentForm.reset();
  commentThanks.hidden = false;
  setTimeout(() => { commentThanks.hidden = true; }, 3000);
});

showComments();
