// region detail page js for ghumgham
// fills the template with the region from the link
// the content comes from activity-data.js and region-data.js


// ---------- which activity and region ----------
// reads ?activity=trekking&region=annapurna-region from the link
// falls back to trekking and its first region if either one is missing or unknown
const params = new URLSearchParams(location.search);
const activitySlug = activities[params.get('activity')] ? params.get('activity') : 'trekking';
const activity = activities[activitySlug];

const regionEntry = activity.regions.find(([name]) => toSlug(name) === params.get('region')) || activity.regions[0];

// a wrong activity, or a region that activity does not have
if ((params.get('activity') && !activities[params.get('activity')]) ||
    (params.get('region') && !activity.regions.some(([name]) => toSlug(name) === params.get('region')))) pageNotFound();
const [regionName, packageCount] = regionEntry;
const regionSlug = toSlug(regionName);

// short name for package titles, e.g. "Annapurna Region" -> "Annapurna"
const shortName = regionName.replace(/ (Region|National Park|River)$/, '');


// ---------- simple text ----------
const data = {
  name: regionName,
  activityName: activity.name,
  activityLower: activity.name.toLowerCase(),
  intro: regionIntros[regionSlug] ||
    `Discover the ${regionName}, one of the best places in Nepal for ${activity.name.toLowerCase()}. Our local team plans every detail, from permits and transport to guides and places to stay, so you can simply enjoy the landscapes, the culture and the people along the way. Choose a package below or ask us to build a trip just for you.`
};

document.title = `${regionName} | Ghumgham`;

document.querySelectorAll('[data-fill]').forEach(el => {
  el.textContent = data[el.dataset.fill];
});

const aboutImg = document.getElementById('aboutImg');
aboutImg.src = `images/about-${regionSlug}.jpg`;
aboutImg.alt = `about ${regionSlug.replace(/-/g, ' ')}`;


// ---------- packages for this region ----------
// built from the sample list in region-data.js, as many as the region card says
// "trek" is swapped for "tour" when the activity is not trekking
const packages = packageTypes.slice(0, packageCount).map(([type, style, difficulty, days, price], i) => ({
  title: `${shortName} ${activitySlug === 'trekking' ? type : type.replace('Trek', 'Tour')}`,
  style,
  difficulty,
  days,
  price,
  place: 'Nepal',
  order: i
}));


// ---------- package listing ----------
// the filters, sorting and load more are shared, see listing.js
setupListing(packages);


// ---------- faq ----------
// questions come from the activity, the open and close clicks are handled in common.js
document.getElementById('faqList').innerHTML = activity.faqs.map(([question, answer], i) => `
  <div class="faq-item${i === 0 ? ' open' : ''}">
    <button class="faq-q">${question} <i class="fa-solid fa-chevron-down"></i></button>
    <div class="faq-a"><p>${answer}</p></div>
  </div>
`).join('');
setupFaqMore();


// ---------- blog cards ----------
document.getElementById('blogGrid').innerHTML = regionBlogs.map(([title, date], i) => `
  <a href="blogs.html" class="blog-card">
    <img src="images/blog-${i + 1}.jpg" alt="blog ${i + 1}">
    <div class="blog-body">
      <h4>${title.replace('[region]', regionName)}</h4>
      <div class="blog-foot">
        <span class="date"><i></i>${date}</span>
        <span class="read">Read Full Article <i class="fa-solid fa-arrow-right"></i></span>
      </div>
    </div>
  </a>
`).join('');


// ---------- more regions ----------
// 4 other regions of the same activity, never the one on this page
document.getElementById('moreRegions').innerHTML = activity.regions
  .filter(([name]) => name !== regionName)
  .slice(0, 4)
  .map(([name, count]) => regionCard(activitySlug, name, count))
  .join('');


// ---------- start ----------
refreshFaq();
